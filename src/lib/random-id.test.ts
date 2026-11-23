import { afterEach, describe, expect, it, vi } from "vitest";
import randomId from "@/lib/random-id";

const UUID_V4 =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("randomId", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("uses crypto.randomUUID when the origin allows it", () => {
		expect(randomId()).toMatch(UUID_V4);
	});

	it("builds a version 4 id without randomUUID", () => {
		vi.stubGlobal("crypto", {
			getRandomValues: (bytes: Uint8Array) => bytes.fill(255),
		});

		expect(randomId()).toMatch(UUID_V4);
	});

	it("still builds an id without any crypto", () => {
		vi.stubGlobal("crypto", undefined);

		const first = randomId();

		expect(first).toMatch(UUID_V4);
		expect(randomId()).not.toBe(first);
	});
});
