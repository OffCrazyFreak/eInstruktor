import AreaIcon from "@/components/custom/content/area-icon";
import type { AreaSlug, IArea } from "@/content/types";
import { cn } from "@/lib/utils";

export interface IAreaChoice {
	area: IArea;
	count: number;
}

interface IAreaChoiceListProps {
	choices: IAreaChoice[];
	value: AreaSlug | undefined;
	onChange: (area: AreaSlug) => void;
}

export default function AreaChoiceList({
	choices,
	value,
	onChange,
}: IAreaChoiceListProps) {
	return (
		<fieldset className="min-w-0">
			<legend className="text-[0.95rem] font-semibold">Područje</legend>

			<div className="mt-2 space-y-1.5">
				{choices.map(({ area, count }) => {
					const chosen = area.slug === value;

					return (
						<label
							key={area.slug}
							className={cn(
								"flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
								chosen
									? "border-primary bg-tint dark:bg-accent"
									: "border-border bg-card hover:border-ocean/45 dark:hover:border-[#4cc2ff]/50",
							)}
						>
							<input
								type="radio"
								name="practice-area"
								value={area.slug}
								checked={chosen}
								onChange={() => onChange(area.slug)}
								className="sr-only"
							/>
							<AreaIcon
								name={area.icon}
								className="size-5 shrink-0 text-ocean dark:text-[#4cc2ff]"
							/>
							<span className="min-w-0 flex-1 text-[0.95rem] leading-snug font-semibold">
								{area.title}
							</span>
							<span className="shrink-0 text-[0.82rem] text-muted-foreground">
								{count}
							</span>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
