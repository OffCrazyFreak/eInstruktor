import { toStudyDay } from "@/lib/dates/study-day";
import { nextLeitnerEntry } from "@/lib/progress/leitner";
import type { IProgressState } from "@/lib/progress/progress-schema";

/** "Znao sam" moves an oral card up a Leitner box, "Nisam znao" sends it back to box 1. */
export function gradeCard(
	progress: IProgressState,
	cardId: string,
	known: boolean,
	now: number,
): IProgressState {
	return {
		...progress,
		cardBoxes: {
			...progress.cardBoxes,
			[cardId]: nextLeitnerEntry(
				progress.cardBoxes[cardId],
				known,
				toStudyDay(new Date(now)),
			),
		},
	};
}
