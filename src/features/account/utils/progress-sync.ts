import { applySyncResponse } from "@/features/account/utils/apply-sync-response";
import {
	buildSyncRequest,
	hasLocalChanges,
} from "@/features/account/utils/build-sync-request";
import type { IBaselineStorage } from "@/features/account/utils/sync-baseline";
import type {
	ISyncRequest,
	ISyncResponse,
} from "@/features/account/utils/sync-schema";
import type { IProgressStore } from "@/lib/progress/progress-store";

export const SYNC_DEBOUNCE_MS = 3000;

export const SYNC_RETRY_DELAYS_MS = [5_000, 30_000, 120_000] as const;

export interface IProgressSyncOptions {
	store: IProgressStore;
	userId: string;
	send: (request: ISyncRequest) => Promise<ISyncResponse>;
	baseline: IBaselineStorage;
	/** After the first merge into an account that had not seen this browser, with the number of answers that were new to it. */
	onFirstMerge?: (insertedAttempts: number) => void;
	/** Once per run, after every retry of one change failed. */
	onPersistentFailure?: () => void;
	isOnline?: () => boolean;
	/** Calls back when the browser goes online again; returns an unsubscribe. */
	onOnline?: (callback: () => void) => () => void;
	debounceMs?: number;
	retryDelaysMs?: readonly number[];
}

export interface IProgressSync {
	start: () => void;
	stop: () => void;
	/** Runs a sync now; resolves when it and any queued one are done. Tests use it. */
	flush: () => Promise<void>;
}

function browserOnline(): boolean {
	return typeof navigator === "undefined" || navigator.onLine !== false;
}

function browserOnOnline(callback: () => void): () => void {
	if (typeof window === "undefined") {
		return () => {};
	}

	window.addEventListener("online", callback);

	return () => window.removeEventListener("online", callback);
}

/** Sends local changes in the background: once at start (pulling the account's history), then debounced after each change. Never throws. */
export function createProgressSync({
	store,
	userId,
	send,
	baseline,
	onFirstMerge,
	onPersistentFailure,
	isOnline = browserOnline,
	onOnline = browserOnOnline,
	debounceMs = SYNC_DEBOUNCE_MS,
	retryDelaysMs = SYNC_RETRY_DELAYS_MS,
}: IProgressSyncOptions): IProgressSync {
	let stopped = true;
	let timer: ReturnType<typeof setTimeout> | null = null;
	let running: Promise<void> | null = null;
	let queued = false;
	let fullPending = true;
	let failures = 0;
	let warned = false;
	const cleanups: (() => void)[] = [];

	function schedule(delay: number) {
		if (stopped) {
			return;
		}

		if (timer !== null) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			timer = null;
			void run();
		}, delay);
	}

	async function exchange() {
		const sent = store.getSnapshot();
		const previous = baseline.read();
		const known = previous?.userId === userId ? previous : null;
		const request = buildSyncRequest(sent, known, userId, fullPending);

		if (!request.full && !hasLocalChanges(request)) {
			return;
		}

		const response = await send(request);

		if (stopped) {
			return;
		}

		let next = known;

		store.update((now) => {
			const result = applySyncResponse(now, {
				sent,
				request,
				response,
				userId,
				previous: known,
			});

			next = result.baseline;

			return result.progress;
		});

		if (next) {
			baseline.write(next);
		}

		fullPending = false;

		if (!known) {
			onFirstMerge?.(response.insertedAttempts);
		}
	}

	async function runOnce() {
		if (!isOnline()) {
			return;
		}

		try {
			await exchange();
			failures = 0;
		} catch {
			failures++;

			const delay = retryDelaysMs[failures - 1];

			if (delay !== undefined) {
				schedule(delay);
			} else if (!warned) {
				warned = true;
				onPersistentFailure?.();
			}
		}
	}

	// One request at a time; a change during it queues exactly one more, so two tabs or a burst of answers never pile up.
	function run(): Promise<void> {
		if (stopped) {
			return Promise.resolve();
		}

		if (running) {
			queued = true;

			return running;
		}

		running = runOnce().finally(() => {
			running = null;

			if (queued) {
				queued = false;
				schedule(0);
			}
		});

		return running;
	}

	return {
		start() {
			if (!stopped) {
				return;
			}

			stopped = false;
			cleanups.push(store.subscribe(() => schedule(debounceMs)));
			cleanups.push(onOnline(() => schedule(0)));
			void run();
		},

		stop() {
			stopped = true;

			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}

			for (const cleanup of cleanups.splice(0)) {
				cleanup();
			}
		},

		async flush() {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}

			await run();

			while (running) {
				await running;
			}
		},
	};
}
