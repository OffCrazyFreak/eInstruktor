import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
	requireUser,
	UnauthorizedError,
} from "@/features/account/server/require-user";

const SERVER_FOLDER = join(process.cwd(), "src/features/account/server");

// The guard reads the session and returns null for a visitor, so it is the one function allowed to run without one.
const PUBLIC_FUNCTIONS = new Set(["getSession"]);

describe("requireUser", () => {
	it("returns the signed-in user", async () => {
		const user = { id: "u1", name: "Ana", email: "ana@example.com" };

		await expect(requireUser(async () => ({ user }))).resolves.toEqual(user);
	});

	it("refuses a visitor without a session", async () => {
		await expect(requireUser(async () => null)).rejects.toBeInstanceOf(
			UnauthorizedError,
		);
	});
});

describe("account server functions", () => {
	const files = readdirSync(SERVER_FOLDER).filter((file) =>
		file.endsWith(".functions.ts"),
	);

	it.each(files)("%s checks the session in every function", (file) => {
		const source = readFileSync(join(SERVER_FOLDER, file), "utf8");
		const functions = source.split(/export const (\w+) = createServerFn/);

		for (let index = 1; index < functions.length; index += 2) {
			const name = functions[index] ?? "";
			const body = functions[index + 1] ?? "";

			if (!PUBLIC_FUNCTIONS.has(name)) {
				expect(body, name).toContain("requireUser(lookupRequestSession)");
			}
		}
	});
});
