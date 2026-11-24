import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";

/** Signs out and leaves the account page, whose guard would otherwise bounce; local progress stays in this browser. */
export default function useSignOut() {
	const router = useRouter();

	return async function signOut() {
		const { error } = await authClient.signOut();

		if (error) {
			toast.error("Odjava nije uspjela. Pokušaj ponovno.");

			return;
		}

		if (router.state.location.pathname.startsWith("/racun")) {
			await router.navigate({ to: "/napredak" });
		}

		await router.invalidate();
	};
}
