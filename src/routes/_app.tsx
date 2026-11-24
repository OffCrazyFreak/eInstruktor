import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/custom/app-shell/app-layout";
import AppNotFoundPage from "@/components/custom/app-shell/app-not-found-page";
import ProgressSync from "@/features/account/components/progress-sync";

export const Route = createFileRoute("/_app")({
	notFoundComponent: AppNotFoundPage,
	component: AppRoute,
});

function AppRoute() {
	return <AppLayout background={<ProgressSync />} />;
}
