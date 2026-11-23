import type { ExamLevel } from "@/content/course-types";
import { recordAnswer } from "@/lib/progress/progress-actions";
import type {
	IExamSession,
	IExamSubjectResult,
	IProgressState,
} from "@/lib/progress/progress-schema";

// About 3 KB each; enough history for the trend while localStorage stays small.
export const MAX_STORED_EXAM_SESSIONS = 100;

export interface IExamStart {
	id: string;
	level: ExamLevel;
	seed: number;
	questionIds: string[];
	startedAt: number;
	endsAt: number | null;
}

export interface IExamOutcome {
	score: number;
	passed: boolean;
	perSubject: Record<string, IExamSubjectResult>;
	/** Each answered question's grade, recorded as an exam attempt. */
	graded: { questionId: string; correct: boolean }[];
}

export interface IExamFinish {
	finishedAt: number;
	/** Makes the client id of each recorded attempt. */
	makeId: () => string;
}

function updateSession(
	progress: IProgressState,
	sessionId: string,
	change: (session: IExamSession) => IExamSession,
): IProgressState {
	const session = progress.examSessions.find((item) => item.id === sessionId);

	// A finished exam is a record; late writes from a second tab or a last tick of the clock must not change it.
	if (!session || session.finishedAt !== null) {
		return progress;
	}

	return {
		...progress,
		examSessions: progress.examSessions.map((item) =>
			item.id === sessionId ? change(item) : item,
		),
	};
}

// Only one exam runs at a time, so starting a new one drops an unfinished one.
export function startExamSession(
	progress: IProgressState,
	start: IExamStart,
): IProgressState {
	const kept = progress.examSessions.filter(
		(session) => session.finishedAt !== null,
	);

	const session: IExamSession = {
		...start,
		finishedAt: null,
		score: null,
		passed: null,
		answers: {},
		flaggedIds: [],
	};

	return {
		...progress,
		examSessions: [...kept, session].slice(-MAX_STORED_EXAM_SESSIONS),
	};
}

export function setExamAnswer(
	progress: IProgressState,
	sessionId: string,
	questionId: string,
	selected: string[],
): IProgressState {
	return updateSession(progress, sessionId, (session) => ({
		...session,
		answers: { ...session.answers, [questionId]: selected },
	}));
}

export function toggleExamFlag(
	progress: IProgressState,
	sessionId: string,
	questionId: string,
): IProgressState {
	return updateSession(progress, sessionId, (session) => {
		const flagged = session.flaggedIds ?? [];

		return {
			...session,
			flaggedIds: flagged.includes(questionId)
				? flagged.filter((id) => id !== questionId)
				: [...flagged, questionId],
		};
	});
}

export function discardExamSession(
	progress: IProgressState,
	sessionId: string,
): IProgressState {
	return {
		...progress,
		examSessions: progress.examSessions.filter(
			(session) => session.id !== sessionId || session.finishedAt !== null,
		),
	};
}

// Answers become attempts only now, because the exam gives no feedback while it runs and a changed answer is not a second try.
export function finishExamSession(
	progress: IProgressState,
	sessionId: string,
	outcome: IExamOutcome,
	{ finishedAt, makeId }: IExamFinish,
): IProgressState {
	const finished = updateSession(progress, sessionId, (session) => ({
		...session,
		finishedAt,
		score: outcome.score,
		passed: outcome.passed,
		perSubject: outcome.perSubject,
	}));

	if (finished === progress) {
		return progress;
	}

	const answers =
		finished.examSessions.find((session) => session.id === sessionId)
			?.answers ?? {};

	return outcome.graded.reduce(
		(current, { questionId, correct }) =>
			recordAnswer(current, {
				id: makeId(),
				questionId,
				correct,
				selected: answers[questionId] ?? [],
				mode: "exam",
				sessionId,
				answeredAt: finishedAt,
			}),
		finished,
	);
}
