import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ExamSubjectId, IQuestion } from "@/content/types";
import { getQuestions } from "@/lib/content/course-selectors";
import { seededShuffle } from "@/lib/content/seeded-shuffle";

function questionsForSubject(
	course: ICourse,
	subject: ExamSubjectId,
	seed: number,
): IQuestion[] {
	const areas = new Set(
		course.areas
			.filter((area) => area.subject === subject)
			.map((area) => area.slug),
	);

	const pool = getQuestions(course, { level: "B" }).filter((question) =>
		areas.has(question.area),
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
		const pool = getQuestions(course, { level: "A" });

		return seededShuffle(pool, seed).slice(0, course.examFormats.A.questions);
	}

	const subjects = [...new Set(course.areas.map((area) => area.subject))];

	return subjects.flatMap((subject, index) =>
		questionsForSubject(course, subject, seed + index),
	);
}
