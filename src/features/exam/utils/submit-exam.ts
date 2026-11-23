import type { ICourse } from "@/content/course-types";
import { examBlocks } from "@/features/exam/utils/exam-blocks";
import { scoreExam } from "@/features/exam/utils/score-exam";
import {
	finishExamSession,
	type IExamFinish,
} from "@/lib/progress/exam-session-actions";
import { findExamSession } from "@/lib/progress/exam-session-selectors";
import type { IProgressState } from "@/lib/progress/progress-schema";

/** Scores a running exam from its stored answers and hands it in; the runner and the start screen both use it. */
export function submitExam(
	course: ICourse,
	progress: IProgressState,
	sessionId: string,
	finish: IExamFinish,
): IProgressState {
	const session = findExamSession(progress, sessionId);

	if (!session) {
		return progress;
	}

	const score = scoreExam(
		course,
		session.level,
		examBlocks(course, session.level, session.questionIds),
		session.answers ?? {},
	);

	return finishExamSession(progress, sessionId, score, finish);
}

/** True when the exam has a time limit that has already run out. */
export function isExpired(
	session: { endsAt?: number | null },
	now: number,
): boolean {
	return session.endsAt != null && session.endsAt <= now;
}

// An exam whose time ran out while the learner was away is a result, so it is handed in at its end time instead of being dropped.
export function submitIfExpired(
	course: ICourse,
	progress: IProgressState,
	sessionId: string,
	{ now, makeId }: { now: number; makeId: () => string },
): IProgressState {
	const session = findExamSession(progress, sessionId);

	if (!session || session.finishedAt !== null || !isExpired(session, now)) {
		return progress;
	}

	return submitExam(course, progress, sessionId, {
		finishedAt: session.endsAt ?? now,
		answeredAt: now,
		makeId,
	});
}
