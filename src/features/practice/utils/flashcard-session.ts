export type FlashcardPhase = "front" | "back" | "summary";

export interface IFlashcardSessionState {
	/** Cards in the current round. */
	queue: string[];
	index: number;
	phase: FlashcardPhase;
	round: number;
	known: string[];
	/** Cards graded "Nisam znao" in the current round; the next round repeats them. */
	missed: string[];
}

export type FlashcardAction =
	| { type: "reveal" }
	| { type: "grade"; known: boolean }
	| { type: "repeatMissed" };

export function startFlashcards(cardIds: string[]): IFlashcardSessionState {
	return {
		queue: cardIds,
		index: 0,
		phase: cardIds.length === 0 ? "summary" : "front",
		round: 1,
		known: [],
		missed: [],
	};
}

export function currentCardId(
	state: IFlashcardSessionState,
): string | undefined {
	return state.phase === "summary" ? undefined : state.queue[state.index];
}

export function flashcardReducer(
	state: IFlashcardSessionState,
	action: FlashcardAction,
): IFlashcardSessionState {
	switch (action.type) {
		case "reveal":
			return state.phase === "front" ? { ...state, phase: "back" } : state;

		case "grade": {
			const cardId = currentCardId(state);

			if (state.phase !== "back" || !cardId) {
				return state;
			}

			const graded = action.known
				? { ...state, known: [...state.known, cardId] }
				: { ...state, missed: [...state.missed, cardId] };

			const index = state.index + 1;

			return index < state.queue.length
				? { ...graded, index, phase: "front" }
				: { ...graded, phase: "summary" };
		}

		case "repeatMissed":
			return state.phase === "summary" && state.missed.length > 0
				? {
						queue: state.missed,
						index: 0,
						phase: "front",
						round: state.round + 1,
						known: [],
						missed: [],
					}
				: state;
	}
}
