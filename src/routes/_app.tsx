import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/custom/app-shell/app-layout";
import AppNotFoundPage from "@/components/custom/app-shell/app-not-found-page";

export const Route = createFileRoute("/_app")({
	notFoundComponent: AppNotFoundPage,
	component: AppLayout,
});
