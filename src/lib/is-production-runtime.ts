// Vite replaces import.meta.env in the app build; plain Node (drizzle-kit, scripts) has no import.meta.env, so fall back to NODE_ENV.
export function isProductionRuntime(): boolean {
	return import.meta.env?.PROD ?? process.env.NODE_ENV === "production";
}
