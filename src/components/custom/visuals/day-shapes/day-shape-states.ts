export const SHAPES = [
	"ball",
	"cone-up",
	"cone-down",
	"diamond",
	"hourglass",
	"cylinder",
] as const;

export type Shape = (typeof SHAPES)[number];

export const SHAPE_NAMES: Record<Shape, string> = {
	ball: "kugla",
	"cone-up": "stožac vrhom gore",
	"cone-down": "stožac vrhom dolje",
	diamond: "dvostruki stožac spojen bazama",
	hourglass: "dvostruki stožac spojen vrhovima",
	cylinder: "valjak",
};

export const STATES = [
	"anchored",
	"not-under-command",
	"aground",
	"restricted-manoeuvrability",
	"constrained-by-draught",
	"fishing",
	"motor-sailing",
	"towing",
] as const;

export type DayState = (typeof STATES)[number];

interface IDayState {
	name: string;
	/** Shapes from top to bottom, hung in a vertical line. */
	shapes: Shape[];
	note: string;
}

export const DAY_STATES: Record<DayState, IDayState> = {
	anchored: {
		name: "Usidreno plovilo",
		shapes: ["ball"],
		note: "Jedna crna kugla na pramčanom dijelu, gdje se najbolje vidi.",
	},
	"not-under-command": {
		name: "Nesposobno za manevar",
		shapes: ["ball", "ball"],
		note: "Dvije kugle u okomici, kao dva crvena svjetla noću.",
	},
	aground: {
		name: "Nasukano plovilo",
		shapes: ["ball", "ball", "ball"],
		note: "Tri kugle u okomici.",
	},
	"restricted-manoeuvrability": {
		name: "Ograničeno u manevriranju",
		shapes: ["ball", "diamond", "ball"],
		note: "Kugla, dvostruki stožac spojen bazama, kugla. Noću crveno, bijelo, crveno.",
	},
	"constrained-by-draught": {
		name: "Ograničeno gazom",
		shapes: ["cylinder"],
		note: "Jedan valjak.",
	},
	fishing: {
		name: "Ribarsko plovilo u ribolovu",
		shapes: ["hourglass"],
		note: "Dva stošca spojena vrhovima. Plovilo kraće od 20 m smije umjesto toga pokazati košaru.",
	},
	"motor-sailing": {
		name: "Jedrilica na jedra i motor",
		shapes: ["cone-down"],
		note: "Stožac vrhom dolje, na pramcu. Po pravilima je to motorno plovilo.",
	},
	towing: {
		name: "Tegljač, teglj dulji od 200 m",
		shapes: ["diamond"],
		note: "Dvostruki stožac spojen bazama, na tegljaču i na tegljenom objektu.",
	},
};

export function matchesState(
	stack: readonly Shape[],
	state: DayState,
): boolean {
	const target = DAY_STATES[state].shapes;

	return (
		stack.length === target.length &&
		stack.every((shape, index) => shape === target[index])
	);
}
