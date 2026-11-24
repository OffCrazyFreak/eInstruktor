import { redirect } from "@tanstack/react-router";
import type { IViewer } from "@/lib/auth/auth-status-context";

/** The account route guard: a visitor without a session goes to Napredak, which explains sign-in. Only UX; the server functions check again. */
export async function requireViewer(
	loadViewer: () => Promise<IViewer | null>,
): Promise<{ viewer: IViewer }> {
	const viewer = await loadViewer();

	if (!viewer) {
		throw redirect({ to: "/napredak" });
	}

	return { viewer };
}
