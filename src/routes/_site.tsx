import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/custom/layout/site-layout";

export const Route = createFileRoute("/_site")({
	component: SiteLayout,
});
