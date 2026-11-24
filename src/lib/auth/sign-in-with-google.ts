import { authClient } from "@/lib/auth/auth-client";
import { safeRedirect } from "@/lib/auth/safe-redirect";

function currentPath(): string {
	return typeof window === "undefined"
		? "/"
		: `${window.location.pathname}${window.location.search}`;
}

/** Starts the Google sign-in flow and comes back to `returnTo`, by default the page the learner is on. */
export default function signInWithGoogle(returnTo: string = currentPath()) {
	const callbackURL = safeRedirect(returnTo) ?? "/";

	void authClient.signIn.social({
		provider: "google",
		callbackURL,
		errorCallbackURL: callbackURL,
	});
}
