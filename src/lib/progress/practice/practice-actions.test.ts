import { describe, expect, it } from "vitest";
import { gradeCard } from "@/lib/progress/practice/practice-actions";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";

const noon = Date.parse("2026-11-20T11:00:00Z");

describe("gradeCard", () => {
	it("moves a known card up a box and a missed one to box 1", () => {
		const known = gradeCard(EMPTY_PROGRESS, "qa-001", true, noon);

		expect(known.cardBoxes["qa-001"]).toEqual({
			box: 2,
			reviewedOn: "2026-11-20",
		});

		const missed = gradeCard(known, "qa-001", false, noon);

		expect(missed.cardBoxes["qa-001"]).toEqual({
			box: 1,
			reviewedOn: "2026-11-20",
		});
	});

	it("leaves question boxes, attempts and study days alone", () => {
		const graded = gradeCard(EMPTY_PROGRESS, "qa-001", true, noon);

		expect(graded.questionBoxes).toEqual({});
		expect(graded.attempts).toEqual([]);
		expect(graded.studyDays).toEqual([]);
	});
});
