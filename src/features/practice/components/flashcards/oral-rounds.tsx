import { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import course from "@/content/voditelj-brodice";
import { SUBJECT_LABELS } from "@/content/voditelj-brodice/subjects";
import FlashCard from "@/features/practice/components/flashcards/flash-card";
import OralSummary from "@/features/practice/components/flashcards/oral-summary";
import SessionActionBar from "@/features/practice/components/session/session-action-bar";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import { deckTitle } from "@/features/practice/utils/deck-title";
import {
	type DeckId,
	deckCards,
	reviewOrder,
} from "@/features/practice/utils/flashcard-deck";
import {
	currentCardId,
	flashcardReducer,
	startFlashcards,
} from "@/features/practice/utils/flashcard-session";
import { subjectOfArea } from "@/lib/content/course-selectors";
import { toStudyDay } from "@/lib/dates/study-day";
import { gradeCard } from "@/lib/progress/practice/practice-actions";
import useProgress from "@/lib/progress/use-progress";

interface IOralRoundsProps {
	deck: DeckId;
}

export default function OralRounds({ deck }: IOralRoundsProps) {
	const { progress, level, update } = useProgress();

	const [cards] = useState(() =>
		reviewOrder(
			deckCards(course, level, deck),
			progress.cardBoxes,
			toStudyDay(new Date()),
		),
	);

	const [state, dispatch] = useReducer(flashcardReducer, null, () =>
		startFlashcards(cards.map((card) => card.id)),
	);

	const cardId = currentCardId(state);
	const card = cards.find((candidate) => candidate.id === cardId);

	function handleGrade(known: boolean) {
		if (!card) {
			return;
		}

		dispatch({ type: "grade", known });
		update((current) => gradeCard(current, card.id, known, Date.now()));
		window.scrollTo({ top: 0 });
	}

	const subject = card ? subjectOfArea(course, card.area) : undefined;

	return (
		<>
			<SessionTopBar
				title={deckTitle(deck)}
				closeTo="/vjezba/usmeno"
				closeLabel="Zatvori kartice"
				position={
					card ? { current: state.index + 1, total: state.queue.length } : null
				}
			/>

			{!card ? (
				<OralSummary
					round={state.round}
					known={state.known.length}
					missed={state.missed.length}
					onRepeat={() => dispatch({ type: "repeatMissed" })}
				/>
			) : (
				<>
					<main className="mx-auto max-w-2xl px-4 pt-6 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:px-6">
						<FlashCard
							key={`${state.round}:${card.id}`}
							card={card}
							subject={subject ? SUBJECT_LABELS[subject] : ""}
							revealed={state.phase === "back"}
							onReveal={() => dispatch({ type: "reveal" })}
						/>
					</main>

					<SessionActionBar>
						{state.phase === "front" ? (
							<Button
								type="button"
								onClick={() => dispatch({ type: "reveal" })}
								className="h-12 w-full rounded-full text-[1rem] font-semibold"
							>
								Prikaži odgovor
							</Button>
						) : (
							<>
								<Button
									type="button"
									onClick={() => handleGrade(true)}
									className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1"
								>
									Znao sam
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => handleGrade(false)}
									className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1"
								>
									Nisam znao
								</Button>
							</>
						)}
					</SessionActionBar>
				</>
			)}
		</>
	);
}
