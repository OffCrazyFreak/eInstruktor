import { describe, expect, it } from "vitest";
import {
	coverage,
	firstAttempts,
	recentAccuracy,
	weakGroups,
} from "@/lib/progress/accuracy";
import { testAttempt } from "@/lib/progress/test-attempts";

describe("firstAttempts", () => {
	it("keeps the first answer per question in each session", () => {
		const first = testAttempt({ correct: false });
		const repeat = testAttempt({ correct: true });
		const nextSession = testAttempt({ sessionId: "session-2" });

		expect(firstAttempts([first, repeat, nextSession])).toEqual([
			first,
			nextSession,
		]);
	});
});

describe("coverage", () => {
	it("is the share of questions answered at least once", () => {
		const attempts = [
			testAttempt({ questionId: "a" }),
			testAttempt({ questionId: "x" }),
		];

		expect(coverage(attempts, ["a", "b", "c", "d"])).toBe(0.25);
		expect(coverage(attempts, [])).toBe(0);
	});
});

describe("recentAccuracy", () => {
	it("is null before any answer in the group", () => {
		expect(recentAccuracy([testAttempt({ questionId: "x" })], ["a"])).toEqual({
			answered: 0,
			accuracy: null,
		});
	});

	it("scores only the most recent first attempts", () => {
		const old = Array.from({ length: 10 }, (_, index) =>
			testAttempt({
				questionId: "a",
				sessionId: `old-${index}`,
				correct: false,
				day: "2026-11-01",
			}),
		);
		const recent = Array.from({ length: 4 }, (_, index) =>
			testAttempt({
				questionId: "a",
				sessionId: `new-${index}`,
				correct: true,
			}),
		);

		expect(recentAccuracy([...recent, ...old], ["a"], 4)).toEqual({
			answered: 14,
			accuracy: 1,
		});
	});
});

describe("weakGroups", () => {
	const groups = [
		{ id: "slabo", questionIds: ["a"] },
		{ id: "dobro", questionIds: ["b"] },
		{ id: "malo", questionIds: ["c"] },
	];

	function answers(questionId: string, correct: number, wrong: number) {
		return [
			...Array.from({ length: correct }, (_, index) =>
				testAttempt({
					questionId,
					sessionId: `${questionId}-ok-${index}`,
					correct: true,
				}),
			),
			...Array.from({ length: wrong }, (_, index) =>
				testAttempt({
					questionId,
					sessionId: `${questionId}-no-${index}`,
					correct: false,
				}),
			),
		];
	}

	it("lists groups under 70 percent with at least 5 answers, weakest first", () => {
		const attempts = [
			...answers("a", 2, 4),
			...answers("b", 5, 1),
			...answers("c", 0, 3),
		];

		expect(weakGroups(groups, attempts).map((group) => group.id)).toEqual([
			"slabo",
		]);
	});

	it("counts a group from exactly 5 answers and below 70 percent only", () => {
		const fiveBelow = { id: "pet", questionIds: ["d"] };
		const atSeventy = { id: "sedamdeset", questionIds: ["e"] };
		const four = { id: "cetiri", questionIds: ["f"] };
		const attempts = [
			...answers("d", 3, 2),
			...answers("e", 7, 3),
			...answers("f", 0, 4),
		];

		expect(
			weakGroups([fiveBelow, atSeventy, four], attempts).map(
				(group) => group.id,
			),
		).toEqual(["pet"]);
	});

	it("returns at most three groups, weakest first", () => {
		const many = ["g", "h", "i", "j"].map((id) => ({ id, questionIds: [id] }));
		const attempts = [
			...answers("g", 3, 7),
			...answers("h", 1, 9),
			...answers("i", 2, 8),
			...answers("j", 0, 10),
		];

		expect(weakGroups(many, attempts).map((group) => group.id)).toEqual([
			"j",
			"h",
			"i",
		]);
	});
});
