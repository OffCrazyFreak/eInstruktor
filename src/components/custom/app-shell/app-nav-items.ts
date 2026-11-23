import {
	BookOpen,
	ClipboardCheck,
	Gauge,
	House,
	ListChecks,
	type LucideIcon,
} from "lucide-react";

export interface IAppNavItem {
	to: "/pocetna" | "/ucenje" | "/vjezba" | "/ispit" | "/napredak";
	label: string;
	icon: LucideIcon;
}

export const APP_NAV_ITEMS: IAppNavItem[] = [
	{ to: "/pocetna", label: "Početna", icon: House },
	{ to: "/ucenje", label: "Učenje", icon: BookOpen },
	{ to: "/vjezba", label: "Vježba", icon: ListChecks },
	{ to: "/ispit", label: "Ispit", icon: ClipboardCheck },
	{ to: "/napredak", label: "Napredak", icon: Gauge },
];
