import { eq } from "drizzle-orm";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { examSession, questionAttempt } from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import {
	MAX_ATTEMPT_ROWS_PER_USER,
	pushProgress,
} from "@/features/account/server/push-progress.server";
import type { ISyncRequest } from "@/features/account/utils/sync-schema";
import {
	createTempDatabase,
	type ITempDatabase,
	insertTestUser,
} from "@/lib/testing/temp-database";
import { testAttempt } from "@/lib/testing/test-attempts";

const REAL_QUESTION = course.questions[0]?.id ?? "";
const REAL_LESSON = course.lessons[0]?.slug ?? "";

function request(overrides: Partial<ISyncRequest> = {}): ISyncRequest {
	return {
		full: false,
		attempts: [],
		examSessions: [],
		lessonsAdded: {},
		lessonsRemoved: [],
		flaggedAdded: {},
		flaggedRemoved: [],
		studyDays: [],
		badges: {},
		profile: { mode: "set", values: {} },
		...overrides,
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

describe("pushProgress limits", () => {
	it("keeps only answers and flags for questions that are in the course", async () => {
		const inserted = await pushProgress(
			db,
			"u1",
			request({
				attempts: [
					testAttempt({ id: "real", questionId: REAL_QUESTION }),
					testAttempt({ id: "fake", questionId: "not-a-question" }),
				],
				flaggedAdded: { [REAL_QUESTION]: 1, "not-a-question": 1 },
				lessonsAdded: { [REAL_LESSON]: 1, "not-a-lesson": 1 },
			}),
		);

		const rows = await db.select().from(questionAttempt);

		expect(inserted).toBe(1);
		expect(rows.map((row) => row.id)).toEqual(["real"]);
	});

	it("stores two learners' attempts that share a client id", async () => {
		const attempt = testAttempt({ id: "same-id", questionId: REAL_QUESTION });

		await pushProgress(db, "u1", request({ attempts: [attempt] }));
		await pushProgress(db, "u2", request({ attempts: [attempt] }));

		const owners = (
			await db
				.select({ userId: questionAttempt.userId })
				.from(questionAttempt)
				.where(eq(questionAttempt.id, "same-id"))
		)
			.map((row) => row.userId)
			.sort();

		expect(owners).toEqual(["u1", "u2"]);
	});

	it("stores two learners' exams that share a client id", async () => {
		const exam = {
			id: "exam-1",
			level: "B" as const,
			seed: 1,
			questionIds: [REAL_QUESTION],
			startedAt: 1_000,
			finishedAt: 2_000,
			endsAt: null,
			score: 1,
			passed: false,
			perSubject: {},
			answers: {},
			graded: {},
		};

		await pushProgress(db, "u1", request({ examSessions: [exam] }));
		await pushProgress(db, "u2", request({ examSessions: [exam] }));

		const rows = await db
			.select({ userId: examSession.userId })
			.from(examSession)
			.where(eq(examSession.id, "exam-1"));

		expect(rows).toHaveLength(2);
	});

	it("stops adding attempts once a learner holds the maximum", async () => {
		const filler = Array.from({ length: 200 }, (_, index) => ({
			id: `fill-${index}`,
			userId: "u1",
			questionId: REAL_QUESTION,
			sessionId: "s",
			examSessionId: null,
			correct: true,
			selectedOptionIds: ["a"],
			mode: "practice" as const,
			answeredAt: new Date(1_000 + index),
		}));

		for (let batch = 0; batch < MAX_ATTEMPT_ROWS_PER_USER / 200; batch++) {
			await db.insert(questionAttempt).values(
				filler.map((row) => ({
					...row,
					id: `fill-${batch}-${row.id}`,
				})),
			);
		}

		const inserted = await pushProgress(
			db,
			"u1",
			request({
				attempts: [testAttempt({ id: "over", questionId: REAL_QUESTION })],
			}),
		);

		expect(inserted).toBe(0);
	}, 60_000);
});
