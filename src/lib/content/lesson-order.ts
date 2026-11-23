import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ILesson } from "@/content/types";
import { getLesson, getLessonsByArea } from "@/lib/content/course-selectors";

/** Lekcija 0 first, then every area's lessons for the level (every lesson without one), in area order. */
export function courseLessonOrder(
	course: ICourse,
	level?: ExamLevel,
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

function nextInOrder(order: ILesson[], slug: string) {
	const index = order.findIndex((lesson) => lesson.slug === slug);

	return index === -1
		? { found: false, next: undefined }
		: { found: true, next: order[index + 1] };
}

// A lesson outside the learner's level, such as a B lesson an A learner opened, still gets its next lesson from the full order.
export function nextLesson(
	course: ICourse,
	slug: string,
	level: ExamLevel,
): ILesson | undefined {
	const inLevel = nextInOrder(courseLessonOrder(course, level), slug);

	return inLevel.found
		? inLevel.next
		: nextInOrder(courseLessonOrder(course), slug).next;
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
