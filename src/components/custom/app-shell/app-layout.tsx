import { Outlet, useMatches } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import AppTopBar from "@/components/custom/app-shell/app-top-bar";
import BottomNav from "@/components/custom/app-shell/bottom-nav";
import NavRail from "@/components/custom/app-shell/nav-rail";
import ProgressProvider from "@/lib/progress/progress-provider";
import { cn } from "@/lib/utils";

interface IAppLayoutProps {
	/** Invisible workers that need the progress store, such as the account sync the route mounts. */
	background?: ReactNode;
}

/** Top bar and bottom tabs (a left rail from lg); immersive routes such as the lesson reader bring their own bars. */
export default function AppLayout({ background }: IAppLayoutProps) {
	const immersive = useMatches({
		// A 404 inside a full-screen route keeps the app bars, so the learner can find the way back.
		select: (matches) =>
			matches.some(
				(match) => match.staticData.immersive && match.status !== "notFound",
			),
	});

	return (
		<ProgressProvider>
			<div className="min-h-svh bg-background text-foreground">
				{!immersive && <AppTopBar />}
				<NavRail belowTopBar={!immersive} />

				<div
					className={cn(
						"lg:pl-24",
						!immersive &&
							"pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-12",
					)}
				>
					<Outlet />
				</div>

				{!immersive && <BottomNav />}

				<Toaster position="top-center" richColors theme="system" />
			</div>

			{background}
		</ProgressProvider>
	);
}
