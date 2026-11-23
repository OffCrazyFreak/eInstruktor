import type { IAttempt } from "@/lib/progress/progress-schema";

export const RECENT_ANSWER_COUNT = 20;

export interface IQuestionGroup {
	id: string;
	questionIds: readonly string[];
}

export interface IGroupAccuracy {
	/** First attempts in this group, all time. */
	answered: number;
	/** Share correct over the most recent first attempts, or null with none yet. */
	accuracy: number | null;
}

// A repeat inside the same session comes right after the explanation, so only the first answer per session measures what the learner knows.
export function firstAttempts(attempts: readonly IAttempt[]): IAttempt[] {
	const seen = new Set<string>();

	return attempts.filter((attempt) => {
		const key = `${attempt.sessionId}:${attempt.questionId}`;

		if (seen.has(key)) {
			return false;
		}

		seen.add(key);

		return true;
	});
}

export function coverage(
	attempts: readonly IAttempt[],
	questionIds: readonly string[],
): number {
	if (questionIds.length === 0) {
		return 0;
	}

	const answered = new Set(attempts.map((attempt) => attempt.questionId));
	const seen = questionIds.filter((id) => answered.has(id)).length;

	return seen / questionIds.length;
}

export function recentAccuracy(
	attempts: readonly IAttempt[],
	questionIds: readonly string[],
	limit = RECENT_ANSWER_COUNT,
): IGroupAccuracy {
	const inGroup = new Set(questionIds);

	const relevant = firstAttempts(attempts)
		.filter((attempt) => inGroup.has(attempt.questionId))
		.sort((first, second) => first.answeredAt - second.answeredAt);

	const recent = relevant.slice(-limit);

	if (recent.length === 0) {
		return { answered: 0, accuracy: null };
	}

	const correct = recent.filter((attempt) => attempt.correct).length;

	return { answered: relevant.length, accuracy: correct / recent.length };
}

export interface IWeakGroup extends IGroupAccuracy {
	id: string;
	accuracy: number;
}

interface IWeakGroupOptions {
	minAnswers?: number;
	below?: number;
	limit?: number;
}

export function weakGroups(
	groups: readonly IQuestionGroup[],
	attempts: readonly IAttempt[],
	{ minAnswers = 5, below = 0.7, limit = 3 }: IWeakGroupOptions = {},
): IWeakGroup[] {
	return groups
		.map((group) => ({
			id: group.id,
			...recentAccuracy(attempts, group.questionIds),
		}))
		.filter(
			(group): group is IWeakGroup =>
				group.accuracy !== null &&
				group.answered >= minAnswers &&
				group.accuracy < below,
		)
		.sort((first, second) => first.accuracy - second.accuracy)
		.slice(0, limit);
}
