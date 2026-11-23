import { describe, expect, it } from "vitest";
import { seededShuffle } from "@/lib/content/seeded-shuffle";

const items = Array.from({ length: 50 }, (_, index) => index);

describe("seededShuffle", () => {
	it("gives the same order for the same seed", () => {
		expect(seededShuffle(items, 42)).toEqual(seededShuffle(items, 42));
	});

	it("gives a different order for another seed", () => {
		expect(seededShuffle(items, 42)).not.toEqual(seededShuffle(items, 43));
	});

	it("keeps every item and leaves the input untouched", () => {
		const shuffled = seededShuffle(items, 7);

		expect([...shuffled].sort((a, b) => a - b)).toEqual(items);
		expect(items[0]).toBe(0);
		expect(items[49]).toBe(49);
	});
});
