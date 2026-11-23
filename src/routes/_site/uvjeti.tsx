import { createFileRoute } from "@tanstack/react-router";
import TermsPage from "@/features/legal/components/terms-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_site/uvjeti")({
	head: () =>
		pageHead({
			path: "/uvjeti",
			title: "Uvjeti korištenja",
			description:
				"eInstruktor je besplatno pomagalo za učenje: procjena spremnosti nije jamstvo, a službeni izvori uvijek imaju prednost.",
		}),
	component: TermsPage,
});
