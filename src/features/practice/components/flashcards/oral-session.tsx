import OralRounds from "@/features/practice/components/flashcards/oral-rounds";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import { deckTitle } from "@/features/practice/utils/deck-title";
import type { DeckId } from "@/features/practice/utils/flashcard-deck";
import useProgress from "@/lib/progress/use-progress";

interface IOralSessionProps {
	deck: DeckId;
}

/** Waits for the stored card boxes, because the order puts due and new cards first. */
export default function OralSession({ deck }: IOralSessionProps) {
	const { ready } = useProgress();

	if (!ready) {
		return (
			<SessionTopBar
				title={deckTitle(deck)}
				closeTo="/vjezba/usmeno"
				closeLabel="Zatvori kartice"
				position={null}
			/>
		);
	}

	return <OralRounds deck={deck} />;
}
