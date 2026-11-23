import { useSyncExternalStore } from "react";

// The key the local progress store writes; the landing only needs to know whether it exists.
export const LOCAL_PROGRESS_KEY = "einstruktor:progress:v1";

function subscribe(onChange: () => void) {
	window.addEventListener("storage", onChange);

	return () => window.removeEventListener("storage", onChange);
}

function readHasProgress(): boolean {
	try {
		return window.localStorage.getItem(LOCAL_PROGRESS_KEY) !== null;
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
