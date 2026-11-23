import type {
	IExamSession,
	IProgressState,
} from "@/lib/progress/progress-schema";

export function findExamSession(
	progress: IProgressState,
	sessionId: string,
): IExamSession | undefined {
	return progress.examSessions.find((session) => session.id === sessionId);
}

/** The exam the learner can go back to, if one is still running. */
export function activeExamSession(
	progress: IProgressState,
): IExamSession | undefined {
	return [...progress.examSessions]
		.reverse()
		.find((session) => session.finishedAt === null);
}

/** Newest first. */
export function finishedExamSessions(progress: IProgressState): IExamSession[] {
	return progress.examSessions
		.filter((session) => session.finishedAt !== null)
		.sort(
			(first, second) => (second.finishedAt ?? 0) - (first.finishedAt ?? 0),
		);
}

export function isAnswered(session: IExamSession, questionId: string): boolean {
	return (session.answers?.[questionId]?.length ?? 0) > 0;
}

export function isFlagged(session: IExamSession, questionId: string): boolean {
	return session.flaggedIds?.includes(questionId) ?? false;
}

export function answeredCount(session: IExamSession): number {
	return session.questionIds.filter((id) => isAnswered(session, id)).length;
}

/** True when the clock ran out and the exam was handed in by itself. */
export function endedByClock(session: IExamSession): boolean {
	return (
		session.finishedAt !== null &&
		session.endsAt != null &&
		session.finishedAt >= session.endsAt
	);
}
