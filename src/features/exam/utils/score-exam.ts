import { isCorrectSelection } from "@/components/custom/question/grade-answer";
import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ReadinessSubjectId } from "@/content/voditelj-brodice/subjects";
import type { IExamBlock } from "@/features/exam/utils/exam-blocks";
import type { IExamOutcome } from "@/lib/progress/exam-session-actions";

export interface ISubjectScore {
	subjectId: ReadinessSubjectId;
	label: string;
	correct: number;
	total: number;
	passed: boolean;
}

export interface IExamScore extends IExamOutcome {
	total: number;
	subjects: ISubjectScore[];
}

// A is one pool passed at a share of correct answers, B passes each subject at a count; integer maths keeps 14 of 20 exactly at 70 percent.
export function subjectPassed(
	course: ICourse,
	level: ExamLevel,
	correct: number,
	total: number,
): boolean {
	if (level === "A") {
		return correct * 100 >= course.examFormats.A.passPercent * total;
	}

	return correct >= course.examFormats.B.passPerSubject;
}

/** Unanswered questions count as wrong and are not recorded as attempts. */
export function scoreExam(
	course: ICourse,
	level: ExamLevel,
	blocks: IExamBlock[],
	answers: Record<string, string[]>,
): IExamScore {
	const graded: IExamOutcome["graded"] = [];

	const subjects = blocks.map((block) => {
		let correct = 0;

		for (const question of block.questions) {
			const selected = answers[question.id] ?? [];

			if (selected.length === 0) {
				continue;
			}

			const right = isCorrectSelection(question, selected);

			graded.push({ questionId: question.id, correct: right });

			if (right) {
				correct++;
			}
		}

		const total = block.questions.length;

		return {
			subjectId: block.subjectId,
			label: block.label,
			correct,
			total,
			passed: subjectPassed(course, level, correct, total),
		};
	});

	return {
		score: subjects.reduce((sum, subject) => sum + subject.correct, 0),
		total: subjects.reduce((sum, subject) => sum + subject.total, 0),
		passed: subjects.length > 0 && subjects.every((subject) => subject.passed),
		subjects,
		graded,
		perSubject: Object.fromEntries(
			subjects.map(({ subjectId, correct, total, passed }) => [
				subjectId,
				{ correct, total, passed },
			]),
		),
	};
}
