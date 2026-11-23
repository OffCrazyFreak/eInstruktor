export interface ISessionAnswer {
	questionId: string;
	selected: string[];
	correct: boolean;
}

export type SessionPhase = "answering" | "checked" | "finished";

export interface IPracticeSessionState {
	questionIds: string[];
	index: number;
	/** The options picked for the current question. */
	selected: string[];
	phase: SessionPhase;
	answers: ISessionAnswer[];
	/** "Odgovori na kraju serije": checking moves straight on and the result waits for the end. */
	deferFeedback: boolean;
}

export type PracticeSessionAction =
	| { type: "select"; selected: string[] }
	| { type: "check"; correct: boolean }
	| { type: "next" };

export function startSession(
	questionIds: string[],
	deferFeedback: boolean,
): IPracticeSessionState {
	return {
		questionIds,
		index: 0,
		selected: [],
		phase: questionIds.length === 0 ? "finished" : "answering",
		answers: [],
		deferFeedback,
	};
}

export function currentQuestionId(
	state: IPracticeSessionState,
): string | undefined {
	return state.phase === "finished"
		? undefined
		: state.questionIds[state.index];
}

function advance(state: IPracticeSessionState): IPracticeSessionState {
	const index = state.index + 1;

	return index < state.questionIds.length
		? { ...state, index, selected: [], phase: "answering" }
		: { ...state, selected: [], phase: "finished" };
}

export function practiceSessionReducer(
	state: IPracticeSessionState,
	action: PracticeSessionAction,
): IPracticeSessionState {
	switch (action.type) {
		case "select":
			return state.phase === "answering"
				? { ...state, selected: action.selected }
				: state;

		case "check": {
			const questionId = currentQuestionId(state);

			if (
				state.phase !== "answering" ||
				!questionId ||
				state.selected.length === 0
			) {
				return state;
			}

			const answered: IPracticeSessionState = {
				...state,
				phase: "checked",
				answers: [
					...state.answers,
					{ questionId, selected: state.selected, correct: action.correct },
				],
			};

			return state.deferFeedback ? advance(answered) : answered;
		}

		case "next":
			return state.phase === "checked" ? advance(state) : state;
	}
}
