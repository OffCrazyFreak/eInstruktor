import { describe, expect, it } from "vitest";
import {
	setExamAnswer,
	startExamSession,
	toggleExamFlag,
} from "@/lib/progress/exam-session-actions";
import {
	activeExamSession,
	answeredCount,
	endedByClock,
	finishedExamSessions,
	isAnswered,
	isFlagged,
} from "@/lib/progress/exam-session-selectors";
import {
	EMPTY_PROGRESS,
	type IExamSession,
} from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { memoryStorage } from "@/lib/testing/memory-storage";

const NOON = Date.parse("2026-11-20T11:00:00Z");

function session(overrides: Partial<IExamSession>): IExamSession {
	return {
		id: "exam",
		level: "B",
		seed: 1,
		questionIds: ["q-1", "q-2"],
		startedAt: NOON,
		finishedAt: null,
		score: null,
		passed: null,
		...overrides,
	};
}

describe("exam session selectors", () => {
	it("finds the running exam and lists finished ones newest first", () => {
		const progress = {
			...EMPTY_PROGRESS,
			examSessions: [
				session({ id: "old", finishedAt: NOON + 1, score: 30 }),
				session({ id: "new", finishedAt: NOON + 2, score: 35 }),
				session({ id: "running" }),
			],
		};

		expect(activeExamSession(progress)?.id).toBe("running");
		expect(finishedExamSessions(progress).map((item) => item.id)).toEqual([
			"new",
			"old",
		]);
		expect(activeExamSession(EMPTY_PROGRESS)).toBeUndefined();
	});

	it("tells answered and flagged questions apart", () => {
		const exam = session({
			answers: { "q-1": ["a"], "q-2": [] },
			flaggedIds: ["q-2"],
		});

		expect(isAnswered(exam, "q-1")).toBe(true);
		expect(isAnswered(exam, "q-2")).toBe(false);
		expect(isFlagged(exam, "q-2")).toBe(true);
		expect(answeredCount(exam)).toBe(1);
		expect(answeredCount(session({}))).toBe(0);
	});

	it("knows when the clock handed the exam in", () => {
		const endsAt = NOON + 1000;

		expect(endedByClock(session({ endsAt, finishedAt: endsAt }))).toBe(true);
		expect(endedByClock(session({ endsAt, finishedAt: endsAt - 1 }))).toBe(
			false,
		);
		expect(endedByClock(session({ endsAt: null, finishedAt: NOON }))).toBe(
			false,
		);
	});
});

describe("resuming after a reload", () => {
	it("brings back the answers, flags and the same end time from storage", () => {
		const endsAt = NOON + 45 * 60_000;
		const storage = memoryStorage();
		const store = createProgressStore(() => storage);

		store.update((progress) =>
			startExamSession(progress, {
				id: "exam-1",
				level: "B",
				seed: 7,
				questionIds: ["q-1", "q-2"],
				startedAt: NOON,
				endsAt,
			}),
		);
		store.update((progress) => setExamAnswer(progress, "exam-1", "q-1", ["b"]));
		store.update((progress) => toggleExamFlag(progress, "exam-1", "q-2"));

		const reloaded = createProgressStore(() => storage);
		const resumed = activeExamSession(reloaded.getSnapshot());

		expect(resumed).toMatchObject({
			id: "exam-1",
			seed: 7,
			questionIds: ["q-1", "q-2"],
			endsAt,
			answers: { "q-1": ["b"] },
			flaggedIds: ["q-2"],
		});
	});

	it("still reads a session saved before the exam fields existed", () => {
		const storage = memoryStorage({
			[PROGRESS_STORAGE_KEY]: JSON.stringify({
				examSessions: [session({ id: "legacy" })],
			}),
		});
		const store = createProgressStore(() => storage);

		expect(activeExamSession(store.getSnapshot())?.id).toBe("legacy");
	});
});
