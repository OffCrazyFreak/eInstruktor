import { describe, expect, it } from "vitest";
import {
	awardBadges,
	MAX_STORED_ATTEMPTS,
	markLessonDone,
	markLessonUnread,
	openLesson,
	recordAnswer,
	setLessonPercent,
	setPassed,
	toggleFlag,
} from "@/lib/progress/progress-actions";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { testAttempt } from "@/lib/testing/test-attempts";

const NOON = Date.parse("2026-11-20T11:00:00Z");

describe("recordAnswer", () => {
	it("stores the attempt and moves the question between boxes", () => {
		const wrong = recordAnswer(EMPTY_PROGRESS, testAttempt({ correct: false }));
		const right = recordAnswer(wrong, testAttempt({ correct: true }));

		expect(right.attempts).toHaveLength(2);
		expect(wrong.questionBoxes["q-1"]?.box).toBe(1);
		expect(right.questionBoxes["q-1"]?.box).toBe(2);
	});

	it("keeps only the newest answers past the storage cap", () => {
		const full = {
			...EMPTY_PROGRESS,
			attempts: Array.from({ length: MAX_STORED_ATTEMPTS }, (_, index) =>
				testAttempt({ id: `old-${index}` }),
			),
		};
		const next = recordAnswer(full, testAttempt({ id: "newest" }));

		expect(next.attempts).toHaveLength(MAX_STORED_ATTEMPTS);
		expect(next.attempts[0]?.id).toBe("old-1");
		expect(next.attempts.at(-1)?.id).toBe("newest");
	});

	it("leaves the boxes alone for exam answers", () => {
		const progress = recordAnswer(
			EMPTY_PROGRESS,
			testAttempt({ mode: "exam" }),
		);

		expect(progress.questionBoxes).toEqual({});
	});

	it("counts the day as a study day from the fifth answer", () => {
		let progress = EMPTY_PROGRESS;

		for (let index = 0; index < 4; index++) {
			progress = recordAnswer(
				progress,
				testAttempt({ questionId: `q-${index}` }),
			);
		}

		expect(progress.studyDays).toEqual([]);

		progress = recordAnswer(progress, testAttempt({ questionId: "q-5" }));

		expect(progress.studyDays).toEqual(["2026-11-20"]);
	});
});

describe("lessons", () => {
	it("marks a lesson done, counts the day, and can undo it", () => {
		const done = markLessonDone(EMPTY_PROGRESS, "uvod", NOON);

		expect(done.lessonsDone).toEqual({ uvod: NOON });
		expect(done.studyDays).toEqual(["2026-11-20"]);
		expect(markLessonDone(done, "uvod", NOON + 1)).toBe(done);
		expect(markLessonUnread(done, "uvod").lessonsDone).toEqual({});
	});

	it("remembers the open lesson and only raises its percent", () => {
		const opened = openLesson(EMPTY_PROGRESS, "uvod", NOON);
		const halfway = setLessonPercent(opened, "uvod", 0.5);

		expect(setLessonPercent(halfway, "uvod", 0.2)).toBe(halfway);
		expect(setLessonPercent(halfway, "drugo", 0.9)).toBe(halfway);
		expect(openLesson(halfway, "uvod", NOON + 5).lastLesson?.percent).toBe(0.5);
		expect(openLesson(halfway, "drugo", NOON + 5).lastLesson?.percent).toBe(0);
	});
});

describe("toggleFlag", () => {
	it("flags and unflags a question", () => {
		const flagged = toggleFlag(EMPTY_PROGRESS, "q-1", NOON);

		expect(flagged.flagged).toEqual({ "q-1": NOON });
		expect(toggleFlag(flagged, "q-1", NOON).flagged).toEqual({});
	});
});

describe("awardBadges", () => {
	it("adds new badges with the time and keeps the first time of old ones", () => {
		const first = awardBadges(EMPTY_PROGRESS, ["uvod-gotov"], 1);
		const second = awardBadges(first, ["uvod-gotov", "sto-pitanja"], 2);

		expect(second.badges).toEqual({ "uvod-gotov": 1, "sto-pitanja": 2 });
	});

	it("returns the same state when nothing is new", () => {
		const first = awardBadges(EMPTY_PROGRESS, ["uvod-gotov"], 1);

		expect(awardBadges(first, ["uvod-gotov"], 2)).toBe(first);
	});
});

describe("setPassed", () => {
	it("stores when the learner passed and clears it again", () => {
		const passed = setPassed(EMPTY_PROGRESS, true, NOON);

		expect(passed.passedAt).toBe(NOON);
		expect(setPassed(passed, true, NOON + 1)).toBe(passed);
		expect(setPassed(passed, false, NOON).passedAt).toBeNull();
	});
});
