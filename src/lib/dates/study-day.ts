// Streaks follow the calendar in Croatia, so a session at 00:30 local time counts for the new day while UTC is still on the old one. en-CA formats as YYYY-MM-DD.
const zagrebDayFormat = new Intl.DateTimeFormat("en-CA", {
	timeZone: "Europe/Zagreb",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

export function toStudyDay(date: Date): string {
	return zagrebDayFormat.format(date);
}

// Day strings are calendar dates with no time of day, so UTC arithmetic cannot be shifted by a DST change.
export function addDays(day: string, days: number): string {
	const [year, month, date] = day.split("-").map(Number);
	const shifted = new Date(
		Date.UTC(year ?? 0, (month ?? 1) - 1, (date ?? 1) + days),
	);

	return shifted.toISOString().slice(0, 10);
}

export function previousDay(day: string): string {
	return addDays(day, -1);
}

export function daysBetween(from: string, to: string): number {
	return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}
