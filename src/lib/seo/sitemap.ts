import type { ICourse } from "@/content/course-types";
import { absoluteUrl } from "@/lib/seo/site";

const STATIC_PATHS = ["/", "/ucenje", "/privatnost", "/uvjeti"];

export function sitemapPaths(course: ICourse): string[] {
	const areaPaths = course.areas.map((area) => `/ucenje/${area.slug}`);

	const lessonPaths = course.lessons.map(
		(lesson) => `/ucenje/${lesson.area}/${lesson.slug}`,
	);

	return [...STATIC_PATHS, ...areaPaths, ...lessonPaths];
}

export function renderSitemap(paths: string[]): string {
	const urls = paths
		.map((path) => `\t<url><loc>${absoluteUrl(path)}</loc></url>`)
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		"</urlset>",
		"",
	].join("\n");
}
