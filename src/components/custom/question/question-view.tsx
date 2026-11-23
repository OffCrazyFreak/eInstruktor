import { useId, useState } from "react";
import AnswerOption from "@/components/custom/question/answer-option";
import {
	isCorrectSelection,
	optionFeedback,
} from "@/components/custom/question/grade-answer";
import QuestionFeedback from "@/components/custom/question/question-feedback";
import VisualFrame from "@/components/custom/visuals/visual-frame";
import type { IQuestion } from "@/content/types";
import { cn } from "@/lib/utils";

interface IQuestionViewProps {
	question: IQuestion;
	selected: string[];
	onSelectedChange: (selected: string[]) => void;
	/** Shows right and wrong options with the explanation; the exam keeps this off until the result. */
	revealed: boolean;
	/** Off inside the lesson the question belongs to. */
	showLessonLink?: boolean;
	/** A finished answer shown for review: options are a plain list, so screen readers do not offer them as changeable. */
	readOnly?: boolean;
	className?: string;
}

const MARKERS = "ABCDEFGH";

/** One question as learn, practice and exam show it; the caller owns the check button and what an answer records. */
export default function QuestionView({
	question,
	selected,
	onSelectedChange,
	revealed,
	showLessonLink = true,
	readOnly = false,
	className,
}: IQuestionViewProps) {
	const baseId = useId();
	const [revealedAtMount] = useState(revealed);
	const promptId = `${baseId}-prompt`;
	const multiple = question.type === "multi";

	function handleToggle(optionId: string, checked: boolean) {
		if (!multiple) {
			onSelectedChange([optionId]);
			return;
		}

		onSelectedChange(
			checked
				? [...selected, optionId]
				: selected.filter((id) => id !== optionId),
		);
	}

	const options = question.options.map((option, index) => (
		<AnswerOption
			key={option.id}
			option={option}
			name={`${baseId}-options`}
			marker={question.type === "true-false" ? null : (MARKERS[index] ?? null)}
			multiple={multiple}
			checked={selected.includes(option.id)}
			feedback={revealed ? optionFeedback(option, selected) : null}
			onToggle={handleToggle}
			readOnly={readOnly}
		/>
	));

	return (
		<div className={cn("space-y-4", className)}>
			<p id={promptId} className="text-[1.08rem] leading-snug font-semibold">
				{question.prompt}
			</p>

			{question.media && (
				<VisualFrame
					key={question.id}
					visual={question.media.visual}
					props={question.media.props}
					hideAnswer={!revealed}
				/>
			)}

			{multiple && (
				<p className="text-[0.88rem] text-muted-foreground">
					Odaberi sve točne odgovore.
				</p>
			)}

			{readOnly ? (
				<ul
					aria-labelledby={promptId}
					className="m-0 list-none space-y-2.5 p-0"
				>
					{options}
				</ul>
			) : multiple ? (
				<fieldset
					aria-labelledby={promptId}
					className="m-0 min-w-0 space-y-2.5 border-0 p-0"
				>
					{options}
				</fieldset>
			) : (
				<div
					role="radiogroup"
					aria-labelledby={promptId}
					className="space-y-2.5"
				>
					{options}
				</div>
			)}

			<div aria-live="polite">
				{revealed && (
					<QuestionFeedback
						question={question}
						correct={isCorrectSelection(question, selected)}
						showLessonLink={showLessonLink}
						takeFocus={!revealedAtMount}
					/>
				)}
			</div>
		</div>
	);
}
