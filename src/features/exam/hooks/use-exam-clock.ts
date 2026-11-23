import { useEffect, useEffectEvent, useState } from "react";
import { remainingMs } from "@/features/exam/utils/exam-timer";

const TICK_MS = 1000;

/**
 * Time left until `endsAt`, read from the wall clock on every tick, so a reload, a background tab or a locked phone never stretches the exam.
 * Calls `onExpire` once when it reaches zero, also when the exam is opened after its time is already up.
 */
export default function useExamClock(
	endsAt: number | null,
	onExpire: () => void,
): number | null {
	const [remaining, setRemaining] = useState<number | null>(null);
	const expire = useEffectEvent(onExpire);

	useEffect(() => {
		if (endsAt === null) {
			setRemaining(null);
			return;
		}

		const deadline = endsAt;
		let interval: number | undefined;

		function stop() {
			window.clearInterval(interval);
			document.removeEventListener("visibilitychange", tick);
		}

		function tick() {
			const left = remainingMs(deadline, Date.now());

			setRemaining(left);

			if (left === 0) {
				stop();
				expire();
			}
		}

		document.addEventListener("visibilitychange", tick);
		interval = window.setInterval(tick, TICK_MS);
		tick();

		return stop;
	}, [endsAt]);

	return remaining;
}
