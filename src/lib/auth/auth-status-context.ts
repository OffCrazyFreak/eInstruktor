import { createContext } from "react";

export interface IViewer {
	id: string;
	name: string;
	email: string;
	image: string | null;
}

export type ViewerState =
	| { status: "loading" }
	| { status: "anonymous" }
	| { status: "signed-in"; user: IViewer };

export interface IAuthStatus {
	/** Whether Google sign-in is configured on this server. */
	googleSignIn: boolean;
	viewer: ViewerState;
}

// Without a provider (component tests) the app is anonymous with sign-in off; tests that need a viewer pass their own value.
export const AuthStatusContext = createContext<IAuthStatus>({
	googleSignIn: false,
	viewer: { status: "anonymous" },
});
