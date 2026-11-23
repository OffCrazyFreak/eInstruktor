import { describe, expect, it } from "vitest";
import { resolveDbConfig } from "@/db/config";

const TURSO_ENV = {
	TURSO_DATABASE_URL: "libsql://example.turso.io",
	TURSO_AUTH_TOKEN: "token",
};

describe("resolveDbConfig in development", () => {
	it("uses the local file when DB_MODE is unset, even with Turso credentials present", () => {
		expect(resolveDbConfig(TURSO_ENV, false)).toEqual({ url: "file:local.db" });
	});

	it("uses the local file for an empty DB_MODE", () => {
		expect(resolveDbConfig({ ...TURSO_ENV, DB_MODE: "" }, false)).toEqual({
			url: "file:local.db",
		});
	});

	it("uses Turso only for DB_MODE=turso", () => {
		expect(resolveDbConfig({ ...TURSO_ENV, DB_MODE: "turso" }, false)).toEqual({
			url: "libsql://example.turso.io",
			authToken: "token",
		});
	});

	it("fails when DB_MODE=turso has no credentials", () => {
		expect(() => resolveDbConfig({ DB_MODE: "turso" }, false)).toThrow(
			"DB_MODE=turso needs TURSO_DATABASE_URL",
		);
	});

	it("rejects an unknown DB_MODE instead of silently picking a database", () => {
		expect(() => resolveDbConfig({ DB_MODE: "production" }, false)).toThrow();
	});
});

describe("resolveDbConfig in production", () => {
	it("refuses to start without DB_MODE instead of falling back to the local file", () => {
		expect(() => resolveDbConfig(TURSO_ENV, true)).toThrow(
			"Production needs DB_MODE=turso",
		);
	});

	it("uses Turso with DB_MODE=turso", () => {
		expect(resolveDbConfig({ ...TURSO_ENV, DB_MODE: "turso" }, true)).toEqual({
			url: "libsql://example.turso.io",
			authToken: "token",
		});
	});

	it("allows the local file only when DB_MODE=local is set on purpose", () => {
		expect(resolveDbConfig({ DB_MODE: "local" }, true)).toEqual({
			url: "file:local.db",
		});
	});
});
