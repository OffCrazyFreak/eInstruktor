import { describe, expect, it } from "vitest";
import {
	distractors,
	QUIZ_BEARINGS,
	QUIZ_VESSELS,
} from "@/components/custom/visuals/ship-lights-viewer/lights-quiz-pool";
import { lightSignature } from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";

describe("lightSignature", () => {
	it("cannot tell a long power vessel from a tug seen dead ahead", () => {
		expect(lightSignature("power-over-50m", 0)).toBe(
			lightSignature("towing", 0),
		);
	});

	it("tells them apart from the beam, where the masthead lights separate", () => {
		expect(lightSignature("power-over-50m", 90)).not.toBe(
			lightSignature("towing", 90),
		);
	});
});

describe("distractors", () => {
	it("never offers a vessel that looks the same as the answer", () => {
		for (const vessel of QUIZ_VESSELS) {
			for (const bearing of QUIZ_BEARINGS) {
				const answer = lightSignature(vessel, bearing);

				for (const other of distractors(vessel, bearing)) {
					expect(lightSignature(other, bearing)).not.toBe(answer);
				}
			}
		}
	});

	it("leaves out the tug when the answer is a long power vessel seen ahead", () => {
		expect(distractors("power-over-50m", 0)).not.toContain("towing");
	});

	it("always has three wrong answers to offer", () => {
		for (const vessel of QUIZ_VESSELS) {
			for (const bearing of QUIZ_BEARINGS) {
				expect(distractors(vessel, bearing).length).toBeGreaterThanOrEqual(3);
			}
		}
	});
});
