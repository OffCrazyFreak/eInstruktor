import { describe, expect, it } from "vitest";
import {
	maestralStrength,
	WIND_IDS,
	WINDS,
} from "@/components/custom/visuals/adriatic-winds/winds";

describe("Adriatic winds", () => {
	it("puts the eight winds on the eight points in clockwise order", () => {
		expect(WIND_IDS.map((id) => WINDS[id].direction)).toEqual([
			"N",
			"NE",
			"E",
			"SE",
			"S",
			"SW",
			"W",
			"NW",
		]);
		expect(WINDS.bura.from).toBe(45);
		expect(WINDS.jugo.from).toBe(135);
	});

	it("peaks the maestral in the early afternoon and calms it at night", () => {
		expect(maestralStrength(7)).toBe(0);
		expect(maestralStrength(14)).toBe(1);
		expect(maestralStrength(12)).toBeGreaterThan(maestralStrength(10));
		expect(maestralStrength(21)).toBe(0);
	});
});
