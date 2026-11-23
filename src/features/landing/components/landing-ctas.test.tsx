import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LandingCtas from "@/features/landing/components/landing-ctas";
import { LOCAL_PROGRESS_KEY } from "@/features/landing/hooks/use-has-local-progress";

describe("LandingCtas", () => {
	afterEach(() => {
		window.localStorage.clear();
	});

	it("sends a first-time visitor to Lekcija 0", () => {
		render(<LandingCtas />);

		const start = screen.getByRole("link", { name: "Počni besplatno" });

		expect(start.getAttribute("href")).toBe("/ucenje/propisi/kako-do-dozvole");
	});

	it("sends a returning learner to the app home", () => {
		window.localStorage.setItem(LOCAL_PROGRESS_KEY, "{}");

		render(<LandingCtas />);

		const resume = screen.getByRole("link", { name: "Nastavi" });

		expect(resume.getAttribute("href")).toBe("/pocetna");
	});
});
