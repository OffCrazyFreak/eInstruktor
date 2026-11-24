import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { lookupRequestSession } from "@/features/account/server/request-session.server";
import {
	requireUser,
	UnauthorizedError,
} from "@/features/account/server/require-user";
import { syncProgressForUser } from "@/features/account/server/sync-progress.server";
import { syncRequestSchema } from "@/features/account/utils/sync-schema";

export const syncProgress = createServerFn({ method: "POST" })
	.validator(syncRequestSchema)
	.handler(async ({ data }) => {
		const user = await requireUser(lookupRequestSession);

		try {
			return await syncProgressForUser(db, user.id, data);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				throw error;
			}

			// A raw database error can carry the SQL and its values, so only the log keeps it.
			console.error("syncProgress failed", error);

			throw new Error("Sinkronizacija nije uspjela");
		}
	});
