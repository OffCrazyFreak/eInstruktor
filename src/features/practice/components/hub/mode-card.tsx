import { ChevronRight } from "lucide-react";
import type { IPracticeModeInfo } from "@/features/practice/constants/practice-modes";
import { cn } from "@/lib/utils";

interface IModeCardProps {
	info: IPracticeModeInfo;
	/** What the count chip says, such as "12 pitanja"; null while progress is loading. */
	countLabel: string | null;
	empty: boolean;
	onOpen: () => void;
}

const CARD_CLASS =
	"flex h-full w-full items-start gap-3 rounded-[1.4rem] border border-border bg-card p-4 text-left sm:p-5";

export default function ModeCard({
	info,
	countLabel,
	empty,
	onOpen,
}: IModeCardProps) {
	const Icon = info.icon;

	const body = (
		<>
			<span
				className={cn(
					"grid size-11 shrink-0 place-items-center rounded-2xl",
					empty
						? "bg-muted text-muted-foreground"
						: "bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]",
				)}
			>
				<Icon className="size-5" aria-hidden="true" />
			</span>

			<span className="min-w-0 flex-1">
				<span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
					<span className="text-[1.02rem] font-semibold leading-snug">
						{info.title}
					</span>
					{countLabel && (
						<span
							className={cn(
								"rounded-full px-2.5 py-0.5 text-[0.78rem] font-semibold",
								empty
									? "bg-muted text-muted-foreground"
									: "bg-[#ffb43c]/25 text-[#8a5200] dark:text-[#ffd48a]",
							)}
						>
							{countLabel}
						</span>
					)}
				</span>
				<span className="mt-1 block text-[0.88rem] leading-snug text-muted-foreground">
					{empty ? info.empty : info.description}
				</span>
			</span>

			{!empty && (
				<ChevronRight
					className="mt-3 size-5 shrink-0 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</>
	);

	if (empty) {
		return <div className={CARD_CLASS}>{body}</div>;
	}

	return (
		<button
			type="button"
			onClick={onOpen}
			aria-haspopup="dialog"
			className={cn(
				CARD_CLASS,
				"cursor-pointer outline-none hover:border-[#0a63b0]/40 focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:hover:border-[#4cc2ff]/50",
			)}
		>
			{body}
		</button>
	);
}
