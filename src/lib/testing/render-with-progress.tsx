import type { ReactNode } from "react";
import ProgressProvider from "@/lib/progress/progress-provider";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { renderWithRouter } from "@/lib/testing/render-with-router";

/** Renders inside a router and a progress store over jsdom's localStorage, seeded with `stored`; clear localStorage after each test. */
export async function renderWithProgress(
	ui: () => ReactNode,
	stored: Partial<IProgressState> = {},
) {
	window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(stored));

	const store = createProgressStore(() => window.localStorage);

	const view = await renderWithRouter(() => (
		<ProgressProvider store={store}>{ui()}</ProgressProvider>
	));

	return { ...view, store };
}
