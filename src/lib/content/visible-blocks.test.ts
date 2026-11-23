import { describe, expect, it } from "vitest";
import type { ILesson } from "@/content/types";
import { getVisibleBlocks } from "@/lib/content/visible-blocks";

const lesson: ILesson = {
	slug: "test",
	area: "propisi",
	order: 1,
	title: "Test",
	summary: "Test",
	level: "common",
	minutes: 2,
	cheatSheet: [],
	source: "original",
	blocks: [
		{ type: "text", level: "common", markdown: "za sve" },
		{ type: "text", level: "A", markdown: "samo A" },
		{ type: "text", level: "B", markdown: "samo B" },
	],
};

function texts(level: "A" | "B") {
	return getVisibleBlocks(lesson, level).map(({ block, isBOnly }) => [
		block.type === "text" ? block.markdown : "",
		isBOnly,
	]);
}

describe("getVisibleBlocks", () => {
	it("shows an A learner common and A blocks", () => {
		expect(texts("A")).toEqual([
			["za sve", false],
			["samo A", false],
		]);
	});

	it("shows a B learner every block and marks the B ones", () => {
		expect(texts("B")).toEqual([
			["za sve", false],
			["samo A", false],
			["samo B", true],
		]);
	});
});
