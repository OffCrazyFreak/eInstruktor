import type { drizzle } from "drizzle-orm/libsql";
import type { IQuestion } from "@/content/types";
import course from "@/content/voditelj-brodice";
import type { ISubjectResult } from "@/db/schema";
import * as schema from "@/db/schema";
import { getQuestions, subjectOfArea } from "@/lib/content/course-selectors";
import { questionsForExam } from "@/lib/content/exam-questions";
import { addDays, previousDay, toStudyDay } from "@/lib/dates/study-day";

type Database = ReturnType<typeof drizzle<typeof schema>>;

const DEMO_USER_ID = "demo-user";

const DEMO_EXAM_ID = "demo-exam-1";

const DEMO_EXAM_SEED = 2026;

const STUDY_DAY_COUNT = 5;

const PRACTICE_QUESTIONS_PER_AREA = 3;

// 10:00 UTC is 11:00 or 12:00 in Zagreb, so the moment always falls on the same study day.
function middayOf(day: string): Date {
	return new Date(`${day}T10:00:00Z`);
}

function lastStudyDays(): string[] {
	const days = [toStudyDay(new Date())];

	while (days.length < STUDY_DAY_COUNT) {
		days.push(previousDay(days.at(-1) ?? ""));
	}

	return days;
}

// A right answer picks every correct option (multi questions have several); a wrong one picks the first wrong option.
function answer(question: IQuestion, correct: boolean): string[] {
	const options = question.options.filter(
		(option) => option.correct === correct,
	);

	return (correct ? options : options.slice(0, 1)).map((option) => option.id);
}

function practiceAttempts(days: string[]) {
	const questions = course.areas.flatMap((area) =>
		getQuestions(course, { area: area.slug, level: "B" }).slice(
			0,
			PRACTICE_QUESTIONS_PER_AREA,
		),
	);

	// Every third answer is wrong, so the mistake and weak-area views have something to show.
	return questions.map((question, index) => {
		const correct = index % 3 !== 0;

		return {
			id: `demo-attempt-${index}`,
			userId: DEMO_USER_ID,
			questionId: question.id,
			correct,
			selectedOptionIds: answer(question, correct),
			mode: "practice" as const,
			answeredAt: middayOf(days[index % days.length] ?? ""),
		};
	});
}

// Answer 9 is an extra mistake in the second subject, so the demo exam fails on exactly one subject.
function examAttempts(questions: IQuestion[], startedAt: Date) {
	return questions.map((question, index) => {
		const correct = index % 4 !== 0 && index !== 9;

		return {
			id: `demo-exam-attempt-${index}`,
			userId: DEMO_USER_ID,
			questionId: question.id,
			examSessionId: DEMO_EXAM_ID,
			correct,
			selectedOptionIds: answer(question, correct),
			mode: "exam" as const,
			answeredAt: new Date(startedAt.getTime() + (index + 1) * 60_000),
		};
	});
}

function scoreBySubject(
	attempts: { questionId: string; correct: boolean }[],
): Record<string, ISubjectResult> {
	const results: Record<string, ISubjectResult> = {};

	for (const attempt of attempts) {
		const [question] = getQuestions(course, { ids: [attempt.questionId] });
		const subject = question ? subjectOfArea(course, question.area) : undefined;

		if (!subject) {
			continue;
		}

		const result = results[subject] ?? { correct: 0, total: 0, passed: false };
		result.total += 1;
		result.correct += attempt.correct ? 1 : 0;
		result.passed = result.correct >= course.examFormats.B.passPerSubject;
		results[subject] = result;
	}

	return results;
}

export async function seedDemoUser(db: Database): Promise<void> {
	const days = lastStudyDays();
	const today = days[0] ?? "";

	await db
		.insert(schema.user)
		.values({
			id: DEMO_USER_ID,
			name: "Demo učenik",
			email: "demo@example.com",
		})
		.onConflictDoNothing();

	await db
		.insert(schema.userProfile)
		.values({
			userId: DEMO_USER_ID,
			targetLevel: "B",
			examDate: addDays(today, 30),
		})
		.onConflictDoNothing();

	const lessons = course.lessons.slice(0, STUDY_DAY_COUNT);

	await db
		.insert(schema.lessonProgress)
		.values(
			lessons.map((lesson, index) => ({
				userId: DEMO_USER_ID,
				lessonSlug: lesson.slug,
				completedAt: middayOf(days[days.length - 1 - index] ?? today),
			})),
		)
		.onConflictDoNothing();

	const practice = practiceAttempts(days);

	await db
		.insert(schema.questionAttempt)
		.values(practice)
		.onConflictDoNothing();

	const examQuestions = questionsForExam(course, "B", DEMO_EXAM_SEED);
	const startedAt = middayOf(days[1] ?? today);
	const exam = examAttempts(examQuestions, startedAt);
	const perSubject = scoreBySubject(exam);

	await db
		.insert(schema.examSession)
		.values({
			id: DEMO_EXAM_ID,
			userId: DEMO_USER_ID,
			level: "B",
			seed: DEMO_EXAM_SEED,
			questionIds: examQuestions.map((question) => question.id),
			startedAt,
			finishedAt: exam.at(-1)?.answeredAt ?? startedAt,
			score: exam.filter((attempt) => attempt.correct).length,
			passed: Object.values(perSubject).every((result) => result.passed),
			perSubject,
		})
		.onConflictDoNothing();

	await db.insert(schema.questionAttempt).values(exam).onConflictDoNothing();

	await db
		.insert(schema.studyDay)
		.values(days.map((day) => ({ userId: DEMO_USER_ID, day })))
		.onConflictDoNothing();

	await db
		.insert(schema.flaggedQuestion)
		.values(
			practice
				.filter((attempt) => !attempt.correct)
				.slice(0, 3)
				.map((attempt) => ({
					userId: DEMO_USER_ID,
					questionId: attempt.questionId,
				})),
		)
		.onConflictDoNothing();

	const areas = new Set(
		getQuestions(course, {
			ids: practice.map((attempt) => attempt.questionId),
		}).map((question) => question.area),
	);

	console.log(
		`Demo user "${DEMO_USER_ID}": ${lessons.length} lessons done, ${practice.length} practice answers across ${areas.size} areas, ${days.length} study days, 1 mock exam (${exam.length} answers).`,
	);
}
