import course from "@/content/voditelj-brodice";
import type { IAreaScore } from "@/features/practice/utils/session-summary";
import { getArea } from "@/lib/content/course-selectors";

interface IAreaSplitProps {
	scores: IAreaScore[];
}

export default function AreaSplit({ scores }: IAreaSplitProps) {
	return (
		<section aria-labelledby="area-split-title" className="mt-8">
			<h2
				id="area-split-title"
				className="font-mono text-[0.74rem] tracking-[0.2em] text-ocean dark:text-[#4cc2ff]"
			>
				PO PODRUČJIMA
			</h2>

			<ul className="mt-3 space-y-3">
				{scores.map((score) => (
					<li key={score.area}>
						<div className="flex items-baseline justify-between gap-3 text-[0.92rem]">
							<span className="min-w-0 font-semibold leading-snug">
								{getArea(course, score.area)?.title ?? score.area}
							</span>
							<span className="shrink-0 font-mono text-[0.85rem] tabular-nums text-muted-foreground">
								{score.correct} / {score.total}
							</span>
						</div>
						<div className="mt-1.5 h-2 rounded-full bg-tint dark:bg-accent">
							<div
								className="h-full rounded-full bg-[#0a63b0] dark:bg-[#4cc2ff]"
								style={{ width: `${(score.correct / score.total) * 100}%` }}
							/>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
