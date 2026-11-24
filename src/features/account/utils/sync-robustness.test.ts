import { describe, expect, it } from "vitest";
import { applySyncResponse } from "@/features/account/utils/apply-sync-response";
import { buildSyncRequest } from "@/features/account/utils/build-sync-request";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { testAttempt } from "@/lib/testing/test-attempts";

describe("sync robustness", () => {
	it("leaves a damaged local attempt behind instead of blocking every sync", () => {
		const good = testAttempt({ id: "good" });
		const bad = testAttempt({ id: "x".repeat(500) });

		const request = buildSyncRequest(
			{ ...EMPTY_PROGRESS, attempts: [good, bad] },
			null,
			"u1",
			true,
		);

		expect(request.attempts.map((attempt) => attempt.id)).toEqual(["good"]);
	});

	it("never moves the sent-through mark into the future, so a fast clock cannot hide later answers", () => {
		const future = testAttempt({ id: "future" });
		future.answeredAt = Date.now() + 10 * 24 * 60 * 60 * 1000;

		const progress = { ...EMPTY_PROGRESS, attempts: [future] };
		const request = buildSyncRequest(progress, null, "u1", false);

		const { baseline } = applySyncResponse(progress, {
			sent: progress,
			request,
			response: {
				profile: { targetLevel: null, examDate: null, passedAt: null },
				lessonsDone: {},
				flagged: {},
				studyDays: [],
				badges: {},
				attempts: null,
				examSessions: null,
				insertedAttempts: 1,
			},
			userId: "u1",
			previous: null,
		});

		expect(baseline.attemptsThrough).toBeLessThanOrEqual(Date.now());
	});
});
