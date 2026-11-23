import {
	Anchor,
	BookOpen,
	Cog,
	LifeBuoy,
	Lightbulb,
	type LucideIcon,
	Map as MapIcon,
	Radio,
	Scale,
	ShieldAlert,
	Signpost,
	Wind,
} from "lucide-react";

interface IAreaIconProps {
	/** The lucide icon name from the area content, such as "Anchor". */
	name: string;
	className?: string;
}

// Named imports keep the bundle to these icons; an unknown name falls back to a book.
const AREA_ICONS: Record<string, LucideIcon> = {
	Anchor,
	Cog,
	LifeBuoy,
	Lightbulb,
	Map: MapIcon,
	Radio,
	Scale,
	ShieldAlert,
	Signpost,
	Wind,
};

export default function AreaIcon({ name, className }: IAreaIconProps) {
	const Icon = AREA_ICONS[name] ?? BookOpen;

	return <Icon className={className} aria-hidden="true" />;
}
