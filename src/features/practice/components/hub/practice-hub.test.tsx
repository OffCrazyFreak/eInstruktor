import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import PracticeHub from "@/features/practice/components/hub/practice-hub";
import { practicePool } from "@/features/practice/utils/practice-pool";
import { areaGroups } from "@/lib/content/question-groups";
import { testAttempt } from "@/lib/progress/test-attempts";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

describe("PracticeHub", () => {
	afterEach(() => window.localStorage.clear());

	it("explains empty modes and counts an A learner's pool only", async () => {
		await renderWithProgress(() => <PracticeHub />, { targetLevel: "A" });

		expect(
			screen.getByText(
				`${practicePool(course, "A").length} pitanja za kategoriju A.`,
				{
					exact: false,
				},
			),
		).toBeTruthy();
		expect(screen.getByText(/Još nema pogrešnih odgovora/)).toBeTruthy();
		expect(
			screen.getByText(`${areaGroups(course, "A").length} područja`),
		).toBeTruthy();
		expect(
			screen.queryByRole("button", { name: /Pogrešni odgovori/ }),
		).toBeNull();
	});

	it("opens the mode sheet for wrong answers once there is one", async () => {
		const [wrong] = practicePool(course, "B");

		await renderWithProgress(() => <PracticeHub />, {
			targetLevel: "B",
			attempts: [testAttempt({ questionId: wrong?.id, correct: false })],
		});

		fireEvent.click(screen.getByRole("button", { name: /Pogrešni odgovori/ }));

		expect(screen.getByText("Koliko pitanja")).toBeTruthy();
		expect(screen.getByText("Odgovori na kraju serije")).toBeTruthy();

		const start = screen.getByRole("link", { name: /Kreni \(1 pitanje\)/ });

		expect(start.getAttribute("href")).toContain(
			"/vjezba/serija?mode=pogresni",
		);
	});

	it("lists only the areas with questions for the level in the area sheet", async () => {
		await renderWithProgress(() => <PracticeHub />, { targetLevel: "A" });

		fireEvent.click(screen.getByRole("button", { name: /Po područjima/ }));

		const areas = within(screen.getByRole("group", { name: "Područje" }));

		expect(areas.getAllByRole("radio").length).toBe(
			areaGroups(course, "A").length,
		);
	});
});
