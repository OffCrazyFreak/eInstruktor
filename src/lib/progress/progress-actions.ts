import type { ExamLevel } from "@/content/course-types";
import { toStudyDay } from "@/lib/dates/study-day";
import { withStudyDay } from "@/lib/progress/daily-goal";
import { nextLeitnerEntry } from "@/lib/progress/leitner";
import type {
	AttemptMode,
	IProgressState,
} from "@/lib/progress/progress-schema";

// About 600 KB of JSON, well under the browser's localStorage limit; older answers matter little for recent accuracy.
export const MAX_STORED_ATTEMPTS = 4000;

export interface IAnswerInput {
	id: string;
	questionId: string;
	correct: boolean;
	selected: string[];
	mode: AttemptMode;
	sessionId: string;
	answeredAt: number;
}

export function setTargetLevel(
	progress: IProgressState,
	level: ExamLevel,
): IProgressState {
	return { ...progress, targetLevel: level };
}

export function setExamDate(
	progress: IProgressState,
	examDate: string | null,
): IProgressState {
	return { ...progress, examDate };
}

// Exam answers wait for the result screen, so only practice and lesson checks move a question between boxes.
export function recordAnswer(
	progress: IProgressState,
	answer: IAnswerInput,
): IProgressState {
	const today = toStudyDay(new Date(answer.answeredAt));

	const questionBoxes =
		answer.mode === "exam"
			? progress.questionBoxes
			: {
					...progress.questionBoxes,
					[answer.questionId]: nextLeitnerEntry(
						progress.questionBoxes[answer.questionId],
						answer.correct,
						today,
					),
				};

	return withStudyDay(
		{
			...progress,
			attempts: [...progress.attempts, answer].slice(-MAX_STORED_ATTEMPTS),
			questionBoxes,
		},
		today,
	);
}

export function markLessonDone(
	progress: IProgressState,
	slug: string,
	now: number,
): IProgressState {
	if (progress.lessonsDone[slug] !== undefined) {
		return progress;
	}

	return withStudyDay(
		{ ...progress, lessonsDone: { ...progress.lessonsDone, [slug]: now } },
		toStudyDay(new Date(now)),
	);
}

export function markLessonUnread(
	progress: IProgressState,
	slug: string,
): IProgressState {
	const { [slug]: _removed, ...lessonsDone } = progress.lessonsDone;

	return { ...progress, lessonsDone };
}

export function openLesson(
	progress: IProgressState,
	slug: string,
	now: number,
): IProgressState {
	const percent =
		progress.lastLesson?.slug === slug ? progress.lastLesson.percent : 0;

	return { ...progress, lastLesson: { slug, openedAt: now, percent } };
}

// Only ever grows, so scrolling back up does not lower the "Nastavi" percent.
export function setLessonPercent(
	progress: IProgressState,
	slug: string,
	percent: number,
): IProgressState {
	const last = progress.lastLesson;

	if (!last || last.slug !== slug || percent <= last.percent) {
		return progress;
	}

	return {
		...progress,
		lastLesson: { ...last, percent: Math.min(percent, 1) },
	};
}

export function toggleFlag(
	progress: IProgressState,
	questionId: string,
	now: number,
): IProgressState {
	const { [questionId]: existing, ...rest } = progress.flagged;

	return {
		...progress,
		flagged: existing === undefined ? { ...rest, [questionId]: now } : rest,
	};
}

// Earned badges are a record of what the learner reached, so they are never taken back.
export function awardBadges(
	progress: IProgressState,
	badgeIds: readonly string[],
	now: number,
): IProgressState {
	const fresh = badgeIds.filter((id) => progress.badges[id] === undefined);

	if (fresh.length === 0) {
		return progress;
	}

	return {
		...progress,
		badges: {
			...progress.badges,
			...Object.fromEntries(fresh.map((id) => [id, now])),
		},
	};
}

export function setPassed(
	progress: IProgressState,
	passed: boolean,
	now: number,
): IProgressState {
	if (passed === (progress.passedAt !== null)) {
		return progress;
	}

	return { ...progress, passedAt: passed ? now : null };
}
