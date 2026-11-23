import { defineConfig } from "vitest/config";

// Kept apart from vite.config.ts so tests load without the Netlify, Start and devtools plugins.
export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: "unit",
					environment: "node",
					include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
				},
			},
			{
				extends: true,
				test: {
					name: "dom",
					environment: "jsdom",
					include: ["src/**/*.test.tsx"],
					setupFiles: ["./vitest.setup.ts"],
				},
			},
		],
	},
});
