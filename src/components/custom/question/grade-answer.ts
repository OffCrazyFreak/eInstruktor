import type { IAnswerOption, IQuestion } from "@/content/types";

export type OptionFeedback =
	| "correct-chosen"
	| "correct-missed"
	| "wrong-chosen"
	| "neutral";

export function isCorrectSelection(
	question: IQuestion,
	selected: readonly string[],
): boolean {
	const chosen = new Set(selected);

	return question.options.every(
		(option) => option.correct === chosen.has(option.id),
	);
}

export function optionFeedback(
	option: IAnswerOption,
	selected: readonly string[],
): OptionFeedback {
	const chosen = selected.includes(option.id);

	if (option.correct) {
		return chosen ? "correct-chosen" : "correct-missed";
	}

	return chosen ? "wrong-chosen" : "neutral";
}
