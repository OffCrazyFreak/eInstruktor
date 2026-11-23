import { Outlet } from "@tanstack/react-router";
import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";

export default function SiteLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
