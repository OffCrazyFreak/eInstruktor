import { CalendarDays } from "lucide-react";
import { pluralHr } from "@/lib/plural";
import {
	DAILY_QUESTION_GOAL,
	type ITodayActivity,
} from "@/lib/progress/daily-goal";
import type { IStreak } from "@/lib/progress/streak";

interface ITodayCardProps {
	today: ITodayActivity;
	streak: IStreak;
}

const RING_RADIUS = 22;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function goalText({ questions, lessons, goalMet }: ITodayActivity): string {
	if (goalMet) {
		return lessons > 0 ? "Cilj ispunjen: lekcija gotova" : "Cilj ispunjen";
	}

	return `${questions} od ${DAILY_QUESTION_GOAL} pitanja`;
}

export default function TodayCard({ today, streak }: ITodayCardProps) {
	const share = today.goalMet ? 1 : today.questions / DAILY_QUESTION_GOAL;

	return (
		<section
			aria-labelledby="today-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<div className="flex items-center gap-4">
				<svg
					viewBox="0 0 56 56"
					className="size-16 shrink-0 -rotate-90"
					aria-hidden="true"
				>
					<circle
						cx="28"
						cy="28"
						r={RING_RADIUS}
						fill="none"
						stroke="currentColor"
						strokeOpacity="0.12"
						strokeWidth="6"
					/>
					<circle
						cx="28"
						cy="28"
						r={RING_RADIUS}
						fill="none"
						stroke="#ffb43c"
						strokeWidth="6"
						strokeLinecap="round"
						strokeDasharray={RING_LENGTH}
						strokeDashoffset={RING_LENGTH * (1 - share)}
					/>
				</svg>

				<div className="min-w-0">
					<h2
						id="today-title"
						className="font-mono text-[0.72rem] tracking-[0.18em] text-ocean dark:text-[#4cc2ff]"
					>
						DANAS
					</h2>
					<p className="mt-1 text-[1.05rem] font-semibold">{goalText(today)}</p>
					<p className="text-[0.85rem] text-muted-foreground">
						Dan se broji s 5 pitanja ili jednom lekcijom.
					</p>
				</div>
			</div>

			<p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3 text-[0.9rem]">
				<span className="inline-flex items-center gap-1.5 font-semibold">
					<CalendarDays
						className="size-4 text-ocean dark:text-[#4cc2ff]"
						aria-hidden="true"
					/>
					{streak.daysThisWeek} od zadnjih 7 dana
				</span>
				{streak.run > 1 && (
					<span className="text-muted-foreground">
						Zaredom {streak.run} {pluralHr(streak.run, "dan", "dana", "dana")}
					</span>
				)}
			</p>
		</section>
	);
}
