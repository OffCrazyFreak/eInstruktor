import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import ExamResultPage from "@/features/exam/components/result/exam-result-page";
import pageHead from "@/lib/seo/page-head";

const searchSchema = z.object({
	pregled: z.enum(["pogreske", "sva"]).optional().catch(undefined),
});

export const Route = createFileRoute("/_app/ispit/rezultat/$sessionId")({
	validateSearch: searchSchema,
	head: ({ params }) =>
		pageHead({
			path: `/ispit/rezultat/${params.sessionId}`,
			title: "Rezultat probnog ispita",
			description: "Rezultat probnog ispita po predmetima i pregled pogrešaka.",
			noindex: true,
		}),
	component: ExamResultRoute,
});

function ExamResultRoute() {
	const { sessionId } = Route.useParams();
	const { pregled } = Route.useSearch();

	return <ExamResultPage sessionId={sessionId} review={pregled ?? null} />;
}
