import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";

export type LightKind =
	| "masthead"
	| "side-port"
	| "side-starboard"
	| "stern"
	| "towing"
	| "all-round";

export interface IShipLight {
	kind: LightKind;
	color: LightColor;
	/** -1 at the stern to 1 at the bow. */
	along: number;
	/** -1 to port, 1 to starboard. */
	across: number;
	/** 0 at the waterline to 1 at the masthead top. */
	height: number;
}

/** Arc each light shows, clockwise from the bow in degrees (COLREG rule 21): masthead 225, sides 112.5, stern and towing 135. */
export const SECTORS: Record<LightKind, [number, number]> = {
	masthead: [247.5, 112.5],
	"side-starboard": [0, 112.5],
	"side-port": [247.5, 360],
	stern: [112.5, 247.5],
	towing: [112.5, 247.5],
	"all-round": [0, 360],
};

function light(
	kind: LightKind,
	color: LightColor,
	along: number,
	height: number,
	across = 0,
): IShipLight {
	return { kind, color, along, across, height };
}

const SIDES = [
	light("side-port", "red", 0.25, 0.3, -0.45),
	light("side-starboard", "green", 0.25, 0.3, 0.45),
];
const STERN = light("stern", "white", -0.95, 0.25);
const UNDERWAY = [...SIDES, STERN];

export const VESSEL_LIGHTS = {
	"power-under-7m": [light("all-round", "white", 0, 0.45)],
	"power-under-12m": [
		light("all-round", "white", -0.2, 0.6),
		light("side-port", "red", 0.65, 0.25, -0.25),
		light("side-starboard", "green", 0.65, 0.25, 0.25),
	],
	"power-12-50m": [light("masthead", "white", 0.4, 0.75), ...UNDERWAY],
	"power-over-50m": [
		light("masthead", "white", 0.55, 0.6),
		light("masthead", "white", -0.3, 0.9),
		...UNDERWAY,
	],
	"sailing-under-20m": [
		light("side-port", "red", 0.8, 0.22, -0.3),
		light("side-starboard", "green", 0.8, 0.22, 0.3),
		STERN,
	],
	"motor-sailing": [light("masthead", "white", 0.4, 0.7), ...UNDERWAY],
	rowing: [light("all-round", "white", 0, 0.32)],
	trawler: [
		light("all-round", "green", 0.2, 0.82),
		light("all-round", "white", 0.2, 0.66),
		...UNDERWAY,
	],
	fishing: [
		light("all-round", "red", 0.2, 0.82),
		light("all-round", "white", 0.2, 0.66),
		...UNDERWAY,
	],
	towing: [
		light("masthead", "white", 0.4, 0.9),
		light("masthead", "white", 0.4, 0.75),
		...UNDERWAY,
		light("towing", "yellow", -0.95, 0.42),
	],
	pilot: [
		light("all-round", "white", 0, 0.85),
		light("all-round", "red", 0, 0.7),
		...UNDERWAY,
	],
	"not-under-command": [
		light("all-round", "red", 0, 0.85),
		light("all-round", "red", 0, 0.7),
	],
	restricted: [
		light("all-round", "red", -0.15, 0.92),
		light("all-round", "white", -0.15, 0.78),
		light("all-round", "red", -0.15, 0.64),
		light("masthead", "white", 0.55, 0.62),
		...UNDERWAY,
	],
	anchored: [light("all-round", "white", 0.8, 0.55)],
	aground: [
		light("all-round", "white", 0.8, 0.55),
		light("all-round", "red", 0, 0.85),
		light("all-round", "red", 0, 0.7),
	],
} as const satisfies Record<string, IShipLight[]>;

export type VesselId = keyof typeof VESSEL_LIGHTS;

export const VESSEL_IDS = Object.keys(VESSEL_LIGHTS) as VesselId[];

/** Whether an observer at `bearing` degrees clockwise from the vessel's bow can see this light. Sector edges count as visible. */
export function isVisibleFrom(shipLight: IShipLight, bearing: number): boolean {
	const [start, end] = SECTORS[shipLight.kind];
	const angle = ((bearing % 360) + 360) % 360;

	if (end - start >= 360) {
		return true;
	}

	if (start <= end) {
		return (angle >= start && angle <= end) || (end === 360 && angle === 0);
	}

	return angle >= start || angle <= end;
}

/** Horizontal position as the observer sees it, -1 left to 1 right. */
export function screenX(shipLight: IShipLight, bearing: number): number {
	const radians = (bearing * Math.PI) / 180;

	return (
		-shipLight.across * Math.cos(radians) + shipLight.along * Math.sin(radians)
	);
}

/**
 * What a learner can tell apart at night: the colours in each vertical column, top to bottom.
 * Two vessels with the same signature from a bearing look identical from there.
 */
export function lightSignature(vessel: VesselId, bearing: number): string {
	const columns = new Map<number, IShipLight[]>();

	for (const shipLight of VESSEL_LIGHTS[vessel]) {
		if (!isVisibleFrom(shipLight, bearing)) {
			continue;
		}

		const column = Math.round(screenX(shipLight, bearing) * 10) / 10;
		columns.set(column, [...(columns.get(column) ?? []), shipLight]);
	}

	return [...columns.entries()]
		.sort(([left], [right]) => left - right)
		.map(([, lights]) =>
			lights
				.sort((upper, lower) => lower.height - upper.height)
				.map((shipLight) => shipLight.color)
				.join("+"),
		)
		.join(" | ");
}
