import { Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { crossedMark, formatClock } from "@/features/exam/utils/exam-timer";
import { pluralHr } from "@/lib/plural";
import { cn } from "@/lib/utils";

interface IExamClockProps {
	/** Null when the exam runs without a time limit. */
	remaining: number | null;
}

const LOW_TIME_MS = 5 * 60_000;

function minutesLeftText(minutes: number): string {
	if (minutes === 1) {
		return "Još jedna minuta.";
	}

	return `Još ${minutes} ${pluralHr(minutes, "minuta", "minute", "minuta")}.`;
}

/** The time left; a screen reader hears it only at the 10, 5 and 1 minute marks, never every second. */
export default function ExamClock({ remaining }: IExamClockProps) {
	const previous = useRef<number | null>(null);
	const [announcement, setAnnouncement] = useState("");

	useEffect(() => {
		if (remaining === null) {
			return;
		}

		const mark =
			previous.current === null
				? null
				: crossedMark(previous.current, remaining);

		previous.current = remaining;

		if (mark !== null) {
			setAnnouncement(minutesLeftText(mark));
		}
	}, [remaining]);

	if (remaining === null) {
		return (
			<span className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-[0.8rem] font-semibold text-muted-foreground">
				Bez vremena
			</span>
		);
	}

	const low = remaining <= LOW_TIME_MS;

	return (
		<>
			<span
				role="timer"
				aria-label="Preostalo vrijeme"
				className={cn(
					"inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 font-mono text-[0.95rem] font-semibold tabular-nums",
					low
						? "bg-[#ffb43c] text-[#002c78]"
						: "bg-tint text-ink dark:bg-accent dark:text-[#dbe9fb]",
				)}
			>
				<Timer className="size-4" aria-hidden="true" />
				{formatClock(remaining)}
			</span>

			<span className="sr-only" aria-live="polite">
				{announcement}
			</span>
		</>
	);
}
