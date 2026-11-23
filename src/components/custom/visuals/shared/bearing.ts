/** Bearing in degrees (0 = north, clockwise) of an offset in screen coordinates, where y grows downwards. */
export function bearingFrom(dx: number, dy: number): number {
	const degrees = (Math.atan2(dx, -dy) * 180) / Math.PI;

	return (degrees + 360) % 360;
}

export function normalizeDegrees(degrees: number): number {
	return ((degrees % 360) + 360) % 360;
}
