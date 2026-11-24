import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { lookupRequestSession } from "@/features/account/server/request-session.server";
import { requireUser } from "@/features/account/server/require-user";
import { syncProgressForUser } from "@/features/account/server/sync-progress.server";
import { syncRequestSchema } from "@/features/account/utils/sync-schema";

export const syncProgress = createServerFn({ method: "POST" })
	.inputValidator(syncRequestSchema)
	.handler(async ({ data }) => {
		const user = await requireUser(lookupRequestSession);

		return syncProgressForUser(db, user.id, data);
	});
