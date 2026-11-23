import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";

export const Route = createFileRoute("/_site")({
	component: SiteLayout,
});

function SiteLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
