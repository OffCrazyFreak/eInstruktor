import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BADGES, type BadgeId } from "@/features/progress/constants/badges";
import { pluralHr } from "@/lib/plural";

interface IBadgeCelebrationProps {
	badgeIds: BadgeId[];
	onDismiss: () => void;
}

/** Announces badges earned since the last visit; one calm entrance, none with reduced motion. */
export default function BadgeCelebration({
	badgeIds,
	onDismiss,
}: IBadgeCelebrationProps) {
	const reduceMotion = useReducedMotion();
	const badges = BADGES.filter((badge) => badgeIds.includes(badge.id));
	const [first] = badges;

	if (!first) {
		return null;
	}

	const Icon = first.icon;

	return (
		<motion.div
			role="status"
			initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ type: "spring", stiffness: 260, damping: 22 }}
			className="relative flex items-center gap-4 overflow-hidden rounded-[1.6rem] bg-[#ffb43c] p-4 pr-14 text-[#002c78] sm:p-5 sm:pr-16"
		>
			<span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand text-[#ffb43c]">
				<Icon className="size-7" aria-hidden="true" />
			</span>

			<span className="min-w-0">
				<span className="block text-[0.85rem] font-semibold">
					{badges.length === 1
						? "Nova značka"
						: `${badges.length} ${pluralHr(badges.length, "nova značka", "nove značke", "novih znački")}`}
				</span>
				<span className="block font-serif text-[1.35rem] leading-tight">
					{badges.map((badge) => badge.title).join(", ")}
				</span>
			</span>

			<button
				type="button"
				onClick={onDismiss}
				aria-label="Zatvori obavijest o znački"
				className="absolute top-2 right-2 grid size-11 place-items-center rounded-full outline-none hover:bg-brand/10 focus-visible:ring-[3px] focus-visible:ring-ink/50"
			>
				<X className="size-5" aria-hidden="true" />
			</button>
		</motion.div>
	);
}
