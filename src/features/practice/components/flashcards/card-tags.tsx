import type { IStudyCard, Level } from "@/content/types";

interface ICardTagsProps {
	card: IStudyCard;
	subject: string;
}

const LEVEL_TAG: Record<Level, string> = {
	common: "A i B",
	A: "Kategorija A",
	B: "Kategorija B",
};

export default function CardTags({ card, subject }: ICardTagsProps) {
	return (
		<span className="flex flex-wrap items-center gap-2">
			<span className="rounded-full bg-tint px-2.5 py-1 text-[0.78rem] font-semibold text-ocean dark:bg-accent dark:text-[#4cc2ff]">
				{subject}
			</span>
			<span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.72rem] tracking-wider text-muted-foreground">
				{LEVEL_TAG[card.level]}
			</span>
		</span>
	);
}
