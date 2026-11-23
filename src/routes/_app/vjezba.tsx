import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import ComingSoonPage from "@/components/custom/app-shell/coming-soon-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/vjezba")({
	head: () =>
		pageHead({
			path: "/vjezba",
			title: "Vježba",
			description: "Pitanja po područjima, pogrešni odgovori i usmeni ispit.",
			noindex: true,
		}),
	component: PracticePage,
});

function PracticePage() {
	return (
		<ComingSoonPage
			icon={ListChecks}
			title="Vježba stiže uskoro"
			description="Ovdje ćeš rješavati pitanja po područjima, ponavljati ona na kojima griješiš i vježbati usmeni ispit. Do tada su pitanja za provjeru u svakoj lekciji."
		/>
	);
}
