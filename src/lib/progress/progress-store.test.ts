import { afterEach, describe, expect, it, vi } from "vitest";
import { setExamDate, setTargetLevel } from "@/lib/progress/progress-actions";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";
import { memoryStorage } from "@/lib/testing/memory-storage";

describe("createProgressStore", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("reads the stored progress once and keeps the same snapshot", () => {
		const storage = memoryStorage({
			[PROGRESS_STORAGE_KEY]: JSON.stringify({ targetLevel: "A" }),
		});
		const store = createProgressStore(() => storage);

		expect(store.getSnapshot().targetLevel).toBe("A");
		expect(store.getSnapshot()).toBe(store.getSnapshot());
	});

	it("writes an update under the versioned key and tells subscribers", () => {
		const storage = memoryStorage();
		const store = createProgressStore(() => storage);
		const listener = vi.fn();

		store.subscribe(listener);
		store.update((progress) => setTargetLevel(progress, "B"));

		expect(listener).toHaveBeenCalledOnce();
		expect(
			JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "{}").targetLevel,
		).toBe("B");
	});

	it("skips the write when nothing changed", () => {
		const storage = memoryStorage();
		const store = createProgressStore(() => storage);
		const listener = vi.fn();

		store.subscribe(listener);
		store.update((progress) => progress);

		expect(listener).not.toHaveBeenCalled();
		expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBeNull();
	});

	it("keeps working in memory when storage is blocked", () => {
		const store = createProgressStore(() => {
			throw new Error("blocked");
		});

		expect(store.getSnapshot()).toEqual(EMPTY_PROGRESS);

		store.update((progress) => setTargetLevel(progress, "A"));

		expect(store.getSnapshot().targetLevel).toBe("A");
	});

	it("picks up changes made in another tab", () => {
		const target = new EventTarget();

		vi.stubGlobal("window", target);

		const store = createProgressStore(() => memoryStorage());
		const listener = vi.fn();

		store.subscribe(listener);

		const event = Object.assign(new Event("storage"), {
			key: PROGRESS_STORAGE_KEY,
			newValue: JSON.stringify({ targetLevel: "A" }),
		});

		target.dispatchEvent(event);

		expect(listener).toHaveBeenCalledOnce();
		expect(store.getSnapshot().targetLevel).toBe("A");
	});
});

describe("createProgressStore across tabs", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("re-reads storage before an update so a stale cache never overwrites another tab", () => {
		const storage = memoryStorage();
		const store = createProgressStore(() => storage);

		store.getSnapshot();
		storage.setItem(
			PROGRESS_STORAGE_KEY,
			JSON.stringify({ targetLevel: "A", lessonsDone: { uvod: 1 } }),
		);
		store.update((progress) => setExamDate(progress, "2026-12-01"));

		const saved = JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "{}");

		expect(saved.lessonsDone).toEqual({ uvod: 1 });
		expect(saved.examDate).toBe("2026-12-01");
	});

	it("reloads when the first listener subscribes", () => {
		const storage = memoryStorage();
		const store = createProgressStore(() => storage);
		const listener = vi.fn();

		store.getSnapshot();
		storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ targetLevel: "B" }));
		store.subscribe(listener);

		expect(listener).toHaveBeenCalledOnce();
		expect(store.getSnapshot().targetLevel).toBe("B");
	});

	it("starts over when another tab clears the progress", () => {
		const target = new EventTarget();

		vi.stubGlobal("window", target);

		const storage = memoryStorage({
			[PROGRESS_STORAGE_KEY]: JSON.stringify({ targetLevel: "A" }),
		});
		const store = createProgressStore(() => storage);

		store.subscribe(vi.fn());
		target.dispatchEvent(
			Object.assign(new Event("storage"), {
				key: PROGRESS_STORAGE_KEY,
				newValue: null,
			}),
		);

		expect(store.getSnapshot()).toEqual(EMPTY_PROGRESS);
	});

	it("keeps changes in memory and reports once when writing fails", () => {
		const storage = memoryStorage();
		const onWriteError = vi.fn();

		storage.setItem = () => {
			throw new Error("QuotaExceededError");
		};

		const store = createProgressStore(() => storage, { onWriteError });

		store.update((progress) => setTargetLevel(progress, "A"));
		store.update((progress) => setExamDate(progress, "2026-12-01"));

		expect(onWriteError).toHaveBeenCalledOnce();
		expect(store.getSnapshot()).toMatchObject({
			targetLevel: "A",
			examDate: "2026-12-01",
		});
	});
});
