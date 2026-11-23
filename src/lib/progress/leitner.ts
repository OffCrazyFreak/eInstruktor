import { addDays } from "@/lib/dates/study-day";
import type { ILeitnerEntry, LeitnerBox } from "@/lib/progress/progress-schema";

// Box 1 comes back every session; boxes 2 and 3 wait this many days after the last review.
const WAIT_DAYS: Record<LeitnerBox, number> = { 1: 0, 2: 2, 3: 6 };

export function isDue(entry: ILeitnerEntry, today: string): boolean {
	return addDays(entry.reviewedOn, WAIT_DAYS[entry.box]) <= today;
}

// Answering an item again before it is due proves little, so only a due or new item moves up a box.
export function nextLeitnerEntry(
	current: ILeitnerEntry | undefined,
	correct: boolean,
	today: string,
): ILeitnerEntry {
	if (!correct) {
		return { box: 1, reviewedOn: today };
	}

	if (current && !isDue(current, today)) {
		return current;
	}

	const box = Math.min((current?.box ?? 1) + 1, 3) as LeitnerBox;

	return { box, reviewedOn: today };
}

/** Due ids, limited to `pool` when given, such as one area's questions or the questions of the learner's level. */
export function dueIds(
	boxes: Record<string, ILeitnerEntry>,
	today: string,
	pool?: readonly string[],
): string[] {
	const allowed = pool ? new Set(pool) : null;

	return Object.entries(boxes)
		.filter(([id]) => !allowed || allowed.has(id))
		.filter(([, entry]) => isDue(entry, today))
		.map(([id]) => id);
}
