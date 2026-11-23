import { normalizeDegrees } from "@/components/custom/visuals/shared/bearing";

const POINT_NAMES = [
	["N", "sjever"],
	["NE", "sjeveroistok"],
	["E", "istok"],
	["SE", "jugoistok"],
	["S", "jug"],
	["SW", "jugozapad"],
	["W", "zapad"],
	["NW", "sjeverozapad"],
] as const;

/** Nearest of the eight main points, e.g. 135 is SE (jugoistok). */
export function pointName(course: number): { code: string; name: string } {
	const [code, name] =
		POINT_NAMES[Math.round(normalizeDegrees(course) / 45) % 8] ??
		POINT_NAMES[0];

	return { code, name };
}

/** Quadrant I is 0 to 90, II 90 to 180 and so on; exactly 0, 90, 180 or 270 sits on a border. */
export function quadrantName(course: number): string {
	const degrees = normalizeDegrees(course);
	const names = ["I", "II", "III", "IV"];

	if (degrees % 90 === 0) {
		const index = degrees / 90;

		return `granica kvadranata ${names[(index + 3) % 4]} i ${names[index]}`;
	}

	return `kvadrant ${names[Math.floor(degrees / 90)]}`;
}

export function reciprocal(course: number): number {
	return normalizeDegrees(course + 180);
}

/** East variation and deviation are plus, west minus; going from chart to compass you subtract them. */
export function magneticFromTrue(
	trueCourse: number,
	variation: number,
): number {
	return normalizeDegrees(trueCourse - variation);
}

export function compassFromMagnetic(
	magneticCourse: number,
	deviation: number,
): number {
	return normalizeDegrees(magneticCourse - deviation);
}

export function trueFromCompass(
	compassCourse: number,
	deviation: number,
	variation: number,
): number {
	return normalizeDegrees(compassCourse + deviation + variation);
}

export function formatCourse(course: number): string {
	const rounded = Math.round(normalizeDegrees(course) * 10) / 10;
	const [whole, fraction] = String(rounded).split(".");

	return `${(whole ?? "0").padStart(3, "0")}${fraction ? `,${fraction}` : ""}°`;
}

/** Signed with E or W, the way it is printed beside the compass rose on a chart. */
export function formatCorrection(value: number): string {
	if (value === 0) {
		return "0°";
	}

	return `${value > 0 ? "+" : "-"}${String(Math.abs(value)).replace(".", ",")}° ${value > 0 ? "E" : "W"}`;
}
