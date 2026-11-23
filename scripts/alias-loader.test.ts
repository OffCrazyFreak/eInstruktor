import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const PROBE = `
import { parseServerEnv } from "@/lib/server-env";
console.log(JSON.stringify(parseServerEnv({ GOOGLE_CLIENT_ID: "id" })));
`;

describe("alias-loader", () => {
	it("runs src modules that read the runtime mode under plain Node", () => {
		const output = execFileSync(
			process.execPath,
			[
				"--no-warnings",
				"--import",
				"./scripts/alias-loader.mjs",
				"--input-type=module",
				"--eval",
				PROBE,
			],
			{ encoding: "utf8", env: { ...process.env, NODE_ENV: "development" } },
		);

		expect(JSON.parse(output)).toMatchObject({ GOOGLE_CLIENT_ID: "id" });
	});
});
