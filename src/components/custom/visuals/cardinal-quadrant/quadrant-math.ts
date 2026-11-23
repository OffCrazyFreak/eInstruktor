export const QUADRANTS = ["N", "E", "S", "W"] as const;

export type Quadrant = (typeof QUADRANTS)[number];

export const QUADRANT_MARK = {
	N: "north",
	E: "east",
	S: "south",
	W: "west",
} as const;

/** Bearing in degrees (0 = north, clockwise) of a point from the hazard, in screen coordinates where y grows down. */
export function bearingFrom(dx: number, dy: number): number {
	const degrees = (Math.atan2(dx, -dy) * 180) / Math.PI;

	return (degrees + 360) % 360;
}

/** The north quadrant runs from NW (315) to NE (45), and so on clockwise. */
export function quadrantOf(bearing: number): Quadrant {
	const normalized = ((bearing % 360) + 360) % 360;

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
