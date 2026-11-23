import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LandingCtas from "@/features/landing/components/landing-ctas";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import {
	renderToStringWithRouter,
	renderWithRouter,
} from "@/lib/testing/render-with-router";

describe("LandingCtas", () => {
	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it("sends a first-time visitor to Lekcija 0", async () => {
		await renderWithRouter(() => <LandingCtas />);

		const start = screen.getByRole("link", { name: "Počni besplatno" });

		expect(start.getAttribute("href")).toBe("/ucenje/propisi/kako-do-dozvole");
	});

	it("sends a returning learner to the app home", async () => {
		window.localStorage.setItem(PROGRESS_STORAGE_KEY, "{}");

		await renderWithRouter(() => <LandingCtas />);

		const resume = screen.getByRole("link", { name: "Nastavi" });

		expect(resume.getAttribute("href")).toBe("/pocetna");
	});

	it("renders the start button on the server even when progress exists", async () => {
		window.localStorage.setItem(PROGRESS_STORAGE_KEY, "{}");

		const html = await renderToStringWithRouter(() => <LandingCtas />);

		expect(html).toContain("Počni besplatno");
		expect(html).not.toContain("Nastavi");
	});

	it("falls back to the start button when storage cannot be read", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("blocked");
		});

		await renderWithRouter(() => <LandingCtas />);

		expect(screen.getByRole("link", { name: "Počni besplatno" })).toBeTruthy();
	});
});
