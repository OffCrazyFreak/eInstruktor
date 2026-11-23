import { Flag } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { isCorrectSelection } from "@/components/custom/question/grade-answer";
import QuestionView from "@/components/custom/question/question-view";
import { Button } from "@/components/ui/button";
import type { IQuestion } from "@/content/types";
import LeaveSetSheet from "@/features/practice/components/session/leave-set-sheet";
import SessionActionBar from "@/features/practice/components/session/session-action-bar";
import SessionEnd from "@/features/practice/components/session/session-end";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import { DOUBLE_TAP_GUARD_MS } from "@/features/practice/constants/double-tap";
import {
	type ISessionAnswer,
	practiceSessionReducer,
	startSession,
} from "@/features/practice/utils/practice-session";
import { recordAnswer, toggleFlag } from "@/lib/progress/progress-actions";
import useProgress from "@/lib/progress/use-progress";
import randomId from "@/lib/random-id";

interface IPracticeSetProps {
	title: string;
	questions: IQuestion[];
	deferFeedback: boolean;
	onAgain: (answers: ISessionAnswer[]) => void;
}

export default function PracticeSet({
	title,
	questions,
	deferFeedback,
	onAgain,
}: IPracticeSetProps) {
	const { progress, update } = useProgress();
	const [sessionId] = useState(randomId);
	const [leaving, setLeaving] = useState(false);
	const checkedAt = useRef(0);
	const questionRef = useRef<HTMLDivElement>(null);
	const shownIndex = useRef<number | null>(null);

	const [state, dispatch] = useReducer(practiceSessionReducer, null, () =>
		startSession(
			questions.map((question) => question.id),
			deferFeedback,
		),
	);

	const question = questions[state.index];
	const isLast = state.index === questions.length - 1;

	// The button that moved on is gone or disabled now, so keyboard and screen reader users start again at the new question.
	useEffect(() => {
		if (shownIndex.current !== null && shownIndex.current !== state.index) {
			questionRef.current?.focus({ preventScroll: true });
		}

		shownIndex.current = state.index;
	}, [state.index]);

	if (state.phase === "finished" || !question) {
		return (
			<SessionEnd
				title={title}
				questions={questions}
				answers={state.answers}
				onAgain={onAgain}
			/>
		);
	}

	const flagged = progress.flagged[question.id] !== undefined;
	const checked = state.phase === "checked";

	function handleToggleFlag() {
		if (question) {
			update((current) => toggleFlag(current, question.id, Date.now()));
		}
	}

	// A new question starts at the top, so a long explanation never leaves the next prompt scrolled away.
	function scrollToTop() {
		window.scrollTo({ top: 0 });
	}

	function handleCheck() {
		if (
			!question ||
			state.phase !== "answering" ||
			state.selected.length === 0
		) {
			return;
		}

		checkedAt.current = Date.now();

		const correct = isCorrectSelection(question, state.selected);

		dispatch({ type: "check", correct });

		update((current) =>
			recordAnswer(current, {
				id: randomId(),
				questionId: question.id,
				correct,
				selected: state.selected,
				mode: "practice",
				sessionId,
				answeredAt: Date.now(),
			}),
		);

		if (deferFeedback) {
			scrollToTop();
		}
	}

	function handleNext() {
		if (Date.now() - checkedAt.current < DOUBLE_TAP_GUARD_MS) {
			return;
		}

		dispatch({ type: "next" });
		scrollToTop();
	}

	const checkLabel = !deferFeedback
		? "Provjeri"
		: isLast
			? "Završi seriju"
			: "Dalje";

	return (
		<>
			<SessionTopBar
				title={title}
				closeTo="/vjezba"
				closeLabel="Zatvori seriju"
				onClose={state.answers.length > 0 ? () => setLeaving(true) : undefined}
				position={{ current: state.index + 1, total: questions.length }}
				flag={{ flagged, onToggle: handleToggleFlag }}
			/>

			<LeaveSetSheet
				open={leaving}
				answered={state.answers.length}
				onOpenChange={setLeaving}
			/>

			<main className="mx-auto max-w-2xl px-4 pt-6 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-6">
				<div
					ref={questionRef}
					tabIndex={-1}
					aria-label={`Pitanje ${state.index + 1} od ${questions.length}`}
					className="rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
				>
					<QuestionView
						key={question.id}
						question={question}
						selected={state.selected}
						onSelectedChange={(selected) =>
							dispatch({ type: "select", selected })
						}
						revealed={checked}
					/>
				</div>

				{checked && (
					<Button
						type="button"
						variant="outline"
						onClick={handleToggleFlag}
						aria-pressed={flagged}
						className="mt-3 h-11 rounded-full font-semibold"
					>
						<Flag
							className="size-4"
							fill={flagged ? "currentColor" : "none"}
							aria-hidden="true"
						/>
						{flagged ? "Označeno za kasnije" : "Označi za kasnije"}
					</Button>
				)}
			</main>

			<SessionActionBar>
				{checked ? (
					<Button
						key="next"
						type="button"
						onClick={handleNext}
						className="h-12 w-full rounded-full text-[1rem] font-semibold"
					>
						{isLast ? "Pogledaj rezultat" : "Dalje"}
					</Button>
				) : (
					<Button
						key="check"
						type="button"
						onClick={handleCheck}
						disabled={state.selected.length === 0}
						className="h-12 w-full rounded-full text-[1rem] font-semibold"
					>
						{checkLabel}
					</Button>
				)}
			</SessionActionBar>
		</>
	);
}
