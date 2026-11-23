import {
	CalendarClock,
	CircleX,
	Flag,
	type LucideIcon,
	Map as MapIcon,
	Shuffle,
	TrendingDown,
} from "lucide-react";
import type { PracticeMode } from "@/features/practice/utils/practice-search";

export interface IPracticeModeInfo {
	mode: PracticeMode;
	title: string;
	description: string;
	/** Shown on the hub card while the mode has no questions yet. */
	empty: string;
	icon: LucideIcon;
}

export const PRACTICE_MODE_INFO: Record<PracticeMode, IPracticeModeInfo> = {
	podrucje: {
		mode: "podrucje",
		title: "Po područjima",
		description: "Odaberi jedno područje i vježbaj samo njega.",
		empty: "Za tvoju kategoriju još nema pitanja.",
		icon: MapIcon,
	},
	mjesovito: {
		mode: "mjesovito",
		title: "Sve mješovito",
		description: "Pitanja iz svih područja, izmiješana kao na ispitu.",
		empty: "Za tvoju kategoriju još nema pitanja.",
		icon: Shuffle,
	},
	pogresni: {
		mode: "pogresni",
		title: "Pogrešni odgovori",
		description:
			"Pitanja na kojima si pogriješio. Nestaju kad ih točno riješiš u dvije različite serije.",
		empty:
			"Još nema pogrešnih odgovora. Kad negdje pogriješiš, pitanje čeka ovdje.",
		icon: CircleX,
	},
	slabo: {
		mode: "slabo",
		title: "Slaba područja",
		description: "Područja ispod 70 % točnih, s barem 5 odgovora.",
		empty: "Nijedno područje nije ispod 70 %. Ovdje se pojave kad ih bude.",
		icon: TrendingDown,
	},
	oznaceno: {
		mode: "oznaceno",
		title: "Označena pitanja",
		description: "Pitanja koja si označio zastavicom za kasnije.",
		empty:
			"Nema označenih pitanja. Zastavicom u seriji spremiš pitanje za kasnije.",
		icon: Flag,
	},
	ponavljanje: {
		mode: "ponavljanje",
		title: "Za ponoviti danas",
		description:
			"Pogrešna pitanja dolaze odmah, točna nakon 2 pa nakon 6 dana.",
		empty:
			"Danas nema ništa za ponoviti. Pitanja se ovdje vrate kad dođe njihov dan.",
		icon: CalendarClock,
	},
};

/** Hub order: the two open sets first, then the ones built from the learner's own answers. */
export const HUB_MODES: PracticeMode[] = [
	"podrucje",
	"mjesovito",
	"ponavljanje",
	"pogresni",
	"slabo",
	"oznaceno",
];
