import type { ExamLevel, ICourse } from "@/content/course-types";
import type { IQuestion } from "@/content/types";
import {
	A_SUBJECT_ID,
	type ReadinessSubjectId,
	SUBJECT_LABELS,
} from "@/content/voditelj-brodice/subjects";
import { getQuestions, subjectOfArea } from "@/lib/content/course-selectors";

export interface IExamBlock {
	subjectId: ReadinessSubjectId;
	label: string;
	questions: IQuestion[];
	/** Position of the block's first question in the whole exam, from 0. */
	startIndex: number;
}

// The pass rule is per subject, so the exam runs in one block per subject; A is a single subject.
export function examBlocks(
	course: ICourse,
	level: ExamLevel,
	questionIds: string[],
): IExamBlock[] {
	const bySubject = new Map<ReadinessSubjectId, IQuestion[]>();

	// Ids of questions removed from the content since the exam was drawn are skipped.
	for (const question of getQuestions(course, { ids: questionIds })) {
		const subjectId: ReadinessSubjectId =
			level === "A"
				? A_SUBJECT_ID
				: (subjectOfArea(course, question.area) ?? A_SUBJECT_ID);

		bySubject.set(subjectId, [...(bySubject.get(subjectId) ?? []), question]);
	}

	let startIndex = 0;

	return [...bySubject].map(([subjectId, questions]) => {
		const block = {
			subjectId,
			label: SUBJECT_LABELS[subjectId],
			questions,
			startIndex,
		};

		startIndex += questions.length;

		return block;
	});
}

/** The exam's questions in the order they are asked. */
export function blockQuestions(blocks: IExamBlock[]): IQuestion[] {
	return blocks.flatMap((block) => block.questions);
}

export function blockOfIndex(
	blocks: IExamBlock[],
	index: number,
): IExamBlock | undefined {
	return blocks.find(
		(block) =>
			index >= block.startIndex &&
			index < block.startIndex + block.questions.length,
	);
}

// A session whose stored ids no longer match the content (a removed question or subject) cannot be scored fairly.
export function isPlayableExam(
	course: ICourse,
	level: ExamLevel,
	blocks: IExamBlock[],
): boolean {
	if (blocks.length === 0) {
		return false;
	}

	return (
		level === "A" ||
		blocks.length === new Set(course.areas.map((area) => area.subject)).size
	);
}
