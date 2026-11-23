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
