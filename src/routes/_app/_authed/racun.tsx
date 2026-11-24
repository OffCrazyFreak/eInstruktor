import { createFileRoute } from "@tanstack/react-router";
import AccountPage from "@/features/account/components/account-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_app/_authed/racun")({
	head: () =>
		pageHead({
			path: "/racun",
			title: "Račun",
			description: "Tvoj račun, kategorija, datum ispita, odjava i brisanje.",
			noindex: true,
		}),
	component: AccountRoute,
});

function AccountRoute() {
	const { viewer } = Route.useRouteContext();

	return <AccountPage viewer={viewer} />;
}
