import { createFileRoute } from "@tanstack/react-router";
import PrivacyPage from "@/features/legal/components/privacy-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_site/privatnost")({
	head: () =>
		pageHead({
			path: "/privatnost",
			title: "Privatnost",
			description:
				"Što eInstruktor sprema u tvom pregledniku, što s Google prijavom u bazi podataka i kako obrisati račun.",
		}),
	component: PrivacyPage,
});
