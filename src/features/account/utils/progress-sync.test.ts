import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { syncProgressForUser } from "@/features/account/server/sync-progress.server";
import { createProgressSync } from "@/features/account/utils/progress-sync";
import { baselineStorage } from "@/features/account/utils/sync-baseline";
import {
	type ISyncRequest,
	type ISyncResponse,
	syncRequestSchema,
} from "@/features/account/utils/sync-schema";
import {
	recordAnswer,
	setExamDate,
	setTargetLevel,
	toggleFlag,
} from "@/lib/progress/progress-actions";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { memoryStorage } from "@/lib/testing/memory-storage";
import {
	createTempDatabase,
	type ITempDatabase,
	insertTestUser,
} from "@/lib/testing/temp-database";
import { testAttempt } from "@/lib/testing/test-attempts";

// These tests use short made-up ids; the real course ids are covered in push-limits.server.test.ts.
vi.mock("@/features/account/server/known-content.server", () => ({
	KNOWN_QUESTION_IDS: { has: () => true },
	KNOWN_LESSON_SLUGS: { has: () => true },
}));

let temp: ITempDatabase;

function browser(initial: Partial<IProgressState> = {}) {
	const storage = memoryStorage({
		[PROGRESS_STORAGE_KEY]: JSON.stringify(initial),
	});

	return {
		store: createProgressStore(() => storage),
		baseline: baselineStorage(() => storage),
	};
}

// The real server merge behind the validator, as the server function runs it.
function serverFor(userId: string) {
	return vi.fn((request: ISyncRequest) =>
		syncProgressForUser(temp.db, userId, syncRequestSchema.parse(request)),
	);
}

function syncFor(
	device: ReturnType<typeof browser>,
	send: (request: ISyncRequest) => Promise<ISyncResponse>,
	extra: Partial<Parameters<typeof createProgressSync>[0]> = {},
) {
	return createProgressSync({
		store: device.store,
		userId: "u1",
		send,
		baseline: device.baseline,
		onOnline: () => () => {},
		...extra,
	});
}

describe("progress sync against the server merge", () => {
	beforeEach(async () => {
		temp = await createTempDatabase();
		await insertTestUser(temp.db, "u1");
	});

	afterEach(() => temp.cleanup());

	it("moves anonymous progress into the account once and says how much", async () => {
		const phone = browser({
			attempts: [testAttempt({ id: "a1" }), testAttempt({ id: "a2" })],
			lessonsDone: { "pomorska-karta": 10 },
		});
		const onFirstMerge = vi.fn();
		const sync = syncFor(phone, serverFor("u1"), { onFirstMerge });

		sync.start();
		await sync.flush();
		sync.stop();

		expect(onFirstMerge).toHaveBeenCalledWith(2);
		expect(phone.baseline.read()?.lessons).toEqual(["pomorska-karta"]);
	});

	it("brings the account's history to a new device", async () => {
		const phone = browser({
			attempts: [testAttempt({ id: "a1", questionId: "q-7", correct: false })],
			lessonsDone: { "pomorska-karta": 10 },
			badges: { "uvod-gotov": 10 },
		});
		const laptop = browser();

		for (const device of [phone, laptop]) {
			const sync = syncFor(device, serverFor("u1"));

			sync.start();
			await sync.flush();
			sync.stop();
		}

		const state = laptop.store.getSnapshot();

		expect(state.attempts.map((attempt) => attempt.id)).toEqual(["a1"]);
		expect(state.lessonsDone).toEqual({ "pomorska-karta": 10 });
		expect(state.badges).toEqual({ "uvod-gotov": 10 });
		expect(state.questionBoxes["q-7"]?.box).toBe(1);
	});

	it("sends only what changed after the first sync", async () => {
		const phone = browser({ attempts: [testAttempt({ id: "a1" })] });
		const send = serverFor("u1");
		const sync = syncFor(phone, send);

		sync.start();
		await sync.flush();

		phone.store.update((now) =>
			recordAnswer(now, testAttempt({ id: "a2", answeredAt: Date.now() })),
		);
		await sync.flush();
		sync.stop();

		const second = send.mock.calls[1]?.[0];

		expect(second?.full).toBe(false);
		expect(second?.attempts.map((attempt) => attempt.id)).toEqual(["a2"]);
	});

	it("carries an unflag from one device to the other", async () => {
		const phone = browser({ flagged: { "q-1": 1, "q-2": 1 } });
		const laptop = browser();
		const phoneSync = syncFor(phone, serverFor("u1"));
		const laptopSync = syncFor(laptop, serverFor("u1"));

		phoneSync.start();
		await phoneSync.flush();
		laptopSync.start();
		await laptopSync.flush();

		laptop.store.update((now) => toggleFlag(now, "q-2", 5));
		await laptopSync.flush();
		await phoneSync.flush();
		phoneSync.stop();
		laptopSync.stop();

		// The phone learns of the change on its next full sync, as on its next visit.
		const phoneAgain = syncFor(phone, serverFor("u1"));

		phoneAgain.start();
		await phoneAgain.flush();
		phoneAgain.stop();

		expect(Object.keys(phone.store.getSnapshot().flagged)).toEqual(["q-1"]);
	});

	it("lets the account's level win at sign-in, then keeps later edits", async () => {
		await syncProgressForUser(temp.db, "u1", {
			...syncRequestSchema.parse({
				full: false,
				attempts: [],
				examSessions: [],
				lessonsAdded: {},
				lessonsRemoved: [],
				flaggedAdded: {},
				flaggedRemoved: [],
				studyDays: [],
				badges: {},
				profile: { mode: "set", values: { targetLevel: "B" } },
			}),
		});

		const phone = browser({ targetLevel: "A", examDate: "2026-12-01" });
		const sync = syncFor(phone, serverFor("u1"));

		sync.start();
		await sync.flush();

		expect(phone.store.getSnapshot().targetLevel).toBe("B");
		expect(phone.store.getSnapshot().examDate).toBe("2026-12-01");

		phone.store.update((now) => setTargetLevel(now, "A"));
		phone.store.update((now) => setExamDate(now, null));
		await sync.flush();
		sync.stop();

		expect(phone.store.getSnapshot().targetLevel).toBe("A");
		expect(phone.baseline.read()?.profile).toEqual({
			targetLevel: "A",
			examDate: null,
			passedAt: null,
		});
	});

	it("stores nothing twice when two tabs sync the same progress at once", async () => {
		const attempts = [testAttempt({ id: "a1" }), testAttempt({ id: "a2" })];
		const firstTab = browser({ attempts });
		const secondTab = browser({ attempts });
		const send = serverFor("u1");
		const first = syncFor(firstTab, send);
		const second = syncFor(secondTab, send);

		first.start();
		second.start();
		await Promise.all([first.flush(), second.flush()]);
		first.stop();
		second.stop();

		const results = await Promise.all(
			send.mock.results.map((result) => result.value as Promise<ISyncResponse>),
		);

		expect(
			results.reduce((sum, result) => sum + result.insertedAttempts, 0),
		).toBe(2);
		expect(firstTab.store.getSnapshot().attempts).toHaveLength(2);
	});
});

