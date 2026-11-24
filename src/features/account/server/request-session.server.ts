import { getRequestHeaders } from "@tanstack/react-start/server";
import type { SessionLookup } from "@/features/account/server/require-user";
import { auth } from "@/lib/auth/auth";

// Read per request inside the handler, never at module scope, so one visitor's session never leaks into another's.
export const lookupRequestSession: SessionLookup = () =>
	auth.api.getSession({ headers: getRequestHeaders() });
