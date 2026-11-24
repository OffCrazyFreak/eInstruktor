import type { IProgressState } from "@/lib/progress/progress-schema";

export const LOGIN_NUDGE_TRIGGERS = [
	"practice-set",
	"lesson",
	"exam-result",
] as const;

export type LoginNudgeTrigger = (typeof LOGIN_NUDGE_TRIGGERS)[number];

/** A dismissed trigger stays quiet this long (UX research section 8). */
export const QUIET_DAYS = 7;

/** The sheet opens at most this many times in total, so a learner who keeps saying no is left alone. */
export const MAX_SHOWINGS = 3;

const DAY_MS = 86_400_000;

// dismissedNudges holds the dismissal time per trigger and, under its own key, how often the sheet was shown.
export const SHOWINGS_KEY = "login-nudge-showings";

export function dismissalKey(trigger: LoginNudgeTrigger): string {
	return `login-nudge:${trigger}`;
}

export function shouldShowLoginNudge(
	dismissedNudges: IProgressState["dismissedNudges"],
	trigger: LoginNudgeTrigger,
	now: number,
): boolean {
	if ((dismissedNudges[SHOWINGS_KEY] ?? 0) >= MAX_SHOWINGS) {
		return false;
	}

	const dismissedAt = dismissedNudges[dismissalKey(trigger)];

	return dismissedAt === undefined || now - dismissedAt >= QUIET_DAYS * DAY_MS;
}

export function recordShowing(progress: IProgressState): IProgressState {
	const showings = progress.dismissedNudges[SHOWINGS_KEY] ?? 0;

	return {
		...progress,
		dismissedNudges: {
			...progress.dismissedNudges,
			[SHOWINGS_KEY]: showings + 1,
		},
	};
}

export function recordDismissal(
	progress: IProgressState,
	trigger: LoginNudgeTrigger,
	now: number,
): IProgressState {
	return {
		...progress,
		dismissedNudges: {
			...progress.dismissedNudges,
			[dismissalKey(trigger)]: now,
		},
	};
}
