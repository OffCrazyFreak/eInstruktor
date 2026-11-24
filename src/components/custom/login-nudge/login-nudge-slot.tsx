import { useEffect, useState } from "react";
import LoginSheet from "@/components/custom/login-nudge/login-sheet";
import {
	type LoginNudgeTrigger,
	recordDismissal,
	recordShowing,
	shouldShowLoginNudge,
} from "@/components/custom/login-nudge/nudge-rules";
import {
	markShownThisSession,
	takeNudgeDue,
	wasShownThisSession,
} from "@/components/custom/login-nudge/nudge-session";
import useAuthStatus from "@/lib/auth/use-auth-status";
import useProgress from "@/lib/progress/use-progress";

interface ILoginNudgeSlotProps {
	/** What the learner just finished. A lesson only counts after markNudgeDue("lesson"), because finishing one moves on to the next. */
	trigger: LoginNudgeTrigger;
}

const TITLES: Record<LoginNudgeTrigger, string> = {
	"practice-set": "Spremi napredak",
	lesson: "Spremi napredak",
	"exam-result": "Spremi rezultat i napredak",
};

// Lets the learner see the result first, so the sheet never covers the moment it was earned.
const OPEN_DELAY_MS = 800;

/** Offers sign-in after finished work as a dismissible sheet: anonymous only, Google configured, once per session. */
export default function LoginNudgeSlot({ trigger }: ILoginNudgeSlotProps) {
	const { googleSignIn, viewer } = useAuthStatus();
	const { progress, ready, update } = useProgress();
	const [open, setOpen] = useState(false);

	const eligible =
		ready &&
		googleSignIn &&
		viewer.status === "anonymous" &&
		!wasShownThisSession() &&
		shouldShowLoginNudge(progress.dismissedNudges, trigger, Date.now());

	useEffect(() => {
		if (!eligible) {
			return;
		}

		const timer = setTimeout(() => {
			// Taken only when the timer fires: a development double effect would otherwise spend the flag on a timer it cancels.
			if (trigger === "lesson" && !takeNudgeDue("lesson")) {
				return;
			}

			markShownThisSession();
			update(recordShowing);
			setOpen(true);
		}, OPEN_DELAY_MS);

		return () => clearTimeout(timer);
	}, [eligible, trigger, update]);

	function handleOpenChange(next: boolean) {
		setOpen(next);

		if (!next) {
			update((current) => recordDismissal(current, trigger, Date.now()));
		}
	}

	return (
		<LoginSheet
			open={open}
			onOpenChange={handleOpenChange}
			title={TITLES[trigger]}
		/>
	);
}
