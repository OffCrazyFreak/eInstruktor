import { cn } from "@/lib/utils";

export interface IChoice<T extends string | number> {
	value: T;
	label: string;
}

interface IChoiceChipsProps<T extends string | number> {
	name: string;
	legend: string;
	choices: IChoice<T>[];
	value: T;
	onChange: (value: T) => void;
}

/** A row of radio chips, such as the set length; arrow keys move between them like any radio group. */
export default function ChoiceChips<T extends string | number>({
	name,
	legend,
	choices,
	value,
	onChange,
}: IChoiceChipsProps<T>) {
	return (
		<fieldset className="min-w-0">
			<legend className="text-[0.95rem] font-semibold">{legend}</legend>

			<div className="mt-2 flex gap-2">
				{choices.map((choice) => {
					const chosen = choice.value === value;

					return (
						<label
							key={String(choice.value)}
							className={cn(
								"flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border-2 px-3 text-center text-[0.95rem] font-semibold has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
								chosen
									? "border-primary bg-tint text-primary dark:bg-accent dark:text-foreground"
									: "border-border bg-card hover:border-ocean/45 dark:hover:border-[#4cc2ff]/50",
							)}
						>
							<input
								type="radio"
								name={name}
								value={String(choice.value)}
								checked={chosen}
								onChange={() => onChange(choice.value)}
								className="sr-only"
							/>
							{choice.label}
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
