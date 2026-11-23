import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { EXAM_LEVELS } from "./enums";

export const userProfile = sqliteTable("user_profile", {
	userId: text("user_id")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),

	targetLevel: text("target_level", { enum: EXAM_LEVELS }).notNull(),

	examDate: text("exam_date"),

	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),

	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});
