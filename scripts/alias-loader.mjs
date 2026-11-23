import { existsSync, statSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

// Node strips TypeScript types itself but knows neither the tsconfig "@/" alias nor extensionless imports, which src/ uses everywhere.

const SRC_URL = new URL("../src/", import.meta.url);

const CANDIDATE_SUFFIXES = ["", ".ts", "/index.ts"];

function findTypeScriptFile(baseUrl) {
	for (const suffix of CANDIDATE_SUFFIXES) {
		const candidate = new URL(baseUrl.href + suffix);
		const path = fileURLToPath(candidate);

		if (existsSync(path) && statSync(path).isFile()) {
			return candidate.href;
		}
	}

	return undefined;
}

function isFromTypeScript(parentUrl) {
	return parentUrl?.startsWith("file:") && parentUrl.endsWith(".ts");
}

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier.startsWith("@/")) {
			const url = findTypeScriptFile(new URL(specifier.slice(2), SRC_URL));

			if (url) {
				return { url, shortCircuit: true };
			}
		}

		if (specifier.startsWith(".") && isFromTypeScript(context.parentURL)) {
			const url = findTypeScriptFile(new URL(specifier, context.parentURL));

			if (url) {
				return { url, shortCircuit: true };
			}
		}

		return nextResolve(specifier, context);
	},
});
