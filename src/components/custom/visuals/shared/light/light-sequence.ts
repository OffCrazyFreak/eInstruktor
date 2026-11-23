import type {
	ILightCharacteristic,
	LightColor,
} from "@/components/custom/visuals/shared/light/light-code";
import { MORSE_CODE } from "@/components/custom/visuals/shared/light/morse-code";

export interface ILightSegment {
	on: boolean;
	color: LightColor;
	/** Seconds. */
	duration: number;
}

/** Display timings in seconds; Q and VQ match their official rates (60 and 120 per minute). UQ is slowed to under 3 flashes a second, the WCAG limit for flashing content. */
const TIMING = {
	flash: 0.5,
	flashGap: 1,
	groupGap: 2,
	longFlash: 2,
	eclipse: 1,
	quick: { on: 0.3, off: 0.7 },
	"very-quick": { on: 0.2, off: 0.3 },
	"ultra-quick": { on: 0.15, off: 0.2 },
	morseDot: 0.5,
	morseDash: 1.5,
	morseLetterGap: 1.5,
	alternatingOn: 1,
	alternatingOff: 0.5,
	minimumTail: 2,
} as const;

/** One full period of the light as on/off segments, in the given colour (sector lights show one colour at a time). */
export function buildLightSequence(
	light: ILightCharacteristic,
	color: LightColor = light.colors[0] ?? "white",
): ILightSegment[] {
	const active = activeSegments(light, color);

	if (light.rhythm === "fixed") {
		return [lit(light.period ?? 2, color)];
	}

	const repeatsWithoutTail =
		isContinuousQuick(light) ||
		light.rhythm === "isophase" ||
		(light.rhythm === "alternating" && light.period === null);

	if (repeatsWithoutTail) {
		return active;
	}

	if (light.rhythm === "occulting") {
		const litTime = Math.max(1, (light.period ?? 4) - total(active));

		return [lit(litTime, color), ...active];
	}

	const flashes = trimTrailingDark(active);
	const tail = Math.max(
		TIMING.minimumTail,
		(light.period ?? 0) - total(flashes),
	);

	return [...flashes, dark(tail, color)];
}

export function total(segments: readonly ILightSegment[]): number {
	return segments.reduce((sum, segment) => sum + segment.duration, 0);
}

function isContinuousQuick(light: ILightCharacteristic): boolean {
	return (
		(light.rhythm === "quick" ||
			light.rhythm === "very-quick" ||
			light.rhythm === "ultra-quick") &&
		light.groups.length === 0 &&
		!light.plusLongFlash
	);
}

function activeSegments(
	light: ILightCharacteristic,
	color: LightColor,
): ILightSegment[] {
	const groups = light.groups.length > 0 ? light.groups : [1];

	switch (light.rhythm) {
		case "fixed":
			return [];

		case "flash":
		case "long-flash": {
			const length = light.rhythm === "flash" ? TIMING.flash : TIMING.longFlash;

			return groups.flatMap((count, index) => [
				...(index > 0 ? [dark(TIMING.groupGap - TIMING.flashGap, color)] : []),
				...repeat(count, () => [
					lit(length, color),
					dark(TIMING.flashGap, color),
				]),
			]);
		}

		case "quick":
		case "very-quick":
		case "ultra-quick": {
			const rate = TIMING[light.rhythm];
			const flashes = repeat(light.groups[0] ?? 1, () => [
				lit(rate.on, color),
				dark(rate.off, color),
			]);

			return light.plusLongFlash
				? [...flashes, lit(TIMING.longFlash, color), dark(rate.off, color)]
				: flashes;
		}

		case "occulting":
			return groups.flatMap((count) =>
				repeat(count, (index) => [
					...(index > 0 ? [lit(TIMING.eclipse, color)] : []),
					dark(TIMING.eclipse, color),
				]),
			);

		case "isophase": {
			const half = (light.period ?? 4) / 2;

			return [lit(half, color), dark(half, color)];
		}

		case "morse":
			return [...(light.morse ?? "A")].flatMap((letter, index) => [
				...(index > 0
					? [dark(TIMING.morseLetterGap - TIMING.morseDot, color)]
					: []),
				...[...(MORSE_CODE[letter] ?? ".-")].flatMap((symbol) => [
					lit(symbol === "." ? TIMING.morseDot : TIMING.morseDash, color),
					dark(TIMING.morseDot, color),
				]),
			]);

		case "alternating":
			return light.colors.flatMap((tint) => [
				lit(TIMING.alternatingOn, tint),
				dark(TIMING.alternatingOff, color),
			]);
	}
}

function lit(duration: number, color: LightColor): ILightSegment {
	return { on: true, color, duration };
}

function dark(duration: number, color: LightColor): ILightSegment {
	return { on: false, color, duration };
}

function repeat(
	count: number,
	build: (index: number) => ILightSegment[],
): ILightSegment[] {
	return Array.from({ length: count }, (_, index) => build(index)).flat();
}

function trimTrailingDark(segments: ILightSegment[]): ILightSegment[] {
	const last = segments.at(-1);

	return last && !last.on ? segments.slice(0, -1) : segments;
}
