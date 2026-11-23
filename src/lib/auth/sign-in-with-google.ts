import { authClient } from "@/lib/auth/auth-client";

/** Starts the Google sign-in flow and returns to the home page when done. */
export default function signInWithGoogle() {
	void authClient.signIn.social({ provider: "google", callbackURL: "/" });
}
