import type { ExamLevel, ICourse } from "@/content/course-types";
import type { AreaSlug, ExamSubjectId, IQuestion } from "@/content/types";
import type {
	PracticeMode,
	SessionLength,
} from "@/features/practice/utils/practice-search";
import { getQuestions, subjectOfArea } from "@/lib/content/course-selectors";
import { areaGroups } from "@/lib/content/question-groups";
import { seededShuffle } from "@/lib/content/seeded-shuffle";
import { weakGroups } from "@/lib/progress/accuracy";
import { dueIds } from "@/lib/progress/leitner";
import {
	flaggedIds,
	wrongQuestionIds,
} from "@/lib/progress/practice/practice-selectors";
import type { IProgressState } from "@/lib/progress/progress-schema";

export interface IPoolFilter {
	area?: AreaSlug;
	lesson?: string;
	subject?: ExamSubjectId;
}

export interface IPracticeContext {
	progress: Pick<IProgressState, "attempts" | "flagged" | "questionBoxes">;
	/** Zagreb calendar day, for the Leitner due check. */
	today: string;
}

export interface IPracticeRequest extends IPoolFilter {
	mode: PracticeMode;
	level: ExamLevel;
	length: SessionLength;
}

// Lekcija 0 is about getting the licence, which the exam does not ask, so its questions show up only when that lesson is picked.
export function practicePool(
	course: ICourse,
	level: ExamLevel,
	{ area, lesson, subject }: IPoolFilter = {},
): IQuestion[] {
	return getQuestions(course, { level, area })
		.filter(
			(question) =>
				lesson === course.introLessonSlug ||
				question.lesson !== course.introLessonSlug,
		)
		.filter(
			(question) =>
				!subject || subjectOfArea(course, question.area) === subject,
		);
}

function onlyIn(ids: readonly string[], pool: ReadonlySet<string>): string[] {
	return ids.filter((id) => pool.has(id));
}

/** Every question the mode would offer, before the set length is applied. */
export function modeQuestionIds(
	course: ICourse,
	request: Omit<IPracticeRequest, "length">,
	{ progress, today }: IPracticeContext,
): string[] {
	const pool = practicePool(course, request.level, request);
	const ids = pool.map((question) => question.id);
	const allowed = new Set(ids);

	switch (request.mode) {
		case "podrucje":
		case "mjesovito":
			return ids;

		case "pogresni":
			return onlyIn(wrongQuestionIds(progress.attempts), allowed);

		case "oznaceno":
			return onlyIn(flaggedIds(progress.flagged), allowed);

		case "ponavljanje":
			return dueIds(progress.questionBoxes, today, ids);

		case "slabo": {
			const groups = areaGroups(course, request.level);
			const weak = new Set(
				weakGroups(groups, progress.attempts).map((group) => group.id),
			);

			return onlyIn(
				groups
					.filter((group) => weak.has(group.id))
					.flatMap((group) => group.questionIds),
				allowed,
			);
		}
	}
}

/** The questions of one practice set in the order they are asked; the lesson's own questions come first when a lesson is picked. */
export function selectPracticeQuestions(
	course: ICourse,
	request: IPracticeRequest,
	context: IPracticeContext,
	seed: number,
): IQuestion[] {
	const shuffled = seededShuffle(
		getQuestions(course, { ids: modeQuestionIds(course, request, context) }),
		seed,
	);

	const ordered = request.lesson
		? [
				...shuffled.filter((question) => question.lesson === request.lesson),
				...shuffled.filter((question) => question.lesson !== request.lesson),
			]
		: shuffled;

	return request.length === "sve" ? ordered : ordered.slice(0, request.length);
}

/** An A learner only ever practises A; a B learner may narrow to A in the mode sheet. */
export function practiceLevel(
	learnerLevel: ExamLevel,
	chosen: ExamLevel | undefined,
): ExamLevel {
	return learnerLevel === "A" ? "A" : (chosen ?? learnerLevel);
}
