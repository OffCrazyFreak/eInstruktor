import { describe, expect, it } from "vitest";
import type { ExamSubjectId, Level, VisualId } from "@/content/types";
import course from "@/content/voditelj-brodice";
import { matchesLevel } from "@/lib/content/course-selectors";

// A Record forces this list to name every VisualId, so the runtime check cannot fall behind the type.
const VISUAL_ID_RECORD: Record<VisualId, true> = {
	"iala-buoy-explorer": true,
	"cardinal-quadrant": true,
	"ship-lights-viewer": true,
	"day-shapes": true,
	"sound-signal-player": true,
	"collision-situations": true,
	"compass-course-calculator": true,
	"light-characteristic-reader": true,
	"vhf-radio-call": true,
	"phonetic-alphabet": true,
	"adriatic-winds": true,
	"beaufort-scale": true,
	"four-stroke-engine": true,
	"navigation-areas-map": true,
	"knot-steps": true,
};

const VISUAL_IDS = new Set<string>(Object.keys(VISUAL_ID_RECORD));

const EXAM_SUBJECTS: ExamSubjectId[] = [
	"pomorska-plovidba",
	"motoristika",
	"pomorstvo-propisi-meteorologija",
	"manevriranje-sigurnost-prva-pomoc",
	"radiotelefonija",
];

// En dash, em dash, minus sign and horizontal bar all read as a long dash.
const LONG_DASH = /[\u2013\u2014\u2015\u2212]/;

function findDuplicates(values: string[]): string[] {
	const seen = new Set<string>();

	return values.filter((value) => {
		if (seen.has(value)) {
			return true;
		}

		seen.add(value);

		return false;
	});
}

function countCorrect(options: { correct: boolean }[]): number {
	return options.filter((option) => option.correct).length;
}

const questionsById = new Map(
	course.questions.map((question) => [question.id, question]),
);

const lessonSlugs = new Set(course.lessons.map((lesson) => lesson.slug));

// A check block may only use a question its own readers get in practice: common blocks need common questions.
function isVisibleAtBlock(questionLevel: Level, blockLevel: Level): boolean {
	return blockLevel === "common"
		? questionLevel === "common"
		: matchesLevel(questionLevel, blockLevel);
}

const blocks = course.lessons.flatMap((lesson) =>
	lesson.blocks.map((block) => ({ lesson: lesson.slug, block })),
);

describe("voditelj brodice content", () => {
	it("has unique ids and slugs", () => {
		expect(findDuplicates(course.areas.map((area) => area.slug))).toEqual([]);
		expect(findDuplicates(course.lessons.map((lesson) => lesson.slug))).toEqual(
			[],
		);
		expect(findDuplicates(course.questions.map((q) => q.id))).toEqual([]);
		expect(findDuplicates(course.studyCards.map((card) => card.id))).toEqual(
			[],
		);
	});

	it("starts with lecture 0", () => {
		expect(course.lessons[0]?.slug).toBe(course.introLessonSlug);
	});

	it("points every check block at an existing question", () => {
		const missing = blocks.flatMap(({ lesson, block }) =>
			block.type === "check" && !questionsById.has(block.questionId)
				? [`${lesson}:${block.questionId}`]
				: [],
		);

		expect(missing).toEqual([]);
	});

	it("checks only questions visible at the block's level", () => {
		const hidden = blocks.flatMap(({ lesson, block }) => {
			const question =
				block.type === "check"
					? questionsById.get(block.questionId)
					: undefined;

			if (!question) {
				return [];
			}

			return isVisibleAtBlock(question.level, block.level)
				? []
				: [`${lesson}:${question.id}`];
		});

		expect(hidden).toEqual([]);
	});

	it("links every question to an existing lesson", () => {
		const orphans = course.questions
			.filter(
				(question) => question.lesson && !lessonSlugs.has(question.lesson),
			)
			.map((question) => question.id);

		expect(orphans).toEqual([]);
	});

	it("gives true-false questions exactly the options t and f", () => {
		const wrong = course.questions
			.filter((question) => question.type === "true-false")
			.filter(
				(question) =>
					question.options.map((option) => option.id).join() !== "t,f",
			)
			.map((question) => question.id);

		expect(wrong).toEqual([]);
	});

	it("has exactly one correct option for single and true-false questions", () => {
		const wrong = course.questions
			.filter((question) => question.type !== "multi")
			.filter((question) => countCorrect(question.options) !== 1)
			.map((question) => question.id);

		expect(wrong).toEqual([]);
	});

	it("has at least two correct options for multi questions", () => {
		const wrong = course.questions
			.filter((question) => question.type === "multi")
			.filter((question) => countCorrect(question.options) < 2)
			.map((question) => question.id);

		expect(wrong).toEqual([]);
	});

	it("uses only known visuals", () => {
		const used = [
			...blocks.flatMap(({ block }) =>
				block.type === "visual" ? [block.visual] : [],
			),
			...course.questions.flatMap((question) =>
				question.media ? [question.media.visual] : [],
			),
		];

		expect(used.filter((visual) => !VISUAL_IDS.has(visual))).toEqual([]);
	});

	it("has no long dashes", () => {
		expect(JSON.stringify(course)).not.toMatch(LONG_DASH);
	});

	it("has questions for every level an area teaches", () => {
		const gaps = course.areas.flatMap((area) => {
			const lessonLevels = new Set<Level>(
				course.lessons
					.filter((lesson) => lesson.area === area.slug)
					.map((lesson) => lesson.level),
			);

			const questionLevels = new Set<Level>(
				course.questions
					.filter((question) => question.area === area.slug)
					.map((question) => question.level),
			);

			return [...lessonLevels]
				.filter((level) => !questionLevels.has(level))
				.map((level) => `${area.slug}:${level}`);
		});

		expect(gaps).toEqual([]);
	});

	it("has enough questions to build both mock exams", () => {
		const subjectOf = new Map(
			course.areas.map((area) => [area.slug, area.subject]),
		);

		const bPool = course.questions.filter((question) => question.level !== "A");

		for (const subject of EXAM_SUBJECTS) {
			const count = bPool.filter(
				(question) => subjectOf.get(question.area) === subject,
			).length;

			expect(count, subject).toBeGreaterThanOrEqual(
				course.examFormats.B.questionsPerSubject,
			);
		}

		const aPool = course.questions.filter((question) => question.level !== "B");

		expect(aPool.length).toBeGreaterThanOrEqual(course.examFormats.A.questions);
	});
});
