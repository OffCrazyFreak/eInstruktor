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

		// Data goes first: if the batch fails the session still works and the learner can retry; the batch also removes every session.
		try {
			await deleteAccountData(db, user.id);
		} catch (error) {
			console.error("deleteAccount failed", error);

			throw new Error("Brisanje nije uspjelo");
		}

		// The session row is already gone, so this only clears the cookie and must not turn a finished deletion into an error.
		try {
			await auth.api.signOut({ headers: getRequestHeaders() });
		} catch {
			// The cookie then expires on its own and no longer matches a session.
		}

		return { deleted: true };
	});
