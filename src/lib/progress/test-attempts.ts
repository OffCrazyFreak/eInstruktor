import type { IAttempt } from "@/lib/progress/progress-schema";

let counter = 0;

/** Builds an attempt for tests; `day` is a Zagreb calendar day and the time is noon there. */
export function testAttempt(
	overrides: Partial<IAttempt> & { day?: string } = {},
): IAttempt {
	const { day = "2026-11-20", ...rest } = overrides;

	counter++;

	return {
		id: `attempt-${counter}`,
		questionId: "q-1",
		correct: true,
		selected: ["a"],
		mode: "practice",
		sessionId: "session-1",
		answeredAt: Date.parse(`${day}T11:00:00Z`) + counter,
		...rest,
	};
}
