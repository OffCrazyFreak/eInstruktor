import {
	lightSignature,
	type VesselId,
} from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";

export const QUIZ_VESSELS: readonly VesselId[] = [
	"power-12-50m",
	"power-over-50m",
	"sailing-under-20m",
	"trawler",
	"fishing",
	"towing",
	"pilot",
	"not-under-command",
	"restricted",
	"anchored",
	"aground",
];
export const QUIZ_BEARINGS = [0, 90, 270];

/** Vessels that look different from `vessel` at this bearing, so only one choice can be right. */
export function distractors(vessel: VesselId, bearing: number): VesselId[] {
	const answer = lightSignature(vessel, bearing);

	return QUIZ_VESSELS.filter(
		(id) => id !== vessel && lightSignature(id, bearing) !== answer,
	);
}
