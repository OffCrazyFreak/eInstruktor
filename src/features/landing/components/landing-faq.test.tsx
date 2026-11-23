import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandingFaq from "@/features/landing/components/landing-faq";
import { faqs } from "@/features/landing/constants/landing-content";

describe("LandingFaq", () => {
	it("lists every question and opens an answer on click", () => {
		render(<LandingFaq />);

		for (const faq of faqs) {
			expect(screen.getByRole("button", { name: faq.q })).toBeTruthy();
		}

		const [first] = faqs;
		if (!first) throw new Error("the landing needs at least one FAQ");

		expect(screen.queryByText(first.a)).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: first.q }));

		expect(screen.getByText(first.a)).toBeTruthy();
	});
});
