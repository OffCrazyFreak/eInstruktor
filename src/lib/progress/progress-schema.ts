import { z } from "zod";

const examLevelSchema = z.enum(["A", "B"]);

const studyDaySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const attemptSchema = z.object({
	id: z.string(),
	questionId: z.string(),
	correct: z.boolean(),
	selected: z.array(z.string()),
	mode: z.enum(["practice", "exam", "check"]),
	/** One lesson visit, practice set or exam; repeats inside it do not count as first attempts. */
	sessionId: z.string(),
	answeredAt: z.number(),
});

const leitnerEntrySchema = z.object({
	box: z.union([z.literal(1), z.literal(2), z.literal(3)]),
	reviewedOn: studyDaySchema,
});

const examSubjectResultSchema = z.object({
	correct: z.number(),
	total: z.number(),
	passed: z.boolean(),
});

// The optional fields came with the exam screens; sessions saved before them still parse.
const examSessionSchema = z.object({
	id: z.string(),
	level: examLevelSchema,
	seed: z.number(),
	questionIds: z.array(z.string()),
	startedAt: z.number(),
	finishedAt: z.number().nullable(),
	score: z.number().nullable(),
	passed: z.boolean().nullable(),
	/** Absolute end time, so a reload or a locked phone never resets the clock; null runs without a limit. */
	endsAt: z.number().nullable().optional().catch(undefined),
	/** Chosen option ids per question while the exam runs and for the review afterwards. */
	answers: z
		.record(z.string(), z.array(z.string()))
		.optional()
		.catch(undefined),
	flaggedIds: z.array(z.string()).optional().catch(undefined),
	perSubject: z
		.record(z.string(), examSubjectResultSchema)
		.optional()
		.catch(undefined),
	/** Whether each answered question was right when the exam was handed in, so the review always matches the score. */
	graded: z.record(z.string(), z.boolean()).optional().catch(undefined),
});

const lastLessonSchema = z.object({
	slug: z.string(),
	openedAt: z.number(),
	/** Share of the lesson scrolled through, 0 to 1. */
	percent: z.number().min(0).max(1),
});

// One bad element is dropped on its own, so a single corrupt answer never empties the whole list.
function listOf<T extends z.ZodType>(item: T) {
	return z
		.array(z.unknown())
		.catch([])
		.transform((items) =>
			items.flatMap((value) => {
				const parsed = item.safeParse(value);

				return parsed.success ? [parsed.data as z.output<T>] : [];
			}),
		);
}

function recordOf<T extends z.ZodType>(value: T) {
	return z
		.record(z.string(), z.unknown())
		.catch({})
		.transform((entries) =>
			Object.fromEntries(
				Object.entries(entries).flatMap(([key, entry]) => {
					const parsed = value.safeParse(entry);

					return parsed.success ? [[key, parsed.data as z.output<T>]] : [];
				}),
			),
		);
}

// Every field falls back on its own, so one damaged field never wipes the rest of the learner's progress.
export const progressSchema = z.object({
	targetLevel: examLevelSchema.nullable().catch(null),
	examDate: studyDaySchema.nullable().catch(null),
	attempts: listOf(attemptSchema),
	lessonsDone: recordOf(z.number()),
	lastLesson: lastLessonSchema.nullable().catch(null),
	flagged: recordOf(z.number()),
	questionBoxes: recordOf(leitnerEntrySchema),
	cardBoxes: recordOf(leitnerEntrySchema),
	examSessions: listOf(examSessionSchema),
	studyDays: listOf(studyDaySchema),
	dismissedNudges: recordOf(z.number()),
	/** Badge id to the time it was earned; a badge stays once earned. */
	badges: recordOf(z.number()),
	/** When the learner said "Položio sam"; the progress page then ends the streak. */
	passedAt: z.number().nullable().catch(null),
});

export type IProgressState = z.output<typeof progressSchema>;

export type IAttempt = z.infer<typeof attemptSchema>;

export type AttemptMode = IAttempt["mode"];

export type ILeitnerEntry = z.infer<typeof leitnerEntrySchema>;

export type LeitnerBox = ILeitnerEntry["box"];

export type IExamSession = z.infer<typeof examSessionSchema>;

export type IExamSubjectResult = z.infer<typeof examSubjectResultSchema>;

export const EMPTY_PROGRESS: IProgressState = Object.freeze(
	progressSchema.parse({}),
);

export function parseProgress(raw: string | null): IProgressState {
	if (raw === null) {
		return EMPTY_PROGRESS;
	}

	try {
		const parsed = progressSchema.safeParse(JSON.parse(raw));

		return parsed.success ? parsed.data : EMPTY_PROGRESS;
	} catch {
		return EMPTY_PROGRESS;
	}
}

export function hasAnyProgress(progress: IProgressState): boolean {
	return (
		progress.targetLevel !== null ||
		progress.attempts.length > 0 ||
		Object.keys(progress.lessonsDone).length > 0 ||
		progress.lastLesson !== null
	);
}
