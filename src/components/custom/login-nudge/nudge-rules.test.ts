import { describe, expect, it } from "vitest";
import {
	dismissalKey,
	MAX_SHOWINGS,
	QUIET_DAYS,
	recordDismissal,
	recordShowing,
	SHOWINGS_KEY,
	shouldShowLoginNudge,
} from "@/components/custom/login-nudge/nudge-rules";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";

const NOW = Date.parse("2026-11-20T10:00:00Z");
const DAY = 86_400_000;

describe("shouldShowLoginNudge", () => {
	it("shows for a learner who never saw it", () => {
		expect(shouldShowLoginNudge({}, "practice-set", NOW)).toBe(true);
	});

	it("keeps a dismissed trigger quiet for a week, others stay open", () => {
		const dismissed = recordDismissal(
			EMPTY_PROGRESS,
			"practice-set",
			NOW,
		).dismissedNudges;

		expect(shouldShowLoginNudge(dismissed, "practice-set", NOW + DAY)).toBe(
			false,
		);
		expect(shouldShowLoginNudge(dismissed, "exam-result", NOW + DAY)).toBe(
			true,
		);
		expect(
			shouldShowLoginNudge(dismissed, "practice-set", NOW + QUIET_DAYS * DAY),
		).toBe(true);
	});

	it("stops for good after three showings", () => {
		let progress = EMPTY_PROGRESS;

		for (let index = 0; index < MAX_SHOWINGS; index++) {
			progress = recordShowing(progress);
		}

		expect(progress.dismissedNudges[SHOWINGS_KEY]).toBe(MAX_SHOWINGS);
		expect(shouldShowLoginNudge(progress.dismissedNudges, "lesson", NOW)).toBe(
			false,
		);
	});

	it("stores dismissals per trigger", () => {
		expect(dismissalKey("lesson")).not.toBe(dismissalKey("exam-result"));
	});
});
