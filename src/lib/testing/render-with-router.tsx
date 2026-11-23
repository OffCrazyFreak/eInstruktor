import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";

function testRouter(ui: () => ReactNode) {
	return createRouter({
		routeTree: createRootRoute({ component: ui }),
		history: createMemoryHistory({ initialEntries: ["/"] }),
	});
}

/** Renders a component that uses router links, inside a one-route memory router. */
export async function renderWithRouter(ui: () => ReactNode) {
	const router = testRouter(ui);

	await router.load();

	return render(<RouterProvider router={router} />);
}

/** Server-renders a component that uses router links, as the first HTML a visitor gets. */
export async function renderToStringWithRouter(ui: () => ReactNode) {
	const router = testRouter(ui);

	await router.load();

	return renderToString(<RouterProvider router={router} />);
}
