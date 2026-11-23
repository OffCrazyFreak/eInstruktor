import { useHydrated } from "@tanstack/react-router";
import { useContext, useSyncExternalStore } from "react";
import type { ExamLevel } from "@/content/course-types";
import { ProgressContext } from "@/lib/progress/progress-context";
import {
	EMPTY_PROGRESS,
	type IProgressState,
} from "@/lib/progress/progress-schema";
import type { ProgressUpdate } from "@/lib/progress/progress-store";

/** B covers A and is the usual choice, so screens show B until the learner picks a level. */
export const DEFAULT_LEVEL: ExamLevel = "B";

export interface IUseProgress {
	progress: IProgressState;
	/** False on the server and during hydration, while `progress` is still the empty state. */
	ready: boolean;
	level: ExamLevel;
	update: (change: ProgressUpdate) => void;
}

function serverSnapshot(): IProgressState {
	return EMPTY_PROGRESS;
}

export default function useProgress(): IUseProgress {
	const store = useContext(ProgressContext);
	const ready = useHydrated();

	const progress = useSyncExternalStore(
		store.subscribe,
		store.getSnapshot,
		serverSnapshot,
	);

	return {
		progress,
		ready,
		level: progress.targetLevel ?? DEFAULT_LEVEL,
		update: store.update,
	};
}
