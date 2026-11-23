import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	getArea,
	getLesson,
	getLessonsByArea,
	getQuestions,
	matchesLevel,
	subjectOfArea,
} from "@/lib/content/course-selectors";

describe("matchesLevel", () => {
	it("lets common content through for both levels", () => {
		expect(matchesLevel("common", "A")).toBe(true);
		expect(matchesLevel("common", "B")).toBe(true);
	});

	it("keeps A and B content apart", () => {
		expect(matchesLevel("B", "A")).toBe(false);
		expect(matchesLevel("A", "B")).toBe(false);
	});

	it("lets everything through without a level", () => {
		expect(matchesLevel("A")).toBe(true);
	});
});

describe("course selectors", () => {
	it("finds an area and a lesson by slug", () => {
		expect(getArea(course, "meteorologija")?.title).toBeTruthy();
		expect(getLesson(course, "kako-do-dozvole")?.order).toBe(0);
		expect(getLesson(course, "missing")).toBeUndefined();
	});

	it("lists an area's lessons in order, filtered by level", () => {
		const all = getLessonsByArea(course, "meteorologija");
		const forA = getLessonsByArea(course, "meteorologija", "A");

		expect(all.map((lesson) => lesson.order)).toEqual(
			[...all.map((lesson) => lesson.order)].sort((a, b) => a - b),
		);
		expect(forA.length).toBeLessThan(all.length);
		expect(forA.every((lesson) => lesson.level !== "B")).toBe(true);
	});

	it("keeps lecture 0 out of its area's list", () => {
		const slugs = getLessonsByArea(course, "propisi").map(
			(lesson) => lesson.slug,
		);

		expect(slugs).not.toContain(course.introLessonSlug);
		expect(slugs.length).toBeGreaterThan(0);
	});

	it("maps an area to its exam subject", () => {
		expect(subjectOfArea(course, "vhf-radio")).toBe("radiotelefonija");
	});

	it("filters questions by lesson", () => {
		const questions = getQuestions(course, { lesson: course.introLessonSlug });

		expect(questions.length).toBeGreaterThan(0);
		expect(questions.every((q) => q.lesson === course.introLessonSlug)).toBe(
			true,
		);
	});

	it("filters questions by area and level", () => {
		const questions = getQuestions(course, { area: "motoristika", level: "B" });

		expect(questions.length).toBeGreaterThan(0);
		expect(questions.every((q) => q.area === "motoristika")).toBe(true);
		expect(getQuestions(course, { area: "motoristika", level: "A" })).toEqual(
			[],
		);
	});

	it("returns questions in the order of the given ids and skips unknown ones", () => {
		const ids = ["propisi-002", "missing", "karte-navigacija-001"];

		expect(getQuestions(course, { ids }).map((q) => q.id)).toEqual([
			"propisi-002",
			"karte-navigacija-001",
		]);
	});
});
