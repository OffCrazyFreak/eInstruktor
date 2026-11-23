export const AREA_IDS = [
	"IV",
	"IIIc",
	"IIIb",
	"IIIa",
	"III",
	"II",
	"I",
] as const;

export type AreaId = (typeof AREA_IDS)[number];

interface IArea {
	/** Outer limit in nautical miles from the nearest coast of the mainland or an island. */
	limit: number;
	text: string;
}

/** Pravilnik o brodicama, jahtama i čamcima (NN 13/20), article 37. */
export const AREAS: Record<AreaId, IArea> = {
	IV: {
		limit: 0,
		text: "luke, zaljevi, ušća rijeka i rijeke dokle su plovne s mora",
	},
	IIIc: { limit: 1, text: "do 1 NM od obale" },
	IIIb: { limit: 3, text: "do 3 NM od obale" },
	IIIa: { limit: 6, text: "do 6 NM od obale" },
	III: { limit: 12, text: "do 12 NM od obale" },
	II: { limit: 20, text: "do 20 NM od obale" },
	I: { limit: Number.POSITIVE_INFINITY, text: "sva mora" },
};

export const CERTIFICATE_AREAS: Record<"A" | "B", AreaId[]> = {
	A: ["IV", "IIIc", "IIIb", "IIIa"],
	B: ["IV", "IIIc", "IIIb", "IIIa", "III"],
};

/** The narrowest area that contains a boat this far from the coast; 0 means inside a harbour or bay. */
export function areaAt(distance: number): AreaId {
	if (distance <= 0) {
		return "IV";
	}

	return (
		AREA_IDS.find((id) => id !== "IV" && distance <= AREAS[id].limit) ?? "I"
	);
}

export function certificateFor(area: AreaId): "A" | "B" | null {
	if (CERTIFICATE_AREAS.A.includes(area)) {
		return "A";
	}

	return CERTIFICATE_AREAS.B.includes(area) ? "B" : null;
}
