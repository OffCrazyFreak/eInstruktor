import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { SITE_ORIGIN } from "@/lib/seo/site";
import { renderSitemap, sitemapPaths } from "@/lib/seo/sitemap";

describe("sitemapPaths", () => {
	const paths = sitemapPaths(course);

	it("lists the landing, the legal pages and Lekcija 0", () => {
		expect(paths).toContain("/");
		expect(paths).toContain("/privatnost");
		expect(paths).toContain("/uvjeti");
		expect(paths).toContain("/ucenje/propisi/kako-do-dozvole");
	});

	it("lists every area and every lesson exactly once", () => {
		expect(new Set(paths).size).toBe(paths.length);
		expect(paths).toHaveLength(4 + course.areas.length + course.lessons.length);
	});
});

describe("renderSitemap", () => {
	it("writes absolute URLs on the site origin", () => {
		const xml = renderSitemap(["/", "/uvjeti"]);

		expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`);
		expect(xml).toContain(`<loc>${SITE_ORIGIN}/uvjeti</loc>`);
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
	});
});
