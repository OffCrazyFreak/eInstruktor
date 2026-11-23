import type {
	ILightCharacteristic,
	LightColor,
} from "@/components/custom/visuals/shared/light/light-code";

export interface ILightSegment {
	on: boolean;
	color: LightColor;
	/** Seconds. */
	duration: number;
}

/** Display timings in seconds; Q and VQ match their official rates (60 and 120 per minute). */
const TIMING = {
	flash: 0.5,
	flashGap: 1,
	groupGap: 2,
	longFlash: 2,
	eclipse: 1,
	quick: { on: 0.3, off: 0.7 },
	"very-quick": { on: 0.2, off: 0.3 },
	"ultra-quick": { on: 0.1, off: 0.15 },
	morseDot: 0.5,
	morseDash: 1.5,
	alternatingOn: 1,
	alternatingOff: 0.5,
	minimumTail: 2,
} as const;

const MORSE: Record<string, string> = {
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	K: "-.-",
	N: "-.",
	O: "---",
	R: ".-.",
	S: "...",
	U: "..-",
	W: ".--",
};

/** One full period of the light as on/off segments, in the given colour (sector lights show one colour at a time). */
export function buildLightSequence(
	light: ILightCharacteristic,
	color: LightColor = light.colors[0] ?? "white",
): ILightSegment[] {
	const on = (duration: number, tint = color): ILightSegment => ({
		on: true,
		color: tint,
		duration,
	});
	const off = (duration: number): ILightSegment => ({
		on: false,
		color,
		duration,
	});

	const active = activeSegments(light, on, off);

	if (light.rhythm === "fixed") {
		return [on(light.period ?? 2)];
	}

	const repeatsWithoutTail =
		isContinuousQuick(light) ||
		light.rhythm === "isophase" ||
		(light.rhythm === "alternating" && light.period === null);

	if (repeatsWithoutTail) {
		return active;
	}

	if (light.rhythm === "occulting") {
		const lit = Math.max(1, (light.period ?? 4) - total(active));

		return [on(lit), ...active];
	}

	const flashes = trimTrailingDark(active);
	const tail = Math.max(
		TIMING.minimumTail,
		(light.period ?? 0) - total(flashes),
	);

	return [...flashes, off(tail)];
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
	on: (duration: number, tint?: LightColor) => ILightSegment,
	off: (duration: number) => ILightSegment,
): ILightSegment[] {
	const groups = light.groups.length > 0 ? light.groups : [1];

	switch (light.rhythm) {
		case "fixed":
			return [];

		case "flash":
		case "long-flash": {
			const length = light.rhythm === "flash" ? TIMING.flash : TIMING.longFlash;

			return groups.flatMap((count, index) => [
				...(index > 0 ? [off(TIMING.groupGap - TIMING.flashGap)] : []),
				...repeat(count, () => [on(length), off(TIMING.flashGap)]),
			]);
		}

		case "quick":
		case "very-quick":
		case "ultra-quick": {
			const rate = TIMING[light.rhythm];
			const flashes = repeat(light.groups[0] ?? 1, () => [
				on(rate.on),
				off(rate.off),
			]);

			return light.plusLongFlash
				? [...flashes, on(TIMING.longFlash), off(rate.off)]
				: flashes;
		}

		case "occulting":
			return groups.flatMap((count) =>
				repeat(count, (index) => [
					...(index > 0 ? [on(TIMING.eclipse)] : []),
					off(TIMING.eclipse),
				]),
			);

		case "isophase": {
			const half = (light.period ?? 4) / 2;

			return [on(half), off(half)];
		}

		case "morse":
			return [...(MORSE[light.morse ?? "A"] ?? ".-")].flatMap((symbol) => [
				on(symbol === "." ? TIMING.morseDot : TIMING.morseDash),
				off(TIMING.morseDot),
			]);

		case "alternating":
			return light.colors.flatMap((tint) => [
				on(TIMING.alternatingOn, tint),
				off(TIMING.alternatingOff),
			]);
	}
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
