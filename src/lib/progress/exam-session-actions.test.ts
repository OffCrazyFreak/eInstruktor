import { describe, expect, it } from "vitest";
import {
	discardExamSession,
	finishExamSession,
	type IExamOutcome,
	type IExamStart,
	MAX_STORED_EXAM_SESSIONS,
	setExamAnswer,
	startExamSession,
	toggleExamFlag,
} from "@/lib/progress/exam-session-actions";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";

const NOON = Date.parse("2026-11-20T11:00:00Z");

function examStart(overrides: Partial<IExamStart> = {}): IExamStart {
	return {
		id: "exam-1",
		level: "B",
		seed: 42,
		questionIds: ["q-1", "q-2", "q-3"],
		startedAt: NOON,
		endsAt: NOON + 45 * 60_000,
		...overrides,
	};
}

const outcome: IExamOutcome = {
	score: 1,
	passed: false,
	perSubject: { motoristika: { correct: 1, total: 3, passed: false } },
	graded: [
		{ questionId: "q-1", correct: true },
		{ questionId: "q-2", correct: false },
	],
};

function idMaker() {
	let next = 0;

	return () => `attempt-${++next}`;
}

function answeredExam() {
	let progress = startExamSession(EMPTY_PROGRESS, examStart());
	progress = setExamAnswer(progress, "exam-1", "q-1", ["a"]);
	progress = setExamAnswer(progress, "exam-1", "q-2", ["b"]);

	return progress;
}

describe("startExamSession", () => {
	it("stores the seed, the ordered ids and the end time with empty answers", () => {
		const progress = startExamSession(EMPTY_PROGRESS, examStart());

		expect(progress.examSessions).toEqual([
			{
				...examStart(),
				finishedAt: null,
				score: null,
				passed: null,
				answers: {},
				flaggedIds: [],
			},
		]);
	});

	it("drops an unfinished exam but keeps finished ones", () => {
		let progress = answeredExam();
		progress = finishExamSession(progress, "exam-1", outcome, {
			finishedAt: NOON + 1,
			makeId: idMaker(),
		});
		progress = startExamSession(progress, examStart({ id: "exam-2" }));
		progress = startExamSession(progress, examStart({ id: "exam-3" }));

		expect(progress.examSessions.map((session) => session.id)).toEqual([
			"exam-1",
			"exam-3",
		]);
	});

	it("keeps only the newest sessions", () => {
		const finished = Array.from(
			{ length: MAX_STORED_EXAM_SESSIONS },
			(_, index) => ({
				...examStart({ id: `old-${index}` }),
				finishedAt: NOON,
				score: 0,
				passed: false,
			}),
		);

		const progress = startExamSession(
			{ ...EMPTY_PROGRESS, examSessions: finished },
			examStart({ id: "new" }),
		);

		expect(progress.examSessions).toHaveLength(MAX_STORED_EXAM_SESSIONS);
		expect(progress.examSessions[0]?.id).toBe("old-1");
		expect(progress.examSessions.at(-1)?.id).toBe("new");
	});
});

describe("answers and flags while the exam runs", () => {
	it("replaces a changed answer instead of adding a second one", () => {
		let progress = answeredExam();
		progress = setExamAnswer(progress, "exam-1", "q-1", ["c"]);

		expect(progress.examSessions[0]?.answers).toEqual({
			"q-1": ["c"],
			"q-2": ["b"],
		});
		expect(progress.attempts).toEqual([]);
	});

	it("toggles a flag on and off", () => {
		let progress = toggleExamFlag(answeredExam(), "exam-1", "q-3");

		expect(progress.examSessions[0]?.flaggedIds).toEqual(["q-3"]);

		progress = toggleExamFlag(progress, "exam-1", "q-3");

		expect(progress.examSessions[0]?.flaggedIds).toEqual([]);
	});

	it("ignores an unknown session", () => {
		const progress = answeredExam();

		expect(setExamAnswer(progress, "nope", "q-1", ["a"])).toBe(progress);
	});
});

describe("finishExamSession", () => {
	it("saves the result and records each answered question as an exam attempt", () => {
		const progress = finishExamSession(answeredExam(), "exam-1", outcome, {
			finishedAt: NOON + 60_000,
			makeId: idMaker(),
		});

		expect(progress.examSessions[0]).toMatchObject({
			finishedAt: NOON + 60_000,
			score: 1,
			passed: false,
			perSubject: outcome.perSubject,
		});

		expect(progress.attempts).toEqual([
			{
				id: "attempt-1",
				questionId: "q-1",
				correct: true,
				selected: ["a"],
				mode: "exam",
				sessionId: "exam-1",
				answeredAt: NOON + 60_000,
			},
			{
				id: "attempt-2",
				questionId: "q-2",
				correct: false,
				selected: ["b"],
				mode: "exam",
				sessionId: "exam-1",
				answeredAt: NOON + 60_000,
			},
		]);
		expect(progress.questionBoxes).toEqual({});
	});

	it("happens once, and a finished exam no longer changes", () => {
		const finish = { finishedAt: NOON + 60_000, makeId: idMaker() };
		const once = finishExamSession(answeredExam(), "exam-1", outcome, finish);

		expect(finishExamSession(once, "exam-1", outcome, finish)).toBe(once);
		expect(setExamAnswer(once, "exam-1", "q-3", ["a"])).toBe(once);
		expect(toggleExamFlag(once, "exam-1", "q-3")).toBe(once);
		expect(discardExamSession(once, "exam-1")).toEqual(once);
	});
});

describe("discardExamSession", () => {
	it("removes an unfinished exam", () => {
		expect(discardExamSession(answeredExam(), "exam-1").examSessions).toEqual(
			[],
		);
	});
});
