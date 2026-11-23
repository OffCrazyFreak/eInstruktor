import { createFileRoute } from "@tanstack/react-router";
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

	return (
		<PracticeSetPage
			search={search}
			onLengthTen={() =>
				void navigate({ search: (previous) => ({ ...previous, length: 10 }) })
			}
		/>
	);
}
