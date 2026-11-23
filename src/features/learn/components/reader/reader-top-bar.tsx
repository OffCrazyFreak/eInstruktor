import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import LevelChip from "@/components/custom/app-shell/level-chip";
import type { AreaSlug } from "@/content/types";

interface IReaderTopBarProps {
	title: string;
	/** Lekcija 0 has no area page of its own, so its back arrow goes to the lesson list. */
	backTo: { area: AreaSlug } | null;
	percent: number;
}

const BACK_LINK_CLASS =
	"grid size-10 shrink-0 place-items-center rounded-full text-primary outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60";

export default function ReaderTopBar({
	title,
	backTo,
	percent,
}: IReaderTopBarProps) {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-2 sm:px-4">
				{backTo ? (
					<Link
						to="/ucenje/$area"
						params={backTo}
						aria-label="Natrag na područje"
						className={BACK_LINK_CLASS}
					>
						<ChevronLeft className="size-6" aria-hidden="true" />
					</Link>
				) : (
					<Link
						to="/ucenje"
						aria-label="Natrag na učenje"
						className={BACK_LINK_CLASS}
					>
						<ChevronLeft className="size-6" aria-hidden="true" />
					</Link>
				)}

				<p className="min-w-0 flex-1 truncate text-[0.95rem] font-semibold">
					{title}
				</p>

				<LevelChip className="shrink-0" />
			</div>

			<div
				role="progressbar"
				aria-label="Pročitano"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(percent * 100)}
				className="h-1 bg-[#eaf3ff] dark:bg-accent"
			>
				<div
					className="h-full origin-left bg-[#00aef3]"
					style={{ transform: `scaleX(${percent})` }}
				/>
			</div>
		</header>
	);
}
