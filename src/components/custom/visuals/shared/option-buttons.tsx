import { cn } from "@/lib/utils";

interface IOption<T extends string> {
	value: T;
	label: string;
}

interface IOptionButtonsProps<T extends string> {
	label: string;
	options: readonly IOption<T>[];
	value: T | undefined;
	onChange: (value: T) => void;
	tone?: "day" | "night";
	className?: string;
}

/** A row of toggle buttons for picking one option; wraps on narrow screens instead of scrolling. */
export default function OptionButtons<T extends string>({
	label,
	options,
	value,
	onChange,
	tone = "day",
	className,
}: IOptionButtonsProps<T>) {
	return (
		<fieldset className={cn("m-0 min-w-0 border-0 p-0", className)}>
			<legend className="sr-only">{label}</legend>

			<div className="flex flex-wrap gap-1.5">
				{options.map((option) => {
					const selected = option.value === value;

					return (
						<button
							key={option.value}
							type="button"
							aria-pressed={selected}
							onClick={() => onChange(option.value)}
							className={cn(
								"min-h-9 rounded-full border px-3 py-1 text-[0.82rem] font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
								tone === "day" &&
									(selected
										? "border-[#002c78] bg-[#002c78] text-white"
										: "border-[#002c78]/15 bg-white text-[#002c78] hover:border-[#00aef3] hover:bg-[#eaf3ff]"),
								tone === "night" &&
									(selected
										? "border-[#ffb43c] bg-[#ffb43c] text-[#04142e]"
										: "border-white/20 bg-white/5 text-[#eaf3ff] hover:border-[#ffb43c]/70"),
							)}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</fieldset>
	);
}
