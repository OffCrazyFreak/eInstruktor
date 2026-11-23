import type { ExamLevel, ICourse } from "@/content/course-types";
import type { AreaSlug, ExamSubjectId, IQuestion } from "@/content/types";
import type {
	PracticeMode,
	SessionLength,
} from "@/features/practice/utils/practice-search";
import type { ISessionAnswer } from "@/features/practice/utils/practice-session";
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

export interface IPracticeExclusions {
	/** Left out while enough other questions remain, such as the ones the set before "Još 10" asked. */
	recent?: readonly string[];
	/** Always left out. */
	drop?: readonly string[];
}

/** What "Još 10" leaves out: the questions just asked, and for Pogrešni the ones just answered right, which still wait for a second session. */
export function againExclusions(
	mode: PracticeMode,
	answers: readonly ISessionAnswer[],
): IPracticeExclusions {
	return {
		recent: answers.map((answer) => answer.questionId),
		drop:
			mode === "pogresni"
				? answers
						.filter((answer) => answer.correct)
						.map((answer) => answer.questionId)
				: [],
	};
}

function withoutIds(ids: readonly string[], left: readonly string[] = []) {
	const leftOut = new Set(left);

	return ids.filter((id) => !leftOut.has(id));
}

/** The questions of one practice set in the order they are asked; flagged ones stay newest first, and a lesson's own questions come first when a lesson is picked. */
export function selectPracticeQuestions(
	course: ICourse,
	request: IPracticeRequest,
	context: IPracticeContext,
	seed: number,
	{ recent, drop }: IPracticeExclusions = {},
): IQuestion[] {
	const all = withoutIds(modeQuestionIds(course, request, context), drop);
	const fresh = withoutIds(all, recent);
	const needed = request.length === "sve" ? 1 : request.length;

	const questions = getQuestions(course, {
		ids: fresh.length >= needed ? fresh : all,
	});

	const shuffled =
		request.mode === "oznaceno" ? questions : seededShuffle(questions, seed);

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
