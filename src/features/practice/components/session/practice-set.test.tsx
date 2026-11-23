import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IQuestion } from "@/content/types";
import PracticeSet from "@/features/practice/components/session/practice-set";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

vi.mock("@/components/custom/visuals/visual-frame", () => ({
	default: () => <div data-testid="visual" />,
}));

function question(id: string, prompt: string): IQuestion {
	return {
		id,
		area: "meteorologija",
		level: "common",
		type: "single",
		prompt,
		options: [
			{ id: "a", text: `${prompt} točno`, correct: true },
			{ id: "b", text: `${prompt} krivo`, correct: false },
		],
		explanation: `Objašnjenje za ${prompt}.`,
		difficulty: 1,
		source: "original",
	};
}

const questions = [
	question("meteorologija-901", "Prvo"),
	question("meteorologija-902", "Drugo"),
];

function renderSet(deferFeedback = false, onAgain = vi.fn()) {
	return renderWithProgress(() => (
		<PracticeSet
			title="Meteorologija"
			questions={questions}
			deferFeedback={deferFeedback}
			onAgain={onAgain}
		/>
	));
}

describe("PracticeSet", () => {
	// jsdom has no scrolling; the set scrolls to the top for each new question.
	beforeEach(() => {
		vi.spyOn(window, "scrollTo").mockImplementation(() => {});
	});

	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it("checks with Provjeri, records a practice attempt and moves on with Dalje", async () => {
		const { store } = await renderSet();

		const check = screen.getByRole("button", { name: "Provjeri" });

		expect((check as HTMLButtonElement).disabled).toBe(true);

		fireEvent.click(screen.getByRole("radio", { name: /Prvo točno/ }));
		fireEvent.click(check);

		expect(screen.getByText("Točno")).toBeTruthy();
		expect(screen.getByText("Objašnjenje za Prvo.")).toBeTruthy();

		const [attempt] = store.getSnapshot().attempts;

		expect(attempt).toMatchObject({
			questionId: "meteorologija-901",
			correct: true,
			selected: ["a"],
			mode: "practice",
		});
		expect(store.getSnapshot().questionBoxes["meteorologija-901"]?.box).toBe(2);

		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(screen.getByText("2 / 2")).toBeTruthy();
		expect(screen.getByText("Drugo")).toBeTruthy();
	});

	it("ends with the score, the mistakes and Još 10", async () => {
		const onAgain = vi.fn();
		const { store } = await renderSet(false, onAgain);

		fireEvent.click(screen.getByRole("radio", { name: /Prvo točno/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));
		fireEvent.click(screen.getByRole("radio", { name: /Drugo krivo/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		fireEvent.click(screen.getByRole("button", { name: "Pogledaj rezultat" }));

		expect(screen.getByText("KRAJ SERIJE")).toBeTruthy();
		expect(screen.getByText("50 % točnih")).toBeTruthy();

		const sessions = new Set(
			store.getSnapshot().attempts.map((a) => a.sessionId),
		);

		expect(sessions.size).toBe(1);

		fireEvent.click(
			screen.getByRole("button", { name: "Pogledaj pogreške (1)" }),
		);

		expect(screen.getByText("POGREŠKA 1 OD 1")).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Još 10" }));

		expect(onAgain).toHaveBeenCalledOnce();
	});

	it("holds back right and wrong until the end when feedback waits", async () => {
		await renderSet(true);

		fireEvent.click(screen.getByRole("radio", { name: /Prvo krivo/ }));
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(screen.queryByText("Netočno")).toBeNull();
		expect(screen.getByText("Drugo")).toBeTruthy();

		fireEvent.click(screen.getByRole("radio", { name: /Drugo točno/ }));
		fireEvent.click(screen.getByRole("button", { name: "Završi seriju" }));

		expect(screen.getByText("50 % točnih")).toBeTruthy();
	});

	it("flags the current question from the top bar", async () => {
		const { store } = await renderSet();

		const flag = screen.getByRole("button", { name: "Označi za kasnije" });

		fireEvent.click(flag);

		expect(store.getSnapshot().flagged["meteorologija-901"]).toBeTypeOf(
			"number",
		);
		expect(flag.getAttribute("aria-pressed")).toBe("true");
	});
});
