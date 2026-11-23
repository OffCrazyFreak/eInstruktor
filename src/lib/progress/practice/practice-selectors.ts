import type { IAttempt } from "@/lib/progress/progress-schema";

/** A mistake stays in "Pogrešni odgovori" until the question is answered right in this many later sessions. */
export const WRONG_EXIT_SESSIONS = 2;

interface IOpenMistake {
	session: string;
	rightSessions: Set<string>;
}

// A right answer in the same session comes straight after the explanation, so it does not count towards leaving the list.
export function wrongQuestionIds(attempts: readonly IAttempt[]): string[] {
	const open = new Map<string, IOpenMistake>();

	const ordered = [...attempts].sort(
		(first, second) => first.answeredAt - second.answeredAt,
	);

	for (const attempt of ordered) {
		if (!attempt.correct) {
			open.delete(attempt.questionId);
			open.set(attempt.questionId, {
				session: attempt.sessionId,
				rightSessions: new Set(),
			});

			continue;
		}

		const mistake = open.get(attempt.questionId);

		if (!mistake || mistake.session === attempt.sessionId) {
			continue;
		}

		mistake.rightSessions.add(attempt.sessionId);

		if (mistake.rightSessions.size >= WRONG_EXIT_SESSIONS) {
			open.delete(attempt.questionId);
		}
	}

	return [...open.keys()];
}

/** Flagged question ids, the most recently flagged first. */
export function flaggedIds(
	flagged: Readonly<Record<string, number>>,
): string[] {
	return Object.entries(flagged)
		.sort(([, first], [, second]) => second - first)
		.map(([id]) => id);
}
