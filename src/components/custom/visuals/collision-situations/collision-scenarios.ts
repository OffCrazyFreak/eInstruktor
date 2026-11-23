import type { IVesselState } from "@/components/custom/visuals/collision-situations/collision-rules";

export const SCENARIO_IDS = [
	"head-on",
	"crossing",
	"overtaking",
	"sail-opposite-tacks",
	"sail-same-tack",
	"power-vs-sail",
] as const;

export type ScenarioId = (typeof SCENARIO_IDS)[number];

export interface IScenario {
	title: string;
	/** Your vessel. */
	own: IVesselState;
	other: IVesselState;
	/** Degrees the wind blows from, for sailing scenarios. */
	windFrom?: number;
	speeds: [number, number];
	explanation: string;
}

const power = (x: number, y: number, heading: number): IVesselState => ({
	x,
	y,
	heading,
	kind: "power",
});
const sail = (x: number, y: number, heading: number): IVesselState => ({
	x,
	y,
	heading,
	kind: "sail",
});

export const SCENARIOS: Record<ScenarioId, IScenario> = {
	"head-on": {
		title: "Susret pramac u pramac",
		own: power(150, 250, 0),
		other: power(150, 50, 180),
		speeds: [90, 90],
		explanation:
			"Dva motorna plovila idu jedno prema drugom. Oba skreću udesno, na vrijeme i odlučno, i mimoilaze se lijevim bokovima.",
	},
	crossing: {
		title: "Križanje kurseva",
		own: power(150, 250, 0),
		other: power(262, 140, 270),
		speeds: [90, 90],
		explanation:
			"Drugo plovilo ti je s desne strane, pa se ti uklanjaš. Skreni udesno i prođi mu iza krme, nikad ispred pramca.",
	},
	overtaking: {
		title: "Pretjecanje",
		own: power(150, 262, 0),
		other: sail(150, 150, 0),
		windFrom: 270,
		speeds: [150, 50],
		explanation:
			"Tko pretječe, taj se uklanja, i kad je drugo plovilo jedrilica. Pretječeš kad prilaziš iz sektora njegova krmenog svjetla, više od 22,5° iza poprečnice.",
	},
	"sail-opposite-tacks": {
		title: "Jedrilice, vjetar u različite bokove",
		own: sail(80, 230, 45),
		other: sail(220, 230, 315),
		windFrom: 0,
		speeds: [80, 80],
		explanation:
			"Jedrilice primaju vjetar u različite bokove. Uklanja se ona koja vjetar prima s lijeve strane.",
	},
	"sail-same-tack": {
		title: "Jedrilice, vjetar u isti bok",
		own: sail(215, 250, 340),
		other: sail(105, 240, 20),
		windFrom: 90,
		speeds: [80, 80],
		explanation:
			"Obje primaju vjetar u isti bok. Uklanja se ona u privjetrini, bliže vjetru. Ona u zavjetrini ima prednost.",
	},
	"power-vs-sail": {
		title: "Motorno plovilo i jedrilica",
		own: power(150, 250, 0),
		other: sail(262, 140, 270),
		windFrom: 0,
		speeds: [90, 70],
		explanation:
			"Motorno plovilo uklanja se jedrilici pod jedrima. Jedrilica ipak ustupa ribaru, plovilu nesposobnom za manevar i plovilu ograničenom u manevriranju.",
	},
};

/** Swaps who "you" are, so the same crossing can be shown from the stand-on vessel. */
export function crossingAsStandOn(): IScenario {
	return {
		...SCENARIOS.crossing,
		own: power(150, 250, 0),
		other: power(38, 140, 90),
		explanation:
			"Drugo plovilo ti je s lijeve strane, pa se ono uklanja. Ti zadržavaš kurs i brzinu i pratiš ga. Ako ne reagira, daj pet kratkih signala i, ako treba, sam izbjegni sudar.",
	};
}
