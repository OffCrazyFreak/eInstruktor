import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { sessionSummary } from "@/features/practice/utils/session-summary";

const [meteo1, meteo2] = course.questions.filter(
	(question) => question.area === "meteorologija",
);
const [radio] = course.questions.filter(
	(question) => question.area === "vhf-radio",
);

describe("sessionSummary", () => {
	it("scores the set and splits it by area in the order areas came up", () => {
		if (!meteo1 || !meteo2 || !radio) {
			throw new Error("The course needs these questions");
		}

		const summary = sessionSummary(
			[
				{ questionId: radio.id, selected: ["a"], correct: false },
				{ questionId: meteo1.id, selected: ["a"], correct: true },
				{ questionId: meteo2.id, selected: ["b"], correct: true },
			],
			[meteo1, meteo2, radio],
		);

		expect(summary).toEqual({
			correct: 2,
			total: 3,
			byArea: [
				{ area: "vhf-radio", correct: 0, total: 1 },
				{ area: "meteorologija", correct: 2, total: 2 },
			],
			wrongIds: [radio.id],
		});
	});
});
