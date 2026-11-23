import { toast } from "sonner";
import {
	EMPTY_PROGRESS,
	type IProgressState,
	parseProgress,
} from "@/lib/progress/progress-schema";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";

export type ProgressUpdate = (progress: IProgressState) => IProgressState;

export interface IProgressStore {
	getSnapshot: () => IProgressState;
	subscribe: (onChange: () => void) => () => void;
	update: (change: ProgressUpdate) => void;
}

// Private windows and blocked storage throw on access; the app then keeps progress in memory for the visit.
function safeStorage(getStorage: () => Storage | null): Storage | null {
	try {
		return getStorage();
	} catch {
		return null;
	}
}

interface IProgressStoreOptions {
	/** Called once, the first time a change cannot be written; the change still applies in memory. */
	onWriteError?: () => void;
}

export function createProgressStore(
	getStorage: () => Storage | null,
	{ onWriteError }: IProgressStoreOptions = {},
): IProgressStore {
	const listeners = new Set<() => void>();
	let state: IProgressState | null = null;
	let lastRaw: string | null = null;
	let memoryOnly = false;

	function readRaw(): string | null {
		try {
			return safeStorage(getStorage)?.getItem(PROGRESS_STORAGE_KEY) ?? null;
		} catch {
			return null;
		}
	}

	// Another tab may have written since the last read, so storage wins unless this tab could not write at all.
	function refresh(): boolean {
		if (memoryOnly && state !== null) {
			return false;
		}

		const raw = readRaw();

		if (state !== null && raw === lastRaw) {
			return false;
		}

		lastRaw = raw;
		state = parseProgress(raw);

		return true;
	}

	function notify() {
		for (const listener of listeners) {
			listener();
		}
	}

	function onStorage(event: StorageEvent) {
		if (event.key === PROGRESS_STORAGE_KEY || event.key === null) {
			lastRaw = event.newValue;
			state = parseProgress(event.newValue);
			notify();
		}
	}

	function getSnapshot(): IProgressState {
		if (state === null) {
			refresh();
		}

		return state ?? EMPTY_PROGRESS;
	}

	function write(next: IProgressState) {
		const raw = JSON.stringify(next);

		try {
			const storage = safeStorage(getStorage);

			if (!storage) {
				throw new Error("No storage");
			}

			storage.setItem(PROGRESS_STORAGE_KEY, raw);
			lastRaw = raw;
		} catch {
			if (!memoryOnly) {
				memoryOnly = true;
				onWriteError?.();
			}
		}
	}

	return {
		getSnapshot,

		subscribe(onChange) {
			listeners.add(onChange);

			if (listeners.size === 1) {
				if (typeof window !== "undefined") {
					window.addEventListener("storage", onStorage);
				}

				const loaded = state !== null;

				if (refresh() && loaded) {
					notify();
				}
			}

			return () => {
				listeners.delete(onChange);

				if (listeners.size === 0 && typeof window !== "undefined") {
					window.removeEventListener("storage", onStorage);
				}
			};
		},

		update(change) {
			refresh();

			const current = getSnapshot();
			const next = change(current);

			if (next === current) {
				return;
			}

			state = next;
			write(next);
			notify();
		},
	};
}

function warnStorageUnavailable() {
	toast.error("Napredak se ne može spremiti u ovom pregledniku");
}

export const browserProgressStore = createProgressStore(
	() => (typeof window === "undefined" ? null : window.localStorage),
	{ onWriteError: warnStorageUnavailable },
);
