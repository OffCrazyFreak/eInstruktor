import { createFileRoute } from "@tanstack/react-router";
import ProgressPage from "@/features/progress/components/progress-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/napredak")({
	head: () =>
		pageHead({
			path: "/napredak",
			title: "Napredak",
			description: "Spremnost po predmetima, točnost i dani učenja.",
			noindex: true,
		}),
	component: ProgressPage,
});
