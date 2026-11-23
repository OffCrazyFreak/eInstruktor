import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { setTargetLevel } from "@/lib/progress/progress-actions";
import ProgressProvider from "@/lib/progress/progress-provider";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import useProgress from "@/lib/progress/use-progress";

function LevelProbe() {
	const { ready, level, progress } = useProgress();

	return (
		<p>{`${ready ? "spremno" : "čeka"} ${level} ${progress.targetLevel ?? "nema"}`}</p>
	);
}

function storedStore() {
	window.localStorage.setItem(
		PROGRESS_STORAGE_KEY,
		JSON.stringify({ targetLevel: "A" }),
	);

	return createProgressStore(() => window.localStorage);
}

describe("useProgress", () => {
	it("renders the empty, not ready state on the server", () => {
		const html = renderToString(
			<ProgressProvider store={storedStore()}>
				<LevelProbe />
			</ProgressProvider>,
		);

		expect(html).toContain("čeka B nema");
	});

	it("shows the stored progress in the browser and follows updates", () => {
		const store = storedStore();

		render(
			<ProgressProvider store={store}>
				<LevelProbe />
			</ProgressProvider>,
		);

		expect(screen.getByText("spremno A A")).toBeTruthy();

		act(() => store.update((progress) => setTargetLevel(progress, "B")));

		expect(screen.getByText("spremno B B")).toBeTruthy();

		window.localStorage.clear();
	});
});
