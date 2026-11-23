import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	ALL_DECKS,
	deckCards,
	deckStats,
	reviewOrder,
} from "@/features/practice/utils/flashcard-deck";
import {
	currentCardId,
	flashcardReducer as reduce,
	startFlashcards,
} from "@/features/practice/utils/flashcard-session";
import { subjectOfArea } from "@/lib/content/course-selectors";

const today = "2026-11-20";

describe("deckCards", () => {
	it("gives an A learner only common and A cards", () => {
		const cards = deckCards(course, "A", ALL_DECKS);

		expect(cards.length).toBeGreaterThan(0);
		expect(cards.every((card) => card.level !== "B")).toBe(true);
		expect(deckCards(course, "B", ALL_DECKS)).toHaveLength(
			course.studyCards.length,
		);
	});

	it("groups cards by exam subject", () => {
		const cards = deckCards(course, "B", "motoristika");

		expect(cards.length).toBeGreaterThan(0);
		expect(
			cards.every((card) => subjectOfArea(course, card.area) === "motoristika"),
		).toBe(true);
	});
});

describe("deckStats and reviewOrder", () => {
	const [first, second, third] = deckCards(course, "B", ALL_DECKS);

	if (!first || !second || !third) {
		throw new Error("The course needs three cards");
	}

	const boxes = {
		[first.id]: { box: 3, reviewedOn: "2026-11-19" },
		[second.id]: { box: 1, reviewedOn: "2026-11-19" },
	} as const;

	it("counts unknown and due cards, new ones included", () => {
		expect(deckStats([first, second, third], boxes, today)).toEqual({
			total: 3,
			unknown: 1,
			due: 2,
		});
	});

	it("puts due and new cards before the waiting ones", () => {
		expect(
			reviewOrder([first, second, third], boxes, today).map((card) => card.id),
		).toEqual([second.id, third.id, first.id]);
	});
});

describe("flashcardReducer", () => {
	it("shows the answer, grades and loops over the missed cards", () => {
		let state = startFlashcards(["c1", "c2", "c3"]);

		expect(reduce(state, { type: "grade", known: true })).toBe(state);

		state = reduce(state, { type: "reveal" });
		expect(state.phase).toBe("back");

		state = reduce(state, { type: "grade", known: true });
		state = reduce(reduce(state, { type: "reveal" }), {
			type: "grade",
			known: false,
		});
		state = reduce(reduce(state, { type: "reveal" }), {
			type: "grade",
			known: false,
		});

		expect(state.phase).toBe("summary");
		expect(state.known).toEqual(["c1"]);
		expect(state.missed).toEqual(["c2", "c3"]);

		state = reduce(state, { type: "repeatMissed" });

		expect(state.round).toBe(2);
		expect(state.queue).toEqual(["c2", "c3"]);
		expect(currentCardId(state)).toBe("c2");

		state = reduce(reduce(state, { type: "reveal" }), {
			type: "grade",
			known: true,
		});
		state = reduce(reduce(state, { type: "reveal" }), {
			type: "grade",
			known: true,
		});

		expect(state.phase).toBe("summary");
		expect(state.missed).toEqual([]);
		expect(reduce(state, { type: "repeatMissed" })).toBe(state);
	});
});
