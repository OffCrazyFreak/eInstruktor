import { useContext } from "react";
import {
	AuthStatusContext,
	type IAuthStatus,
} from "@/lib/auth/auth-status-context";

export default function useAuthStatus(): IAuthStatus {
	return useContext(AuthStatusContext);
}

// While the session is still loading the visitor is most likely anonymous, so the button stays and the page does not jump.
export function canOfferSignIn({ googleSignIn, viewer }: IAuthStatus): boolean {
	return googleSignIn && viewer.status !== "signed-in";
}
