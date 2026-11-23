import { createFileRoute } from "@tanstack/react-router";
import PracticeHub from "@/features/practice/components/hub/practice-hub";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/vjezba/")({
	head: () =>
		pageHead({
			path: "/vjezba",
			title: "Vježba",
			description:
				"Pitanja po područjima, pogrešni odgovori, slaba područja i usmeni ispit.",
			noindex: true,
		}),
	component: PracticeHub,
});
