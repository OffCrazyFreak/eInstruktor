import { afterEach, describe, expect, it, vi } from "vitest";
import { setTargetLevel } from "@/lib/progress/progress-actions";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import { createProgressStore } from "@/lib/progress/progress-store";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";

function memoryStorage(initial: Record<string, string> = {}): Storage {
	const values = new Map(Object.entries(initial));

	return {
		get length() {
			return values.size;
		},
		clear: () => values.clear(),
		getItem: (key) => values.get(key) ?? null,
		key: (index) => [...values.keys()][index] ?? null,
		removeItem: (key) => values.delete(key),
		setItem: (key, value) => values.set(key, value),
	};
}

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
