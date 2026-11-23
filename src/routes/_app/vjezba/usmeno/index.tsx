import { createFileRoute } from "@tanstack/react-router";
import OralDecks from "@/features/practice/components/flashcards/oral-decks";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/vjezba/usmeno/")({
	head: () =>
		pageHead({
			path: "/vjezba/usmeno",
			title: "Usmeni ispit",
			description:
				"Kartice s pitanjima usmenog ispita za voditelja brodice, po predmetima.",
			noindex: true,
		}),
	component: OralDecks,
});
