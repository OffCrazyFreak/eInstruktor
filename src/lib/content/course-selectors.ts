import type { ExamLevel, ICourse } from "@/content/course-types";
import type {
	AreaSlug,
	IArea,
	ILesson,
	IQuestion,
	Level,
} from "@/content/types";

export interface IQuestionFilter {
	area?: AreaSlug;
	level?: ExamLevel;
	/** Keeps this order, so a saved exam can be shown again as it was. */
	ids?: string[];
}

export function matchesLevel(itemLevel: Level, level?: ExamLevel): boolean {
	return !level || itemLevel === "common" || itemLevel === level;
}

export function getArea(course: ICourse, slug: AreaSlug): IArea | undefined {
	return course.areas.find((area) => area.slug === slug);
}

export function getLesson(course: ICourse, slug: string): ILesson | undefined {
	return course.lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonsByArea(
	course: ICourse,
	area: AreaSlug,
	level?: ExamLevel,
): ILesson[] {
	return course.lessons
		.filter((lesson) => lesson.area === area)
		.filter((lesson) => matchesLevel(lesson.level, level))
		.sort((first, second) => first.order - second.order);
}

export function getQuestions(
	course: ICourse,
	{ area, level, ids }: IQuestionFilter = {},
): IQuestion[] {
	const candidates = ids
		? ids.flatMap((id) => course.questions.filter((q) => q.id === id))
		: course.questions;

	return candidates
		.filter((question) => !area || question.area === area)
		.filter((question) => matchesLevel(question.level, level));
}
