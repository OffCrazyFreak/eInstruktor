import { describe, expect, it } from "vitest";
import {
	CYCLES,
	middleOf,
	pistonLift,
	strokeIndexAt,
} from "@/components/custom/visuals/four-stroke-engine/engine-cycles";

describe("engine cycles", () => {
	it("runs four strokes in order over two crank turns", () => {
		expect(CYCLES["four-stroke"].map((stroke) => stroke.id)).toEqual([
			"intake",
			"compression",
			"power",
			"exhaust",
		]);
		expect(strokeIndexAt("four-stroke", 10)).toBe(0);
		expect(strokeIndexAt("four-stroke", 200)).toBe(1);
		expect(strokeIndexAt("four-stroke", 719)).toBe(3);
		expect(strokeIndexAt("four-stroke", 730)).toBe(0);
	});

	it("runs two strokes over one crank turn", () => {
		expect(CYCLES["two-stroke"]).toHaveLength(2);
		expect(strokeIndexAt("two-stroke", 270)).toBe(1);
	});

	it("puts the piston at the top at TDC and moving up during compression", () => {
		expect(pistonLift("four-stroke", 0)).toBeCloseTo(1);
		expect(pistonLift("four-stroke", 180)).toBeCloseTo(0);

		const compression = middleOf("four-stroke", "compression");

		expect(pistonLift("four-stroke", compression + 20)).toBeGreaterThan(
			pistonLift("four-stroke", compression),
		);
	});
});
