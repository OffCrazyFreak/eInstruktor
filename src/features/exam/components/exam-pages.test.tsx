import {
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import course from "@/content/voditelj-brodice";
import ExamResultPage from "@/features/exam/components/result/exam-result-page";
import ExamRunnerPage from "@/features/exam/components/runner/exam-runner-page";
import { questionsForExam } from "@/lib/content/exam-questions";
import {
	finishExamSession,
	startExamSession,
} from "@/lib/progress/exam-session-actions";
import ProgressProvider from "@/lib/progress/progress-provider";
import {
	EMPTY_PROGRESS,
	type IProgressState,
} from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { memoryStorage } from "@/lib/testing/memory-storage";

vi.mock("@/components/custom/visuals/visual-frame", () => ({
	default: () => <div data-testid="visual" />,
}));

const STARTED = Date.now();

const questionIds = questionsForExam(course, "B", 9).map(
	(question) => question.id,
);

function running(progress: IProgressState = EMPTY_PROGRESS, ids = questionIds) {
	return startExamSession(progress, {
		id: "exam-1",
		level: "B",
		seed: 9,
		questionIds: ids,
		startedAt: STARTED,
		endsAt: STARTED + 45 * 60_000,
	});
}

function finished() {
	return finishExamSession(
		running(),
		"exam-1",
		{ score: 0, passed: false, perSubject: {}, graded: [] },
		{ finishedAt: STARTED + 60_000, makeId: () => "a" },
	);
}

async function renderAt(path: string, progress: IProgressState) {
	const storage = memoryStorage({
		[PROGRESS_STORAGE_KEY]: JSON.stringify(progress),
	});
	const store = createProgressStore(() => storage);

	const rootRoute = createRootRoute();

	const runnerRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/ispit/$sessionId",
		validateSearch: (search: Record<string, unknown>) => ({
			pitanje: typeof search.pitanje === "number" ? search.pitanje : undefined,
		}),
		component: function Runner() {
			const { sessionId } = runnerRoute.useParams();
			const { pitanje } = runnerRoute.useSearch();

			return <ExamRunnerPage sessionId={sessionId} questionNumber={pitanje} />;
		},
	});

	const resultRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/ispit/rezultat/$sessionId",
		component: function Result() {
			const { sessionId } = resultRoute.useParams();

			return <ExamResultPage sessionId={sessionId} review={null} />;
		},
	});

	const router = createRouter({
		routeTree: rootRoute.addChildren([runnerRoute, resultRoute]),
		history: createMemoryHistory({ initialEntries: [path] }),
	});

	await act(async () => {
		await router.load();
	});

	render(
		<ProgressProvider store={store}>
			<RouterProvider router={router} />
		</ProgressProvider>,
	);

	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve, 0));
	});

	return router;
}

describe("ExamRunnerPage", () => {
	it("explains an unknown exam and links back", async () => {
		await renderAt("/ispit/nope", EMPTY_PROGRESS);

		expect(screen.getByText("Ovaj ispit ne postoji")).toBeTruthy();
		expect(screen.getByRole("link", { name: "Na probni ispit" })).toBeTruthy();
	});

	it("sends a finished exam to its result", async () => {
		const router = await renderAt("/ispit/exam-1", finished());

		expect(router.state.location.pathname).toBe("/ispit/rezultat/exam-1");
	});

	it("opens the last question for an out of range number", async () => {
		await renderAt("/ispit/exam-1?pitanje=99", running());

		expect(screen.getByText("40 / 40")).toBeTruthy();
	});

	it("offers to give up an exam whose questions are gone", async () => {
		await renderAt("/ispit/exam-1", running(EMPTY_PROGRESS, ["gone-1"]));

		expect(
			screen.getByText("Ovaj ispit se više ne može nastaviti"),
		).toBeTruthy();
		expect(screen.getByRole("button", { name: "Odustani" })).toBeTruthy();
	});

	it("treats a B exam missing a subject as invalid", async () => {
		await renderAt(
			"/ispit/exam-1",
			running(EMPTY_PROGRESS, questionIds.slice(0, 32)),
		);

		expect(screen.getByRole("button", { name: "Odustani" })).toBeTruthy();
	});
});

describe("ExamResultPage", () => {
	it("points an unfinished exam back to the runner", async () => {
		await renderAt("/ispit/rezultat/exam-1", running());

		expect(screen.getByText("Ovaj ispit još traje")).toBeTruthy();
		expect(screen.getByRole("link", { name: "Nastavi ispit" })).toBeTruthy();
	});

	it("explains an unknown result", async () => {
		await renderAt("/ispit/rezultat/nope", EMPTY_PROGRESS);

		expect(screen.getByText("Ovaj rezultat ne postoji")).toBeTruthy();
	});
});
