import { ChevronDown } from "lucide-react";
import LevelSheet from "@/components/custom/app-shell/level-sheet";
import useProgress from "@/lib/progress/use-progress";
import { cn } from "@/lib/utils";

interface ILevelChipProps {
	className?: string;
}

export default function LevelChip({ className }: ILevelChipProps) {
	const { progress, ready, level } = useProgress();
	const chosen = ready && progress.targetLevel !== null;

	return (
		<LevelSheet>
			<button
				type="button"
				className={cn(
					"inline-flex h-11 items-center gap-1.5 rounded-full border border-[#002c78]/20 bg-card px-3.5 text-[0.85rem] font-semibold text-primary outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:border-white/20",
					className,
				)}
			>
				{chosen ? (
					<>
						<span className="font-mono text-[0.72rem] tracking-wider text-[#0a63b0] dark:text-[#4cc2ff]">
							RAZINA
						</span>
						{level}
					</>
				) : (
					<>
						<span
							aria-hidden="true"
							className="size-2 rounded-full bg-[#ffb43c]"
						/>
						Odaberi razinu
					</>
				)}
				<ChevronDown className="size-4 opacity-60" aria-hidden="true" />
			</button>
		</LevelSheet>
	);
}
