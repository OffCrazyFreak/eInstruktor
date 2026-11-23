import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import course from "@/content/voditelj-brodice";
import OralRounds from "@/features/practice/components/flashcards/oral-rounds";
import { deckCards } from "@/features/practice/utils/flashcard-deck";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

const [card] = deckCards(course, "B", "radiotelefonija");

describe("OralRounds", () => {
	// jsdom has no scrolling; the set scrolls to the top for each new question.
	beforeEach(() => {
		vi.spyOn(window, "scrollTo").mockImplementation(() => {});
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

		fireEvent.click(screen.getByRole("button", { name: "Nisam znao" }));

		expect(store.getSnapshot().cardBoxes[card.id]?.box).toBe(1);
		expect(screen.getByText("Još 1 kartica za ponoviti")).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Ponovi 1 karticu" }));
		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));
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
			fireEvent.click(screen.getByRole("button", { name: "Znao sam" }));
		}

		fireEvent.click(screen.getByRole("button", { name: "Prikaži odgovor" }));

		expect(screen.getByText(corrected.correction)).toBeTruthy();
		expect(screen.getByRole("note", { name: "Ispravak" })).toBeTruthy();
	});
});
