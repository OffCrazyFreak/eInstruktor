import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IChoiceCardProps {
	name: string;
	value: string;
	checked: boolean;
	onSelect: () => void;
	/** Short text in the round marker, such as "A"; a check replaces it when chosen. */
	marker: ReactNode;
	title: string;
	detail: string;
}

/** One radio row of the start screen, styled like the level sheet's choices. */
export default function ChoiceCard({
	name,
	value,
	checked,
	onSelect,
	marker,
	title,
	detail,
}: IChoiceCardProps) {
	return (
		<label
			className={cn(
				"flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border-2 bg-card p-4 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
				checked
					? "border-primary bg-[#eaf3ff] dark:bg-accent"
					: "border-border hover:border-[#0a63b0]/45 dark:hover:border-[#4cc2ff]/50",
			)}
		>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onSelect}
				className="sr-only"
			/>

			<span
				aria-hidden="true"
				className={cn(
					"grid size-9 shrink-0 place-items-center rounded-full border-2 font-mono text-[0.85rem] font-semibold",
					checked
						? "border-primary bg-primary text-primary-foreground"
						: "border-[#002c78]/25 text-[#0a63b0] dark:border-white/20 dark:text-[#4cc2ff]",
				)}
			>
				{checked ? <Check className="size-4" /> : marker}
			</span>

			<span className="min-w-0">
				<span className="block font-semibold">{title}</span>
				<span className="mt-0.5 block text-[0.9rem] leading-snug text-muted-foreground">
					{detail}
				</span>
			</span>
		</label>
	);
}
