import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";

function userIdColumn() {
	return text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" });
}

export const lessonProgress = sqliteTable(
	"lesson_progress",
	{
		userId: userIdColumn(),

		lessonSlug: text("lesson_slug").notNull(),

		completedAt: integer("completed_at", { mode: "timestamp" }).notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.lessonSlug] })],
);

export const flaggedQuestion = sqliteTable(
	"flagged_question",
	{
		userId: userIdColumn(),

		questionId: text("question_id").notNull(),

		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(table) => [primaryKey({ columns: [table.userId, table.questionId] })],
);

export const userBadge = sqliteTable(
	"user_badge",
	{
		userId: userIdColumn(),

		badgeId: text("badge_id").notNull(),

		earnedAt: integer("earned_at", { mode: "timestamp" }).notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.badgeId] })],
);

// One row per calendar day in Europe/Zagreb with any study activity; streaks are counted from these rows.
export const studyDay = sqliteTable(
	"study_day",
	{
		userId: userIdColumn(),

		day: text("day").notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.day] })],
);
