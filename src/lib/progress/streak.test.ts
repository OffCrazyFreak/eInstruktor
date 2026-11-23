import { describe, expect, it } from "vitest";
import { streak } from "@/lib/progress/streak";

const TODAY = "2026-11-23";

describe("streak", () => {
	it("is empty without study days", () => {
		expect(streak([], TODAY)).toEqual({
			daysThisWeek: 0,
			run: 0,
			studiedToday: false,
		});
	});

	it("counts study days among the last seven, today included", () => {
		const days = ["2026-11-16", "2026-11-17", "2026-11-20", "2026-11-23"];

		expect(streak(days, TODAY).daysThisWeek).toBe(3);
	});

	it("keeps the run going while today is still open", () => {
		expect(streak(["2026-11-21", "2026-11-22"], TODAY)).toMatchObject({
			run: 2,
			studiedToday: false,
		});
	});

	it("skips over one missed day a week", () => {
		const days = ["2026-11-19", "2026-11-20", "2026-11-22", "2026-11-23"];

		expect(streak(days, TODAY).run).toBe(4);
	});

	it("ends the run at a second missed day within the week", () => {
		const days = [
			"2026-11-17",
			"2026-11-19",
			"2026-11-21",
			"2026-11-22",
			"2026-11-23",
		];

		expect(streak(days, TODAY).run).toBe(4);
	});

	it("ends the run at two missed days in a row", () => {
		expect(streak(["2026-11-18", "2026-11-19", "2026-11-22"], TODAY).run).toBe(
			1,
		);
	});
});
