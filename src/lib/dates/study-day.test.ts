import { describe, expect, it } from "vitest";
import { toStudyDay } from "@/lib/dates/study-day";

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
