import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { parseServerEnv } from "@/lib/server-env";

const env = parseServerEnv();

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "sqlite", // Turso/libSQL je SQLite-kompatibilan
		schema,
	}),
	// Samo Google prijava (bez email/password).
	socialProviders:
		env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
			? {
					google: {
						clientId: env.GOOGLE_CLIENT_ID,
						clientSecret: env.GOOGLE_CLIENT_SECRET,
					},
				}
			: {},
	// tanstackStartCookies MORA biti zadnji plugin.
	plugins: [tanstackStartCookies()],
});
