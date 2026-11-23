import { createFileRoute, notFound } from "@tanstack/react-router";
import type { ICourse } from "@/content/course-types";
import course from "@/content/voditelj-brodice";
import LessonReader from "@/features/learn/components/reader/lesson-reader";
import { getLesson } from "@/lib/content/course-selectors";
import pageHead from "@/lib/seo/page-head";

function findLesson(content: ICourse, area: string, slug: string) {
	const lesson = getLesson(content, slug);

	return lesson?.area === area ? lesson : undefined;
}

export const Route = createFileRoute("/_app/ucenje/$area/$lesson")({
	staticData: { immersive: true },
	// Loaders are not code-split, so the course loads lazily here; only the head text goes into the page payload.
	loader: async ({ params }) => {
		const { default: content } = await import("@/content/voditelj-brodice");
		const lesson = findLesson(content, params.area, params.lesson);

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
	const lesson = findLesson(course, params.area, params.lesson);

	return lesson ? <LessonReader key={lesson.slug} lesson={lesson} /> : null;
}
