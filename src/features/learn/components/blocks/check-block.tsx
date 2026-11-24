import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { isCorrectSelection } from "@/components/custom/question/grade-answer";
import QuestionView from "@/components/custom/question/question-view";
import { Button } from "@/components/ui/button";
import course from "@/content/voditelj-brodice";
import { getQuestions } from "@/lib/content/course-selectors";
import { recordAnswer } from "@/lib/progress/progress-actions";
import useProgress from "@/lib/progress/use-progress";
import randomId from "@/lib/random-id";

interface ICheckBlockProps {
	questionId: string;
	lessonSlug: string;
	/** One per lesson visit, so a re-read lesson counts as a new first attempt. */
	sessionId: string;
}

export default function CheckBlock({
	questionId,
	lessonSlug,
	sessionId,
}: ICheckBlockProps) {
	const { update } = useProgress();
	const [selected, setSelected] = useState<string[]>([]);
	const [revealed, setRevealed] = useState(false);
	const question = getQuestions(course, { ids: [questionId] })[0];

	if (!question) {
		return null;
	}

	function handleCheck() {
		if (!question) {
			return;
		}

		setRevealed(true);

		update((progress) =>
			recordAnswer(progress, {
				id: randomId(),
				questionId: question.id,
				correct: isCorrectSelection(question, selected),
				selected,
				mode: "check",
				sessionId,
				answeredAt: Date.now(),
			}),
		);
	}

	return (
		<section
			aria-label="Pitanje za provjeru"
			className="rounded-[1.4rem] border-2 border-ink/12 bg-[#f4f9ff] p-4 sm:p-5 dark:bg-card dark:border-white/20"
		>
			<p className="mb-3 flex items-center gap-2 font-mono text-[0.74rem] font-semibold tracking-[0.16em] text-ocean dark:text-[#4cc2ff]">
				<CircleHelp className="size-4" aria-hidden="true" />
				PROVJERI SE
			</p>

			<QuestionView
				question={question}
				selected={selected}
				onSelectedChange={setSelected}
				revealed={revealed}
				showLessonLink={question.lesson !== lessonSlug}
			/>

			{!revealed && (
				<Button
					type="button"
					onClick={handleCheck}
					disabled={selected.length === 0}
					className="mt-4 h-12 w-full rounded-full text-[1rem] font-semibold sm:w-auto sm:px-8"
				>
					Provjeri
				</Button>
			)}
		</section>
	);
}
