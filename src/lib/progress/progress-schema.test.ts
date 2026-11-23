import { describe, expect, it } from "vitest";
import {
	EMPTY_PROGRESS,
	hasAnyProgress,
	parseProgress,
} from "@/lib/progress/progress-schema";

describe("parseProgress", () => {
	it("starts empty without stored data or with broken JSON", () => {
		expect(parseProgress(null)).toEqual(EMPTY_PROGRESS);
		expect(parseProgress("{not json")).toEqual(EMPTY_PROGRESS);
		expect(parseProgress("[]")).toEqual(EMPTY_PROGRESS);
	});

	it("keeps the valid fields when one field is damaged", () => {
		const progress = parseProgress(
			JSON.stringify({
				targetLevel: "A",
				examDate: "sutra",
				lessonsDone: { "kako-do-dozvole": 1 },
				attempts: [{ questionId: "missing the rest" }],
			}),
		);

		expect(progress.targetLevel).toBe("A");
		expect(progress.examDate).toBeNull();
		expect(progress.lessonsDone).toEqual({ "kako-do-dozvole": 1 });
		expect(progress.attempts).toEqual([]);
	});
});

describe("parseProgress element by element", () => {
	it("keeps the valid attempts, sessions, boxes and days next to a corrupt one", () => {
		const attempt = {
			id: "a1",
			questionId: "q-1",
			correct: true,
			selected: ["a"],
			mode: "practice",
			sessionId: "s1",
			answeredAt: 1,
		};
		const session = {
			id: "e1",
			level: "B",
			seed: 7,
			questionIds: ["q-1"],
			startedAt: 1,
			finishedAt: null,
			score: null,
			passed: null,
		};

		const progress = parseProgress(
			JSON.stringify({
				attempts: [attempt, { ...attempt, correct: "da" }],
				examSessions: [{ id: "broken" }, session],
				questionBoxes: {
					"q-1": { box: 2, reviewedOn: "2026-11-20" },
					"q-2": { box: 9, reviewedOn: "2026-11-20" },
				},
				cardBoxes: { c1: "box 1" },
				studyDays: ["2026-11-20", "jučer"],
				lessonsDone: { uvod: 5, drugo: "danas" },
			}),
		);

		expect(progress.attempts).toEqual([attempt]);
		expect(progress.examSessions).toEqual([session]);
		expect(progress.questionBoxes).toEqual({
			"q-1": { box: 2, reviewedOn: "2026-11-20" },
		});
		expect(progress.cardBoxes).toEqual({});
		expect(progress.studyDays).toEqual(["2026-11-20"]);
		expect(progress.lessonsDone).toEqual({ uvod: 5 });
	});
});

describe("hasAnyProgress", () => {
	it("is false for a first visit and true once anything is saved", () => {
		expect(hasAnyProgress(EMPTY_PROGRESS)).toBe(false);
		expect(hasAnyProgress({ ...EMPTY_PROGRESS, targetLevel: "B" })).toBe(true);
	});
});
