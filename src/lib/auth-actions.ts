import { authClient } from "@/lib/auth-client";

/** Starts the Google sign-in flow and returns to the home page when done. */
export function signInWithGoogle() {
	void authClient.signIn.social({ provider: "google", callbackURL: "/" });
}
