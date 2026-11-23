import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ILesson } from "@/content/types";
import { getLesson, getLessonsByArea } from "@/lib/content/course-selectors";

/** Lekcija 0 first, then every area's lessons for the level, in area order. */
export function courseLessonOrder(
	course: ICourse,
	level: ExamLevel,
): ILesson[] {
	const intro = getLesson(course, course.introLessonSlug);
	const areas = [...course.areas].sort(
		(first, second) => first.order - second.order,
	);

	return [
		...(intro ? [intro] : []),
		...areas.flatMap((area) => getLessonsByArea(course, area.slug, level)),
	];
}

export function nextLesson(
	course: ICourse,
	slug: string,
	level: ExamLevel,
): ILesson | undefined {
	const order = courseLessonOrder(course, level);
	const index = order.findIndex((lesson) => lesson.slug === slug);

	return index === -1 ? undefined : order[index + 1];
}

export function firstUnreadLesson(
	course: ICourse,
	level: ExamLevel,
	lessonsDone: Record<string, number>,
): ILesson | undefined {
	return courseLessonOrder(course, level).find(
		(lesson) => lessonsDone[lesson.slug] === undefined,
	);
}
