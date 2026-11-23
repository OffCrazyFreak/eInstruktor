export type LightColor = "white" | "red" | "green" | "yellow" | "blue";

export type RhythmKind =
	| "fixed"
	| "flash"
	| "long-flash"
	| "occulting"
	| "isophase"
	| "quick"
	| "very-quick"
	| "ultra-quick"
	| "morse"
	| "alternating";

export interface ILightPart {
	text: string;
	meaning: string;
	known: boolean;
}

export interface ILightCharacteristic {
	rhythm: RhythmKind;
	/** Flashes per group: [] for none, [3] for Fl(3), [2, 1] for Fl(2+1). */
	groups: number[];
	plusLongFlash: boolean;
	morse: string | null;
	colors: LightColor[];
	period: number | null;
	height: number | null;
	ranges: number[];
	parts: ILightPart[];
}

/** International abbreviations first, then the HHI (Croatian) ones from the Popis svjetala legend. */
export const RHYTHM_CODES: Record<string, RhythmKind> = {
	F: "fixed",
	Fl: "flash",
	Bl: "flash",
	LFl: "long-flash",
	DBl: "long-flash",
	Oc: "occulting",
	Pk: "occulting",
	Iso: "isophase",
	Izo: "isophase",
	Q: "quick",
	K: "quick",
	VQ: "very-quick",
	VK: "very-quick",
	UQ: "ultra-quick",
	UK: "ultra-quick",
	Mo: "morse",
};

export const RHYTHM_NAMES: Record<RhythmKind, string> = {
	fixed: "stalno svjetlo (F): svijetli bez prekida",
	flash: "bljesak (Fl, HHI Bl): svjetlo kraće od tame",
	"long-flash": "dugi bljesak (LFl, HHI DBl): bljesak od najmanje 2 s",
	occulting: "prekidno (Oc, HHI Pk): svjetlo dulje od tame",
	isophase: "izofazno (Iso, HHI Izo): svjetlo i tama traju jednako",
	quick: "brzi bljeskovi (Q, HHI K): 50 do 79 u minuti",
	"very-quick": "vrlo brzi bljeskovi (VQ, HHI VK): 80 do 159 u minuti",
	"ultra-quick": "ultra brzi bljeskovi (UQ, HHI UK): 160 i više u minuti",
	morse: "Morseovo slovo (Mo)",
	alternating: "naizmjenično u više boja (Al)",
};

/** "B" is white in HHI notation; English charts write W. */
export const COLOR_CODES: Record<string, LightColor> = {
	W: "white",
	B: "white",
	R: "red",
	C: "red",
	G: "green",
	Z: "green",
	Y: "yellow",
	Ž: "yellow",
	Bu: "blue",
	Pl: "blue",
};

export const COLOR_NAMES: Record<LightColor, string> = {
	white: "bijelo",
	red: "crveno",
	green: "zeleno",
	yellow: "žuto",
	blue: "plavo",
};
