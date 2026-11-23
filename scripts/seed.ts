import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import course from "@/content/voditelj-brodice";
import { resolveDbConfig } from "@/db/config";
import * as schema from "@/db/schema";
import { seedDemoUser } from "./seed-demo";

async function main(): Promise<void> {
	const config = resolveDbConfig();

	// The seed writes demo rows, so it must never reach the Turso production database.
	if (!config.url.startsWith("file:")) {
		throw new Error(
			`db:seed only runs against a local file, got ${config.url}. Unset DB_MODE or set DB_MODE=local.`,
		);
	}

	const client = createClient(config);
	const db = drizzle({ client, schema });

	await migrate(db, { migrationsFolder: "drizzle" });

	console.log(`Migrations applied to ${config.url}.`);

	console.log(
		`Course "${course.slug}": ${course.areas.length} areas, ${course.lessons.length} lessons, ${course.questions.length} questions, ${course.studyCards.length} study cards (read from code, not stored).`,
	);

	if (process.argv.includes("--demo")) {
		await seedDemoUser(db);
	}

	client.close();
}

await main();
