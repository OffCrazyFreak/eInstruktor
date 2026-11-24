import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AccountPage from "@/features/account/components/account-page";
import { deleteAccount } from "@/features/account/server/account.functions";
import {
	browserBaselineStorage,
	emptyBaseline,
	SYNC_BASELINE_STORAGE_KEY,
} from "@/features/account/utils/sync-baseline";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { renderWithProgress } from "@/lib/testing/render-with-progress";

vi.mock("@/features/account/server/account.functions", () => ({
	deleteAccount: vi.fn(async () => ({ deleted: true })),
}));

vi.mock("@/lib/auth/auth-client", () => ({
	authClient: { signOut: vi.fn(async () => ({ error: null })) },
}));

const viewer = {
	id: "u1",
	name: "Ana Horvat",
	email: "ana@example.com",
	image: null,
};

async function renderPage() {
	const queryClient = new QueryClient();

	browserBaselineStorage.write(emptyBaseline("u1"));

	return renderWithProgress(
		() => (
			<QueryClientProvider client={queryClient}>
				<AccountPage viewer={viewer} />
			</QueryClientProvider>
		),
		{ targetLevel: "B", lessonsDone: { "pomorska-karta": 1 } },
	);
}

function openDeleteDialog() {
	fireEvent.click(screen.getByRole("button", { name: "Obriši račun" }));

	return screen.getByRole("alertdialog", { name: "Obrisati račun?" });
}

function storedProgress() {
	return JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? "{}");
}

describe("AccountPage", () => {
	afterEach(() => {
		window.localStorage.clear();
		vi.clearAllMocks();
	});

	it("shows who is signed in and the level fields", async () => {
		await renderPage();

		expect(screen.getByText("Ana Horvat")).toBeTruthy();
		expect(screen.getByText("ana@example.com")).toBeTruthy();
		expect(screen.getByRole("radio", { name: /Kategorija B/ })).toBeTruthy();
	});

	it("says what deletion removes and asks before doing it", async () => {
		await renderPage();

		const dialog = openDeleteDialog();

		expect(dialog.textContent).toContain("ključeve za prijavu");
		expect(deleteAccount).not.toHaveBeenCalled();
	});

	it("deletes the account and keeps browser progress unless asked", async () => {
		await renderPage();

		openDeleteDialog();
		fireEvent.click(
			screen.getAllByRole("button", { name: "Obriši račun" }).at(-1) as Element,
		);

		await waitFor(() => expect(deleteAccount).toHaveBeenCalledOnce());
		await waitFor(() =>
			expect(window.localStorage.getItem(SYNC_BASELINE_STORAGE_KEY)).toBeNull(),
		);
		expect(storedProgress().lessonsDone).toEqual({ "pomorska-karta": 1 });
	});

	it("also clears this browser when the learner chooses it", async () => {
		await renderPage();

		openDeleteDialog();
		fireEvent.click(
			screen.getByRole("switch", {
				name: "Obriši i napredak u ovom pregledniku",
			}),
		);
		fireEvent.click(
			screen.getAllByRole("button", { name: "Obriši račun" }).at(-1) as Element,
		);

		await waitFor(() => expect(storedProgress().lessonsDone).toEqual({}));
	});

	it("keeps the dialog open with a message when deletion fails", async () => {
		vi.mocked(deleteAccount).mockRejectedValueOnce(new Error("network"));

		await renderPage();

		openDeleteDialog();
		fireEvent.click(
			screen.getAllByRole("button", { name: "Obriši račun" }).at(-1) as Element,
		);

		expect(await screen.findByRole("alert")).toBeTruthy();
		expect(storedProgress().lessonsDone).toEqual({ "pomorska-karta": 1 });
	});
});
