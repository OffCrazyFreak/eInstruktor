import { Link } from "@tanstack/react-router";
import { ChevronRight, CircleCheck } from "lucide-react";
import type { ILesson } from "@/content/types";
import { cn } from "@/lib/utils";

interface ILessonRowProps {
	lesson: ILesson;
	position: number;
	done: boolean;
	inProgress: boolean;
}

export default function LessonRow({
	lesson,
	position,
	done,
	inProgress,
}: ILessonRowProps) {
	return (
		<Link
			to="/ucenje/$area/$lesson"
			params={{ area: lesson.area, lesson: lesson.slug }}
			className="flex min-h-16 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-foreground outline-none hover:border-[#0a63b0]/40 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60"
		>
			<span
				className={cn(
					"grid size-9 shrink-0 place-items-center rounded-full font-mono text-[0.8rem] font-semibold",
					done
						? "bg-emerald-600 text-white"
						: "bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]",
				)}
			>
				{done ? (
					<CircleCheck className="size-5" aria-label="Gotovo" />
				) : (
					position
				)}
			</span>

			<span className="min-w-0 flex-1">
				<span className="block font-semibold leading-snug">{lesson.title}</span>
				<span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-muted-foreground">
					{lesson.minutes} min
					{lesson.level === "B" && (
						<span className="rounded-full bg-primary px-2 py-px font-mono text-[0.68rem] font-semibold text-primary-foreground">
							B
						</span>
					)}
					{inProgress && !done && (
						<span className="font-semibold text-[#a35f00] dark:text-[#ffd48a]">
							U tijeku
						</span>
					)}
				</span>
			</span>

			<ChevronRight
				className="size-5 shrink-0 text-muted-foreground"
				aria-hidden="true"
			/>
		</Link>
	);
}
