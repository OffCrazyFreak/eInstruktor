import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "@/integrations/tanstack-query/root-provider";
import { routeTree } from "@/routeTree.gen";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => (
			<main className="grid min-h-svh place-items-center p-6 text-center">
				<div>
					<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
						404
					</p>
					<h1 className="mt-2 text-2xl font-semibold">
						Stranica nije pronađena
					</h1>
					<a href="/" className="mt-4 inline-block text-sm underline">
						Natrag na početnu
					</a>
				</div>
			</main>
		),
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
