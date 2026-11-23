import { addDays } from "@/lib/dates/study-day";
import type { ILeitnerEntry, LeitnerBox } from "@/lib/progress/progress-schema";

// Box 1 comes back every session; boxes 2 and 3 wait this many days after the last review.
const WAIT_DAYS: Record<LeitnerBox, number> = { 1: 0, 2: 2, 3: 6 };

export function nextLeitnerEntry(
	current: ILeitnerEntry | undefined,
	correct: boolean,
	today: string,
): ILeitnerEntry {
	if (!correct) {
		return { box: 1, reviewedOn: today };
	}

	const box = Math.min((current?.box ?? 1) + 1, 3) as LeitnerBox;

	return { box, reviewedOn: today };
}

export function isDue(entry: ILeitnerEntry, today: string): boolean {
	return addDays(entry.reviewedOn, WAIT_DAYS[entry.box]) <= today;
}

export function dueIds(
	boxes: Record<string, ILeitnerEntry>,
	today: string,
): string[] {
	return Object.entries(boxes)
		.filter(([, entry]) => isDue(entry, today))
		.map(([id]) => id);
}
