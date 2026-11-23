import { describe, expect, it } from "vitest";
import {
	currentQuestionId,
	practiceSessionReducer as reduce,
	startSession,
} from "@/features/practice/utils/practice-session";

describe("practiceSessionReducer", () => {
	it("checks an answer, shows it, then moves on with Dalje", () => {
		let state = startSession(["q-1", "q-2"], false);

		state = reduce(state, { type: "select", selected: ["a"] });
		state = reduce(state, { type: "check", correct: true });

		expect(state.phase).toBe("checked");
		expect(currentQuestionId(state)).toBe("q-1");
		expect(state.answers).toEqual([
			{ questionId: "q-1", selected: ["a"], correct: true },
		]);

		state = reduce(state, { type: "next" });

		expect(state.phase).toBe("answering");
		expect(state.selected).toEqual([]);
		expect(currentQuestionId(state)).toBe("q-2");
	});

	it("ignores Provjeri with nothing picked and a second Provjeri on the same question", () => {
		let state = startSession(["q-1"], false);

		expect(reduce(state, { type: "check", correct: true })).toBe(state);

		state = reduce(state, { type: "select", selected: ["b"] });
		state = reduce(state, { type: "check", correct: false });

		expect(reduce(state, { type: "check", correct: true })).toBe(state);
		expect(reduce(state, { type: "select", selected: ["a"] })).toBe(state);
	});

	it("finishes after the last question", () => {
		let state = startSession(["q-1"], false);

		state = reduce(state, { type: "select", selected: ["a"] });
		state = reduce(state, { type: "check", correct: false });
		state = reduce(state, { type: "next" });

		expect(state.phase).toBe("finished");
		expect(currentQuestionId(state)).toBeUndefined();
	});

	it("moves straight on when feedback waits for the end", () => {
		let state = startSession(["q-1", "q-2"], true);

		state = reduce(state, { type: "select", selected: ["a"] });
		state = reduce(state, { type: "check", correct: false });

		expect(state.phase).toBe("answering");
		expect(currentQuestionId(state)).toBe("q-2");

		state = reduce(state, { type: "select", selected: ["b"] });
		state = reduce(state, { type: "check", correct: true });

		expect(state.phase).toBe("finished");
		expect(state.answers.map((answer) => answer.correct)).toEqual([
			false,
			true,
		]);
	});

	it("starts finished when the mode has no questions", () => {
		expect(startSession([], false).phase).toBe("finished");
	});
});
