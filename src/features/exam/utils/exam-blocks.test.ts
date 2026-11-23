import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { A_SUBJECT_ID } from "@/content/voditelj-brodice/subjects";
import {
	blockOfIndex,
	blockQuestions,
	examBlocks,
} from "@/features/exam/utils/exam-blocks";
import { questionsForExam } from "@/lib/content/exam-questions";

function idsFor(level: "A" | "B", seed: number): string[] {
	return questionsForExam(course, level, seed).map((question) => question.id);
}

describe("examBlocks", () => {
	it("splits a B exam into five blocks of eight in subject order", () => {
		const blocks = examBlocks(course, "B", idsFor("B", 11));

		expect(blocks).toHaveLength(5);
		expect(blocks.map((block) => block.questions.length)).toEqual([
			8, 8, 8, 8, 8,
		]);
		expect(blocks.map((block) => block.startIndex)).toEqual([0, 8, 16, 24, 32]);
		expect(new Set(blocks.map((block) => block.subjectId)).size).toBe(5);
	});

	it("keeps an A exam as one subject", () => {
		const blocks = examBlocks(course, "A", idsFor("A", 11));

		expect(blocks).toHaveLength(1);
		expect(blocks[0]?.subjectId).toBe(A_SUBJECT_ID);
		expect(blocks[0]?.questions).toHaveLength(20);
	});

	it("rebuilds the same exam from the stored ids of the same seed", () => {
		const first = blockQuestions(examBlocks(course, "B", idsFor("B", 2026)));
		const again = blockQuestions(examBlocks(course, "B", idsFor("B", 2026)));

		expect(again.map((question) => question.id)).toEqual(
			first.map((question) => question.id),
		);
		expect(first.map((question) => question.id)).toEqual(idsFor("B", 2026));
	});

	it("skips ids that are no longer in the content", () => {
		const ids = idsFor("A", 3);
		const blocks = examBlocks(course, "A", ["gone-001", ...ids]);

		expect(blockQuestions(blocks).map((question) => question.id)).toEqual(ids);
	});

	it("finds the block of a question position", () => {
		const blocks = examBlocks(course, "B", idsFor("B", 11));

		expect(blockOfIndex(blocks, 0)).toBe(blocks[0]);
		expect(blockOfIndex(blocks, 8)).toBe(blocks[1]);
		expect(blockOfIndex(blocks, 39)).toBe(blocks[4]);
		expect(blockOfIndex(blocks, 40)).toBeUndefined();
	});
});
