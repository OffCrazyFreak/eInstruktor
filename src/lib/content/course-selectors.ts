import type { ExamLevel, ICourse } from "@/content/course-types";
import type {
	AreaSlug,
	ExamSubjectId,
	IArea,
	ILesson,
	IQuestion,
	Level,
} from "@/content/types";

export interface IQuestionFilter {
	area?: AreaSlug;
	lesson?: string;
	level?: ExamLevel;
	/** Keeps this order, so a saved exam can be shown again as it was. */
	ids?: string[];
}

const questionIndexes = new WeakMap<ICourse, Map<string, IQuestion>>();

function getQuestionIndex(course: ICourse): Map<string, IQuestion> {
	let index = questionIndexes.get(course);

	if (!index) {
		index = new Map(
			course.questions.map((question) => [question.id, question]),
		);
		questionIndexes.set(course, index);
	}

	return index;
}

export function matchesLevel(itemLevel: Level, level?: ExamLevel): boolean {
	return !level || itemLevel === "common" || itemLevel === level;
}

export function getArea(course: ICourse, slug: AreaSlug): IArea | undefined {
	return course.areas.find((area) => area.slug === slug);
}

export function subjectOfArea(
	course: ICourse,
	area: AreaSlug,
): ExamSubjectId | undefined {
	return getArea(course, area)?.subject;
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
		.filter((lesson) => lesson.slug !== course.introLessonSlug)
		.filter((lesson) => lesson.area === area)
		.filter((lesson) => matchesLevel(lesson.level, level))
		.sort((first, second) => first.order - second.order);
}

export function getQuestions(
	course: ICourse,
	{ area, lesson, level, ids }: IQuestionFilter = {},
): IQuestion[] {
	const index = getQuestionIndex(course);

	const candidates = ids
		? ids.flatMap((id) => index.get(id) ?? [])
		: course.questions;

	return candidates
		.filter((question) => !area || question.area === area)
		.filter((question) => !lesson || question.lesson === lesson)
		.filter((question) => matchesLevel(question.level, level));
}
