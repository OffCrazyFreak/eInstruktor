import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import areasIndex from "@/content/voditelj-brodice/areas-index";
import { SITE_ORIGIN } from "@/lib/seo/site";
import {
	escapeXml,
	renderSitemap,
	STATIC_PATHS,
	sitemapPaths,
} from "@/lib/seo/sitemap";

describe("sitemapPaths", () => {
	const paths = sitemapPaths({ areas: areasIndex, lessons: course.lessons });

	it("lists the landing, the legal pages and Lekcija 0", () => {
		expect(paths).toContain("/");
		expect(paths).toContain("/privatnost");
		expect(paths).toContain("/uvjeti");
		expect(paths).toContain("/ucenje/propisi/kako-do-dozvole");
	});

	it("lists every area and every lesson exactly once", () => {
		expect(new Set(paths).size).toBe(paths.length);
		expect(paths).toHaveLength(
			STATIC_PATHS.length + areasIndex.length + course.lessons.length,
		);
	});
});

describe("renderSitemap", () => {
	it("writes absolute URLs on the site origin", () => {
		const xml = renderSitemap(["/", "/uvjeti"]);

		expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`);
		expect(xml).toContain(`<loc>${SITE_ORIGIN}/uvjeti</loc>`);
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
	});

	it("escapes characters that would break the XML", () => {
		const xml = renderSitemap(["/a?b=1&c=2"]);

		expect(xml).toContain(`<loc>${SITE_ORIGIN}/a?b=1&amp;c=2</loc>`);
		expect(escapeXml(`<'">&`)).toBe("&lt;&apos;&quot;&gt;&amp;");
	});
});
