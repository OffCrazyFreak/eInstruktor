import type { LoginNudgeTrigger } from "@/components/custom/login-nudge/nudge-rules";

const SHOWN_KEY = "einstruktor:login-nudge-shown";

// Falls back to the page's memory where sessionStorage is blocked, which still keeps it to once per visit.
let shownInMemory = false;

const dueTriggers = new Set<LoginNudgeTrigger>();

function sessionStore(): Storage | null {
	try {
		return typeof window === "undefined" ? null : window.sessionStorage;
	} catch {
		return null;
	}
}

/** True once the sheet has opened in this browser tab session. */
export function wasShownThisSession(): boolean {
	try {
		return shownInMemory || sessionStore()?.getItem(SHOWN_KEY) === "1";
	} catch {
		return shownInMemory;
	}
}

export function markShownThisSession(): void {
	shownInMemory = true;

	try {
		sessionStore()?.setItem(SHOWN_KEY, "1");
	} catch {
		// The memory flag above still holds for this visit.
	}
}

/** For triggers whose page moves on at once, such as a finished lesson going to the next one: the next slot picks it up. */
export function markNudgeDue(trigger: LoginNudgeTrigger): void {
	dueTriggers.add(trigger);
}

export function takeNudgeDue(trigger: LoginNudgeTrigger): boolean {
	return dueTriggers.delete(trigger);
}

/** Tests start every case from a fresh session. */
export function resetNudgeSession(): void {
	shownInMemory = false;
	dueTriggers.clear();

	try {
		sessionStore()?.removeItem(SHOWN_KEY);
	} catch {
		// Nothing stored.
	}
}
