import {
	type ReadinessSubjectId,
	SUBJECT_LABELS,
} from "@/content/voditelj-brodice/subjects";
import type { ISubjectScore } from "@/features/exam/utils/score-exam";
import type { IExamSession } from "@/lib/progress/progress-schema";

// The saved result is the record, so a later content change never rewrites an old exam's score.
export function storedSubjectScores(session: IExamSession): ISubjectScore[] {
	return Object.entries(session.perSubject ?? {}).map(
		([subjectId, result]) => ({
			subjectId: subjectId as ReadinessSubjectId,
			label: SUBJECT_LABELS[subjectId as ReadinessSubjectId] ?? subjectId,
			...result,
		}),
	);
}

export function totalQuestions(session: IExamSession): number {
	return Object.values(session.perSubject ?? {}).reduce(
		(sum, result) => sum + result.total,
		0,
	);
}
