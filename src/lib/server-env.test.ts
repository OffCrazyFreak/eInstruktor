import { describe, expect, it } from "vitest";
import { parseServerEnv } from "@/lib/server-env";

const COMPLETE_ENV = {
	BETTER_AUTH_URL: "https://example.com",
	BETTER_AUTH_SECRET: "secret",
	GOOGLE_CLIENT_ID: "id",
	GOOGLE_CLIENT_SECRET: "client-secret",
};

describe("parseServerEnv", () => {
	it("lets local dev run without Google credentials", () => {
		expect(parseServerEnv({ GOOGLE_CLIENT_ID: "" }, false)).toEqual({
			BETTER_AUTH_URL: undefined,
			BETTER_AUTH_SECRET: undefined,
			GOOGLE_CLIENT_ID: undefined,
			GOOGLE_CLIENT_SECRET: undefined,
		});
	});

	it("requires the secret and Google credentials in production", () => {
		expect(() =>
			parseServerEnv({ ...COMPLETE_ENV, GOOGLE_CLIENT_SECRET: "" }, true),
		).toThrow("GOOGLE_CLIENT_SECRET is required in production");
	});

	it("requires the base URL in production, so the Google redirect never follows the request host", () => {
		expect(() =>
			parseServerEnv({ ...COMPLETE_ENV, BETTER_AUTH_URL: "" }, true),
		).toThrow("BETTER_AUTH_URL is required in production");
	});

	it("accepts a complete production env", () => {
		expect(parseServerEnv(COMPLETE_ENV, true)).toEqual(COMPLETE_ENV);
	});

	it("rejects a BETTER_AUTH_URL that is not a URL", () => {
		expect(() =>
			parseServerEnv({ BETTER_AUTH_URL: "localhost" }, false),
		).toThrow();
	});
});
