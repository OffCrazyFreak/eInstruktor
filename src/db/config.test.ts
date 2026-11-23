import { describe, expect, it } from "vitest";
import { resolveDbConfig } from "@/db/config";

const TURSO_ENV = {
	TURSO_DATABASE_URL: "libsql://example.turso.io",
	TURSO_AUTH_TOKEN: "token",
};

describe("resolveDbConfig", () => {
	it("uses the local file when DB_MODE is unset, even with Turso credentials present", () => {
		expect(resolveDbConfig(TURSO_ENV)).toEqual({ url: "file:local.db" });
	});

	it("uses the local file for an empty DB_MODE", () => {
		expect(resolveDbConfig({ ...TURSO_ENV, DB_MODE: "" })).toEqual({
			url: "file:local.db",
		});
	});

	it("uses Turso only for DB_MODE=turso", () => {
		expect(resolveDbConfig({ ...TURSO_ENV, DB_MODE: "turso" })).toEqual({
			url: "libsql://example.turso.io",
			authToken: "token",
		});
	});

	it("fails when DB_MODE=turso has no credentials", () => {
		expect(() => resolveDbConfig({ DB_MODE: "turso" })).toThrow(
			"DB_MODE=turso needs TURSO_DATABASE_URL",
		);
	});

	it("rejects an unknown DB_MODE instead of silently picking a database", () => {
		expect(() => resolveDbConfig({ DB_MODE: "production" })).toThrow();
	});
});
