import { Check, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { OptionFeedback } from "@/components/custom/question/grade-answer";
import type { IAnswerOption } from "@/content/types";
import { cn } from "@/lib/utils";

interface IAnswerOptionProps {
	option: IAnswerOption;
	name: string;
	marker: string | null;
	multiple: boolean;
	checked: boolean;
	/** Set once the answer is checked; the option then shows whether it was right. */
	feedback: OptionFeedback | null;
	onToggle: (optionId: string, checked: boolean) => void;
}

const FEEDBACK_NOTE: Record<OptionFeedback, string | null> = {
	"correct-chosen": "Tvoj odgovor, točno",
	"correct-missed": "Točan odgovor",
	"wrong-chosen": "Tvoj odgovor, netočno",
	neutral: null,
};

export default function AnswerOption({
	option,
	name,
	marker,
	multiple,
	checked,
	feedback,
	onToggle,
}: IAnswerOptionProps) {
	const isRight =
		feedback === "correct-chosen" || feedback === "correct-missed";
	const isWrong = feedback === "wrong-chosen";
	const note = feedback ? FEEDBACK_NOTE[feedback] : null;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		onToggle(option.id, event.target.checked);
	}

	return (
		<label
			className={cn(
				"flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card px-4 py-3 text-[1rem] leading-snug transition-colors",
				"has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
				feedback === null &&
					!checked &&
					"border-border hover:border-[#0a63b0]/45 hover:bg-[#eaf3ff]/60",
				feedback === null && checked && "border-primary bg-[#eaf3ff]",
				feedback !== null && "cursor-default",
				feedback === "neutral" && "border-border opacity-75",
				isRight && "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
				isWrong && "border-rose-600 bg-rose-50 dark:bg-rose-950/40",
			)}
		>
			<input
				type={multiple ? "checkbox" : "radio"}
				name={name}
				value={option.id}
				checked={checked}
				disabled={feedback !== null}
				onChange={handleChange}
				className="sr-only"
			/>

			<span
				aria-hidden="true"
				className={cn(
					"grid size-8 shrink-0 place-items-center border-2 font-mono text-[0.8rem] font-semibold",
					multiple ? "rounded-lg" : "rounded-full",
					checked
						? "border-primary bg-primary text-primary-foreground"
						: "border-[#002c78]/25 text-[#0a63b0]",
					isRight && "border-emerald-600 bg-emerald-600 text-white",
					isWrong && "border-rose-600 bg-rose-600 text-white",
				)}
			>
				{isRight ? (
					<Check className="size-4" />
				) : isWrong ? (
					<X className="size-4" />
				) : (
					marker
				)}
			</span>

			<span className="min-w-0 flex-1">
				<span className="block">{option.text}</span>

				{note && (
					<span
						className={cn(
							"mt-1 block text-[0.8rem] font-semibold",
							isRight
								? "text-emerald-700 dark:text-emerald-400"
								: "text-rose-700 dark:text-rose-400",
						)}
					>
						{note}
					</span>
				)}
			</span>
		</label>
	);
}
