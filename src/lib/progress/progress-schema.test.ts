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

describe("hasAnyProgress", () => {
	it("is false for a first visit and true once anything is saved", () => {
		expect(hasAnyProgress(EMPTY_PROGRESS)).toBe(false);
		expect(hasAnyProgress({ ...EMPTY_PROGRESS, targetLevel: "B" })).toBe(true);
	});
});
