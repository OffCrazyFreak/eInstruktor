import { describe, expect, it } from "vitest";
import { quadrantOf } from "@/components/custom/visuals/cardinal-quadrant/quadrant-math";
import { bearingFrom } from "@/components/custom/visuals/shared/bearing";

describe("bearingFrom", () => {
	it("measures clockwise from north with screen y pointing down", () => {
		expect(bearingFrom(0, -10)).toBe(0);
		expect(bearingFrom(10, 0)).toBe(90);
		expect(bearingFrom(0, 10)).toBe(180);
		expect(bearingFrom(-10, 0)).toBe(270);
	});
});

describe("quadrantOf", () => {
	it("splits the circle at NE, SE, SW and NW", () => {
		expect(quadrantOf(0)).toBe("N");
		expect(quadrantOf(44.9)).toBe("N");
		expect(quadrantOf(45)).toBe("E");
		expect(quadrantOf(134)).toBe("E");
		expect(quadrantOf(135)).toBe("S");
		expect(quadrantOf(225)).toBe("W");
		expect(quadrantOf(314)).toBe("W");
		expect(quadrantOf(315)).toBe("N");
	});

	it("accepts bearings outside 0 to 360", () => {
		expect(quadrantOf(-10)).toBe("N");
		expect(quadrantOf(450)).toBe("E");
	});
});
