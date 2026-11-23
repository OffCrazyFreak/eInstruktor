import {
	bearingFrom,
	normalizeDegrees,
} from "@/components/custom/visuals/shared/bearing";

export type VesselKind = "power" | "sail";

export interface IVesselState {
	x: number;
	y: number;
	/** Degrees clockwise from north (up on screen). */
	heading: number;
	kind: VesselKind;
}

export type Situation =
	| "head-on"
	| "crossing"
	| "overtaking"
	| "sail-opposite-tacks"
	| "sail-same-tack"
	| "power-vs-sail";

export interface IVerdict {
	situation: Situation;
	/** Which vessel keeps clear: the first one passed in, the second, or both. */
	giveWay: "a" | "b" | "both";
	rule: string;
}

const HEAD_ON_TOLERANCE = 6;

/** Where `target` is as seen from `observer`, in degrees clockwise from the observer's bow. */
export function relativeBearing(
	observer: IVesselState,
	target: IVesselState,
): number {
	return normalizeDegrees(
		bearingFrom(target.x - observer.x, target.y - observer.y) -
			observer.heading,
	);
}

/** More than 22.5 degrees abaft the beam, the arc of the stern light (COLREG rule 13). */
function isAbaftTheBeam(relative: number): boolean {
	return relative > 112.5 && relative < 247.5;
}

/** Wind on the starboard side means starboard tack (COLREG rule 12). */
export function tackOf(
	vessel: IVesselState,
	windFrom: number,
): "port" | "starboard" {
	const windSide = normalizeDegrees(windFrom - vessel.heading);

	return windSide > 0 && windSide < 180 ? "starboard" : "port";
}

function windwardness(vessel: IVesselState, windFrom: number): number {
	const radians = (windFrom * Math.PI) / 180;

	return vessel.x * Math.sin(radians) - vessel.y * Math.cos(radians);
}

/** Decides who keeps out of the way, following COLREG rules 12 to 15 and 18 in that order of precedence. */
export function classifySituation(
	a: IVesselState,
	b: IVesselState,
	windFrom = 0,
): IVerdict {
	if (isAbaftTheBeam(relativeBearing(b, a))) {
		return { situation: "overtaking", giveWay: "a", rule: "COLREG pravilo 13" };
	}

	if (isAbaftTheBeam(relativeBearing(a, b))) {
		return { situation: "overtaking", giveWay: "b", rule: "COLREG pravilo 13" };
	}

	if (a.kind !== b.kind) {
		return {
			situation: "power-vs-sail",
			giveWay: a.kind === "power" ? "a" : "b",
			rule: "COLREG pravilo 18",
		};
	}

	if (a.kind === "sail") {
		const tackA = tackOf(a, windFrom);
		const tackB = tackOf(b, windFrom);

		if (tackA !== tackB) {
			return {
				situation: "sail-opposite-tacks",
				giveWay: tackA === "port" ? "a" : "b",
				rule: "COLREG pravilo 12",
			};
		}

		return {
			situation: "sail-same-tack",
			giveWay:
				windwardness(a, windFrom) > windwardness(b, windFrom) ? "a" : "b",
			rule: "COLREG pravilo 12",
		};
	}

	const aheadOfA = Math.min(relativeBearing(a, b), 360 - relativeBearing(a, b));
	const aheadOfB = Math.min(relativeBearing(b, a), 360 - relativeBearing(b, a));

	if (aheadOfA <= HEAD_ON_TOLERANCE && aheadOfB <= HEAD_ON_TOLERANCE) {
		return { situation: "head-on", giveWay: "both", rule: "COLREG pravilo 14" };
	}

	return {
		situation: "crossing",
		giveWay: relativeBearing(a, b) < 180 ? "a" : "b",
		rule: "COLREG pravilo 15",
	};
}
