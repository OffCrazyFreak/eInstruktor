import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	againExclusions,
	type IPracticeContext,
	modeQuestionIds,
	practiceLevel,
	practicePool,
	selectPracticeQuestions,
} from "@/features/practice/utils/practice-pool";
import { getQuestions } from "@/lib/content/course-selectors";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { testAttempt } from "@/lib/progress/test-attempts";

const today = "2026-11-20";

function context(
	progress: Partial<IPracticeContext["progress"]> = {},
): IPracticeContext {
	return { progress: { ...EMPTY_PROGRESS, ...progress }, today };
}

const areaQuestions = (area: string) =>
	course.questions.filter((question) => question.area === area);

describe("practicePool", () => {
	it("gives an A learner only common and A questions", () => {
		const pool = practicePool(course, "A");

		expect(pool.length).toBeGreaterThan(0);
		expect(pool.every((question) => question.level !== "B")).toBe(true);
	});

	it("gives a B learner the B questions too", () => {
		expect(practicePool(course, "B").some((q) => q.level === "B")).toBe(true);
	});

	it("leaves out Lekcija 0 unless that lesson is picked", () => {
		const intro = course.introLessonSlug;

		expect(practicePool(course, "B").some((q) => q.lesson === intro)).toBe(
			false,
		);
		expect(
			practicePool(course, "B", { lesson: intro }).some(
				(q) => q.lesson === intro,
			),
		).toBe(true);
	});

	it("narrows to one area or one exam subject", () => {
		expect(
			practicePool(course, "B", { area: "meteorologija" }).every(
				(q) => q.area === "meteorologija",
			),
		).toBe(true);

		const radio = practicePool(course, "B", { subject: "radiotelefonija" });

		expect(radio.length).toBeGreaterThan(0);
		expect(radio.every((q) => q.area === "vhf-radio")).toBe(true);
	});
});

describe("practiceLevel", () => {
	it("keeps an A learner on A whatever the sheet says", () => {
		expect(practiceLevel("A", "B")).toBe("A");
		expect(practiceLevel("B", "A")).toBe("A");
		expect(practiceLevel("B", undefined)).toBe("B");
	});
});

describe("modeQuestionIds", () => {
	const [first, second, third] = areaQuestions("meteorologija");
	const bOnly = course.questions.find((question) => question.level === "B");

	if (!first || !second || !third || !bOnly) {
		throw new Error("The course needs meteorology and B questions");
	}

	it("lists wrong answers for Pogrešni odgovori", () => {
		const progress = {
			attempts: [
				testAttempt({ questionId: first.id, correct: false }),
				testAttempt({ questionId: second.id, correct: true }),
			],
		};

		expect(
			modeQuestionIds(
				course,
				{ mode: "pogresni", level: "B" },
				context(progress),
			),
		).toEqual([first.id]);
	});

	it("keeps B mistakes out of an A learner's set", () => {
		const progress = {
			attempts: [testAttempt({ questionId: bOnly.id, correct: false })],
		};

		expect(
			modeQuestionIds(
				course,
				{ mode: "pogresni", level: "A" },
				context(progress),
			),
		).toEqual([]);
	});

	it("asks flagged questions newest first, without shuffling", () => {
		const flagged = { [first.id]: 1, [second.id]: 3, [third.id]: 2 };

		for (const seed of [1, 2, 3]) {
			expect(
				selectPracticeQuestions(
					course,
					{ mode: "oznaceno", level: "B", length: 10 },
					context({ flagged }),
					seed,
				).map((q) => q.id),
			).toEqual([second.id, third.id, first.id]);
		}
	});

	it("lists only the questions due today for Za ponoviti danas", () => {
		const questionBoxes = {
			[first.id]: { box: 1, reviewedOn: today },
			[second.id]: { box: 2, reviewedOn: "2026-11-19" },
			[third.id]: { box: 3, reviewedOn: "2026-11-10" },
		} as const;

		expect(
			modeQuestionIds(
				course,
				{ mode: "ponavljanje", level: "B" },
				context({ questionBoxes }),
			).sort(),
		).toEqual([first.id, third.id].sort());
	});

	it("takes the areas under 70 percent with at least five answers for Slaba područja", () => {
		const weak = areaQuestions("meteorologija").slice(0, 5);
		const strong = areaQuestions("propisi").slice(0, 5);

		const attempts = [
			...weak.map((q, index) =>
				testAttempt({ questionId: q.id, correct: index === 0 }),
			),
			...strong.map((q) => testAttempt({ questionId: q.id, correct: true })),
		];

		const ids = modeQuestionIds(
			course,
			{ mode: "slabo", level: "B" },
			context({ attempts }),
		);

		const areas = new Set(getQuestions(course, { ids }).map((q) => q.area));

		expect([...areas]).toEqual(["meteorologija"]);
		expect(ids).toHaveLength(
			practicePool(course, "B", { area: "meteorologija" }).length,
		);
	});

	it("finds no weak area with fewer than five answers", () => {
		const attempts = areaQuestions("meteorologija")
			.slice(0, 4)
			.map((q) => testAttempt({ questionId: q.id, correct: false }));

		expect(
			modeQuestionIds(
				course,
				{ mode: "slabo", level: "B" },
				context({ attempts }),
			),
		).toEqual([]);
	});
});

