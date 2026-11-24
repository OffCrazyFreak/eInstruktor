import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import course from "@/content/voditelj-brodice";
import ProgressPage from "@/features/progress/components/progress-page";
import {
	AuthStatusContext,
	type IAuthStatus,
} from "@/lib/auth/auth-status-context";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

const ANONYMOUS: IAuthStatus = {
	googleSignIn: true,
	viewer: { status: "anonymous" },
};

function stored(): IProgressState {
	return JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? "{}");
}

function renderPage(
	progress: Partial<IProgressState> = {},
	status: IAuthStatus = ANONYMOUS,
) {
	return renderWithProgress(
		() => (
			<AuthStatusContext value={status}>
				<ProgressPage />
			</AuthStatusContext>
		),
		progress,
	);
}

describe("ProgressPage", () => {
	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it("shows readiness as an estimate with the rule behind it", async () => {
		await renderPage();

		expect(screen.getByText("Procjena, ne jamstvo")).toBeTruthy();
		expect(screen.getByText("Kako računamo?")).toBeTruthy();
		expect(screen.getAllByText("Premalo podataka").length).toBeGreaterThan(0);
	});

	it("tells an anonymous learner that progress stays in this browser", async () => {
		await renderPage();

		expect(
			screen.getByRole("heading", {
				name: "Napredak je samo u ovom pregledniku",
			}),
		).toBeTruthy();
		expect(
			screen.getByRole("button", { name: "Prijava Googleom" }),
		).toBeTruthy();
	});

	it("explains that sign-in is off instead of offering a broken button", async () => {
		await renderPage(
			{},
			{ googleSignIn: false, viewer: { status: "anonymous" } },
		);

		expect(
			screen.queryByRole("button", { name: "Prijava Googleom" }),
		).toBeNull();
		expect(screen.getByText(/Prijava trenutačno nije uključena/)).toBeTruthy();
	});

	it("hides the browser-only card once signed in", async () => {
		await renderPage(
			{},
			{
				googleSignIn: true,
				viewer: {
					status: "signed-in",
					user: { id: "u1", name: "Ana", email: "a@example.com", image: null },
				},
			},
		);

		expect(
			screen.queryByText("Napredak je samo u ovom pregledniku"),
		).toBeNull();
	});

	it("awards a reached badge once, stores it and celebrates it", async () => {
		await renderPage({ lessonsDone: { [course.introLessonSlug]: 1 } });

		expect(await screen.findByRole("status")).toBeTruthy();
		await waitFor(() =>
			expect(stored().badges["uvod-gotov"]).toBeTypeOf("number"),
		);
		expect(screen.getByText("1 od 8")).toBeTruthy();
	});

	it("ends the study day count when the learner says they passed", async () => {
		await renderPage({ studyDays: ["2026-11-20"] });

		expect(screen.getByText(/od zadnjih 7 dana/)).toBeTruthy();

		fireEvent.click(screen.getByRole("switch", { name: /Položio sam/ }));

		await waitFor(() =>
			expect(screen.queryByText(/od zadnjih 7 dana/)).toBeNull(),
		);
		expect(stored().passedAt).toBeTypeOf("number");
	});

	it("links the mock exam history", async () => {
		await renderPage({
			examSessions: [
				{
					id: "e1",
					level: "B",
					seed: 1,
					questionIds: ["q1", "q2"],
					startedAt: 1,
					finishedAt: 2,
					score: 2,
					passed: true,
				},
			],
		});

		expect(
			screen
				.getByRole("link", { name: "Povijest ispita" })
				.getAttribute("href"),
		).toBe("/ispit/povijest");
		expect(screen.getByText("Položeno 1 od 1")).toBeTruthy();
	});
});
