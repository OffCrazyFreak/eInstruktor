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

const multi: IQuestion = {
	...question("meteorologija-903", "Više"),
	type: "multi",
	options: [
		{ id: "a", text: "Više jedan", correct: true },
		{ id: "b", text: "Više dva", correct: true },
		{ id: "c", text: "Više tri", correct: false },
	],
};

let now = Date.parse("2026-11-20T11:00:00Z");

// "Dalje" ignores taps right after "Provjeri", so each step moves the clock past that guard.
function later() {
	now += 1000;
}

function renderSet(
	deferFeedback = false,
	onAgain = vi.fn(),
	set: IQuestion[] = questions,
) {
	return renderWithProgress(() => (
		<PracticeSet
			title="Meteorologija"
			questions={set}
			deferFeedback={deferFeedback}
			onAgain={onAgain}
		/>
	));
}

describe("PracticeSet", () => {
	// jsdom has no scrolling; the set scrolls to the top for each new question.
	beforeEach(() => {
		vi.spyOn(window, "scrollTo").mockImplementation(() => {});
		vi.spyOn(Date, "now").mockImplementation(() => now);
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

		later();
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(screen.getByText("2 / 2")).toBeTruthy();
		expect(screen.getByText("Drugo")).toBeTruthy();
	});

	it("ends with the score, the mistakes and Još 10", async () => {
		const onAgain = vi.fn();
		const { store } = await renderSet(false, onAgain);

		fireEvent.click(screen.getByRole("radio", { name: /Prvo točno/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		later();
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));
		fireEvent.click(screen.getByRole("radio", { name: /Drugo krivo/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		later();
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
		expect(onAgain.mock.calls[0]?.[0]).toHaveLength(2);
	});

	it("holds back right and wrong until the end when feedback waits", async () => {
		await renderSet(true);

		fireEvent.click(screen.getByRole("radio", { name: /Prvo krivo/ }));
		later();
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

	it("does not skip the feedback when Provjeri is tapped twice", async () => {
		await renderSet();

		fireEvent.click(screen.getByRole("radio", { name: /Prvo krivo/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(screen.getByText("Netočno")).toBeTruthy();
		expect(screen.getByText("1 / 2")).toBeTruthy();

		later();
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(screen.getByText("2 / 2")).toBeTruthy();
	});

	it("puts focus on the new question after Dalje", async () => {
		await renderSet();

		fireEvent.click(screen.getByRole("radio", { name: /Prvo točno/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		later();
		fireEvent.click(screen.getByRole("button", { name: "Dalje" }));

		expect(document.activeElement?.getAttribute("aria-label")).toBe(
			"Pitanje 2 od 2",
		);
	});

	it("grades a question with several right answers", async () => {
		const { store } = await renderSet(false, vi.fn(), [multi]);

		fireEvent.click(screen.getByRole("checkbox", { name: /Više jedan/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));

		expect(screen.getByText("Netočno")).toBeTruthy();

		later();
		fireEvent.click(screen.getByRole("button", { name: "Pogledaj rezultat" }));

		expect(store.getSnapshot().attempts[0]).toMatchObject({
			questionId: "meteorologija-903",
			correct: false,
			selected: ["a"],
		});
	});

	it("counts a multi question right only with every right option", async () => {
		const { store } = await renderSet(false, vi.fn(), [multi]);

		fireEvent.click(screen.getByRole("checkbox", { name: /Više jedan/ }));
		fireEvent.click(screen.getByRole("checkbox", { name: /Više dva/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));

		expect(screen.getByText("Točno")).toBeTruthy();
		expect(store.getSnapshot().attempts[0]?.selected).toEqual(["a", "b"]);
	});

	it("leaves at once before any answer and asks after one", async () => {
		await renderSet();

		expect(screen.getByRole("link", { name: "Zatvori seriju" })).toBeTruthy();

		fireEvent.click(screen.getByRole("radio", { name: /Prvo točno/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
		fireEvent.click(screen.getByRole("button", { name: "Zatvori seriju" }));

		expect(screen.getByText("Prekinuti seriju?")).toBeTruthy();
		expect(
			screen.getByRole("link", { name: "Izađi" }).getAttribute("href"),
		).toBe("/vjezba");
	});
});
