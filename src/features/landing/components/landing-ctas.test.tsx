import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import LandingCtas from "@/features/landing/components/landing-ctas";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";

describe("LandingCtas", () => {
	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it("sends a first-time visitor to Lekcija 0", () => {
		render(<LandingCtas />);

		const start = screen.getByRole("link", { name: "Počni besplatno" });

		expect(start.getAttribute("href")).toBe("/ucenje/propisi/kako-do-dozvole");
	});

	it("sends a returning learner to the app home", () => {
		window.localStorage.setItem(PROGRESS_STORAGE_KEY, "{}");

		render(<LandingCtas />);

		const resume = screen.getByRole("link", { name: "Nastavi" });

		expect(resume.getAttribute("href")).toBe("/pocetna");
	});

	it("renders the start button on the server even when progress exists", () => {
		window.localStorage.setItem(PROGRESS_STORAGE_KEY, "{}");

		const html = renderToString(<LandingCtas />);

		expect(html).toContain("Počni besplatno");
		expect(html).not.toContain("Nastavi");
	});

	it("falls back to the start button when storage cannot be read", () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("blocked");
		});

		render(<LandingCtas />);

		expect(screen.getByRole("link", { name: "Počni besplatno" })).toBeTruthy();
	});
});
