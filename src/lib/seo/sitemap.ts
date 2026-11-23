import type { IArea, ILesson } from "@/content/types";
import { absoluteUrl } from "@/lib/seo/site";

export const STATIC_PATHS = ["/", "/ucenje", "/privatnost", "/uvjeti"];

interface ISitemapContent {
	areas: Pick<IArea, "slug">[];
	lessons: Pick<ILesson, "area" | "slug">[];
}

const XML_ENTITIES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&apos;",
};

export function escapeXml(value: string): string {
	return value.replace(
		/[&<>"']/g,
		(character) => XML_ENTITIES[character] ?? character,
	);
}

export function sitemapPaths({ areas, lessons }: ISitemapContent): string[] {
	const areaPaths = areas.map((area) => `/ucenje/${area.slug}`);

	const lessonPaths = lessons.map(
		(lesson) => `/ucenje/${lesson.area}/${lesson.slug}`,
	);

	return [...STATIC_PATHS, ...areaPaths, ...lessonPaths];
}

export function renderSitemap(paths: string[]): string {
	const urls = paths
		.map((path) => `\t<url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`)
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		"</urlset>",
		"",
	].join("\n");
}
