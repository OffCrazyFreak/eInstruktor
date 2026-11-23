import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import WeakAreasCard from "@/features/home/components/weak-areas-card";
import { getArea } from "@/lib/content/course-selectors";
import { renderWithRouter } from "@/lib/testing/render-with-router";

describe("WeakAreasCard", () => {
	it("starts 10 questions from a weak area", async () => {
		const area = getArea(course, "meteorologija");

		if (!area) {
			throw new Error("The course needs the meteorology area");
		}

		await renderWithRouter(() => (
			<WeakAreasCard areas={[{ area, accuracy: 0.4, answered: 10 }]} />
		));

		expect(
			screen.getByRole("link", { name: /Meteorologija/ }).getAttribute("href"),
		).toBe("/vjezba/serija?mode=podrucje&area=meteorologija&length=10");
	});
});
