import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { db } from "@/db";
import { deleteAccountData } from "@/features/account/server/delete-account.server";
import { lookupRequestSession } from "@/features/account/server/request-session.server";
import { requireUser } from "@/features/account/server/require-user";
import { auth } from "@/lib/auth/auth";

// The client must say so explicitly, so a stray or replayed empty call can never delete an account.
const deleteAccountSchema = z.object({ confirm: z.literal(true) });

export const deleteAccount = createServerFn({ method: "POST" })
	.validator(deleteAccountSchema)
	.handler(async () => {
		const user = await requireUser(lookupRequestSession);

		// Signing out first lets better-auth clear the session cookie on this response; the batch then removes every other session.
		await auth.api.signOut({ headers: getRequestHeaders() });
		await deleteAccountData(db, user.id);

		return { deleted: true };
	});
