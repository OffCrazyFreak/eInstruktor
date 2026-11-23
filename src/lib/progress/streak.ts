import { addDays, previousDay } from "@/lib/dates/study-day";

const WEEK = 7;

export interface IStreak {
	/** Study days among the last seven, today included. */
	daysThisWeek: number;
	/** Study days in the current run, where one missed day a week is skipped over. */
	run: number;
	studiedToday: boolean;
}

// Today still counts as open, so the run starts from yesterday until the learner studies today.
function runLength(days: ReadonlySet<string>, today: string, earliest: string) {
	let day = days.has(today) ? today : previousDay(today);
	let run = 0;
	let lastSkip: number | null = null;

	for (let offset = 0; day >= earliest; offset++, day = previousDay(day)) {
		if (days.has(day)) {
			run++;
			continue;
		}

		if (lastSkip !== null && offset - lastSkip < WEEK) {
			break;
		}

		lastSkip = offset;
	}

	return run;
}

export function streak(studyDays: readonly string[], today: string): IStreak {
	const days = new Set(studyDays);
	const weekStart = addDays(today, -(WEEK - 1));
	const earliest = [...days].sort()[0];

	return {
		daysThisWeek: [...days].filter((day) => day >= weekStart && day <= today)
			.length,
		run: earliest ? runLength(days, today, earliest) : 0,
		studiedToday: days.has(today),
	};
}
