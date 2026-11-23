import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import ComingSoonPage from "@/components/custom/app-shell/coming-soon-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/ispit")({
	head: () =>
		pageHead({
			path: "/ispit",
			title: "Probni ispit",
			description: "Probni ispit za voditelja brodice kategorije A i B.",
			noindex: true,
		}),
	component: ExamPage,
});

function ExamPage() {
	return (
		<ComingSoonPage
			icon={ClipboardCheck}
			title="Probni ispit stiže uskoro"
			description="Ovdje ćeš polagati probni ispit za A ili B, s vremenom ili bez njega, i dobiti rezultat po predmetima. Dok ga složimo, prođi lekcije."
		/>
	);
}
