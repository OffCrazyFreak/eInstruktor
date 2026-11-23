import type { ExamLevel, ICourse } from "@/content/course-types";
import type { AreaSlug } from "@/content/types";
import { A_SUBJECT_ID } from "@/content/voditelj-brodice/subjects";
import { subjectOfArea } from "@/lib/content/course-selectors";
import { examPool } from "@/lib/content/exam-questions";

export interface ICourseQuestionGroup<Id extends string = string> {
	id: Id;
	questionIds: string[];
}

// Readiness follows the exam: one pool for A, the five subjects for B, both without the Lekcija 0 questions.
export function subjectGroups(
	course: ICourse,
	level: ExamLevel,
): ICourseQuestionGroup[] {
	const pool = examPool(course, level);

	if (level === "A") {
		return [{ id: A_SUBJECT_ID, questionIds: pool.map((q) => q.id) }];
	}

	const subjects = [...new Set(course.areas.map((area) => area.subject))];

	return subjects.map((subject) => ({
		id: subject,
		questionIds: pool
			.filter((question) => subjectOfArea(course, question.area) === subject)
			.map((question) => question.id),
	}));
}

export function areaGroups(
	course: ICourse,
	level: ExamLevel,
): ICourseQuestionGroup<AreaSlug>[] {
	const pool = examPool(course, level);

	return course.areas
		.map((area) => ({
			id: area.slug,
			questionIds: pool
				.filter((question) => question.area === area.slug)
				.map((question) => question.id),
		}))
		.filter((group) => group.questionIds.length > 0);
}
