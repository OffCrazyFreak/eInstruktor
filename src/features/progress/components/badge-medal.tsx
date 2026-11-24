import { motion, useReducedMotion } from "motion/react";
import type { IBadge } from "@/features/progress/constants/badges";
import { formatDay } from "@/lib/dates/format-day";
import { cn } from "@/lib/utils";

interface IBadgeMedalProps {
	badge: IBadge;
	earnedAt: number | undefined;
	/** Just earned on this visit; it gets one ring of light unless the learner asked for less motion. */
	fresh: boolean;
}

export default function BadgeMedal({
	badge,
	earnedAt,
	fresh,
}: IBadgeMedalProps) {
	const reduceMotion = useReducedMotion();
	const earned = earnedAt !== undefined;
	const Icon = badge.icon;

	return (
		<li
			className={cn(
				"flex gap-3 rounded-[1.2rem] p-3",
				earned ? "bg-card ring-1 ring-border" : "opacity-80",
			)}
		>
			<span className="relative grid size-14 shrink-0 place-items-center">
				{fresh && !reduceMotion && (
					<motion.span
						aria-hidden="true"
						className="absolute inset-0 rounded-full ring-4 ring-[#ffb43c]"
						initial={{ scale: 0.8, opacity: 0.9 }}
						animate={{ scale: 1.6, opacity: 0 }}
						transition={{ duration: 1.2, repeat: 2, ease: "easeOut" }}
					/>
				)}
				<span
					className={cn(
						"grid size-14 place-items-center rounded-full",
						earned
							? "bg-brand text-[#ffb43c] shadow-[inset_0_0_0_3px_#ffb43c] dark:bg-[#0a63b0]"
							: "border-2 border-dashed border-ink/30 text-ink/40 dark:border-white/25 dark:text-white/40",
					)}
				>
					<Icon className="size-6" aria-hidden="true" />
				</span>
			</span>

			<span className="min-w-0">
				<span className="block font-semibold leading-snug">{badge.title}</span>
				<span className="mt-0.5 block text-[0.85rem] leading-snug text-muted-foreground">
					{badge.description}
				</span>
				<span className="mt-1 block text-[0.78rem] text-muted-foreground">
					{earned ? `Osvojeno ${formatDay(earnedAt)}` : "Još nije osvojeno"}
				</span>
			</span>
		</li>
	);
}
