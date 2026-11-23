import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { ATTEMPT_MODES, EXAM_LEVELS } from "./enums";

// Append-only with client-generated ids, so merging anonymous progress on sign-in is an insert that ignores conflicts.
export const questionAttempt = sqliteTable(
	"question_attempt",
	{
		id: text("id").primaryKey(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		questionId: text("question_id").notNull(),

		correct: integer("correct", { mode: "boolean" }).notNull(),

		selectedOptionIds: text("selected_option_ids", { mode: "json" })
			.$type<string[]>()
			.notNull(),

		mode: text("mode", { enum: ATTEMPT_MODES }).notNull(),

		answeredAt: integer("answered_at", { mode: "timestamp" }).notNull(),
	},
	(table) => [
		index("question_attempt_user_answered_idx").on(
			table.userId,
			table.answeredAt,
		),
	],
);

export interface ISubjectResult {
	correct: number;
	total: number;
	passed: boolean;
}

export const examSession = sqliteTable(
	"exam_session",
	{
		id: text("id").primaryKey(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		level: text("level", { enum: EXAM_LEVELS }).notNull(),

		startedAt: integer("started_at", { mode: "timestamp" }).notNull(),

		finishedAt: integer("finished_at", { mode: "timestamp" }),

		score: integer("score"),

		passed: integer("passed", { mode: "boolean" }),

		perSubject: text("per_subject", { mode: "json" }).$type<
			Record<string, ISubjectResult>
		>(),
	},
	(table) => [
		index("exam_session_user_started_idx").on(table.userId, table.startedAt),
	],
);
