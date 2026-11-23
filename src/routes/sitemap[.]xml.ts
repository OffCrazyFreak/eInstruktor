import { createFileRoute } from "@tanstack/react-router";
import course from "@/content/voditelj-brodice";
import areasIndex from "@/content/voditelj-brodice/areas-index";
import { renderSitemap, sitemapPaths } from "@/lib/seo/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(
					renderSitemap(
						sitemapPaths({ areas: areasIndex, lessons: course.lessons }),
					),
					{
						headers: {
							"Content-Type": "application/xml; charset=utf-8",
							"Cache-Control": "public, max-age=3600",
						},
					},
				),
		},
	},
});
