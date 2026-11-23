import { toStudyDay } from "@/lib/dates/study-day";
import type { IProgressState } from "@/lib/progress/progress-schema";

/** A study day counts with this many answered questions, or with one finished lesson. */
export const DAILY_QUESTION_GOAL = 5;

export interface ITodayActivity {
	questions: number;
	lessons: number;
	goalMet: boolean;
}

// Zagreb is at most 2 hours ahead of UTC, so nothing before 22:00 UTC the evening before can fall on this day.
const ZAGREB_DAY_START_OFFSET = 2 * 60 * 60 * 1000;

export function todayActivity(
	progress: Pick<IProgressState, "attempts" | "lessonsDone">,
	today: string,
): ITodayActivity {
	const earliest = Date.parse(`${today}T00:00:00Z`) - ZAGREB_DAY_START_OFFSET;

	const questions = progress.attempts.filter(
		(attempt) =>
			attempt.answeredAt >= earliest &&
			toStudyDay(new Date(attempt.answeredAt)) === today,
	).length;

	const lessons = Object.values(progress.lessonsDone).filter(
		(completedAt) => toStudyDay(new Date(completedAt)) === today,
	).length;

	return {
		questions,
		lessons,
		goalMet: questions >= DAILY_QUESTION_GOAL || lessons > 0,
	};
}

export function withStudyDay(
	progress: IProgressState,
	today: string,
): IProgressState {
	if (
		progress.studyDays.includes(today) ||
		!todayActivity(progress, today).goalMet
	) {
		return progress;
	}

	return { ...progress, studyDays: [...progress.studyDays, today].sort() };
}
