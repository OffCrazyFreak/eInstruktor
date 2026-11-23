import { SUBJECT_LABELS } from "@/content/voditelj-brodice/subjects";
import {
	ALL_DECKS,
	type DeckId,
} from "@/features/practice/utils/flashcard-deck";

export function deckTitle(deck: DeckId): string {
	return deck === ALL_DECKS ? "Sve kartice" : SUBJECT_LABELS[deck];
}
