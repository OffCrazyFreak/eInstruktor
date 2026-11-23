import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import areasIndex from "@/content/voditelj-brodice/areas-index";

describe("areasIndex", () => {
	it("lists the same areas as the course, in area order", () => {
		const courseSlugs = [...course.areas]
			.sort((first, second) => first.order - second.order)
			.map((area) => area.slug);

		expect(areasIndex.map((area) => area.slug)).toEqual(courseSlugs);
	});
});
