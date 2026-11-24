import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { authConfigQueryOptions } from "@/lib/auth/auth-config.functions";
import {
	AuthStatusContext,
	type ViewerState,
} from "@/lib/auth/auth-status-context";

interface IAuthStatusProviderProps {
	children: ReactNode;
}

function useViewerState(): ViewerState {
	const session = authClient.useSession();

	if (session.isPending) {
		return { status: "loading" };
	}

	const user = session.data?.user;

	return user
		? {
				status: "signed-in",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image ?? null,
				},
			}
		: { status: "anonymous" };
}

export default function AuthStatusProvider({
	children,
}: IAuthStatusProviderProps) {
	const config = useQuery(authConfigQueryOptions());
	const viewer = useViewerState();

	return (
		<AuthStatusContext
			value={{ googleSignIn: config.data?.googleSignIn ?? false, viewer }}
		>
			{children}
		</AuthStatusContext>
	);
}
