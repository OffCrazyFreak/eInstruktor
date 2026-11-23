import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import ExamRunnerPage from "@/features/exam/components/runner/exam-runner-page";
import pageHead from "@/lib/seo/page-head";

const searchSchema = z.object({
	/** The open question, counted from 1, so a reload stays on it. */
	pitanje: z.number().int().min(1).optional().catch(undefined),
});

export const Route = createFileRoute("/_app/ispit/$sessionId")({
	staticData: { immersive: true },
	validateSearch: searchSchema,
	head: ({ params }) =>
		pageHead({
			path: `/ispit/${params.sessionId}`,
			title: "Probni ispit u tijeku",
			description: "Probni ispit za voditelja brodice.",
			noindex: true,
		}),
	component: ExamRunnerRoute,
});

function ExamRunnerRoute() {
	const { sessionId } = Route.useParams();
	const { pitanje } = Route.useSearch();

	return (
		<ExamRunnerPage
			key={sessionId}
			sessionId={sessionId}
			questionNumber={pitanje}
		/>
	);
}
