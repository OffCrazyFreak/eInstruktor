import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "@/db/schema";
import type { AppDatabase } from "@/db/types";

export interface ITempDatabase {
	db: AppDatabase;
	cleanup: () => void;
}

// A file rather than ":memory:", because libSQL opens a fresh connection for a batch and an in-memory database would be empty there.
export async function createTempDatabase(): Promise<ITempDatabase> {
	const folder = mkdtempSync(join(tmpdir(), "einstruktor-test-"));
	const client = createClient({ url: `file:${join(folder, "test.db")}` });
	const db = drizzle({ client, schema });

	await migrate(db, { migrationsFolder: "drizzle" });

	return {
		db,
		cleanup() {
			client.close();
			rmSync(folder, { recursive: true, force: true });
		},
	};
}

export async function insertTestUser(
	db: AppDatabase,
	id: string,
	email = `${id}@example.com`,
): Promise<void> {
	await db.insert(schema.user).values({
		id,
		name: `Učenik ${id}`,
		email,
		image: `https://example.com/${id}.png`,
	});
}
