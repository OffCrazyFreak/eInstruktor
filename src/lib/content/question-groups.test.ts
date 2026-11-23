import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { getQuestions } from "@/lib/content/course-selectors";
import { areaGroups, subjectGroups } from "@/lib/content/question-groups";

describe("subjectGroups", () => {
	it("gives A one group and B the five exam subjects", () => {
		expect(subjectGroups(course, "A").map((group) => group.id)).toEqual([
			"osnove-plovidbe",
		]);
		expect(subjectGroups(course, "B")).toHaveLength(5);
	});

	it("leaves out the Lekcija 0 questions", () => {
		const intro = new Set(
			getQuestions(course, { lesson: course.introLessonSlug }).map(
				(question) => question.id,
			),
		);
		const grouped = subjectGroups(course, "B").flatMap(
			(group) => group.questionIds,
		);

		expect(grouped.some((id) => intro.has(id))).toBe(false);
	});
});

describe("areaGroups", () => {
	it("keeps only areas with questions for the level", () => {
		const forA = areaGroups(course, "A");

		expect(forA.every((group) => group.questionIds.length > 0)).toBe(true);
		expect(forA.map((group) => group.id)).not.toContain("motoristika");
	});
});
