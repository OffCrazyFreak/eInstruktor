import QuestionView from "@/components/custom/question/question-view";
import type { IQuestion } from "@/content/types";
import type { ISessionAnswer } from "@/features/practice/utils/practice-session";

interface IMistakesReviewProps {
	questions: IQuestion[];
	answers: ISessionAnswer[];
}

function ignoreChange() {}

export default function MistakesReview({
	questions,
	answers,
}: IMistakesReviewProps) {
	const wrong = answers.filter((answer) => !answer.correct);

	return (
		<ol aria-label="Pogreške iz serije" className="mt-6 space-y-8">
			{wrong.map((answer, position) => {
				const question = questions.find((q) => q.id === answer.questionId);

				return question ? (
					<li
						key={answer.questionId}
						className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
					>
						<p className="mb-3 font-mono text-[0.74rem] tracking-[0.16em] text-muted-foreground">
							POGREŠKA {position + 1} OD {wrong.length}
						</p>
						<QuestionView
							question={question}
							selected={answer.selected}
							onSelectedChange={ignoreChange}
							revealed
						/>
					</li>
				) : null;
			})}
		</ol>
	);
}
