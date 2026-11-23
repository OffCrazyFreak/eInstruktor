import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/features/home/components/home-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/pocetna")({
	head: () =>
		pageHead({
			path: "/pocetna",
			title: "Početna",
			description:
				"Tvoja priprema za ispit za voditelja brodice: sljedeća lekcija, današnji cilj i spremnost po predmetima.",
			noindex: true,
		}),
	component: HomePage,
});
