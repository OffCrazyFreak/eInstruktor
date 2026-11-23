import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PracticeSetPage from "@/features/practice/components/session/practice-set-page";
import { practiceSearchSchema } from "@/features/practice/utils/practice-search";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/vjezba/serija")({
	staticData: { immersive: true },
	validateSearch: practiceSearchSchema,
	head: () =>
		pageHead({
			path: "/vjezba/serija",
			title: "Serija pitanja",
			description: "Serija pitanja za ispit za voditelja brodice.",
			noindex: true,
		}),
	component: PracticeSetRoute,
});

function PracticeSetRoute() {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const [run, setRun] = useState(0);

	function handleAgain() {
		setRun((current) => current + 1);
		void navigate({ search: (previous) => ({ ...previous, length: 10 }) });
	}

	return (
		<PracticeSetPage
			key={`${run}:${JSON.stringify(search)}`}
			search={search}
			onAgain={handleAgain}
		/>
	);
}
