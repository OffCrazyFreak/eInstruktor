import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import ComingSoonPage from "@/components/custom/app-shell/coming-soon-page";
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

function ProgressPage() {
	return (
		<ComingSoonPage
			icon={Gauge}
			title="Napredak stiže uskoro"
			description="Ovdje ćeš vidjeti spremnost po predmetima, točnost i dane učenja. Kratki pregled već imaš na početnoj."
		/>
	);
}
