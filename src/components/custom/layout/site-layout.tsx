import { Outlet, useRouterState } from "@tanstack/react-router";
import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";

export default function SiteLayout() {
	const isLanding = useRouterState({
		select: (s) => s.location.pathname === "/",
	});

	// The landing is a scroll-driven day-to-night scene with its own palette, so it ignores the dark theme.
	return (
		<div className={isLanding ? "force-light" : undefined}>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
