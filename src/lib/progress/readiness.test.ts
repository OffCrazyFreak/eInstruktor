import { describe, expect, it } from "vitest";
import type { IAttempt } from "@/lib/progress/progress-schema";
import { readiness } from "@/lib/progress/readiness";
import { testAttempt } from "@/lib/testing/test-attempts";

function ids(prefix: string, count: number) {
	return Array.from({ length: count }, (_, index) => `${prefix}-${index}`);
}

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

	it("puts the thresholds on the ready side at exactly 85, 80 and 70 percent", () => {
		const twenty = { id: "dvadeset", questionIds: ids("p", 20) };
		const atReady = answerAll(ids("p", 20), 0.85);
		const atCoverage = answerAll(ids("p", 16), 1).concat(
			answerAll(["p-16", "p-17", "p-18", "p-19"], 0),
		);

		expect(readiness([twenty], atReady).overall).toBe("spreman");
		expect(readiness([twenty], answerAll(ids("p", 20), 0.8)).overall).toBe(
			"na-dobrom-putu",
		);
		expect(
			readiness([plovidba], answerAll(plovidba.questionIds, 0.7)).overall,
		).toBe("na-dobrom-putu");
		expect(
			readiness([plovidba], answerAll(plovidba.questionIds, 0.6)).overall,
		).toBe("za-pocetak");
		expect(readiness([twenty], atCoverage).subjects[0]?.label).toBe(
			"na-dobrom-putu",
		);

		const sixteenOfTwenty = answerAll(ids("p", 16), 1);

		expect(readiness([twenty], sixteenOfTwenty).subjects[0]).toMatchObject({
			coverage: 0.8,
			label: "spreman",
		});
	});

	it("measures a subject from exactly 10 answers", () => {
		expect(readiness([plovidba], answerAll(ids("p", 10), 1)).overall).toBe(
			"spreman",
		);
		expect(readiness([plovidba], answerAll(ids("p", 9), 1)).overall).toBe(
			"premalo-podataka",
		);
	});

	it("never lets an unmeasured subject hide a measured failing one", () => {
		const result = readiness(
			[plovidba, radio],
			answerAll(plovidba.questionIds, 0.5),
		);

		expect(result.subjects[1]?.label).toBe("premalo-podataka");
		expect(result.weakest?.id).toBe("plovidba");
		expect(result.overall).toBe("za-pocetak");
	});

	it("says there is too little data while no subject is measured", () => {
		const result = readiness([plovidba, radio], answerAll(ids("r", 3), 0));

		expect(result.weakest).toBeNull();
		expect(result.overall).toBe("premalo-podataka");
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
