import type { ExamLevel } from "@/content/course-types";
import type { ILesson, LessonBlock } from "@/content/types";

export interface IVisibleBlock {
	block: LessonBlock;
	/** True for B-only depth shown to a B learner, so the reader can badge it. */
	isBOnly: boolean;
}

// A-specific facts (the A licence limits) help B learners too, while B depth is beyond the A exam.
export function getVisibleBlocks(
	lesson: ILesson,
	level: ExamLevel,
): IVisibleBlock[] {
	return lesson.blocks
		.filter((block) => level === "B" || block.level !== "B")
		.map((block) => ({ block, isBOnly: block.level === "B" }));
}
