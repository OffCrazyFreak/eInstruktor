import {
	Anchor,
	BookCheck,
	CalendarCheck,
	Compass,
	Flame,
	GraduationCap,
	type LucideIcon,
	Medal,
	MessageCircleQuestion,
} from "lucide-react";
import {
	allLessonsDone,
	answeredHundred,
	anyAreaDone,
	correctRunReached,
	everySubjectAt80,
	type IBadgeContext,
	introDone,
	passedMockExam,
	studiedSevenOfFourteen,
} from "@/features/progress/utils/badge-rules";

export interface IBadge {
	/** Stored in the progress store and the user_badge table, so never rename one. */
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
	earned: (context: IBadgeContext) => boolean;
}

// Every badge marks something the learner can do, never time spent or a login streak (UX research section 7).
export const BADGES = [
	{
		id: "uvod-gotov",
		title: "Uvod gotov",
		description: "Pročitao si Lekciju 0 i znaš kako do dozvole.",
		icon: Compass,
		earned: introDone,
	},
	{
		id: "prvo-podrucje",
		title: "Prvo područje",
		description: "Završio si sve lekcije jednog područja.",
		icon: BookCheck,
		earned: anyAreaDone,
	},
	{
		id: "sto-pitanja",
		title: "Sto odgovora",
		description: "Odgovorio si na 100 pitanja.",
		icon: MessageCircleQuestion,
		earned: answeredHundred,
	},
	{
		id: "serija-20",
		title: "Serija od 20",
		description: "Točno si odgovorio na 20 pitanja zaredom.",
		icon: Flame,
		earned: correctRunReached,
	},
	{
		id: "tjedan-ucenja",
		title: "Učiš redovito",
		description: "Učio si 7 dana unutar dva tjedna.",
		icon: CalendarCheck,
		earned: studiedSevenOfFourteen,
	},
	{
		id: "svi-predmeti-80",
		title: "80 % u svakom predmetu",
		description: "U svakom ispitnom predmetu imaš barem 80 % točnih.",
		icon: Anchor,
		earned: everySubjectAt80,
	},
	{
		id: "prvi-polozen-ispit",
		title: "Prvi položen probni ispit",
		description: "Položio si probni ispit.",
		icon: Medal,
		earned: passedMockExam,
	},
	{
		id: "sve-lekcije",
		title: "Sve lekcije",
		description: "Završio si sve lekcije za svoju kategoriju.",
		icon: GraduationCap,
		earned: allLessonsDone,
	},
] as const satisfies readonly IBadge[];

export type BadgeId = (typeof BADGES)[number]["id"];

/** Badges the learner has reached but not yet received, in list order. */
export function newlyEarnedBadges(context: IBadgeContext): BadgeId[] {
	return BADGES.filter(
		(badge) =>
			context.progress.badges[badge.id] === undefined && badge.earned(context),
	).map((badge) => badge.id);
}
