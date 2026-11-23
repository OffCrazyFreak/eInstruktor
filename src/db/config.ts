import { z } from "zod";

const LOCAL_DB_URL = "file:local.db";

const dbModeSchema = z.enum(["local", "turso"]).default("local");

const tursoEnvSchema = z.object({
	TURSO_DATABASE_URL: z
		.string({ error: "DB_MODE=turso needs TURSO_DATABASE_URL" })
		.min(1, { error: "DB_MODE=turso needs TURSO_DATABASE_URL" }),

	TURSO_AUTH_TOKEN: z
		.string({ error: "DB_MODE=turso needs TURSO_AUTH_TOKEN" })
		.min(1, { error: "DB_MODE=turso needs TURSO_AUTH_TOKEN" }),
});

export interface IDbConfig {
	url: string;
	authToken?: string;
}

type DbEnv = Record<string, string | undefined>;

// Turso only on an explicit DB_MODE=turso, so a .env.local that holds Turso credentials never points dev at production.
export function resolveDbConfig(env: DbEnv = process.env): IDbConfig {
	const mode = dbModeSchema.parse(env.DB_MODE || undefined);

	if (mode === "local") {
		return { url: LOCAL_DB_URL };
	}

	const turso = tursoEnvSchema.parse(env);

	return { url: turso.TURSO_DATABASE_URL, authToken: turso.TURSO_AUTH_TOKEN };
}
