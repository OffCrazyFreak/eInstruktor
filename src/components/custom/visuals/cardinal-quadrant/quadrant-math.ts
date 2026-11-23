import { normalizeDegrees } from "@/components/custom/visuals/shared/bearing";

export const QUADRANTS = ["N", "E", "S", "W"] as const;

export type Quadrant = (typeof QUADRANTS)[number];

export const QUADRANT_MARK = {
	N: "north",
	E: "east",
	S: "south",
	W: "west",
} as const;

/** The north quadrant runs from NW (315) to NE (45), and so on clockwise. */
export function quadrantOf(bearing: number): Quadrant {
	const normalized = normalizeDegrees(bearing);

	if (normalized >= 315 || normalized < 45) {
		return "N";
	}

	if (normalized < 135) {
		return "E";
	}

	if (normalized < 225) {
		return "S";
	}

	return "W";
}
