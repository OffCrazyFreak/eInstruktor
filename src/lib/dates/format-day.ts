import { toStudyDay } from "@/lib/dates/study-day";

/** "23.11.2026." on the Zagreb calendar. */
export function formatDay(time: number): string {
	const [year, month, day] = toStudyDay(new Date(time)).split("-");

	return `${day}.${month}.${year}.`;
}
