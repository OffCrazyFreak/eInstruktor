import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ExamSubjectId, IQuestion } from "@/content/types";
import { getQuestions, subjectOfArea } from "@/lib/content/course-selectors";
import { seededShuffle } from "@/lib/content/seeded-shuffle";

// Lecture 0 questions are about getting the licence, which the exam does not ask.
export function examPool(course: ICourse, level: ExamLevel): IQuestion[] {
	return getQuestions(course, { level }).filter(
		(question) => question.lesson !== course.introLessonSlug,
	);
}

function questionsForSubject(
	course: ICourse,
	subject: ExamSubjectId,
	seed: number,
): IQuestion[] {
	const pool = examPool(course, "B").filter(
		(question) => subjectOfArea(course, question.area) === subject,
	);

	return seededShuffle(pool, seed).slice(
		0,
		course.examFormats.B.questionsPerSubject,
	);
}

// A draws one pool for its single subject; B draws a fixed share per subject, in the order the areas list the subjects.
export function questionsForExam(
	course: ICourse,
	level: ExamLevel,
	seed: number,
): IQuestion[] {
	if (level === "A") {
		return seededShuffle(examPool(course, "A"), seed).slice(
			0,
			course.examFormats.A.questions,
		);
	}

	const subjects = [...new Set(course.areas.map((area) => area.subject))];

	return subjects.flatMap((subject, index) =>
		questionsForSubject(course, subject, seed + index),
	);
}
