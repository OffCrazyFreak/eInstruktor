import { useSyncExternalStore } from "react";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/storage-key";

function subscribe(onChange: () => void) {
	window.addEventListener("storage", onChange);

	return () => window.removeEventListener("storage", onChange);
}

function readHasProgress(): boolean {
	try {
		return window.localStorage.getItem(PROGRESS_STORAGE_KEY) !== null;
	} catch {
		return false;
	}
}

function serverHasProgress(): boolean {
	return false;
}

/** False on the server and during hydration, then the real answer, so the markup never mismatches. */
export default function useHasLocalProgress(): boolean {
	return useSyncExternalStore(subscribe, readHasProgress, serverHasProgress);
}
