import { createFileRoute } from "@tanstack/react-router";
import ExamStartPage from "@/features/exam/components/start/exam-start-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/ispit/")({
	head: () =>
		pageHead({
			path: "/ispit",
			title: "Probni ispit",
			description:
				"Probni ispit za voditelja brodice kategorije A i B, s vremenom ili bez njega, s rezultatom po predmetima.",
			noindex: true,
		}),
	component: ExamStartPage,
});
