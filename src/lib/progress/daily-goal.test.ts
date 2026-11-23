import { describe, expect, it } from "vitest";
import { todayActivity, withStudyDay } from "@/lib/progress/daily-goal";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { testAttempt } from "@/lib/progress/test-attempts";

describe("todayActivity", () => {
	it("meets the goal at 5 answers or one finished lesson", () => {
		const four = Array.from({ length: 4 }, () =>
			testAttempt({ day: "2026-11-23" }),
		);
		const five = [...four, testAttempt({ day: "2026-11-23" })];

		expect(
			todayActivity({ attempts: four, lessonsDone: {} }, "2026-11-23"),
		).toEqual({
			questions: 4,
			lessons: 0,
			goalMet: false,
		});
		expect(
			todayActivity({ attempts: five, lessonsDone: {} }, "2026-11-23").goalMet,
		).toBe(true);
		expect(
			todayActivity(
				{
					attempts: [],
					lessonsDone: { uvod: Date.parse("2026-11-23T08:00:00Z") },
				},
				"2026-11-23",
			).goalMet,
		).toBe(true);
	});

	it("counts by the Zagreb calendar around midnight", () => {
		const lateUtc = testAttempt({
			answeredAt: Date.parse("2026-11-22T23:30:00Z"),
		});
		const beforeMidnight = testAttempt({
			answeredAt: Date.parse("2026-11-22T22:59:00Z"),
		});
		const progress = { attempts: [lateUtc, beforeMidnight], lessonsDone: {} };

		expect(todayActivity(progress, "2026-11-23").questions).toBe(1);
		expect(todayActivity(progress, "2026-11-22").questions).toBe(1);
	});
});

describe("withStudyDay", () => {
	it("adds the day once when the goal is met and leaves it otherwise", () => {
		const done = {
			...EMPTY_PROGRESS,
			lessonsDone: { uvod: Date.parse("2026-11-23T08:00:00Z") },
		};
		const counted = withStudyDay(done, "2026-11-23");

		expect(counted.studyDays).toEqual(["2026-11-23"]);
		expect(withStudyDay(counted, "2026-11-23")).toBe(counted);
		expect(withStudyDay(EMPTY_PROGRESS, "2026-11-23")).toBe(EMPTY_PROGRESS);
	});
});
