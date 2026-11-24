import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { EXAM_LEVELS } from "./enums";

export const userProfile = sqliteTable("user_profile", {
	userId: text("user_id")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),

	targetLevel: text("target_level", { enum: EXAM_LEVELS }),

	examDate: text("exam_date"),

	// Set by "Položio sam"; the progress page then stops showing the streak.
	passedAt: integer("passed_at", { mode: "timestamp_ms" }),

	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),

	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});
