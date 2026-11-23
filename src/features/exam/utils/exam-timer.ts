import type { ExamLevel, ICourse } from "@/content/course-types";

export type TimerChoice = "standard" | "extended" | "none";

// WCAG 2.2.1: our time limit is not official, so the learner may switch it off or double it.
const TIME_FACTOR: Record<Exclude<TimerChoice, "none">, number> = {
	standard: 1,
	extended: 2,
};

const MINUTE = 60_000;

/** Announced once each, so a screen reader hears the clock without a per-second chatter. */
export const ANNOUNCED_MINUTES = [10, 5, 1] as const;

export function examMinutes(course: ICourse, level: ExamLevel): number {
	return course.examFormats[level].minutes;
}

export function timerMinutes(
	course: ICourse,
	level: ExamLevel,
	choice: TimerChoice,
): number | null {
	return choice === "none"
		? null
		: examMinutes(course, level) * TIME_FACTOR[choice];
}

export function examEndsAt(
	startedAt: number,
	minutes: number | null,
): number | null {
	return minutes === null ? null : startedAt + minutes * MINUTE;
}

export function remainingMs(endsAt: number, now: number): number {
	return Math.max(0, endsAt - now);
}

/** "44:59", or "1:29:59" past an hour; rounds up so the clock reads 0:00 only when time is really up. */
export function formatClock(ms: number): string {
	const totalSeconds = Math.ceil(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");

	return hours > 0
		? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`
		: `${minutes}:${seconds}`;
}

/** The lowest minute mark crossed between two readings of the clock, if any; a woken phone may skip several. */
export function crossedMark(
	previousMs: number,
	currentMs: number,
): number | null {
	const mark = [...ANNOUNCED_MINUTES]
		.reverse()
		.find(
			(minutes) =>
				previousMs > minutes * MINUTE && currentMs <= minutes * MINUTE,
		);

	return mark ?? null;
}
