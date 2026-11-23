import { describe, expect, it } from "vitest";
import {
	flaggedIds,
	wrongQuestionIds,
} from "@/lib/progress/practice/practice-selectors";
import { testAttempt } from "@/lib/progress/test-attempts";

describe("wrongQuestionIds", () => {
	it("lists a question whose latest answer is wrong", () => {
		const attempts = [
			testAttempt({ questionId: "q-1", correct: true, sessionId: "s1" }),
			testAttempt({ questionId: "q-1", correct: false, sessionId: "s2" }),
			testAttempt({ questionId: "q-2", correct: true, sessionId: "s2" }),
		];

		expect(wrongQuestionIds(attempts)).toEqual(["q-1"]);
	});

	it("keeps it after one right answer and drops it after right answers in two later sessions", () => {
		const wrong = testAttempt({ correct: false, sessionId: "s1" });
		const once = testAttempt({ correct: true, sessionId: "s2" });
		const twice = testAttempt({ correct: true, sessionId: "s3" });

		expect(wrongQuestionIds([wrong, once])).toEqual(["q-1"]);
		expect(wrongQuestionIds([wrong, once, twice])).toEqual([]);
	});

	it("does not count right answers in the session of the mistake or twice in one session", () => {
		const attempts = [
			testAttempt({ correct: false, sessionId: "s1" }),
			testAttempt({ correct: true, sessionId: "s1" }),
			testAttempt({ correct: true, sessionId: "s2" }),
			testAttempt({ correct: true, sessionId: "s2" }),
		];

		expect(wrongQuestionIds(attempts)).toEqual(["q-1"]);
	});

	it("starts the count again after a new mistake", () => {
		const attempts = [
			testAttempt({ correct: false, sessionId: "s1" }),
			testAttempt({ correct: true, sessionId: "s2" }),
			testAttempt({ correct: false, sessionId: "s3" }),
			testAttempt({ correct: true, sessionId: "s4" }),
		];

		expect(wrongQuestionIds(attempts)).toEqual(["q-1"]);
	});

	it("reads attempts in time order whatever order they are stored in", () => {
		const wrong = testAttempt({ correct: false, sessionId: "s1" });
		const first = testAttempt({ correct: true, sessionId: "s2" });
		const second = testAttempt({ correct: true, sessionId: "s3" });

		expect(wrongQuestionIds([second, wrong, first])).toEqual([]);
	});
});

describe("flaggedIds", () => {
	it("puts the newest flag first", () => {
		expect(flaggedIds({ "q-1": 10, "q-2": 30, "q-3": 20 })).toEqual([
			"q-2",
			"q-3",
			"q-1",
		]);
	});
});
