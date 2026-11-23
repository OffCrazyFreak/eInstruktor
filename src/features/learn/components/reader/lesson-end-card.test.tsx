import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import LessonEndCard from "@/features/learn/components/reader/lesson-end-card";
import { getLesson } from "@/lib/content/course-selectors";
import { renderWithRouter } from "@/lib/testing/render-with-router";

describe("LessonEndCard", () => {
	it("starts 10 questions on the lesson from Vježbaj ovu temu", async () => {
		const lesson = getLesson(course, "bura-i-jugo");

		if (!lesson) {
			throw new Error("The course needs the bura-i-jugo lesson");
		}

		await renderWithRouter(() => (
			<LessonEndCard lesson={lesson} next={undefined} cheatSheetArea={null} />
		));

		expect(
			screen
				.getByRole("link", { name: "Vježbaj ovu temu" })
				.getAttribute("href"),
		).toBe(
			"/vjezba/serija?mode=podrucje&area=meteorologija&lesson=bura-i-jugo&length=10",
		);
	});
});
