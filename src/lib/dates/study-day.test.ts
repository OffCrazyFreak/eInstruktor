import { describe, expect, it } from "vitest";
import { addDays, previousDay, toStudyDay } from "@/lib/dates/study-day";

describe("toStudyDay", () => {
	it("uses Zagreb winter time (UTC+1)", () => {
		expect(toStudyDay(new Date("2026-01-15T22:59:00Z"))).toBe("2026-01-15");
		expect(toStudyDay(new Date("2026-01-15T23:00:00Z"))).toBe("2026-01-16");
	});

	it("uses Zagreb summer time (UTC+2)", () => {
		expect(toStudyDay(new Date("2026-07-01T21:59:00Z"))).toBe("2026-07-01");
		expect(toStudyDay(new Date("2026-07-01T22:00:00Z"))).toBe("2026-07-02");
	});
});

describe("addDays and previousDay", () => {
	it("cross the spring DST change on 2026-03-29", () => {
		expect(addDays("2026-03-28", 1)).toBe("2026-03-29");
		expect(addDays("2026-03-29", 1)).toBe("2026-03-30");
		expect(previousDay("2026-03-30")).toBe("2026-03-29");
	});

	it("cross the autumn DST change on 2026-10-25", () => {
		expect(addDays("2026-10-24", 2)).toBe("2026-10-26");
		expect(previousDay("2026-10-26")).toBe("2026-10-25");
		expect(previousDay("2026-10-25")).toBe("2026-10-24");
	});

	it("cross month and year ends", () => {
		expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
		expect(previousDay("2026-03-01")).toBe("2026-02-28");
		expect(addDays("2026-11-23", 30)).toBe("2026-12-23");
	});
});
