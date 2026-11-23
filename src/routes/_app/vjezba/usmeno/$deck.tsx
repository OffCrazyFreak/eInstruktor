import { createFileRoute, notFound } from "@tanstack/react-router";
import AppNotFoundPage from "@/components/custom/app-shell/app-not-found-page";
import OralSession from "@/features/practice/components/flashcards/oral-session";
import { deckTitle } from "@/features/practice/utils/deck-title";
import {
	ALL_DECKS,
	type DeckId,
} from "@/features/practice/utils/flashcard-deck";
import { EXAM_SUBJECT_IDS } from "@/features/practice/utils/practice-search";
import pageHead from "@/lib/seo/page-head";

const DECK_IDS: readonly string[] = [ALL_DECKS, ...EXAM_SUBJECT_IDS];

function isDeckId(value: string): value is DeckId {
	return DECK_IDS.includes(value);
}

export const Route = createFileRoute("/_app/vjezba/usmeno/$deck")({
	staticData: { immersive: true },
	beforeLoad: ({ params }) => {
		if (!isDeckId(params.deck)) {
			throw notFound();
		}
	},
	head: ({ params }) =>
		pageHead({
			path: `/vjezba/usmeno/${params.deck}`,
			title: isDeckId(params.deck) ? deckTitle(params.deck) : "Usmeni ispit",
			description: "Kartice za usmeni ispit za voditelja brodice.",
			noindex: true,
		}),
	notFoundComponent: AppNotFoundPage,
	component: OralDeckRoute,
});

function OralDeckRoute() {
	const { deck } = Route.useParams();

	return isDeckId(deck) ? <OralSession key={deck} deck={deck} /> : null;
}
