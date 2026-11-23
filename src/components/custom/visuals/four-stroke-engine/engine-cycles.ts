export const ENGINE_MODES = ["four-stroke", "two-stroke", "diesel"] as const;

export type EngineMode = (typeof ENGINE_MODES)[number];

export const STROKE_IDS = [
	"intake",
	"compression",
	"power",
	"exhaust",
] as const;

export type StrokeId = (typeof STROKE_IDS)[number];

interface IStroke {
	id: StrokeId;
	name: string;
	text: string;
}

const EXHAUST_TEXT =
	"Klip ide gore, ispušni ventil je otvoren i izgoreni plinovi izlaze.";

export const CYCLES: Record<EngineMode, IStroke[]> = {
	"four-stroke": [
		{
			id: "intake",
			name: "Usis",
			text: "Klip ide dolje, usisni ventil je otvoren i u cilindar ulazi smjesa goriva i zraka.",
		},
		{
			id: "compression",
			name: "Kompresija",
			text: "Klip ide gore, oba ventila su zatvorena i smjesa se sabija.",
		},
		{
			id: "power",
			name: "Ekspanzija (radni takt)",
			text: "Svjećica pali smjesu, plinovi se šire i guraju klip dolje. Samo ovaj takt daje rad.",
		},
		{ id: "exhaust", name: "Ispuh", text: EXHAUST_TEXT },
	],
	diesel: [
		{
			id: "intake",
			name: "Usis",
			text: "Klip ide dolje i usisava samo zrak. Diesel nema rasplinjač ni svjećicu.",
		},
		{
			id: "compression",
			name: "Kompresija",
			text: "Klip sabija zrak toliko da se zagrije na oko 700 °C.",
		},
		{
			id: "power",
			name: "Ekspanzija (radni takt)",
			text: "Rasprskač ubrizga gorivo u vrući zrak, gorivo se samo zapali i gura klip dolje.",
		},
		{ id: "exhaust", name: "Ispuh", text: EXHAUST_TEXT },
	],
	"two-stroke": [
		{
			id: "compression",
			name: "1. takt: izmjena medija i kompresija",
			text: "Klip ide gore. Iznad njega sabija smjesu, a ispod njega u kućište ulazi nova smjesa.",
		},
		{
			id: "power",
			name: "2. takt: izgaranje i ekspanzija",
			text: "Svjećica pali smjesu i klip ide dolje. Pri dnu se otvaraju kanali: izgoreni plinovi izlaze, a nova smjesa ulazi iz kućišta. Nema ventila.",
		},
	],
};

/** Degrees of crank rotation per full cycle: two turns for four strokes, one for two. */
export function cycleDegrees(mode: EngineMode): number {
	return mode === "two-stroke" ? 360 : 720;
}

/** Each stroke is half a crank turn; two-stroke starts at bottom dead centre going up. */
export function strokeIndexAt(mode: EngineMode, angle: number): number {
	const turn =
		((angle % cycleDegrees(mode)) + cycleDegrees(mode)) % cycleDegrees(mode);

	return Math.floor(turn / 180);
}

/** Crank angle in the middle of a stroke, for a frozen picture. */
export function middleOf(mode: EngineMode, stroke: StrokeId): number {
	const index = CYCLES[mode].findIndex((item) => item.id === stroke);

	return Math.max(0, index) * 180 + 90;
}

/** Piston height above bottom dead centre (0 to 1). Four-stroke angle 0 is top dead centre; two-stroke 0 is bottom. */
export function pistonLift(mode: EngineMode, angle: number): number {
	const radians =
		((mode === "two-stroke" ? angle + 180 : angle) * Math.PI) / 180;
	const crank = 1;
	const rod = 3.2;
	const height =
		crank * Math.cos(radians) +
		Math.sqrt(rod ** 2 - (crank * Math.sin(radians)) ** 2);

	return (height - (rod - crank)) / (2 * crank);
}
