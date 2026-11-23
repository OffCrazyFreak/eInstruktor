import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	courseLessonOrder,
	firstUnreadLesson,
	nextLesson,
} from "@/lib/content/lesson-order";

describe("courseLessonOrder", () => {
	it("starts with Lekcija 0 and lists each lesson once", () => {
		const order = courseLessonOrder(course, "B");

		expect(order[0]?.slug).toBe(course.introLessonSlug);
		expect(new Set(order.map((lesson) => lesson.slug)).size).toBe(order.length);
		expect(order).toHaveLength(course.lessons.length);
	});

	it("leaves out B lessons for an A learner", () => {
		expect(
			courseLessonOrder(course, "A").some((lesson) => lesson.level === "B"),
		).toBe(false);
	});
});

describe("nextLesson", () => {
	it("goes from Lekcija 0 to the first lesson of the first area", () => {
		const firstArea = [...course.areas].sort((a, b) => a.order - b.order)[0];

		expect(nextLesson(course, course.introLessonSlug, "B")?.area).toBe(
			firstArea?.slug,
		);
	});

	it("moves on to the next area after an area's last lesson", () => {
		const order = courseLessonOrder(course, "B");
		const lastOfArea = order.findIndex(
			(lesson, index) =>
				index > 0 &&
				order[index + 1] !== undefined &&
				order[index + 1]?.area !== lesson.area,
		);

		expect(nextLesson(course, order[lastOfArea]?.slug ?? "", "B")).toBe(
			order[lastOfArea + 1],
		);
	});

	it("has nothing after the last lesson or for an unknown one", () => {
		const order = courseLessonOrder(course, "B");

		expect(nextLesson(course, order.at(-1)?.slug ?? "", "B")).toBeUndefined();
		expect(nextLesson(course, "missing", "B")).toBeUndefined();
	});
});

describe("firstUnreadLesson", () => {
	it("skips the finished lessons", () => {
		const order = courseLessonOrder(course, "A");
		const done = { [order[0]?.slug ?? ""]: 1, [order[1]?.slug ?? ""]: 2 };

		expect(firstUnreadLesson(course, "A", done)).toBe(order[2]);
	});
});
