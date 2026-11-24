import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { parseServerEnv } from "@/lib/server-env";

export interface IAuthConfig {
	/** False in local development without Google credentials, where sign-in is off. */
	googleSignIn: boolean;
}

// Reads only the server environment, never the session, so anonymous pages stay free of session lookups.
export const getAuthConfig = createServerFn({ method: "GET" }).handler(
	(): IAuthConfig => {
		const env = parseServerEnv();

		return {
			googleSignIn: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
		};
	},
);

export function authConfigQueryOptions() {
	return queryOptions({
		queryKey: ["auth-config"],
		queryFn: () => getAuthConfig(),
		staleTime: Number.POSITIVE_INFINITY,
	});
}
