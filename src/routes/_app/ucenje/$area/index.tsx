import { createFileRoute, notFound } from "@tanstack/react-router";
import type { AreaSlug } from "@/content/types";
import course from "@/content/voditelj-brodice";
import AreaPage from "@/features/learn/components/area-page";
import { getArea } from "@/lib/content/course-selectors";
import pageHead from "@/lib/seo/page-head";

function findArea(slug: string) {
	return getArea(course, slug as AreaSlug);
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
