export type SignalElement = "short" | "long" | "bell" | "stroke";

export type SignalSet = "manoeuvre" | "fog" | "distress";

interface ISignalPattern {
	set: SignalSet;
	elements: SignalElement[];
	meaning: string;
	/** Morse-speed timing for SOS; prolonged blasts of 4 to 6 s would stretch it past recognition. */
	morse?: boolean;
	/** Seconds of silence between blasts when the rule sets one. */
	gap?: number;
}

const S: SignalElement = "short";
const L: SignalElement = "long";

export const PATTERNS = {
	short: { set: "manoeuvre", elements: [S], meaning: "Mijenjam kurs udesno." },
	"short-short": {
		set: "manoeuvre",
		elements: [S, S],
		meaning: "Mijenjam kurs ulijevo.",
	},
	"short-short-short": {
		set: "manoeuvre",
		elements: [S, S, S],
		meaning: "Stroj mi radi krmom.",
	},
	"five-short": {
		set: "manoeuvre",
		elements: [S, S, S, S, S],
		meaning:
			"Ne razumijem tvoju namjeru, sumnjam da se dovoljno uklanjaš. Pazi!",
	},
	long: {
		set: "manoeuvre",
		elements: [L],
		meaning:
			"Prilazim zavoju ili rtu iza kojeg se ne vidi. Plovilo s druge strane odgovara jednim dugim.",
	},
	"long-long-short": {
		set: "manoeuvre",
		elements: [L, L, S],
		meaning: "U uskom kanalu: želim te prestići s tvoje desne strane.",
	},
	"long-long-short-short": {
		set: "manoeuvre",
		elements: [L, L, S, S],
		meaning: "U uskom kanalu: želim te prestići s tvoje lijeve strane.",
	},
	"long-short-long-short": {
		set: "manoeuvre",
		elements: [L, S, L, S],
		meaning: "Slažem se, možeš me prestići.",
	},
	"fog-power-making-way": {
		set: "fog",
		elements: [L],
		meaning:
			"Motorno plovilo koje se kreće kroz vodu. Ponavlja u razmacima do 2 minute.",
	},
	"fog-power-stopped": {
		set: "fog",
		elements: [L, L],
		meaning: "Motorno plovilo u plovidbi koje stoji i ne kreće se kroz vodu.",
		/** COLREG rule 35(b): two prolonged blasts about 2 s apart. */
		gap: 2,
	},
	"fog-long-short-short": {
		set: "fog",
		elements: [L, S, S],
		meaning:
			"Jedrilica, ribar, tegljač, plovilo nesposobno za manevar ili ograničeno manevriranjem ili gazom.",
	},
	"fog-towed": {
		set: "fog",
		elements: [L, S, S, S],
		meaning: "Tegljeni objekt s posadom, odmah nakon signala tegljača.",
	},
	"fog-anchored": {
		set: "fog",
		elements: ["bell"],
		meaning:
			"Usidreno plovilo: brza zvonjava oko 5 sekundi, barem jednom u minuti.",
	},
	"fog-aground": {
		set: "fog",
		elements: [
			"stroke",
			"stroke",
			"stroke",
			"bell",
			"stroke",
			"stroke",
			"stroke",
		],
		meaning:
			"Nasukano plovilo: tri odvojena udarca zvona, zvonjava, pa opet tri udarca.",
	},
	sos: {
		set: "distress",
		elements: [S, S, S, L, L, L, S, S, S],
		meaning:
			"SOS: tri kratka, tri duga, tri kratka. Znak pogibelji, svjetlom ili zvukom.",
		morse: true,
	},
} as const satisfies Record<string, ISignalPattern>;

export type PatternId = keyof typeof PATTERNS;

export const PATTERN_IDS = Object.keys(PATTERNS) as PatternId[];

export interface IScheduledSound {
	element: SignalElement;
	/** Seconds from the start. */
	start: number;
	duration: number;
}

/** Short blast about 1 s and prolonged 4 to 6 s (COLREG rule 32); 5 s is the middle of that range. */
const TIMING = {
	normal: { short: 1, long: 5, gap: 1 },
	morse: { short: 0.4, long: 1.2, gap: 0.4 },
	bell: 5,
	stroke: 0.6,
	strokeGap: 0.5,
} as const;

/** Lays out a pattern on a timeline, which drives both the sound and the dot and dash display. */
export function scheduleSignal(id: PatternId): IScheduledSound[] {
	const pattern: ISignalPattern = PATTERNS[id];
	const timing = pattern.morse ? TIMING.morse : TIMING.normal;
	const sounds: IScheduledSound[] = [];
	let cursor = 0;

	for (const element of pattern.elements) {
		const duration =
			element === "bell"
				? TIMING.bell
				: element === "stroke"
					? TIMING.stroke
					: timing[element];

		sounds.push({ element, start: cursor, duration });
		cursor +=
			duration +
			(element === "stroke" ? TIMING.strokeGap : (pattern.gap ?? timing.gap));
	}

	return sounds;
}

export function signalLength(sounds: readonly IScheduledSound[]): number {
	const last = sounds.at(-1);

	return last ? last.start + last.duration : 0;
}
