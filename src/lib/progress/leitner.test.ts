import { describe, expect, it } from "vitest";
import { dueIds, isDue, nextLeitnerEntry } from "@/lib/progress/leitner";

describe("nextLeitnerEntry", () => {
	it("sends a wrong answer to box 1", () => {
		expect(
			nextLeitnerEntry(
				{ box: 3, reviewedOn: "2026-11-01" },
				false,
				"2026-11-20",
			),
		).toEqual({
			box: 1,
			reviewedOn: "2026-11-20",
		});
	});

	it("moves a right answer up one box and stops at box 3", () => {
		expect(nextLeitnerEntry(undefined, true, "2026-11-20").box).toBe(2);
		expect(
			nextLeitnerEntry({ box: 2, reviewedOn: "2026-11-18" }, true, "2026-11-20")
				.box,
		).toBe(3);
		expect(
			nextLeitnerEntry({ box: 3, reviewedOn: "2026-11-14" }, true, "2026-11-20")
				.box,
		).toBe(3);
		expect(
			nextLeitnerEntry({ box: 1, reviewedOn: "2026-11-20" }, true, "2026-11-20")
				.box,
		).toBe(2);
	});

	it("keeps an item that is not due yet in its box after a right answer", () => {
		const waiting = { box: 2, reviewedOn: "2026-11-19" } as const;

		expect(nextLeitnerEntry(waiting, true, "2026-11-20")).toBe(waiting);
		expect(nextLeitnerEntry(waiting, false, "2026-11-20").box).toBe(1);
	});
});

describe("isDue", () => {
	it("keeps box 1 due every day, box 2 after 2 days and box 3 after 6", () => {
		expect(isDue({ box: 1, reviewedOn: "2026-11-20" }, "2026-11-20")).toBe(
			true,
		);
		expect(isDue({ box: 2, reviewedOn: "2026-11-20" }, "2026-11-21")).toBe(
			false,
		);
		expect(isDue({ box: 2, reviewedOn: "2026-11-20" }, "2026-11-22")).toBe(
			true,
		);
		expect(isDue({ box: 3, reviewedOn: "2026-11-20" }, "2026-11-25")).toBe(
			false,
		);
		expect(isDue({ box: 3, reviewedOn: "2026-11-20" }, "2026-11-26")).toBe(
			true,
		);
	});

	it("lists the due ids", () => {
		const boxes = {
			a: { box: 1, reviewedOn: "2026-11-20" },
			b: { box: 3, reviewedOn: "2026-11-20" },
		} as const;

		expect(dueIds(boxes, "2026-11-21")).toEqual(["a"]);
		expect(dueIds(boxes, "2026-11-26", ["b"])).toEqual(["b"]);
		expect(dueIds(boxes, "2026-11-26", [])).toEqual([]);
	});
});
