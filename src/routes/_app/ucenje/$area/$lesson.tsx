import { createFileRoute, notFound } from "@tanstack/react-router";
import course from "@/content/voditelj-brodice";
import LessonReader from "@/features/learn/components/reader/lesson-reader";
import { getLesson } from "@/lib/content/course-selectors";
import pageHead from "@/lib/seo/page-head";

function findLesson(area: string, slug: string) {
	const lesson = getLesson(course, slug);

	return lesson?.area === area ? lesson : undefined;
}

export const Route = createFileRoute("/_app/ucenje/$area/$lesson")({
	staticData: { immersive: true },
	// Only the head text goes through the loader, so the lesson body is not sent twice in the page payload.
	loader: ({ params }) => {
		const lesson = findLesson(params.area, params.lesson);

		if (!lesson) {
			throw notFound();
		}

		return { title: lesson.title, summary: lesson.summary };
	},
	head: ({ params, loaderData }) =>
		pageHead({
			path: `/ucenje/${params.area}/${params.lesson}`,
			title: loaderData?.title ?? "Lekcija",
			description:
				loaderData?.summary ?? "Lekcija za ispit za voditelja brodice.",
		}),
	component: LessonRoute,
});

function LessonRoute() {
	const params = Route.useParams();
	const lesson = findLesson(params.area, params.lesson);

	return lesson ? <LessonReader key={lesson.slug} lesson={lesson} /> : null;
}
