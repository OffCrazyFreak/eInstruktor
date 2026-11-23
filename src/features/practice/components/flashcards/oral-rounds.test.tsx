import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import course from "@/content/voditelj-brodice";
import OralRounds from "@/features/practice/components/flashcards/oral-rounds";
import { deckCards } from "@/features/practice/utils/flashcard-deck";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

const [card] = deckCards(course, "B", "radiotelefonija");

let now = Date.parse("2026-11-20T11:00:00Z");

// The grade buttons ignore taps right after "Prikaži odgovor", so each grade moves the clock past that guard.
function later() {
	now += 1000;
}

describe("OralRounds", () => {
	// jsdom has no scrolling; the set scrolls to the top for each new question.
	beforeEach(() => {
		vi.spyOn(window, "scrollTo").mockImplementation(() => {});
		vi.spyOn(Date, "now").mockImplementation(() => now);
	});

	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it("reveals the answer, grades it and repeats the missed card until it is known", async () => {
		if (!card) {
			throw new Error("The course needs a radio card");
		}

		const { store } = await renderWithProgress(
			() => <OralRounds deck="radiotelefonija" />,
			{ targetLevel: "B" },
		);

		expect(screen.getByText(card.prompt)).toBeTruthy();
		expect(screen.queryByText("ODGOVOR")).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));

		expect(screen.getByText("ODGOVOR")).toBeTruthy();

		later();
		fireEvent.click(screen.getByRole("button", { name: "Nisam znao" }));

		expect(store.getSnapshot().cardBoxes[card.id]?.box).toBe(1);
		expect(screen.getByText("Još 1 kartica za ponoviti")).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Ponovi 1 karticu" }));
		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));
		later();
		fireEvent.click(screen.getByRole("button", { name: "Znao sam" }));

		expect(screen.getByText("Sve znaš za sada")).toBeTruthy();
		expect(store.getSnapshot().cardBoxes[card.id]?.box).toBe(2);
	});

	it("shows the correction note under an outdated answer", async () => {
		const corrected = deckCards(course, "B", "pomorska-plovidba").find(
			(candidate) => candidate.correction,
		);

		if (!corrected?.correction) {
			throw new Error("The course needs a corrected card");
		}

		await renderWithProgress(() => <OralRounds deck="pomorska-plovidba" />, {
			targetLevel: "B",
		});

		while (!screen.queryByText(corrected.prompt)) {
			fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));
			later();
			fireEvent.click(screen.getByRole("button", { name: "Znao sam" }));
		}

		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));

		expect(screen.getByText(corrected.correction)).toBeTruthy();
		expect(screen.getByRole("note", { name: "Ispravak" })).toBeTruthy();
	});

	it("ignores a grade tapped right after showing the answer", async () => {
		const { store } = await renderWithProgress(
			() => <OralRounds deck="radiotelefonija" />,
			{ targetLevel: "B" },
		);

		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));
		fireEvent.click(screen.getByRole("button", { name: "Znao sam" }));

		expect(store.getSnapshot().cardBoxes).toEqual({});
		expect(screen.getByText("ODGOVOR")).toBeTruthy();
	});

	it("moves focus to the next card after a grade", async () => {
		await renderWithProgress(() => <OralRounds deck="motoristika" />, {
			targetLevel: "B",
		});

		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));
		later();
		fireEvent.click(screen.getByRole("button", { name: "Znao sam" }));

		expect(document.activeElement?.getAttribute("aria-label")).toMatch(
			/^Kartica 2 od /,
		);
	});

	it("shows an empty deck instead of a finished round for an A learner", async () => {
		expect(deckCards(course, "A", "motoristika")).toEqual([]);

		await renderWithProgress(() => <OralRounds deck="motoristika" />, {
			targetLevel: "A",
		});

		expect(screen.getByText("Ovdje sad nema pitanja")).toBeTruthy();
		expect(screen.queryByText("Sve znaš za sada")).toBeNull();
		for (const link of screen.getAllByRole("link", {
			name: "Natrag na kartice",
		})) {
			expect(link.getAttribute("href")).toBe("/vjezba/usmeno");
		}
	});
});
