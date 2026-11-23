import { createFileRoute } from "@tanstack/react-router";
import NotFoundPage from "@/components/custom/layout/not-found-page";
import SiteLayout from "@/components/custom/layout/site-layout";

export const Route = createFileRoute("/_site")({
	notFoundComponent: NotFoundPage,
	component: SiteLayout,
});
