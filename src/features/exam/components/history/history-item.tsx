import { Link } from "@tanstack/react-router";
import { ChevronRight, CircleCheck, CircleX } from "lucide-react";
import { formatExamTime } from "@/features/exam/utils/exam-dates";
import {
	storedSubjectScores,
	totalQuestions,
} from "@/features/exam/utils/stored-subject-scores";
import { formatDay } from "@/lib/dates/format-day";
import type { IExamSession } from "@/lib/progress/progress-schema";
import { cn } from "@/lib/utils";

interface IHistoryItemProps {
	session: IExamSession;
}

export default function HistoryItem({ session }: IHistoryItemProps) {
	const finishedAt = session.finishedAt ?? session.startedAt;
	const passed = session.passed === true;
	const Icon = passed ? CircleCheck : CircleX;

	return (
		<li>
			<Link
				to="/ispit/rezultat/$sessionId"
				params={{ sessionId: session.id }}
				className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-card p-4 outline-none hover:border-[#0a63b0]/45 focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:hover:border-[#4cc2ff]/50"
			>
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
						<span className="font-semibold">{formatDay(finishedAt)}</span>
						<span className="text-[0.85rem] text-muted-foreground">
							{formatExamTime(finishedAt)}
						</span>
						<span className="rounded-full bg-[#eaf3ff] px-2 py-0.5 font-mono text-[0.72rem] font-semibold text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
							{session.level}
						</span>
					</div>

					<p
						className={cn(
							"mt-1 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold",
							passed
								? "text-emerald-700 dark:text-emerald-400"
								: "text-rose-700 dark:text-rose-400",
						)}
					>
						<Icon className="size-4" aria-hidden="true" />
						{passed ? "Položio" : "Nije položio"}
						<span className="font-normal text-muted-foreground">
							{session.score ?? 0}/{totalQuestions(session)}
						</span>
					</p>

					<ul
						aria-label="Po predmetima"
						className="mt-2 flex flex-wrap gap-1.5"
					>
						{storedSubjectScores(session).map((subject) => (
							<li
								key={subject.subjectId}
								title={subject.label}
								className={cn(
									"inline-flex items-center gap-1 rounded-[0.5rem] border px-2 py-1 font-mono text-[0.8rem] tabular-nums",
									subject.passed
										? "border-emerald-600/35 dark:border-emerald-500/40"
										: "border-rose-600/45 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-950/40",
								)}
							>
								<span className="sr-only">
									{subject.label},{" "}
									{subject.passed ? "zadovoljio" : "nije zadovoljio"}:
								</span>
								{!subject.passed && (
									<CircleX
										className="size-3.5 text-rose-700 dark:text-rose-400"
										aria-hidden="true"
									/>
								)}
								{subject.correct}/{subject.total}
							</li>
						))}
					</ul>
				</div>

				<ChevronRight
					className="size-5 shrink-0 text-muted-foreground"
					aria-hidden="true"
				/>
			</Link>
		</li>
	);
}
