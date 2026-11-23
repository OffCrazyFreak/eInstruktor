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

const examSessionSchema = z.object({
	id: z.string(),
	level: examLevelSchema,
	seed: z.number(),
	questionIds: z.array(z.string()),
	startedAt: z.number(),
	finishedAt: z.number().nullable(),
	score: z.number().nullable(),
	passed: z.boolean().nullable(),
});

const lastLessonSchema = z.object({
	slug: z.string(),
	openedAt: z.number(),
	/** Share of the lesson scrolled through, 0 to 1. */
	percent: z.number().min(0).max(1),
});

// Every field falls back on its own, so one damaged field never wipes the rest of the learner's progress.
export const progressSchema = z.object({
	targetLevel: examLevelSchema.nullable().catch(null),
	examDate: studyDaySchema.nullable().catch(null),
	attempts: z.array(attemptSchema).catch([]),
	lessonsDone: z.record(z.string(), z.number()).catch({}),
	lastLesson: lastLessonSchema.nullable().catch(null),
	flagged: z.record(z.string(), z.number()).catch({}),
	questionBoxes: z.record(z.string(), leitnerEntrySchema).catch({}),
	cardBoxes: z.record(z.string(), leitnerEntrySchema).catch({}),
	examSessions: z.array(examSessionSchema).catch([]),
	studyDays: z.array(studyDaySchema).catch([]),
	dismissedNudges: z.record(z.string(), z.number()).catch({}),
});

export type IProgressState = z.infer<typeof progressSchema>;

export type IAttempt = z.infer<typeof attemptSchema>;

export type AttemptMode = IAttempt["mode"];

export type ILeitnerEntry = z.infer<typeof leitnerEntrySchema>;

export type LeitnerBox = ILeitnerEntry["box"];

export type IExamSession = z.infer<typeof examSessionSchema>;

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
