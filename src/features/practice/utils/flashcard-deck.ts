import type { ExamLevel, ICourse } from "@/content/course-types";
import type { ExamSubjectId, IStudyCard } from "@/content/types";
import { matchesLevel, subjectOfArea } from "@/lib/content/course-selectors";
import { isDue } from "@/lib/progress/leitner";
import type { ILeitnerEntry } from "@/lib/progress/progress-schema";

export const ALL_DECKS = "sve";

export type DeckId = ExamSubjectId | typeof ALL_DECKS;

export interface IDeckStats {
	total: number;
	/** Cards last graded "Nisam znao" (Leitner box 1). */
	unknown: number;
	/** New cards and cards whose Leitner wait is over. */
	due: number;
}

export function deckCards(
	course: ICourse,
	level: ExamLevel,
	deck: DeckId,
): IStudyCard[] {
	return course.studyCards
		.filter((card) => matchesLevel(card.level, level))
		.filter(
			(card) => deck === ALL_DECKS || subjectOfArea(course, card.area) === deck,
		);
}

function isWaiting(entry: ILeitnerEntry | undefined, today: string): boolean {
	return entry !== undefined && !isDue(entry, today);
}

export function deckStats(
	cards: readonly IStudyCard[],
	boxes: Readonly<Record<string, ILeitnerEntry>>,
	today: string,
): IDeckStats {
	return {
		total: cards.length,
		unknown: cards.filter((card) => boxes[card.id]?.box === 1).length,
		due: cards.filter((card) => !isWaiting(boxes[card.id], today)).length,
	};
}

/** Due and new cards first, then the ones still waiting, each part in content order. */
export function reviewOrder(
	cards: readonly IStudyCard[],
	boxes: Readonly<Record<string, ILeitnerEntry>>,
	today: string,
): IStudyCard[] {
	return [
		...cards.filter((card) => !isWaiting(boxes[card.id], today)),
		...cards.filter((card) => isWaiting(boxes[card.id], today)),
	];
}
