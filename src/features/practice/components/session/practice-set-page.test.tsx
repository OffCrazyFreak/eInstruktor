import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PracticeSetPage from "@/features/practice/components/session/practice-set-page";
import { practiceSearchSchema } from "@/features/practice/utils/practice-search";
import ProgressProvider from "@/lib/progress/progress-provider";
import { createProgressStore } from "@/lib/progress/progress-store";
import { renderWithProgress } from "@/lib/testing/render-with-progress";
import { renderToStringWithRouter } from "@/lib/testing/render-with-router";

vi.mock("@/components/custom/visuals/visual-frame", () => ({
	default: () => <div data-testid="visual" />,
}));

describe("PracticeSetPage", () => {
	afterEach(() => window.localStorage.clear());

	it("renders only the top bar on the server, before progress is read", async () => {
		const store = createProgressStore(() => null);

		const html = await renderToStringWithRouter(() => (
			<ProgressProvider store={store}>
				<PracticeSetPage
					search={practiceSearchSchema.parse({ mode: "mjesovito" })}
					onLengthTen={vi.fn()}
				/>
			</ProgressProvider>
		));

		expect(html).toContain("Sve mješovito");
		expect(html).not.toContain("Provjeri");
		expect(html).not.toContain("radiogroup");
	});

	it("starts a set once progress is read", async () => {
		await renderWithProgress(() => (
			<PracticeSetPage
				search={practiceSearchSchema.parse({ mode: "mjesovito" })}
				onLengthTen={vi.fn()}
			/>
		));

		expect(screen.getByText("1 / 10")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Provjeri" })).toBeTruthy();
	});

	it("explains an empty mode instead of starting a set", async () => {
		await renderWithProgress(() => (
			<PracticeSetPage
				search={practiceSearchSchema.parse({ mode: "oznaceno" })}
				onLengthTen={vi.fn()}
			/>
		));

		expect(screen.getByText("Ovdje sad nema pitanja")).toBeTruthy();
		expect(screen.getByText(/Nema označenih pitanja/)).toBeTruthy();
		expect(screen.queryByRole("button", { name: "Provjeri" })).toBeNull();
	});
});
