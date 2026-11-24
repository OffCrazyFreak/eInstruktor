import { describe, expect, it } from "vitest";
import { safeRedirect } from "@/lib/auth/safe-redirect";

describe("safeRedirect", () => {
	it("keeps a path on this site with its search", () => {
		expect(safeRedirect("/vjezba/serija?mode=pogresni")).toBe(
			"/vjezba/serija?mode=pogresni",
		);
	});

	it.each([
		["an empty value", ""],
		["a missing value", undefined],
		["a full url", "https://example.com/"],
		["a protocol-relative url", "//example.com"],
		["a backslash trick", "/\\example.com"],
		["a control character", "/ok\n//evil"],
		["a relative path", "napredak"],
	])("rejects %s", (_name, path) => {
		expect(safeRedirect(path)).toBeNull();
	});
});
