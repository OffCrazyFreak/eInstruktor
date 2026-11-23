import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	crossedMark,
	examEndsAt,
	formatClock,
	remainingMs,
	timerMinutes,
} from "@/features/exam/utils/exam-timer";

const MINUTE = 60_000;

describe("exam timer", () => {
	it("gives the standard, doubled or no time limit", () => {
		expect(timerMinutes(course, "B", "standard")).toBe(45);
		expect(timerMinutes(course, "B", "extended")).toBe(90);
		expect(timerMinutes(course, "A", "standard")).toBe(20);
		expect(timerMinutes(course, "A", "none")).toBeNull();
	});

	it("stores the end as an absolute time", () => {
		expect(examEndsAt(1_000, 45)).toBe(1_000 + 45 * MINUTE);
		expect(examEndsAt(1_000, null)).toBeNull();
	});

	it("counts down from the wall clock, so a reload keeps the same end", () => {
		const endsAt = examEndsAt(0, 45) ?? 0;

		expect(remainingMs(endsAt, 10 * MINUTE)).toBe(35 * MINUTE);
		expect(remainingMs(endsAt, 10 * MINUTE + 1)).toBe(35 * MINUTE - 1);
		expect(remainingMs(endsAt, endsAt)).toBe(0);
		expect(remainingMs(endsAt, endsAt + 5 * MINUTE)).toBe(0);
	});

	it("formats minutes and seconds, rounding up", () => {
		expect(formatClock(45 * MINUTE)).toBe("45:00");
		expect(formatClock(59_001)).toBe("1:00");
		expect(formatClock(1)).toBe("0:01");
		expect(formatClock(0)).toBe("0:00");
		expect(formatClock(90 * MINUTE)).toBe("1:30:00");
	});

	it("announces the 10, 5 and 1 minute marks once", () => {
		expect(crossedMark(10 * MINUTE + 1, 10 * MINUTE)).toBe(10);
		expect(crossedMark(10 * MINUTE, 10 * MINUTE - 1000)).toBeNull();
		expect(crossedMark(5 * MINUTE + 500, 4 * MINUTE)).toBe(5);
		expect(crossedMark(20 * MINUTE, 30_000)).toBe(1);
		expect(crossedMark(30 * MINUTE, 29 * MINUTE)).toBeNull();
	});
});
