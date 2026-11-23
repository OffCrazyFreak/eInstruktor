import { createFileRoute } from "@tanstack/react-router";
import ExamHistoryPage from "@/features/exam/components/history/exam-history-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/ispit/povijest")({
	head: () =>
		pageHead({
			path: "/ispit/povijest",
			title: "Povijest probnih ispita",
			description: "Svi tvoji probni ispiti s rezultatom po predmetima.",
			noindex: true,
		}),
	component: ExamHistoryPage,
});
