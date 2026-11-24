import { Link } from "@tanstack/react-router";
import { ChevronRight, MessagesSquare } from "lucide-react";
import { pluralHr } from "@/lib/plural";

interface IOralExamCardProps {
	/** Null while progress is loading. */
	dueCount: number | null;
	total: number;
}

export default function OralExamCard({ dueCount, total }: IOralExamCardProps) {
	return (
		<Link
			to="/vjezba/usmeno"
			className="flex items-start gap-3 rounded-[1.4rem] border-2 border-dashed border-ink/20 bg-[#f4f9ff] p-4 text-foreground outline-none hover:border-ocean/50 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 sm:p-5 dark:border-white/20 dark:bg-card dark:hover:border-[#4cc2ff]/50"
		>
			<span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-[#ffb43c]">
				<MessagesSquare className="size-5" aria-hidden="true" />
			</span>

			<span className="min-w-0 flex-1">
				<span className="block text-[1.02rem] font-semibold leading-snug">
					Usmeni ispit
				</span>
				<span className="mt-1 block text-[0.88rem] leading-snug text-muted-foreground">
					Pravi ispit je usmeni. {total}{" "}
					{pluralHr(total, "kartica", "kartice", "kartica")}: odgovori naglas,
					pa otkrij odgovor.
					{dueCount !== null && dueCount > 0 && ` Za ponoviti: ${dueCount}.`}
				</span>
			</span>

			<ChevronRight
				className="mt-3 size-5 shrink-0 text-muted-foreground"
				aria-hidden="true"
			/>
		</Link>
	);
}
