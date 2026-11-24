import { Link } from "@tanstack/react-router";
import AreaIcon from "@/components/custom/content/area-icon";
import type { IArea } from "@/content/types";
import ProgressMeter from "@/features/learn/components/progress-meter";

interface IAreaCardProps {
	area: IArea;
	done: number;
	total: number;
	ready: boolean;
}

export default function AreaCard({ area, done, total, ready }: IAreaCardProps) {
	return (
		<Link
			to="/ucenje/$area"
			params={{ area: area.slug }}
			className="flex h-full flex-col rounded-[1.4rem] border border-border bg-card p-4 text-foreground outline-none transition-colors hover:border-ocean/40 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 sm:p-5 dark:hover:border-[#4cc2ff]/50"
		>
			<span className="flex items-start gap-3">
				<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tint text-ocean dark:bg-accent dark:text-[#4cc2ff]">
					<AreaIcon name={area.icon} className="size-5" />
				</span>

				<span className="min-w-0">
					<span className="block font-semibold leading-snug">{area.title}</span>
					<span className="mt-1 block text-[0.88rem] leading-snug text-muted-foreground">
						{area.summary}
					</span>
				</span>
			</span>

			<span className="mt-auto block pt-4">
				<ProgressMeter done={done} total={total} ready={ready} />
			</span>
		</Link>
	);
}
