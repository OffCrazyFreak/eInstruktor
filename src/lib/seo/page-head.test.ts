import { describe, expect, it } from "vitest";
import pageHead from "@/lib/seo/page-head";
import { SITE_ORIGIN } from "@/lib/seo/site";

describe("pageHead", () => {
	it("points the canonical link and og:url at the fixed site origin", () => {
		const head = pageHead({
			path: "/uvjeti",
			title: "Uvjeti korištenja",
			description: "Opis",
		});

		expect(head.links).toEqual([
			{ rel: "canonical", href: `${SITE_ORIGIN}/uvjeti` },
		]);
		expect(head.meta).toContainEqual({
			property: "og:url",
			content: `${SITE_ORIGIN}/uvjeti`,
		});
		expect(head.meta).toContainEqual({
			title: "Uvjeti korištenja | eInstruktor",
		});
	});

	it("adds robots noindex only when asked", () => {
		const robots = { name: "robots", content: "noindex" };

		const indexed = pageHead({ path: "/", title: "A", description: "B" });
		const hidden = pageHead({
			path: "/racun",
			title: "A",
			description: "B",
			noindex: true,
		});

		expect(indexed.meta).not.toContainEqual(robots);
		expect(hidden.meta).toContainEqual(robots);
	});
});
