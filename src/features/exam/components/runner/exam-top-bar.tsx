import { Link } from "@tanstack/react-router";
import { Flag, X } from "lucide-react";
import ExamClock from "@/features/exam/components/runner/exam-clock";
import type { IExamBlock } from "@/features/exam/utils/exam-blocks";
import { cn } from "@/lib/utils";

interface IExamTopBarProps {
	blocks: IExamBlock[];
	block: IExamBlock;
	position: number;
	total: number;
	remaining: number | null;
	flagged: boolean;
	onToggleFlag: () => void;
	/** Answered count per block, for the segmented progress line. */
	answeredPerBlock: number[];
}

const ICON_BUTTON_CLASS =
	"grid size-11 shrink-0 place-items-center rounded-full outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60";

export default function ExamTopBar({
	blocks,
	block,
	position,
	total,
	remaining,
	flagged,
	onToggleFlag,
	answeredPerBlock,
}: IExamTopBarProps) {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-3xl items-center gap-1.5 px-2 sm:gap-2 sm:px-4">
				<Link
					to="/ispit"
					aria-label="Izađi iz ispita, odgovori ostaju spremljeni"
					className={cn(ICON_BUTTON_CLASS, "text-primary")}
				>
					<X className="size-6" aria-hidden="true" />
				</Link>

				<div className="min-w-0 flex-1 leading-tight">
					<p className="font-mono text-[0.9rem] font-semibold tabular-nums">
						{position + 1} / {total}
					</p>
					<p className="truncate text-[0.78rem] text-muted-foreground">
						{block.label}
					</p>
				</div>

				<ExamClock remaining={remaining} />

				<button
					type="button"
					onClick={onToggleFlag}
					aria-pressed={flagged}
					aria-label="Označi pitanje za kasnije"
					className={cn(
						ICON_BUTTON_CLASS,
						flagged
							? "text-[#c77800] dark:text-[#ffb43c]"
							: "text-muted-foreground",
					)}
				>
					<Flag
						className={cn("size-5", flagged && "fill-current")}
						aria-hidden="true"
					/>
				</button>
			</div>

			<div aria-hidden="true" className="flex h-1 gap-0.5">
				{blocks.map((item, index) => (
					<div
						key={item.subjectId}
						className="h-full basis-0 bg-[#eaf3ff] dark:bg-accent"
						style={{ flexGrow: item.questions.length }}
					>
						<div
							className={cn(
								"h-full origin-left",
								item === block
									? "bg-[#00aef3]"
									: "bg-[#0a63b0]/70 dark:bg-[#4cc2ff]/60",
							)}
							style={{
								transform: `scaleX(${(answeredPerBlock[index] ?? 0) / item.questions.length})`,
							}}
						/>
					</div>
				))}
			</div>
		</header>
	);
}