describe("selectPracticeQuestions", () => {
	it("cuts the set to its length, or keeps all with sve", () => {
		const request = { mode: "mjesovito", level: "B" } as const;

		expect(
			selectPracticeQuestions(course, { ...request, length: 10 }, context(), 1),
		).toHaveLength(10);
		expect(
			selectPracticeQuestions(
				course,
				{ ...request, length: "sve" },
				context(),
				1,
			),
		).toHaveLength(practicePool(course, "B").length);
	});

	it("gives the same order for the same seed and another for a new one", () => {
		const request = { mode: "mjesovito", level: "B", length: 20 } as const;
		const ids = (seed: number) =>
			selectPracticeQuestions(course, request, context(), seed).map(
				(q) => q.id,
			);

		expect(ids(7)).toEqual(ids(7));
		expect(ids(7)).not.toEqual(ids(8));
	});

	it("asks the lesson's own questions first and fills up from its area", () => {
		const lesson = "kardinalne-oznake";
		const own = course.questions.filter((q) => q.lesson === lesson).length;
		const set = selectPracticeQuestions(
			course,
			{
				mode: "podrucje",
				level: "B",
				area: "plovne-oznake",
				lesson,
				length: 20,
			},
			context(),
			3,
		);

		expect(set).toHaveLength(20);
		expect(set.slice(0, own).every((q) => q.lesson === lesson)).toBe(true);
		expect(set.every((q) => q.area === "plovne-oznake")).toBe(true);
	});
});

describe("Još 10", () => {
	const request = {
		mode: "podrucje",
		area: "meteorologija",
		level: "B",
		length: 10,
	} as const;

	it("leaves out the questions just asked while enough others remain", () => {
		const firstSet = selectPracticeQuestions(course, request, context(), 1);
		const recent = firstSet.map((q) => q.id);
		const next = selectPracticeQuestions(course, request, context(), 2, {
			recent,
		});

		expect(next).toHaveLength(10);
		expect(next.some((q) => recent.includes(q.id))).toBe(false);
	});

	it("falls back to the whole pool when too few others remain", () => {
		const pool = practicePool(course, "B", { area: "meteorologija" });
		const recent = pool.slice(0, pool.length - 5).map((q) => q.id);

		expect(
			selectPracticeQuestions(course, request, context(), 2, { recent }),
		).toHaveLength(10);
	});

	it("drops the mistakes just answered right from Pogrešni", () => {
		const [wrongOne, wrongTwo] = areaQuestions("meteorologija");

		if (!wrongOne || !wrongTwo) {
			throw new Error("The course needs meteorology questions");
		}

		const progress = {
			attempts: [
				testAttempt({
					questionId: wrongOne.id,
					correct: false,
					sessionId: "s1",
				}),
				testAttempt({
					questionId: wrongTwo.id,
					correct: false,
					sessionId: "s1",
				}),
				testAttempt({
					questionId: wrongOne.id,
					correct: true,
					sessionId: "s2",
				}),
				testAttempt({
					questionId: wrongTwo.id,
					correct: false,
					sessionId: "s2",
				}),
			],
		};

		const exclusions = againExclusions("pogresni", [
			{ questionId: wrongOne.id, selected: ["a"], correct: true },
			{ questionId: wrongTwo.id, selected: ["b"], correct: false },
		]);

		expect(exclusions.drop).toEqual([wrongOne.id]);
		expect(
			selectPracticeQuestions(
				course,
				{ mode: "pogresni", level: "B", length: 10 },
				context(progress),
				1,
				exclusions,
			).map((q) => q.id),
		).toEqual([wrongTwo.id]);
	});

	it("drops nothing for the other modes", () => {
		expect(
			againExclusions("mjesovito", [
				{ questionId: "q-1", selected: ["a"], correct: true },
			]),
		).toEqual({ recent: ["q-1"], drop: [] });
	});
});
