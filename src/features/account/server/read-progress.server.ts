import { and, desc, eq, isNotNull } from "drizzle-orm";
import {
	examSession,
	flaggedQuestion,
	lessonProgress,
	questionAttempt,
	studyDay,
	userBadge,
} from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import type {
	ISyncAttempt,
	ISyncExamSession,
	ISyncResponse,
} from "@/features/account/utils/sync-schema";
import { MAX_STORED_EXAM_SESSIONS } from "@/lib/progress/exam-session-actions";
import { MAX_STORED_ATTEMPTS } from "@/lib/progress/progress-actions";

type IAccountSets = Pick<
	ISyncResponse,
	"lessonsDone" | "flagged" | "studyDays" | "badges"
>;

export async function readProgressSets(
	db: AppDatabase,
	userId: string,
): Promise<IAccountSets> {
	const [lessons, flags, days, badges] = await Promise.all([
		db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)),
		db.select().from(flaggedQuestion).where(eq(flaggedQuestion.userId, userId)),
		db.select().from(studyDay).where(eq(studyDay.userId, userId)),
		db.select().from(userBadge).where(eq(userBadge.userId, userId)),
	]);

	return {
		lessonsDone: Object.fromEntries(
			lessons.map((row) => [row.lessonSlug, row.completedAt.getTime()]),
		),
		flagged: Object.fromEntries(
			flags.map((row) => [row.questionId, row.createdAt.getTime()]),
		),
		studyDays: days.map((row) => row.day).sort(),
		badges: Object.fromEntries(
			badges.map((row) => [row.badgeId, row.earnedAt.getTime()]),
		),
	};
}

/** The newest attempts, as many as the browser store keeps, oldest first like the store. */
export async function readAttempts(
	db: AppDatabase,
	userId: string,
): Promise<ISyncAttempt[]> {
	const rows = await db
		.select()
		.from(questionAttempt)
		.where(eq(questionAttempt.userId, userId))
		.orderBy(desc(questionAttempt.answeredAt))
		.limit(MAX_STORED_ATTEMPTS);

	return rows.reverse().map((row) => ({
		id: row.id,
		questionId: row.questionId,
		correct: row.correct,
		selected: row.selectedOptionIds,
		mode: row.mode,
		sessionId: row.sessionId,
		answeredAt: row.answeredAt.getTime(),
	}));
}

export async function readExamSessions(
	db: AppDatabase,
	userId: string,
): Promise<ISyncExamSession[]> {
	const rows = await db
		.select()
		.from(examSession)
		.where(
			and(eq(examSession.userId, userId), isNotNull(examSession.finishedAt)),
		)
		.orderBy(desc(examSession.startedAt))
		.limit(MAX_STORED_EXAM_SESSIONS);

	return rows.reverse().map((row) => ({
		id: row.id,
		level: row.level,
		seed: row.seed,
		questionIds: row.questionIds,
		startedAt: row.startedAt.getTime(),
		finishedAt: row.finishedAt?.getTime() ?? row.startedAt.getTime(),
		endsAt: row.endsAt?.getTime() ?? null,
		score: row.score ?? 0,
		passed: row.passed ?? false,
		perSubject: row.perSubject ?? {},
		answers: row.answers ?? {},
		graded: row.graded ?? {},
	}));
}
