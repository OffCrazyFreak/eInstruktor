const zagrebTime = new Intl.DateTimeFormat("hr-HR", {
	timeZone: "Europe/Zagreb",
	hour: "2-digit",
	minute: "2-digit",
});

export function formatExamTime(time: number): string {
	return zagrebTime.format(new Date(time));
}

/** Whole minutes, at least one, for "Trajalo je 23 min". */
export function durationMinutes(startedAt: number, finishedAt: number): number {
	return Math.max(1, Math.round((finishedAt - startedAt) / 60_000));
}
