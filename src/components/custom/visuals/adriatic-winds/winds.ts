export const WIND_IDS = [
	"tramontana",
	"bura",
	"levanat",
	"jugo",
	"ostro",
	"lebic",
	"ponente",
	"maestral",
] as const;

export type WindId = (typeof WIND_IDS)[number];

export const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

export type Direction = (typeof DIRECTIONS)[number];

interface IWind {
	name: string;
	direction: Direction;
	/** Degrees the wind blows from. */
	from: number;
	directionName: string;
	alsoCalled?: string;
	character: string;
	signs?: string[];
	advice?: string;
}

export const WINDS: Record<WindId, IWind> = {
	tramontana: {
		name: "Tramontana",
		direction: "N",
		from: 0,
		directionName: "sa sjevera",
		character: "Hladan vjetar sa sjevera, sličan buri.",
	},
	bura: {
		name: "Bura",
		direction: "NE",
		from: 45,
		directionName: "sa sjeveroistoka, s kopna",
		character:
			"Hladan, suh vjetar koji se s planina spušta na more u jakim udarima (refulima). Dolazi naglo i brzo može postati orkanski. Najopasniji je vjetar na Jadranu.",
		signs: [
			"bijela kapa oblaka na primorskim planinama",
			"zrak suh i proziran",
			"tlak raste",
			"razina mora pada",
		],
		advice:
			"Čim vidiš znakove bure, odmah kreni u najbližu sigurnu luku ili uvalu.",
	},
	levanat: {
		name: "Levanat",
		direction: "E",
		from: 90,
		directionName: "s istoka",
		alsoCalled: "levant",
		character:
			"Istočnjak. Često ima obilježja bure; uz ciklonu može donijeti kišu, a ponekad je topao vjetar lijepog vremena.",
	},
	jugo: {
		name: "Jugo",
		direction: "SE",
		from: 135,
		directionName: "s jugoistoka, s mora",
		alsoCalled: "šilok, široko",
		character:
			"Topao i vlažan vjetar s mora. Jača postupno, puše ujednačeno uzduž Jadrana, diže velike i duge valove i donosi oblake i kišu.",
		signs: [
			"tlak pada",
			"sumaglica na jugoistoku",
			"sve više oblaka i vlage u zraku",
			"razina mora raste",
		],
		advice:
			"Imaš više vremena nego kod bure, ali valovi rastu satima. Ne čekaj zadnji trenutak.",
	},
	ostro: {
		name: "Oštro",
		direction: "S",
		from: 180,
		directionName: "s juga",
		character: "Topao i vlažan vjetar s juga, sličan jugu.",
	},
	lebic: {
		name: "Lebić",
		direction: "SW",
		from: 225,
		directionName: "s jugozapada, s otvorenog mora",
		alsoCalled: "garbin",
		character:
			"Vjetar s otvorenog mora, često kratak i nakon juga. Nemirne su luke i uvale otvorene prema jugozapadu.",
	},
	ponente: {
		name: "Ponente",
		direction: "W",
		from: 270,
		directionName: "sa zapada",
		alsoCalled: "pulenat",
		character:
			"Rijedak zapadni vjetar kod nas. Dolazi brzo, kratko traje i može biti opasan.",
	},
	maestral: {
		name: "Maestral",
		direction: "NW",
		from: 315,
		directionName: "sa sjeverozapada, s mora",
		character:
			"Ugodan ljetni dnevni vjetar. Počinje prije podne, najjači je rano poslijepodne i slabi prema zalasku sunca. Redoviti maestral znak je stabilnog lijepog vremena.",
		advice:
			"U uskim kanalima, na primjer Hvarskom i Pelješkom, zna biti dosta jak.",
	},
};

/** Relative strength of a typical summer maestral by hour (0 to 1): starts about 9, peaks about 14, dies before sunset. */
export function maestralStrength(hour: number): number {
	if (hour <= 9 || hour >= 19.5) {
		return 0;
	}

	return hour <= 14 ? (hour - 9) / 5 : (19.5 - hour) / 5.5;
}
