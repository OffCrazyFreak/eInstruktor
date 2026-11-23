import { createFileRoute, notFound } from "@tanstack/react-router";
import areasIndex from "@/content/voditelj-brodice/areas-index";
import AreaPage from "@/features/learn/components/area-page";
import pageHead from "@/lib/seo/page-head";

// The small area index keeps the course content out of the main bundle, where route loaders end up.
function findArea(slug: string) {
	return areasIndex.find((area) => area.slug === slug);
}

export const Route = createFileRoute("/_app/ucenje/$area/")({
	loader: ({ params }) => {
		const area = findArea(params.area);

		if (!area) {
			throw notFound();
		}

		return { title: area.title, summary: area.summary };
	},
	head: ({ params, loaderData }) =>
		pageHead({
			path: `/ucenje/${params.area}`,
			title: loaderData ? `${loaderData.title}: lekcije` : "Lekcije",
			description:
				loaderData?.summary ?? "Lekcije za ispit za voditelja brodice.",
		}),
	component: AreaRoute,
});

function AreaRoute() {
	const { area: slug } = Route.useParams();
	const area = findArea(slug);

	return area ? <AreaPage area={area} /> : null;
}
