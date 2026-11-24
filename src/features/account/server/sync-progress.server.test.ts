import { eq } from "drizzle-orm";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { examSession, questionAttempt } from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import { mergeProfileValues } from "@/features/account/server/merge-profile.server";
import { syncProgressForUser } from "@/features/account/server/sync-progress.server";
import {
	type ISyncExamSession,
	type ISyncRequest,
	SYNC_LIMITS,
	syncRequestSchema,
} from "@/features/account/utils/sync-schema";
import { testAttempt } from "@/lib/progress/test-attempts";
import {
	createTempDatabase,
	type ITempDatabase,
	insertTestUser,
} from "@/lib/testing/temp-database";

function request(overrides: Partial<ISyncRequest> = {}): ISyncRequest {
	return {
		full: true,
		attempts: [],
		examSessions: [],
		lessonsAdded: {},
		lessonsRemoved: [],
		flaggedAdded: {},
		flaggedRemoved: [],
		studyDays: [],
		badges: {},
		profile: { mode: "fill", values: {} },
		...overrides,
	};
}

function finishedExam(id: string): ISyncExamSession {
	return {
		id,
		level: "B",
		seed: 7,
		questionIds: ["q-1", "q-2"],
		startedAt: 1_000,
		finishedAt: 2_000,
		endsAt: null,
		score: 1,
		passed: false,
		perSubject: { motoristika: { correct: 1, total: 2, passed: false } },
		answers: { "q-1": ["a"], "q-2": ["b"] },
		graded: { "q-1": true, "q-2": false },
	};
}

let temp: ITempDatabase;
let db: AppDatabase;

beforeEach(async () => {
	temp = await createTempDatabase();
	db = temp.db;
	await insertTestUser(db, "u1");
	await insertTestUser(db, "u2");
});

afterEach(() => temp.cleanup());

describe("syncProgressForUser", () => {
	it("stores attempts once, however often the same rows arrive", async () => {
		const attempts = [testAttempt({ id: "a1" }), testAttempt({ id: "a2" })];

		const first = await syncProgressForUser(db, "u1", request({ attempts }));
		const again = await syncProgressForUser(db, "u1", request({ attempts }));

		expect(first.insertedAttempts).toBe(2);
		expect(again.insertedAttempts).toBe(0);
		expect(again.attempts?.map((attempt) => attempt.id)).toEqual(["a1", "a2"]);
	});

	it("survives a double fire from two tabs at the same time", async () => {
		const body = request({
			attempts: [testAttempt({ id: "a1" })],
			lessonsAdded: { "pomorska-karta": 5 },
			studyDays: ["2026-11-20"],
			badges: { "uvod-gotov": 5 },
		});

		const [first, second] = await Promise.all([
			syncProgressForUser(db, "u1", body),
			syncProgressForUser(db, "u1", body),
		]);

		expect(first.insertedAttempts + second.insertedAttempts).toBe(1);
		expect(second.lessonsDone).toEqual({ "pomorska-karta": 5 });
		expect(second.studyDays).toEqual(["2026-11-20"]);
	});

	it("round-trips an attempt with its session and exact time", async () => {
		const attempt = testAttempt({ id: "a1", sessionId: "set-9" });

		const result = await syncProgressForUser(
			db,
			"u1",
			request({ attempts: [attempt] }),
		);

		expect(result.attempts).toEqual([attempt]);
	});

	it("never shows one learner's rows to another", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({
				attempts: [testAttempt({ id: "a1" })],
				flaggedAdded: { "q-1": 1 },
			}),
		);

		const other = await syncProgressForUser(db, "u2", request());

		expect(other.attempts).toEqual([]);
		expect(other.flagged).toEqual({});
	});

	it("links exam answers only to an exam the same user owns", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({ examSessions: [finishedExam("exam-1")] }),
		);

		const own = testAttempt({ id: "a1", mode: "exam", sessionId: "exam-1" });

		await syncProgressForUser(db, "u1", request({ attempts: [own] }));

		const stolen = testAttempt({ id: "a2", mode: "exam", sessionId: "exam-1" });

		await syncProgressForUser(db, "u2", request({ attempts: [stolen] }));

		const rows = await db.select().from(questionAttempt);
		const links = Object.fromEntries(
			rows.map((row) => [row.id, row.examSessionId]),
		);

		expect(links).toEqual({ a1: "exam-1", a2: null });
	});

	it("keeps the first copy of a finished exam and returns it whole", async () => {
		const exam = finishedExam("exam-1");

		await syncProgressForUser(db, "u1", request({ examSessions: [exam] }));

		const result = await syncProgressForUser(
			db,
			"u1",
			request({ examSessions: [{ ...exam, score: 2, passed: true }] }),
		);

		expect(result.examSessions).toEqual([exam]);
	});

	it("does not let another user overwrite an exam with the same id", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({ examSessions: [finishedExam("exam-1")] }),
		);
		await syncProgressForUser(
			db,
			"u2",
			request({ examSessions: [{ ...finishedExam("exam-1"), score: 2 }] }),
		);

		const [row] = await db
			.select()
			.from(examSession)
			.where(eq(examSession.id, "exam-1"));

		expect(row?.userId).toBe("u1");
		expect(row?.score).toBe(1);
	});

	it("keeps the earlier finish time when two devices finished a lesson", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({ lessonsAdded: { "pomorska-karta": 500 } }),
		);

		const result = await syncProgressForUser(
			db,
			"u1",
			request({ lessonsAdded: { "pomorska-karta": 200 } }),
		);

		expect(result.lessonsDone).toEqual({ "pomorska-karta": 200 });
	});

	it("removes lessons and flags the learner took back", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({
				lessonsAdded: { a: 1, b: 1 },
				flaggedAdded: { "q-1": 1, "q-2": 1 },
			}),
		);

		const result = await syncProgressForUser(
			db,
			"u1",
			request({ lessonsRemoved: ["a"], flaggedRemoved: ["q-2"] }),
		);

		expect(result.lessonsDone).toEqual({ b: 1 });
		expect(result.flagged).toEqual({ "q-1": 1 });
	});

	it("sends attempts and exams back only on a full sync", async () => {
		const result = await syncProgressForUser(
			db,
			"u1",
			request({ full: false, attempts: [testAttempt({ id: "a1" })] }),
		);

		expect(result.attempts).toBeNull();
		expect(result.examSessions).toBeNull();
		expect(result.insertedAttempts).toBe(1);
	});
});

