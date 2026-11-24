import type { ExamLevel, ICourse } from "@/content/course-types";
import { getLessonsByArea } from "@/lib/content/course-selectors";
import { courseLessonOrder } from "@/lib/content/lesson-order";
import { subjectGroups } from "@/lib/content/question-groups";
import { addDays } from "@/lib/dates/study-day";
import { firstAttempts, recentAccuracy } from "@/lib/progress/accuracy";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { MIN_ANSWERS } from "@/lib/progress/readiness";

export interface IBadgeContext {
	progress: IProgressState;
	course: ICourse;
	level: ExamLevel;
}

export const SUBJECT_ACCURACY_GOAL = 0.8;

export const CORRECT_RUN_GOAL = 20;

export const STUDY_WINDOW_DAYS = 14;

export const STUDY_WINDOW_GOAL = 7;

export const ANSWER_GOAL = 100;

export function introDone({ progress, course }: IBadgeContext): boolean {
	return progress.lessonsDone[course.introLessonSlug] !== undefined;
}

export function anyAreaDone({ progress, course, level }: IBadgeContext) {
	return course.areas.some((area) => {
		const lessons = getLessonsByArea(course, area.slug, level);

		return (
			lessons.length > 0 &&
			lessons.every((lesson) => progress.lessonsDone[lesson.slug] !== undefined)
		);
	});
}

export function allLessonsDone({ progress, course, level }: IBadgeContext) {
	return courseLessonOrder(course, level).every(
		(lesson) => progress.lessonsDone[lesson.slug] !== undefined,
	);
}

// Each subject needs enough answers to be measured, the same floor readiness uses.
export function everySubjectAt80({ progress, course, level }: IBadgeContext) {
	return subjectGroups(course, level).every((group) => {
		const { answered, accuracy } = recentAccuracy(
			progress.attempts,
			group.questionIds,
		);

		return (
			answered >= MIN_ANSWERS &&
			accuracy !== null &&
			accuracy >= SUBJECT_ACCURACY_GOAL
		);
	});
}

export function passedMockExam({ progress }: IBadgeContext): boolean {
	return progress.examSessions.some(
		(session) => session.finishedAt !== null && session.passed === true,
	);
}

// Only first answers count, so answering a question again right after its explanation cannot build the run.
export function longestCorrectRun(progress: IProgressState): number {
	const ordered = firstAttempts(progress.attempts).sort(
		(first, second) => first.answeredAt - second.answeredAt,
	);

	let longest = 0;
	let current = 0;

	for (const attempt of ordered) {
		current = attempt.correct ? current + 1 : 0;
		longest = Math.max(longest, current);
	}

	return longest;
}

export function correctRunReached({ progress }: IBadgeContext): boolean {
	return longestCorrectRun(progress) >= CORRECT_RUN_GOAL;
}

export function mostStudyDaysInWindow(studyDays: readonly string[]): number {
	const days = [...new Set(studyDays)].sort();

	return days.reduce((best, start, index) => {
		const end = addDays(start, STUDY_WINDOW_DAYS - 1);
		const inWindow = days.slice(index).filter((day) => day <= end).length;

		return Math.max(best, inWindow);
	}, 0);
}

export function studiedSevenOfFourteen({ progress }: IBadgeContext) {
	return mostStudyDaysInWindow(progress.studyDays) >= STUDY_WINDOW_GOAL;
}

export function answeredHundred({ progress }: IBadgeContext): boolean {
	return progress.attempts.length >= ANSWER_GOAL;
}
