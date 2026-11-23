import { Outlet, useMatches } from "@tanstack/react-router";
import AppTopBar from "@/components/custom/app-shell/app-top-bar";
import BottomNav from "@/components/custom/app-shell/bottom-nav";
import NavRail from "@/components/custom/app-shell/nav-rail";
import ProgressProvider from "@/lib/progress/progress-provider";
import { cn } from "@/lib/utils";

/** Top bar and bottom tabs (a left rail from lg); immersive routes such as the lesson reader bring their own bars. */
export default function AppLayout() {
	const immersive = useMatches({
		select: (matches) => matches.some((match) => match.staticData.immersive),
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
			</div>
		</ProgressProvider>
	);
}
