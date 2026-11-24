import { z } from "zod";
import type { AreaSlug } from "@/content/types";
import { EXAM_SUBJECT_IDS } from "@/content/voditelj-brodice/subjects";

export const PRACTICE_MODES = [
	"podrucje",
	"mjesovito",
	"pogresni",
	"slabo",
	"oznaceno",
	"ponavljanje",
] as const;

export type PracticeMode = (typeof PRACTICE_MODES)[number];

// Listed here instead of read from the course, so route validation does not pull every question into the main bundle; a test keeps them in step.
export const AREA_SLUGS = [
	"karte-navigacija",
	"plovne-oznake",
	"svjetla-znakovi",
	"izbjegavanje-sudara",
	"meteorologija",
	"pomorstvo-manevriranje",
	"sigurnost-prva-pomoc",
	"propisi",
	"motoristika",
	"vhf-radio",
] as const satisfies readonly AreaSlug[];

export const SESSION_LENGTHS = [10, 20, "sve"] as const;

export type SessionLength = (typeof SESSION_LENGTHS)[number];

export const practiceSearchSchema = z.object({
	mode: z.enum(PRACTICE_MODES).default("mjesovito").catch("mjesovito"),
	area: z.enum(AREA_SLUGS).optional().catch(undefined),
	lesson: z.string().max(120).optional().catch(undefined),
	subject: z.enum(EXAM_SUBJECT_IDS).optional().catch(undefined),
	length: z
		.union([z.literal(10), z.literal(20), z.literal("sve")])
		.default(10)
		.catch(10),
	/** A B learner may narrow practice to A; an A learner is always kept to A. */
	level: z.enum(["A", "B"]).optional().catch(undefined),
	/** "end" holds back right and wrong until the set is over, like the exam. */
	feedback: z.enum(["instant", "end"]).default("instant").catch("instant"),
});

export type IPracticeSearch = z.output<typeof practiceSearchSchema>;
