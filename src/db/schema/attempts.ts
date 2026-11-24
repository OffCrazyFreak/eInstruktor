import {
	foreignKey,
	index,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { ATTEMPT_MODES, EXAM_LEVELS } from "./enums";

export interface ISubjectResult {
	correct: number;
	total: number;
	passed: boolean;
}

// question_ids and seed together let a saved exam be shown again exactly as it was drawn.
export const examSession = sqliteTable(
	"exam_session",
	{
		id: text("id").notNull(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		level: text("level", { enum: EXAM_LEVELS }).notNull(),

		seed: integer("seed").notNull(),

		questionIds: text("question_ids", { mode: "json" })
			.$type<string[]>()
			.notNull(),

		startedAt: integer("started_at", { mode: "timestamp_ms" }).notNull(),

		finishedAt: integer("finished_at", { mode: "timestamp_ms" }),

		endsAt: integer("ends_at", { mode: "timestamp_ms" }),

		score: integer("score"),

		passed: integer("passed", { mode: "boolean" }),

		perSubject: text("per_subject", { mode: "json" }).$type<
			Record<string, ISubjectResult>
		>(),

		answers: text("answers", { mode: "json" }).$type<
			Record<string, string[]>
		>(),

		graded: text("graded", { mode: "json" }).$type<Record<string, boolean>>(),
	},
	(table) => [
		// Client-made ids are only unique per learner, so one learner's id can never block or clobber another's.
		primaryKey({ columns: [table.userId, table.id] }),
		index("exam_session_user_started_idx").on(table.userId, table.startedAt),
	],
);

// Append-only with client-generated ids, so merging anonymous progress on sign-in is an insert that ignores conflicts.
export const questionAttempt = sqliteTable(
	"question_attempt",
	{
		id: text("id").notNull(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		questionId: text("question_id").notNull(),

		// The lesson visit, practice set or exam on the device; accuracy counts only the first answer per session.
		sessionId: text("session_id").notNull(),

		examSessionId: text("exam_session_id"),

		correct: integer("correct", { mode: "boolean" }).notNull(),

		selectedOptionIds: text("selected_option_ids", { mode: "json" })
			.$type<string[]>()
			.notNull(),

		mode: text("mode", { enum: ATTEMPT_MODES }).notNull(),

		answeredAt: integer("answered_at", { mode: "timestamp_ms" }).notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.id] }),
		// The composite link keeps an attempt tied to an exam of the same learner.
		foreignKey({
			columns: [table.userId, table.examSessionId],
			foreignColumns: [examSession.userId, examSession.id],
		}).onDelete("cascade"),
		index("question_attempt_user_answered_idx").on(
			table.userId,
			table.answeredAt,
		),
		index("question_attempt_exam_session_idx").on(table.examSessionId),
	],
);
