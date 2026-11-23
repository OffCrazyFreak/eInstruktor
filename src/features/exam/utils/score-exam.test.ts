import { describe, expect, it } from "vitest";
import type { IQuestion } from "@/content/types";
import course from "@/content/voditelj-brodice";
import { examBlocks } from "@/features/exam/utils/exam-blocks";
import { scoreExam, subjectPassed } from "@/features/exam/utils/score-exam";
import { questionsForExam } from "@/lib/content/exam-questions";

function rightAnswer(question: IQuestion): string[] {
	return question.options
		.filter((option) => option.correct)
		.map((option) => option.id);
}

function wrongAnswer(question: IQuestion): string[] {
	const wrong = question.options.find((option) => !option.correct);

	return wrong ? [wrong.id] : [];
}

/** Answers the first `right[i]` questions of block i correctly and the rest wrongly. */
function answersFor(
	blocks: ReturnType<typeof examBlocks>,
	right: number[],
): Record<string, string[]> {
	return Object.fromEntries(
		blocks.flatMap((block, blockIndex) =>
			block.questions.map((question, index) => [
				question.id,
				index < (right[blockIndex] ?? 0)
					? rightAnswer(question)
					: wrongAnswer(question),
			]),
		),
	);
}

function blocksFor(level: "A" | "B", seed = 5) {
	return examBlocks(
		course,
		level,
		questionsForExam(course, level, seed).map((question) => question.id),
	);
}

describe("subjectPassed", () => {
	it("passes a B subject at 6 of 8 and fails it at 5 of 8", () => {
		expect(subjectPassed(course, "B", 6, 8)).toBe(true);
		expect(subjectPassed(course, "B", 5, 8)).toBe(false);
	});

	it("passes A at exactly 70 percent", () => {
		expect(subjectPassed(course, "A", 14, 20)).toBe(true);
		expect(subjectPassed(course, "A", 13, 20)).toBe(false);
	});
});

describe("scoreExam", () => {
	it("passes B only when every subject passes", () => {
		const blocks = blocksFor("B");
		const passed = scoreExam(
			course,
			"B",
			blocks,
			answersFor(blocks, [6, 6, 6, 6, 6]),
		);

		expect(passed.passed).toBe(true);
		expect(passed.score).toBe(30);
		expect(passed.total).toBe(40);

		const oneShort = scoreExam(
			course,
			"B",
			blocks,
			answersFor(blocks, [8, 8, 8, 8, 5]),
		);

		expect(oneShort.passed).toBe(false);
		expect(oneShort.score).toBe(37);
		expect(oneShort.subjects.map((subject) => subject.passed)).toEqual([
			true,
			true,
			true,
			true,
			false,
		]);
	});

	it("gives a per-subject result keyed by subject, in exam order", () => {
		const blocks = blocksFor("B");
		const score = scoreExam(course, "B", blocks, answersFor(blocks, [8]));

		expect(Object.keys(score.perSubject)).toEqual(
			blocks.map((block) => block.subjectId),
		);
		expect(Object.values(score.perSubject)[0]).toEqual({
			correct: 8,
			total: 8,
			passed: true,
		});
	});

	it("scores A as one subject at 70 percent", () => {
		const blocks = blocksFor("A");

		expect(
			scoreExam(course, "A", blocks, answersFor(blocks, [14])).passed,
		).toBe(true);
		expect(
			scoreExam(course, "A", blocks, answersFor(blocks, [13])).passed,
		).toBe(false);
	});

	it("counts unanswered questions as wrong without recording them", () => {
		const blocks = blocksFor("B");
		const firstBlock = blocks[0];
		const onlyOne = firstBlock?.questions[0];

		if (!onlyOne) {
			throw new Error("No questions");
		}

		const score = scoreExam(course, "B", blocks, {
			[onlyOne.id]: rightAnswer(onlyOne),
			[firstBlock.questions[1]?.id ?? ""]: [],
		});

		expect(score.score).toBe(1);
		expect(score.passed).toBe(false);
		expect(score.graded).toEqual([{ questionId: onlyOne.id, correct: true }]);
	});

	it("counts a partly right multi answer as wrong", () => {
		const multi: IQuestion = {
			id: "multi-1",
			area: "motoristika",
			level: "common",
			type: "multi",
			prompt: "Koje su točne?",
			options: [
				{ id: "a", text: "Prvo", correct: true },
				{ id: "b", text: "Drugo", correct: true },
				{ id: "c", text: "Treće", correct: false },
			],
			explanation: "Prvo i drugo.",
			difficulty: 1,
			source: "original",
		};
		const blocks = [
			{
				subjectId: "motoristika" as const,
				label: "Motoristika",
				questions: [multi],
				startIndex: 0,
			},
		];

		expect(scoreExam(course, "B", blocks, { "multi-1": ["a"] }).score).toBe(0);
		expect(
			scoreExam(course, "B", blocks, { "multi-1": ["a", "b", "c"] }).score,
		).toBe(0);
		expect(
			scoreExam(course, "B", blocks, { "multi-1": ["b", "a"] }).score,
		).toBe(1);
	});
});
