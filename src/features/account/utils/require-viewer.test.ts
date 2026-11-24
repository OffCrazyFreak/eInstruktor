import { isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { requireViewer } from "@/features/account/utils/require-viewer";

describe("requireViewer", () => {
	it("passes the signed-in viewer to the account page", async () => {
		const viewer = {
			id: "u1",
			name: "Ana",
			email: "ana@example.com",
			image: null,
		};

		await expect(requireViewer(async () => viewer)).resolves.toEqual({
			viewer,
		});
	});

	it("sends a visitor without a session to Napredak", async () => {
		const outcome = await requireViewer(async () => null).catch(
			(error: unknown) => error,
		);

		expect(isRedirect(outcome)).toBe(true);
		expect((outcome as Response & { options: { to: string } }).options.to).toBe(
			"/napredak",
		);
	});
});
