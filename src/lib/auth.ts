import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db";
import * as schema from "#/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // Turso/libSQL je SQLite-kompatibilan
		schema,
	}),
	// Samo Google prijava (bez email/password).
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	// tanstackStartCookies MORA biti zadnji plugin.
	plugins: [tanstackStartCookies()],
});
