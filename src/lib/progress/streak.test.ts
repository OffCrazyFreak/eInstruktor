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

	it("allows the next skip once a week has passed since the last one", () => {
		const days = [
			"2026-11-08",
			"2026-11-09",
			"2026-11-11",
			"2026-11-12",
			"2026-11-13",
			"2026-11-14",
			"2026-11-15",
			"2026-11-16",
			"2026-11-17",
			"2026-11-19",
			"2026-11-20",
			"2026-11-21",
			"2026-11-22",
			"2026-11-23",
		];

		expect(streak(days, TODAY).run).toBe(14);
	});

	it("stops at a second skip six days after the first", () => {
		const days = [
			"2026-11-10",
			"2026-11-11",
			"2026-11-12",
			"2026-11-14",
			"2026-11-15",
			"2026-11-16",
			"2026-11-17",
			"2026-11-18",
			"2026-11-20",
			"2026-11-21",
			"2026-11-22",
			"2026-11-23",
		];

		expect(streak(days, TODAY).run).toBe(9);
	});

	it("counts days across the autumn clock change", () => {
		const days = ["2026-10-24", "2026-10-25", "2026-10-26"];

		expect(streak(days, "2026-10-26")).toMatchObject({
			run: 3,
			daysThisWeek: 3,
		});
	});
});
