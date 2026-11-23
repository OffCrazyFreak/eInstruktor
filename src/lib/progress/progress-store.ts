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

export function createProgressStore(
	getStorage: () => Storage | null,
): IProgressStore {
	const listeners = new Set<() => void>();
	let state: IProgressState | null = null;

	function load(): IProgressState {
		try {
			return parseProgress(
				safeStorage(getStorage)?.getItem(PROGRESS_STORAGE_KEY) ?? null,
			);
		} catch {
			return EMPTY_PROGRESS;
		}
	}

	function notify() {
		for (const listener of listeners) {
			listener();
		}
	}

	function onStorage(event: StorageEvent) {
		if (event.key === PROGRESS_STORAGE_KEY || event.key === null) {
			state = parseProgress(event.newValue);
			notify();
		}
	}

	function getSnapshot(): IProgressState {
		state ??= load();

		return state;
	}

	return {
		getSnapshot,

		subscribe(onChange) {
			listeners.add(onChange);

			if (listeners.size === 1 && typeof window !== "undefined") {
				window.addEventListener("storage", onStorage);
			}

			return () => {
				listeners.delete(onChange);

				if (listeners.size === 0 && typeof window !== "undefined") {
					window.removeEventListener("storage", onStorage);
				}
			};
		},

		update(change) {
			const current = getSnapshot();
			const next = change(current);

			if (next === current) {
				return;
			}

			state = next;

			try {
				safeStorage(getStorage)?.setItem(
					PROGRESS_STORAGE_KEY,
					JSON.stringify(next),
				);
			} catch {
				// Quota or blocked storage: the change still applies for this visit.
			}

			notify();
		},
	};
}

export const browserProgressStore = createProgressStore(() =>
	typeof window === "undefined" ? null : window.localStorage,
);
