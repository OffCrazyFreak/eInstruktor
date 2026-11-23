import type { AreaSlug, IQuestion } from "@/content/types";
import type { ISessionAnswer } from "@/features/practice/utils/practice-session";

export interface IAreaScore {
	area: AreaSlug;
	correct: number;
	total: number;
}

export interface ISessionSummary {
	correct: number;
	total: number;
	/** In the order the areas first came up in the set. */
	byArea: IAreaScore[];
	wrongIds: string[];
}

export function sessionSummary(
	answers: readonly ISessionAnswer[],
	questions: readonly IQuestion[],
): ISessionSummary {
	const areaOf = new Map(
		questions.map((question) => [question.id, question.area]),
	);
	const byArea = new Map<AreaSlug, IAreaScore>();

	for (const answer of answers) {
		const area = areaOf.get(answer.questionId);

		if (!area) {
			continue;
		}

		const score = byArea.get(area) ?? { area, correct: 0, total: 0 };

		byArea.set(area, {
			...score,
			correct: score.correct + (answer.correct ? 1 : 0),
			total: score.total + 1,
		});
	}

	return {
		correct: answers.filter((answer) => answer.correct).length,
		total: answers.length,
		byArea: [...byArea.values()],
		wrongIds: answers
			.filter((answer) => !answer.correct)
			.map((answer) => answer.questionId),
	};
}
