import { CircleCheck, CircleX, TimerOff } from "lucide-react";
import course from "@/content/voditelj-brodice";
import {
	durationMinutes,
	formatExamTime,
} from "@/features/exam/utils/exam-dates";
import { formatDay } from "@/lib/dates/format-day";
import { endedByClock } from "@/lib/progress/exam-session-selectors";
import type { IExamSession } from "@/lib/progress/progress-schema";
import { cn } from "@/lib/utils";

interface IVerdictCardProps {
	session: IExamSession;
	total: number;
}

/** Laid out like the commission's record: the official grading writes POLOŽIO or NIJE POLOŽIO, so the verdict is a stamp. */
export default function VerdictCard({ session, total }: IVerdictCardProps) {
	const passed = session.passed === true;
	const finishedAt = session.finishedAt ?? session.startedAt;
	const Icon = passed ? CircleCheck : CircleX;

	return (
		<section
			aria-labelledby="verdict-title"
			className="relative overflow-hidden rounded-[1.6rem] bg-[#002c78] p-5 text-[#eaf3ff] sm:p-7 dark:ring-1 dark:ring-white/15"
		>
			<p className="font-mono text-[0.72rem] tracking-[0.2em] text-[#8fd3f7]">
				ZAPISNIK PROBNOG ISPITA · KATEGORIJA {session.level}
			</p>
			<p className="mt-1 text-[0.9rem] text-[#eaf3ff]/80">
				{formatDay(finishedAt)} u {formatExamTime(finishedAt)}, trajalo{" "}
				{durationMinutes(session.startedAt, finishedAt)} min
			</p>

			<div className="mt-5 flex flex-col items-start gap-5">
				<h1
					id="verdict-title"
					className={cn(
						"inline-flex -rotate-2 items-center gap-2.5 rounded-[0.6rem] border-[3px] px-4 py-2 font-mono text-[1.45rem] font-bold tracking-[0.08em] sm:text-[1.7rem]",
						passed
							? "border-[#5fe0a8] text-[#5fe0a8]"
							: "border-[#ff9aa8] text-[#ff9aa8]",
					)}
				>
					<Icon className="size-7" aria-hidden="true" />
					{passed ? "POLOŽIO" : "NIJE POLOŽIO"}
				</h1>

				<p>
					<span className="block font-serif text-4xl leading-none text-white tabular-nums">
						{session.score ?? 0}
						<span className="text-2xl text-[#eaf3ff]/70">/{total}</span>
					</span>
					<span className="mt-1 block text-[0.85rem] text-[#eaf3ff]/80">
						točnih odgovora
					</span>
				</p>
			</div>

			<p className="mt-5 text-[0.98rem] leading-relaxed">
				{passed
					? "Prošao si svaki predmet. Ponovi simulaciju još koji put prije pravog ispita."
					: session.level === "B"
						? "Za prolaz treba proći svaki predmet. Pogledaj koji su te zadržali."
						: `Za prolaz treba ${course.examFormats.A.passPercent} % točnih. Pogledaj pogreške i vježbaj.`}
			</p>

			{endedByClock(session) && (
				<p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.85rem]">
					<TimerOff className="size-4" aria-hidden="true" />
					Vrijeme je isteklo, ispit se predao sam.
				</p>
			)}
		</section>
	);
}
