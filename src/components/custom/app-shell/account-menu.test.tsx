import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AccountMenu from "@/components/custom/app-shell/account-menu";
import {
	AuthStatusContext,
	type IAuthStatus,
} from "@/lib/auth/auth-status-context";
import { renderWithRouter } from "@/lib/testing/render-with-router";

vi.mock("@/lib/auth/auth-client", () => ({
	authClient: { signOut: vi.fn(), signIn: { social: vi.fn() } },
}));

function renderMenu(status: IAuthStatus) {
	return renderWithRouter(() => (
		<AuthStatusContext value={status}>
			<AccountMenu />
		</AuthStatusContext>
	));
}

describe("AccountMenu", () => {
	it("offers Google sign-in to an anonymous learner", async () => {
		await renderMenu({ googleSignIn: true, viewer: { status: "anonymous" } });

		expect(
			screen.getByRole("button", { name: "Prijava Googleom" }),
		).toBeTruthy();
	});

	it("shows no sign-in while Google is not configured", async () => {
		await renderMenu({ googleSignIn: false, viewer: { status: "anonymous" } });

		expect(screen.queryByRole("button")).toBeNull();
	});

	it("opens Napredak, Račun and Odjava for a signed-in learner", async () => {
		await renderMenu({
			googleSignIn: true,
			viewer: {
				status: "signed-in",
				user: { id: "u1", name: "Ana", email: "ana@example.com", image: null },
			},
		});

		const trigger = screen.getByRole("button", { name: "Račun: Ana" });

		fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false });

		expect(screen.getByRole("menuitem", { name: "Napredak" })).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: "Račun" })).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: "Odjava" })).toBeTruthy();
	});
});
