import { describe, expect, it } from "vitest";
import {
	isCorrectSelection,
	optionFeedback,
} from "@/components/custom/question/grade-answer";
import type { IQuestion } from "@/content/types";

const multi: IQuestion = {
	id: "test-001",
	area: "propisi",
	level: "common",
	type: "multi",
	prompt: "Što ponijeti?",
	options: [
		{ id: "a", text: "Osobnu", correct: true },
		{ id: "b", text: "Fotografije", correct: true },
		{ id: "c", text: "Kišobran", correct: false },
	],
	explanation: "Osobna i fotografije.",
	difficulty: 1,
	source: "original",
};

describe("isCorrectSelection", () => {
	it("needs exactly the correct options", () => {
		expect(isCorrectSelection(multi, ["b", "a"])).toBe(true);
		expect(isCorrectSelection(multi, ["a"])).toBe(false);
		expect(isCorrectSelection(multi, ["a", "b", "c"])).toBe(false);
	});
});

describe("optionFeedback", () => {
	it("tells chosen, missed and wrong options apart", () => {
		const [osobna, fotografije, kisobran] = multi.options;

		expect(osobna && optionFeedback(osobna, ["a", "c"])).toBe("correct-chosen");
		expect(fotografije && optionFeedback(fotografije, ["a", "c"])).toBe(
			"correct-missed",
		);
		expect(kisobran && optionFeedback(kisobran, ["a", "c"])).toBe(
			"wrong-chosen",
		);
		expect(kisobran && optionFeedback(kisobran, ["a"])).toBe("neutral");
	});
});