describe("progress sync timing", () => {
	beforeEach(() => vi.useFakeTimers());

	afterEach(() => vi.useRealTimers());

	function fakeServer() {
		return vi.fn(
			async (request: ISyncRequest): Promise<ISyncResponse> => ({
				profile: { targetLevel: null, examDate: null, passedAt: null },
				lessonsDone: {},
				flagged: {},
				studyDays: [],
				badges: {},
				attempts: request.full ? [] : null,
				examSessions: request.full ? [] : null,
				insertedAttempts: request.attempts.length,
			}),
		);
	}

	function answer(device: ReturnType<typeof browser>, id: string) {
		device.store.update((now) =>
			recordAnswer(now, testAttempt({ id, answeredAt: Date.now() })),
		);
	}

	it("waits for a pause before sending a burst of answers in one request", async () => {
		const device = browser();
		const send = fakeServer();
		const sync = syncFor(device, send, { debounceMs: 1000 });

		sync.start();
		await vi.runAllTimersAsync();

		for (const id of ["a1", "a2", "a3"]) {
			answer(device, id);
			await vi.advanceTimersByTimeAsync(300);
		}

		expect(send).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);
		sync.stop();

		expect(send).toHaveBeenCalledTimes(2);
		expect(send.mock.calls[1]?.[0].attempts).toHaveLength(3);
	});

	it("sends nothing while offline and catches up when the browser is back", async () => {
		const device = browser({ attempts: [testAttempt({ id: "a1" })] });
		const send = fakeServer();
		let online = false;
		let backOnline = () => {};
		const sync = syncFor(device, send, {
			isOnline: () => online,
			onOnline: (callback) => {
				backOnline = callback;
				return () => {};
			},
		});

		sync.start();
		await vi.runAllTimersAsync();

		expect(send).not.toHaveBeenCalled();

		online = true;
		backOnline();
		await vi.runAllTimersAsync();
		sync.stop();

		expect(send).toHaveBeenCalledTimes(1);
	});

	it("retries quietly and warns only once when the server keeps failing", async () => {
		const device = browser({ attempts: [testAttempt({ id: "a1" })] });
		const send = vi.fn(async () => {
			throw new Error("offline server");
		});
		const onPersistentFailure = vi.fn();
		const sync = syncFor(device, send, {
			retryDelaysMs: [10, 20],
			onPersistentFailure,
		});

		sync.start();
		await vi.runAllTimersAsync();

		answer(device, "a2");
		await vi.runAllTimersAsync();
		sync.stop();

		expect(send.mock.calls.length).toBeGreaterThanOrEqual(4);
		expect(onPersistentFailure).toHaveBeenCalledTimes(1);
	});

	it("keeps an answer given while a sync was on its way", async () => {
		const device = browser();
		let release = () => {};
		const send = vi.fn(
			(request: ISyncRequest) =>
				new Promise<ISyncResponse>((resolve) => {
					release = () =>
						resolve({
							profile: { targetLevel: null, examDate: null, passedAt: null },
							lessonsDone: {},
							flagged: {},
							studyDays: [],
							badges: {},
							attempts: request.full ? [] : null,
							examSessions: request.full ? [] : null,
							insertedAttempts: 0,
						});
				}),
		);
		const sync = syncFor(device, send);

		sync.start();
		device.store.update((now) => toggleFlag(now, "q-5", 1));
		release();
		await vi.runAllTimersAsync();
		sync.stop();

		expect(device.store.getSnapshot().flagged).toEqual({ "q-5": 1 });
	});
});
