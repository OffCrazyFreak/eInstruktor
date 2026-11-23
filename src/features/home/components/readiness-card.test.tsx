import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReadinessCard from "@/features/home/components/readiness-card";
import type { IReadiness, ISubjectReadiness } from "@/lib/progress/readiness";
import { renderWithRouter } from "@/lib/testing/render-with-router";

function subject(id: string, accuracy: number): ISubjectReadiness {
	return { id, answered: 20, accuracy, coverage: 0.5, label: "za-pocetak" };
}

function practiceLink() {
	return screen.queryByRole("link", { name: "Vježbaj najslabije" });
}

describe("ReadinessCard", () => {
	it("starts the weakest exam subject", async () => {
		const weakest = subject("radiotelefonija", 0.4);
		const readiness: IReadiness = {
			subjects: [subject("motoristika", 0.8), weakest],
			weakest,
			overall: "za-pocetak",
		};

		await renderWithRouter(() => <ReadinessCard readiness={readiness} />);

		expect(practiceLink()?.getAttribute("href")).toBe(
			"/vjezba/serija?mode=mjesovito&subject=radiotelefonija&length=10",
		);
	});

	it("starts a mixed set for category A, which is one subject", async () => {
		const weakest = subject("osnove-plovidbe", 0.5);

		await renderWithRouter(() => (
			<ReadinessCard
				readiness={{ subjects: [weakest], weakest, overall: "za-pocetak" }}
			/>
		));

		expect(practiceLink()?.getAttribute("href")).toBe(
			"/vjezba/serija?mode=mjesovito&length=10",
		);
	});

	it("hides the button until a subject has enough answers", async () => {
		await renderWithRouter(() => (
			<ReadinessCard
				readiness={{ subjects: [], weakest: null, overall: "premalo-podataka" }}
			/>
		));

		expect(practiceLink()).toBeNull();
	});
});
