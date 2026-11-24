import { createServerFn } from "@tanstack/react-start";
import { lookupRequestSession } from "@/features/account/server/request-session.server";
import type { IViewer } from "@/lib/auth/auth-status-context";

/** The signed-in viewer or null; only the account guard calls it, so anonymous pages never look up a session. */
export const getSession = createServerFn({ method: "GET" }).handler(
	async (): Promise<IViewer | null> => {
		const session = await lookupRequestSession();

		if (!session) {
			return null;
		}

		const { id, name, email, image } = session.user;

		return { id, name, email, image: image ?? null };
	},
);
