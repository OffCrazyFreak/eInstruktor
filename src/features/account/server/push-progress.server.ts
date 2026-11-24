import { and, eq, inArray, sql } from "drizzle-orm";
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
	ISyncRequest,
} from "@/features/account/utils/sync-schema";

// About 1000 bound values per statement at most, far below SQLite's limit.
const ROWS_PER_INSERT = 100;

function inChunks<T>(items: readonly T[]): T[][] {
	const chunks: T[][] = [];

	for (let start = 0; start < items.length; start += ROWS_PER_INSERT) {
		chunks.push(items.slice(start, start + ROWS_PER_INSERT));
	}

	return chunks;
}

async function insertExamSessions(
	db: AppDatabase,
	userId: string,
	sessions: readonly ISyncExamSession[],
) {
	for (const chunk of inChunks(sessions)) {
		await db
			.insert(examSession)
			.values(
				chunk.map((session) => ({
					...session,
					userId,
					startedAt: new Date(session.startedAt),
					finishedAt: new Date(session.finishedAt),
					endsAt: session.endsAt === null ? null : new Date(session.endsAt),
				})),
			)
			.onConflictDoNothing();
	}
}

// A client could name another learner's exam id, so an attempt links only to an exam this user owns.
async function ownedExamIds(
	db: AppDatabase,
	userId: string,
	attempts: readonly ISyncAttempt[],
): Promise<Set<string>> {
	const claimed = [
		...new Set(
			attempts
				.filter((attempt) => attempt.mode === "exam")
				.map((attempt) => attempt.sessionId),
		),
	];

	const owned = new Set<string>();

	for (const chunk of inChunks(claimed)) {
		const rows = await db
			.select({ id: examSession.id })
			.from(examSession)
			.where(
				and(eq(examSession.userId, userId), inArray(examSession.id, chunk)),
			);

		for (const row of rows) {
			owned.add(row.id);
		}
	}

	return owned;
}

async function insertAttempts(
	db: AppDatabase,
	userId: string,
	attempts: readonly ISyncAttempt[],
): Promise<number> {
	const examIds = await ownedExamIds(db, userId, attempts);
	let inserted = 0;

	for (const chunk of inChunks(attempts)) {
		const rows = await db
			.insert(questionAttempt)
			.values(
				chunk.map((attempt) => ({
					id: attempt.id,
					userId,
					questionId: attempt.questionId,
					sessionId: attempt.sessionId,
					examSessionId: examIds.has(attempt.sessionId)
						? attempt.sessionId
						: null,
					correct: attempt.correct,
					selectedOptionIds: attempt.selected,
					mode: attempt.mode,
					answeredAt: new Date(attempt.answeredAt),
				})),
			)
			.onConflictDoNothing()
			.returning({ id: questionAttempt.id });

		inserted += rows.length;
	}

	return inserted;
}

async function applyLessons(
	db: AppDatabase,
	userId: string,
	{ lessonsAdded, lessonsRemoved }: ISyncRequest,
) {
	for (const chunk of inChunks(Object.entries(lessonsAdded))) {
		await db
			.insert(lessonProgress)
			.values(
				chunk.map(([lessonSlug, completedAt]) => ({
					userId,
					lessonSlug,
					completedAt: new Date(completedAt),
				})),
			)
			// Two devices that finished the same lesson keep the earlier time.
			.onConflictDoUpdate({
				target: [lessonProgress.userId, lessonProgress.lessonSlug],
				set: {
					completedAt: sql`min(${lessonProgress.completedAt}, excluded.completed_at)`,
				},
			});
	}

	const removed = lessonsRemoved.filter((slug) => !(slug in lessonsAdded));

	for (const chunk of inChunks(removed)) {
		await db
			.delete(lessonProgress)
			.where(
				and(
					eq(lessonProgress.userId, userId),
					inArray(lessonProgress.lessonSlug, chunk),
				),
			);
	}
}

async function applyFlags(
	db: AppDatabase,
	userId: string,
	{ flaggedAdded, flaggedRemoved }: ISyncRequest,
) {
	for (const chunk of inChunks(Object.entries(flaggedAdded))) {
		await db
			.insert(flaggedQuestion)
			.values(
				chunk.map(([questionId, createdAt]) => ({
					userId,
					questionId,
					createdAt: new Date(createdAt),
				})),
			)
			.onConflictDoNothing();
	}

	const removed = flaggedRemoved.filter((id) => !(id in flaggedAdded));

	for (const chunk of inChunks(removed)) {
		await db
			.delete(flaggedQuestion)
			.where(
				and(
					eq(flaggedQuestion.userId, userId),
					inArray(flaggedQuestion.questionId, chunk),
				),
			);
	}
}

async function insertStudyDaysAndBadges(
	db: AppDatabase,
	userId: string,
	{ studyDays, badges }: ISyncRequest,
) {
	for (const chunk of inChunks([...new Set(studyDays)])) {
		await db
			.insert(studyDay)
			.values(chunk.map((day) => ({ userId, day })))
			.onConflictDoNothing();
	}

	for (const chunk of inChunks(Object.entries(badges))) {
		await db
			.insert(userBadge)
			.values(
				chunk.map(([badgeId, earnedAt]) => ({
					userId,
					badgeId,
					earnedAt: new Date(earnedAt),
				})),
			)
			.onConflictDoNothing();
	}
}

/** Writes the device's changes; every step is idempotent, so a retry or a second tab sending the same rows changes nothing. Returns the attempts that were new. */
export async function pushProgress(
	db: AppDatabase,
	userId: string,
	request: ISyncRequest,
): Promise<number> {
	await insertExamSessions(db, userId, request.examSessions);

	const insertedAttempts = await insertAttempts(db, userId, request.attempts);

	await applyLessons(db, userId, request);
	await applyFlags(db, userId, request);
	await insertStudyDaysAndBadges(db, userId, request);

	return insertedAttempts;
}
