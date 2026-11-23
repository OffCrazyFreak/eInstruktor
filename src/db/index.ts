import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { resolveDbConfig } from "@/db/config";
import * as schema from "@/db/schema";

const client = createClient(resolveDbConfig());

export const db = drizzle({ client, schema });
