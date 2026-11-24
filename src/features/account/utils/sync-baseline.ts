import { z } from "zod";
import { syncProfileSchema } from "@/features/account/utils/sync-schema";

export const SYNC_BASELINE_STORAGE_KEY = "einstruktor:sync-baseline:v1";

// What the account held after the last sync from this browser; a difference from it is a change made here.
const baselineSchema = z.object({
	userId: z.string(),
	/** Attempts answered after this time may not be on the account yet. */
	attemptsThrough: z.number(),
	examSessionIds: z.array(z.string()),
	lessons: z.array(z.string()),
	flagged: z.array(z.string()),
	studyDays: z.array(z.string()),
	badges: z.array(z.string()),
	profile: syncProfileSchema,
});

export type ISyncBaseline = z.infer<typeof baselineSchema>;

export interface IBaselineStorage {
	read: () => ISyncBaseline | null;
	write: (baseline: ISyncBaseline) => void;
	clear: () => void;
}

export function emptyBaseline(userId: string): ISyncBaseline {
	return {
		userId,
		attemptsThrough: 0,
		examSessionIds: [],
		lessons: [],
		flagged: [],
		studyDays: [],
		badges: [],
		profile: { targetLevel: null, examDate: null, passedAt: null },
	};
}

// A missing or damaged baseline only means the next sync sends everything again, which the server ignores.
export function baselineStorage(
	getStorage: () => Storage | null,
): IBaselineStorage {
	function storage(): Storage | null {
		try {
			return getStorage();
		} catch {
			return null;
		}
	}

	return {
		read() {
			try {
				const raw = storage()?.getItem(SYNC_BASELINE_STORAGE_KEY);
				const parsed = baselineSchema.safeParse(raw ? JSON.parse(raw) : null);

				return parsed.success ? parsed.data : null;
			} catch {
				return null;
			}
		},

		write(baseline) {
			try {
				storage()?.setItem(SYNC_BASELINE_STORAGE_KEY, JSON.stringify(baseline));
			} catch {
				// Without storage every sync is a full one; nothing is lost.
			}
		},

		clear() {
			try {
				storage()?.removeItem(SYNC_BASELINE_STORAGE_KEY);
			} catch {
				// Nothing to clear.
			}
		},
	};
}

export const browserBaselineStorage = baselineStorage(() =>
	typeof window === "undefined" ? null : window.localStorage,
);
