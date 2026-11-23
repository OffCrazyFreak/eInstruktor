import { z } from "zod";
import { isProductionRuntime } from "@/lib/is-production-runtime";

const optionalString = z
	.string()
	.optional()
	.transform((value) => value || undefined);

const serverEnvSchema = z.object({
	BETTER_AUTH_URL: z
		.union([z.literal("").transform(() => undefined), z.url()])
		.optional(),
	BETTER_AUTH_SECRET: optionalString,
	GOOGLE_CLIENT_ID: optionalString,
	GOOGLE_CLIENT_SECRET: optionalString,
});

const REQUIRED_IN_PRODUCTION = [
	"BETTER_AUTH_SECRET",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
] as const;

export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Local dev may run without Google sign-in so the anonymous app works from a fresh clone; a deployed build may not.
export function parseServerEnv(
	env: Record<string, string | undefined> = process.env,
	isProduction: boolean = isProductionRuntime(),
): ServerEnv {
	const schema = isProduction
		? serverEnvSchema.superRefine((parsed, ctx) => {
				for (const key of REQUIRED_IN_PRODUCTION) {
					if (!parsed[key]) {
						ctx.addIssue({
							code: "custom",
							path: [key],
							message: `${key} is required in production`,
						});
					}
				}
			})
		: serverEnvSchema;

	return schema.parse(env);
}
