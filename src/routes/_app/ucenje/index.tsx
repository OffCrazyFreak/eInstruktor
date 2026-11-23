import { createFileRoute } from "@tanstack/react-router";
import LearnOverview from "@/features/learn/components/learn-overview";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/ucenje/")({
	head: () =>
		pageHead({
			path: "/ucenje",
			title: "Lekcije za voditelja brodice",
			description:
				"Kratke vizualne lekcije za ispit za voditelja brodice A i B: plovne oznake, svjetla, izbjegavanje sudara, meteorologija, VHF radio i više.",
		}),
	component: LearnOverview,
});
