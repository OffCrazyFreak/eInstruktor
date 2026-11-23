import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import course from "@/content/voditelj-brodice";
import { resolveDbConfig } from "@/db/config";
import * as schema from "@/db/schema";
import { getQuestions } from "@/lib/content/course-selectors";
import { toStudyDay } from "@/lib/dates/study-day";

const DEMO_USER_ID = "demo-user";

const DAY_MS = 24 * 60 * 60 * 1000;

type Database = ReturnType<typeof drizzle<typeof schema>>;

function daysAgo(days: number): Date {
	return new Date(Date.now() - days * DAY_MS);
}

async function seedDemoUser(db: Database): Promise<void> {
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
			examDate: toStudyDay(daysAgo(-30)),
		})
		.onConflictDoNothing();

	const lessons = course.lessons.slice(0, 5);

	await db
		.insert(schema.lessonProgress)
		.values(
			lessons.map((lesson, index) => ({
				userId: DEMO_USER_ID,
				lessonSlug: lesson.slug,
				completedAt: daysAgo(lessons.length - index),
			})),
		)
		.onConflictDoNothing();

	// Every third answer is wrong, so the mistake and weak-area views have something to show.
	const attempts = getQuestions(course, { level: "B" })
		.slice(0, 30)
		.map((question, index) => {
			const correct = index % 3 !== 0;
			const chosen = question.options.filter(
				(option) => option.correct === correct,
			);

			return {
				id: `demo-attempt-${index}`,
				userId: DEMO_USER_ID,
				questionId: question.id,
				correct,
				selectedOptionIds: chosen.slice(0, 1).map((option) => option.id),
				mode: "practice" as const,
				answeredAt: daysAgo(index % 5),
			};
		});

	await db
		.insert(schema.questionAttempt)
		.values(attempts)
		.onConflictDoNothing();

	const studyDays = [
		...new Set(attempts.map((attempt) => toStudyDay(attempt.answeredAt))),
	];

	await db
		.insert(schema.studyDay)
		.values(studyDays.map((day) => ({ userId: DEMO_USER_ID, day })))
		.onConflictDoNothing();

	await db
		.insert(schema.flaggedQuestion)
		.values(
			attempts
				.filter((attempt) => !attempt.correct)
				.slice(0, 3)
				.map((attempt) => ({
					userId: DEMO_USER_ID,
					questionId: attempt.questionId,
				})),
		)
		.onConflictDoNothing();

	await db
		.insert(schema.examSession)
		.values({
			id: "demo-exam-1",
			userId: DEMO_USER_ID,
			level: "B",
			startedAt: daysAgo(1),
			finishedAt: new Date(daysAgo(1).getTime() + 40 * 60 * 1000),
			score: 31,
			passed: false,
			perSubject: {
				"pomorska-plovidba": { correct: 7, total: 8, passed: true },
				motoristika: { correct: 5, total: 8, passed: false },
				"pomorstvo-propisi-meteorologija": {
					correct: 6,
					total: 8,
					passed: true,
				},
				"manevriranje-sigurnost-prva-pomoc": {
					correct: 7,
					total: 8,
					passed: true,
				},
				radiotelefonija: { correct: 6, total: 8, passed: true },
			},
		})
		.onConflictDoNothing();

	console.log(
		`Demo user "${DEMO_USER_ID}": ${lessons.length} lessons done, ${attempts.length} attempts, ${studyDays.length} study days, 1 mock exam.`,
	);
}

async function main(): Promise<void> {
	const config = resolveDbConfig();

	// The seed writes demo rows, so it must never reach the Turso production database.
	if (!config.url.startsWith("file:")) {
		throw new Error(
			`db:seed only runs against a local file, got ${config.url}. Unset DB_MODE or set DB_MODE=local.`,
		);
	}

	const client = createClient(config);
	const db = drizzle({ client, schema });

	await migrate(db, { migrationsFolder: "drizzle" });

	console.log(`Migrations applied to ${config.url}.`);

	console.log(
		`Course "${course.slug}": ${course.areas.length} areas, ${course.lessons.length} lessons, ${course.questions.length} questions, ${course.studyCards.length} study cards (read from code, not stored).`,
	);

	if (process.argv.includes("--demo")) {
		await seedDemoUser(db);
	}

	client.close();
}

await main();
