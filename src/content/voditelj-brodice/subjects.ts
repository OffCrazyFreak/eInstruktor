import type { ExamSubjectId } from "@/content/types";

/** Category A is examined as one subject; B as these five (Pravilnik o brodicama i jahtama, Dodatak 6 and 7). */
export const A_SUBJECT_ID = "osnove-plovidbe";

export type ReadinessSubjectId = ExamSubjectId | typeof A_SUBJECT_ID;

/** The five category B subjects, in exam order. */
export const EXAM_SUBJECT_IDS = [
	"pomorska-plovidba",
	"motoristika",
	"pomorstvo-propisi-meteorologija",
	"manevriranje-sigurnost-prva-pomoc",
	"radiotelefonija",
] as const satisfies readonly ExamSubjectId[];

export function isExamSubjectId(id: string): id is ExamSubjectId {
	return (EXAM_SUBJECT_IDS as readonly string[]).includes(id);
}

export const SUBJECT_LABELS: Record<ReadinessSubjectId, string> = {
	"osnove-plovidbe": "Osnove plovidbe",
	"pomorska-plovidba": "Pomorska plovidba",
	motoristika: "Motoristika",
	"pomorstvo-propisi-meteorologija": "Pomorstvo, propisi i meteorologija",
	"manevriranje-sigurnost-prva-pomoc": "Manevriranje, sigurnost i prva pomoć",
	radiotelefonija: "Radiotelefonija",
};
