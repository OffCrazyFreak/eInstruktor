import { describe, expect, it } from "vitest";
import type { ExamLevel } from "@/content/course-types";
import course from "@/content/voditelj-brodice";
import {
	BADGES,
	newlyEarnedBadges,
} from "@/features/progress/constants/badges";
import {
	type IBadgeContext,
	longestCorrectRun,
	mostStudyDaysInWindow,
} from "@/features/progress/utils/badge-rules";
import { getLessonsByArea } from "@/lib/content/course-selectors";
import { courseLessonOrder } from "@/lib/content/lesson-order";
import { subjectGroups } from "@/lib/content/question-groups";
import {
	EMPTY_PROGRESS,
	type IExamSession,
	type IProgressState,
} from "@/lib/progress/progress-schema";
import { testAttempt } from "@/lib/progress/test-attempts";

function context(
	progress: Partial<IProgressState>,
	level: ExamLevel = "B",
): IBadgeContext {
	return { progress: { ...EMPTY_PROGRESS, ...progress }, course, level };
}

function earned(progress: Partial<IProgressState>, level?: ExamLevel) {
	return newlyEarnedBadges(context(progress, level));
}

function done(slugs: string[]): Record<string, number> {
	return Object.fromEntries(slugs.map((slug) => [slug, 1]));
}

function examSession(passed: boolean): IExamSession {
	return {
		id: `exam-${passed}`,
		level: "B",
		seed: 1,
		questionIds: [],
		startedAt: 1,
		finishedAt: 2,
		score: 30,
		passed,
	};
}

describe("badge list", () => {
	it("has about eight badges with unique ids", () => {
		const ids = BADGES.map((badge) => badge.id);

		expect(ids).toHaveLength(8);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("gives nothing to a new learner", () => {
		expect(earned({})).toEqual([]);
	});

	it("does not give a badge again once it is stored", () => {
		const lessonsDone = done([course.introLessonSlug]);

		expect(earned({ lessonsDone })).toEqual(["uvod-gotov"]);
		expect(earned({ lessonsDone, badges: { "uvod-gotov": 5 } })).toEqual([]);
	});
});

describe("lesson badges", () => {
	it("needs every lesson of one area for the level", () => {
		const area = course.areas[0]?.slug;

		if (!area) {
			throw new Error("The course has no areas");
		}

		const lessons = getLessonsByArea(course, area, "A").map((l) => l.slug);

		expect(earned({ lessonsDone: done(lessons.slice(1)) }, "A")).toEqual([]);
		expect(earned({ lessonsDone: done(lessons) }, "A")).toContain(
			"prvo-podrucje",
		);
	});

	it("gives all lessons only when the whole level is done", () => {
		const all = courseLessonOrder(course, "B").map((lesson) => lesson.slug);

		expect(earned({ lessonsDone: done(all.slice(1)) })).not.toContain(
			"sve-lekcije",
		);
		expect(earned({ lessonsDone: done(all) })).toContain("sve-lekcije");
	});
});

describe("answer badges", () => {
	it("counts 100 answers", () => {
		const attempts = Array.from({ length: 100 }, () => testAttempt());

		expect(earned({ attempts: attempts.slice(1) })).not.toContain(
			"sto-pitanja",
		);
		expect(earned({ attempts })).toContain("sto-pitanja");
	});

	it("finds the longest run of right first answers", () => {
		const answers = (pattern: boolean[]) =>
			pattern.map((correct, index) =>
				testAttempt({ questionId: `q-${index}`, correct }),
			);
		const run = answers(Array.from({ length: 20 }, () => true));
		const broken = answers(
			Array.from({ length: 21 }, (_, index) => index !== 10),
		);

		expect(longestCorrectRun({ ...EMPTY_PROGRESS, attempts: run })).toBe(20);
		expect(longestCorrectRun({ ...EMPTY_PROGRESS, attempts: broken })).toBe(10);
	});

	it("does not count repeats of one question in a session towards the run", () => {
		const repeats = Array.from({ length: 25 }, () =>
			testAttempt({ questionId: "q-1", sessionId: "s", correct: true }),
		);

		expect(earned({ attempts: repeats })).not.toContain("serija-20");
	});

	it("needs 80 percent in every subject with enough answers", () => {
		const groups = subjectGroups(course, "B");
		const answers = (correctShare: number) =>
			groups.flatMap((group) =>
				group.questionIds.slice(0, 10).map((questionId, index) =>
					testAttempt({
						questionId,
						sessionId: group.id,
						correct: index < correctShare * 10,
					}),
				),
			);

		expect(earned({ attempts: answers(0.8) })).toContain("svi-predmeti-80");
		expect(earned({ attempts: answers(0.7) })).not.toContain("svi-predmeti-80");
		expect(
			earned({ attempts: answers(0.8).slice(1) }),
			"one subject below ten answers",
		).not.toContain("svi-predmeti-80");
	});
});

describe("other badges", () => {
	it("needs a passed and finished mock exam", () => {
		expect(earned({ examSessions: [examSession(false)] })).toEqual([]);
		expect(earned({ examSessions: [examSession(true)] })).toEqual([
			"prvi-polozen-ispit",
		]);
	});

	it("counts seven study days inside any fourteen", () => {
		const spread = [
			"2026-10-01",
			"2026-10-03",
			"2026-10-05",
			"2026-10-07",
			"2026-10-09",
			"2026-10-11",
		];

		expect(mostStudyDaysInWindow([...spread, "2026-10-15"])).toBe(6);
		expect(mostStudyDaysInWindow([...spread, "2026-10-14"])).toBe(7);
		expect(earned({ studyDays: [...spread, "2026-10-14"] })).toEqual([
			"tjedan-ucenja",
		]);
	});
});
