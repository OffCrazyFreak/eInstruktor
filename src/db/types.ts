import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type * as schema from "@/db/schema";

/** The app database type, importable without opening a connection, so services can take a test database. */
export type AppDatabase = LibSQLDatabase<typeof schema>;
