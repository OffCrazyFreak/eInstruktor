import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useRef } from "react";
import type { IQuestion } from "@/content/types";
import { cn } from "@/lib/utils";

interface IQuestionFeedbackProps {
	question: IQuestion;
	correct: boolean;
	showLessonLink: boolean;
	/** False when the question was already answered on first render, so opening a page never jumps focus. */
	takeFocus: boolean;
}

export default function QuestionFeedback({
	question,
	correct,
	showLessonLink,
	takeFocus,
}: IQuestionFeedbackProps) {
	const panelRef = useRef<HTMLDivElement>(null);

	// Screen reader and keyboard users land on the result right after checking.
	useEffect(() => {
		if (takeFocus) {
			panelRef.current?.focus();
		}
	}, [takeFocus]);

	const Icon = correct ? CircleCheck : CircleX;

	return (
		<div
			ref={panelRef}
			tabIndex={-1}
			className={cn(
				"rounded-2xl border-l-4 bg-card p-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60",
				correct ? "border-emerald-600" : "border-rose-600",
			)}
		>
			<p
				className={cn(
					"flex items-center gap-2 text-[1.05rem] font-semibold",
					correct
						? "text-emerald-700 dark:text-emerald-400"
						: "text-rose-700 dark:text-rose-400",
				)}
			>
				<Icon className="size-5" aria-hidden="true" />
				{correct ? "Točno" : "Netočno"}
			</p>

			<p className="mt-2 text-[0.98rem] leading-relaxed">
				{question.explanation}
			</p>

			{question.ruleRef && (
				<p className="mt-3 font-mono text-[0.78rem] text-muted-foreground">
					<span className="font-semibold tracking-wider">PRAVILO</span>{" "}
					{question.ruleRef}
				</p>
			)}

			{showLessonLink && question.lesson && (
				<Link
					to="/ucenje/$area/$lesson"
					params={{ area: question.area, lesson: question.lesson }}
					className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold text-[#0a63b0] hover:text-[#002c78]"
				>
					Pročitaj lekciju
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			)}
		</div>
	);
}
