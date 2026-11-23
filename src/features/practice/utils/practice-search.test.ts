import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { EXAM_SUBJECT_IDS } from "@/content/voditelj-brodice/subjects";
import {
	AREA_SLUGS,
	practiceSearchSchema,
} from "@/features/practice/utils/practice-search";

describe("practiceSearchSchema", () => {
	it("lists the same areas and subjects as the course", () => {
		expect([...AREA_SLUGS].sort()).toEqual(
			course.areas.map((area) => area.slug).sort(),
		);
		expect([...EXAM_SUBJECT_IDS].sort()).toEqual(
			[...new Set(course.areas.map((area) => area.subject))].sort(),
		);
	});

	it("fills in a mixed set of 10 with instant feedback", () => {
		expect(practiceSearchSchema.parse({})).toEqual({
			mode: "mjesovito",
			length: 10,
			feedback: "instant",
		});
	});

	it("drops values it does not know instead of failing", () => {
		expect(
			practiceSearchSchema.parse({
				mode: "nepoznato",
				area: "mjesec",
				length: 15,
				level: "C",
				feedback: "kasnije",
			}),
		).toEqual({ mode: "mjesovito", length: 10, feedback: "instant" });
	});

	it("keeps a valid area set", () => {
		expect(
			practiceSearchSchema.parse({
				mode: "podrucje",
				area: "meteorologija",
				lesson: "bura-i-jugo",
				length: "sve",
				level: "A",
				feedback: "end",
			}),
		).toEqual({
			mode: "podrucje",
			area: "meteorologija",
			lesson: "bura-i-jugo",
			length: "sve",
			level: "A",
			feedback: "end",
		});
	});
});
