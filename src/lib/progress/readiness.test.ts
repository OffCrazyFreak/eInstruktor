import { describe, expect, it } from "vitest";
import type { IAttempt } from "@/lib/progress/progress-schema";
import { readiness } from "@/lib/progress/readiness";
import { testAttempt } from "@/lib/progress/test-attempts";

const ids = (prefix: string, count: number) =>
	Array.from({ length: count }, (_, index) => `${prefix}-${index}`);

function answerAll(questionIds: string[], correctShare: number): IAttempt[] {
	const correctCount = Math.round(questionIds.length * correctShare);

	return questionIds.map((questionId, index) =>
		testAttempt({
			questionId,
			sessionId: questionId,
			correct: index < correctCount,
		}),
	);
}

describe("readiness", () => {
	const plovidba = { id: "plovidba", questionIds: ids("p", 10) };
	const radio = { id: "radio", questionIds: ids("r", 10) };

	it("says there is too little data under 10 answers", () => {
		const result = readiness([plovidba], answerAll(ids("p", 9), 1));

		expect(result.subjects[0]?.label).toBe("premalo-podataka");
		expect(result.overall).toBe("premalo-podataka");
	});

	it("needs 85 percent accuracy and 80 percent coverage for Spreman", () => {
		const ready = readiness([plovidba], answerAll(plovidba.questionIds, 0.9));
		const onTrack = readiness([plovidba], answerAll(plovidba.questionIds, 0.7));
		const starting = readiness(
			[plovidba],
			answerAll(plovidba.questionIds, 0.5),
		);

		expect(ready.overall).toBe("spreman");
		expect(onTrack.overall).toBe("na-dobrom-putu");
		expect(starting.overall).toBe("za-pocetak");
	});

	it("holds back Spreman when too few questions were seen", () => {
		const wide = { id: "siroko", questionIds: ids("p", 20) };
		const result = readiness([wide], answerAll(ids("p", 12), 1));

		expect(result.subjects[0]?.coverage).toBe(0.6);
		expect(result.overall).toBe("na-dobrom-putu");
	});

	it("takes the weakest subject as the overall answer", () => {
		const attempts = [
			...answerAll(plovidba.questionIds, 1),
			...answerAll(radio.questionIds, 0.6),
		];
		const result = readiness([plovidba, radio], attempts);

		expect(result.weakest?.id).toBe("radio");
		expect(result.overall).toBe("za-pocetak");
	});
});
