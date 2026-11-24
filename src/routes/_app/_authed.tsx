import { createFileRoute } from "@tanstack/react-router";
import { getSession } from "@/features/account/server/session.functions";
import { requireViewer } from "@/features/account/utils/require-viewer";

// Only routes under this layout look up the session on the server; every other page stays anonymous-first.
export const Route = createFileRoute("/_app/_authed")({
	beforeLoad: () => requireViewer(() => getSession()),
});
