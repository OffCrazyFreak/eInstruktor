import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginNudgeSlot from "@/components/custom/login-nudge/login-nudge-slot";
import {
	dismissalKey,
	type LoginNudgeTrigger,
} from "@/components/custom/login-nudge/nudge-rules";
import {
	markNudgeDue,
	resetNudgeSession,
} from "@/components/custom/login-nudge/nudge-session";
import {
	AuthStatusContext,
	type IAuthStatus,
} from "@/lib/auth/auth-status-context";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

vi.mock("@/lib/auth/auth-client", () => ({
	authClient: { signIn: { social: vi.fn() } },
}));

const ANONYMOUS: IAuthStatus = {
	googleSignIn: true,
	viewer: { status: "anonymous" },
};

async function renderSlot(
	trigger: LoginNudgeTrigger = "practice-set",
	status: IAuthStatus = ANONYMOUS,
	progress: Partial<IProgressState> = {},
) {
	const view = await renderWithProgress(
		() => (
			<AuthStatusContext value={status}>
				<LoginNudgeSlot trigger={trigger} />
			</AuthStatusContext>
		),
		progress,
	);

	await act(async () => {
		await vi.advanceTimersByTimeAsync(1000);
	});

	return view;
}

function sheet() {
	return screen.queryByRole("dialog", { name: /Spremi/ });
}

describe("LoginNudgeSlot", () => {
	beforeEach(() => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		resetNudgeSession();
	});

	afterEach(() => {
		vi.useRealTimers();
		window.localStorage.clear();
	});

	it("offers sign-in after a finished practice set, promising only what is built", async () => {
		await renderSlot();

		const dialog = sheet();

		expect(dialog?.textContent).toContain("prenosi ga na drugi uređaj");
		expect(
			screen.getByRole("button", { name: "Prijava Googleom" }),
		).toBeTruthy();
	});

	it("opens at most once per session", async () => {
		const first = await renderSlot();

		fireEvent.click(screen.getByRole("button", { name: "Ne sada" }));
		first.unmount();

		await renderSlot("exam-result");

		expect(sheet()).toBeNull();
	});

	it("remembers the dismissal for that trigger", async () => {
		await renderSlot();

		fireEvent.click(screen.getByRole("button", { name: "Ne sada" }));

		const stored = JSON.parse(
			window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? "{}",
		);

		expect(stored.dismissedNudges[dismissalKey("practice-set")]).toBeTypeOf(
			"number",
		);
	});

	it("stays away from signed-in learners and when Google is off", async () => {
		await renderSlot("practice-set", {
			googleSignIn: true,
			viewer: {
				status: "signed-in",
				user: { id: "u1", name: "Ana", email: "a@example.com", image: null },
			},
		});
		expect(sheet()).toBeNull();

		await renderSlot("practice-set", {
			googleSignIn: false,
			viewer: { status: "anonymous" },
		});
		expect(sheet()).toBeNull();
	});

	it("opens for a lesson only right after one was finished", async () => {
		const opened = await renderSlot("lesson");

		expect(sheet()).toBeNull();
		opened.unmount();

		markNudgeDue("lesson");
		await renderSlot("lesson");

		expect(sheet()).not.toBeNull();
	});
});
