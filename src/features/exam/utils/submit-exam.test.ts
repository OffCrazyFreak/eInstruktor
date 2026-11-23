import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import {
	isExpired,
	submitExam,
	submitIfExpired,
} from "@/features/exam/utils/submit-exam";
import { questionsForExam } from "@/lib/content/exam-questions";
import {
	setExamAnswer,
	startExamSession,
} from "@/lib/progress/exam-session-actions";
import {
	activeExamSession,
	findExamSession,
} from "@/lib/progress/exam-session-selectors";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";

const STARTED = Date.parse("2026-11-20T11:00:00Z");
const ENDS = STARTED + 45 * 60_000;
const NEXT_DAY = Date.parse("2026-11-21T09:00:00Z");

function idMaker() {
	let next = 0;

	return () => `attempt-${++next}`;
}

function runningExam() {
	const questions = questionsForExam(course, "B", 3);
	const first = questions[0];

	let progress = startExamSession(EMPTY_PROGRESS, {
		id: "old",
		level: "B",
		seed: 3,
		questionIds: questions.map((question) => question.id),
		startedAt: STARTED,
		endsAt: ENDS,
	});

	if (first) {
		const right = first.options
			.filter((option) => option.correct)
			.map((option) => option.id);

		progress = setExamAnswer(progress, "old", first.id, right);
	}

	return { progress, firstId: first?.id ?? "" };
}

describe("submitExam", () => {
	it("scores the stored answers and keeps each grade", () => {
		const { progress, firstId } = runningExam();
		const done = submitExam(course, progress, "old", {
			finishedAt: STARTED + 60_000,
			makeId: idMaker(),
		});

		expect(findExamSession(done, "old")).toMatchObject({
			score: 1,
			passed: false,
			graded: { [firstId]: true },
		});
	});
});

describe("submitIfExpired", () => {
	it("hands in an expired exam at its end time before a new one starts", () => {
		const { progress, firstId } = runningExam();

		const settled = submitIfExpired(course, progress, "old", {
			now: NEXT_DAY,
			makeId: idMaker(),
		});
		const next = startExamSession(settled, {
			id: "new",
			level: "B",
			seed: 4,
			questionIds: ["q"],
			startedAt: NEXT_DAY,
			endsAt: null,
		});

		expect(findExamSession(next, "old")).toMatchObject({
			finishedAt: ENDS,
			score: 1,
		});
		expect(activeExamSession(next)?.id).toBe("new");
		expect(next.attempts).toEqual([
			expect.objectContaining({
				questionId: firstId,
				mode: "exam",
				sessionId: "old",
				answeredAt: NEXT_DAY,
			}),
		]);
	});

	it("leaves an exam with time left alone", () => {
		const { progress } = runningExam();

		expect(
			submitIfExpired(course, progress, "old", {
				now: ENDS - 1,
				makeId: idMaker(),
			}),
		).toBe(progress);
	});

	it("treats the exact end time as expired and no limit as never", () => {
		expect(isExpired({ endsAt: ENDS }, ENDS)).toBe(true);
		expect(isExpired({ endsAt: ENDS }, ENDS - 1)).toBe(false);
		expect(isExpired({ endsAt: null }, NEXT_DAY)).toBe(false);
	});
});
