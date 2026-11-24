import { z } from "zod";
import { MAX_STORED_EXAM_SESSIONS } from "@/lib/progress/exam-session-actions";
import { MAX_STORED_ATTEMPTS } from "@/lib/progress/progress-actions";

// Limits sit a little above what the browser store keeps, so an honest client never hits them and a bad one cannot flood the database.
export const SYNC_LIMITS = {
	attempts: MAX_STORED_ATTEMPTS + 1000,
	examSessions: MAX_STORED_EXAM_SESSIONS + 50,
	questionsPerExam: 100,
	optionsPerAnswer: 10,
	lessons: 500,
	flagged: 2000,
	studyDays: 1000,
	badges: 50,
} as const;

const idSchema = z.string().min(1).max(120);

const timeSchema = z.number().int().nonnegative().max(8.64e15);

const daySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const levelSchema = z.enum(["A", "B"]);

function limitedRecord<T extends z.ZodType>(value: T, max: number) {
	return z
		.record(idSchema, value)
		.refine((record) => Object.keys(record).length <= max, {
			message: `At most ${max} entries`,
		});
}

const selectedSchema = z.array(idSchema).max(SYNC_LIMITS.optionsPerAnswer);

export const syncAttemptSchema = z.object({
	id: idSchema,
	questionId: idSchema,
	correct: z.boolean(),
	selected: selectedSchema,
	mode: z.enum(["practice", "exam", "check"]),
	sessionId: idSchema,
	answeredAt: timeSchema,
});

const subjectResultSchema = z.object({
	correct: z.number().int().nonnegative().max(1000),
	total: z.number().int().nonnegative().max(1000),
	passed: z.boolean(),
});

/** Only finished exams sync; a running exam belongs to the device it runs on. */
export const syncExamSessionSchema = z.object({
	id: idSchema,
	level: levelSchema,
	seed: z.number().int(),
	questionIds: z.array(idSchema).max(SYNC_LIMITS.questionsPerExam),
	startedAt: timeSchema,
	finishedAt: timeSchema,
	endsAt: timeSchema.nullable(),
	score: z.number().int().nonnegative().max(SYNC_LIMITS.questionsPerExam),
	passed: z.boolean(),
	perSubject: limitedRecord(subjectResultSchema, 20),
	answers: limitedRecord(selectedSchema, SYNC_LIMITS.questionsPerExam),
	graded: limitedRecord(z.boolean(), SYNC_LIMITS.questionsPerExam),
});

export const syncProfileSchema = z.object({
	targetLevel: levelSchema.nullable(),
	examDate: daySchema.nullable(),
	passedAt: timeSchema.nullable(),
});

export const syncRequestSchema = z.object({
	/** Also send back the account's attempts and exams; the first sync of a visit asks for them. */
	full: z.boolean(),

	attempts: z.array(syncAttemptSchema).max(SYNC_LIMITS.attempts),
	examSessions: z.array(syncExamSessionSchema).max(SYNC_LIMITS.examSessions),

	lessonsAdded: limitedRecord(timeSchema, SYNC_LIMITS.lessons),
	lessonsRemoved: z.array(idSchema).max(SYNC_LIMITS.lessons),
	flaggedAdded: limitedRecord(timeSchema, SYNC_LIMITS.flagged),
	flaggedRemoved: z.array(idSchema).max(SYNC_LIMITS.flagged),
	studyDays: z.array(daySchema).max(SYNC_LIMITS.studyDays),
	badges: limitedRecord(timeSchema, SYNC_LIMITS.badges),

	/** "fill" on the first sync after sign-in (the account wins, local fills its blanks); "set" for later edits, with only the changed fields. */
	profile: z.object({
		mode: z.enum(["fill", "set"]),
		values: syncProfileSchema.partial(),
	}),
});

export type ISyncRequest = z.infer<typeof syncRequestSchema>;

export type ISyncAttempt = z.infer<typeof syncAttemptSchema>;

export type ISyncExamSession = z.infer<typeof syncExamSessionSchema>;

export type ISyncProfile = z.infer<typeof syncProfileSchema>;

export interface ISyncResponse {
	profile: ISyncProfile;
	lessonsDone: Record<string, number>;
	flagged: Record<string, number>;
	studyDays: string[];
	badges: Record<string, number>;
	/** Present only for a full sync: the newest attempts and finished exams on the account. */
	attempts: ISyncAttempt[] | null;
	examSessions: ISyncExamSession[] | null;
	/** How many attempts were new to the account, for the first "Prenijeli smo" toast. */
	insertedAttempts: number;
}