describe("profile merge", () => {
	it("keeps the account's values on the first sync and fills its blanks", async () => {
		await syncProgressForUser(
			db,
			"u1",
			request({
				profile: { mode: "set", values: { targetLevel: "B", examDate: null } },
			}),
		);

		const result = await syncProgressForUser(
			db,
			"u1",
			request({
				profile: {
					mode: "fill",
					values: { targetLevel: "A", examDate: "2026-12-01", passedAt: null },
				},
			}),
		);

		expect(result.profile).toEqual({
			targetLevel: "B",
			examDate: "2026-12-01",
			passedAt: null,
		});
	});

	it("applies a later change the learner made, clearing included", () => {
		expect(
			mergeProfileValues(
				{ targetLevel: "B", examDate: "2026-12-01", passedAt: null },
				{ mode: "set", values: { examDate: null, passedAt: 9 } },
			),
		).toEqual({ targetLevel: "B", examDate: null, passedAt: 9 });
	});
});

describe("payload limits", () => {
	it("accepts what the browser store can hold", () => {
		const attempts = Array.from({ length: 4000 }, () => testAttempt());

		expect(syncRequestSchema.safeParse(request({ attempts })).success).toBe(
			true,
		);
	});

	it("rejects more attempts than any browser keeps", () => {
		const attempts = Array.from({ length: SYNC_LIMITS.attempts + 1 }, () =>
			testAttempt(),
		);

		expect(syncRequestSchema.safeParse(request({ attempts })).success).toBe(
			false,
		);
	});

	it("rejects oversized records and long ids", () => {
		const flaggedAdded = Object.fromEntries(
			Array.from({ length: SYNC_LIMITS.flagged + 1 }, (_, index) => [
				`q-${index}`,
				1,
			]),
		);
		const longId = testAttempt({ questionId: "q".repeat(500) });

		expect(syncRequestSchema.safeParse(request({ flaggedAdded })).success).toBe(
			false,
		);
		expect(
			syncRequestSchema.safeParse(request({ attempts: [longId] })).success,
		).toBe(false);
	});
});
