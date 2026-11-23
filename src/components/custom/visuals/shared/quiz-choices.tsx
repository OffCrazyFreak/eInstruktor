import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IChoice {
	value: string;
	label: string;
}

interface IQuizChoicesProps {
	prompt: string;
	choices: readonly IChoice[];
	answer: string;
	/** Shown after any answer, e.g. why the right one is right. */
	explanation?: string;
	onNext?: () => void;
	tone?: "day" | "night";
}

/** One multiple-choice question inside a visual. Give it a `key` per question so the answer resets. */
export default function QuizChoices({
	prompt,
	choices,
	answer,
	explanation,
	onNext,
	tone = "day",
}: IQuizChoicesProps) {
	const [picked, setPicked] = useState<string | null>(null);
	const answered = picked !== null;
	const correct = picked === answer;
	const answerLabel = choices.find((choice) => choice.value === answer)?.label;

	return (
		<div className="space-y-3">
			<p className="font-serif text-[1.02rem] leading-snug">{prompt}</p>

			<div className="grid gap-2 sm:grid-cols-2">
				{choices.map((choice) => {
					const isAnswer = choice.value === answer;
					const isPicked = choice.value === picked;

					return (
						<button
							key={choice.value}
							type="button"
							disabled={answered}
							aria-pressed={isPicked}
							onClick={() => setPicked(choice.value)}
							className={cn(
								"flex min-h-11 items-center justify-between gap-2 rounded-2xl border px-4 py-2 text-left text-[0.9rem] font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60 disabled:cursor-default",
								tone === "day"
									? "border-[#002c78]/15 bg-white text-[#002c78] enabled:hover:border-[#00aef3]"
									: "border-white/20 bg-white/5 text-[#eaf3ff] enabled:hover:border-[#ffb43c]",
								answered && isAnswer && "border-[#14a05a] bg-[#14a05a]/12",
								answered &&
									isPicked &&
									!isAnswer &&
									"border-[#e0322b] bg-[#e0322b]/10",
							)}
						>
							<span>{choice.label}</span>
							{answered && isAnswer && (
								<Check className="size-4 text-[#14a05a]" aria-hidden />
							)}
							{answered && isPicked && !isAnswer && (
								<X className="size-4 text-[#e0322b]" aria-hidden />
							)}
						</button>
					);
				})}
			</div>

			<div aria-live="polite" className="min-h-0">
				{answered && (
					<div className="space-y-2 text-[0.9rem] leading-relaxed">
						<p className="font-semibold">
							{correct ? "Točno." : `Nije. Točno je: ${answerLabel}.`}
						</p>
						{explanation && <p className="opacity-85">{explanation}</p>}
					</div>
				)}
			</div>

			{answered && onNext && (
				<button
					type="button"
					onClick={onNext}
					className={cn(
						"inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.88rem] font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
						tone === "day"
							? "bg-[#002c78] text-white hover:bg-[#0a63b0]"
							: "bg-[#ffb43c] text-[#04142e] hover:bg-[#ffe89a]",
					)}
				>
					<RotateCcw className="size-4" aria-hidden />
					Novo pitanje
				</button>
			)}
		</div>
	);
}
