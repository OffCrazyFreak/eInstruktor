import { Link } from "@tanstack/react-router";
import { ChevronRight, CircleCheck, CircleX } from "lucide-react";
import { formatDay } from "@/lib/dates/format-day";
import type { IExamSession } from "@/lib/progress/progress-schema";
import { cn } from "@/lib/utils";

interface IExamSummaryCardProps {
	/** Finished exams, newest first. */
	sessions: IExamSession[];
}

export default function ExamSummaryCard({ sessions }: IExamSummaryCardProps) {
	const latest = sessions[0];
	const passed = sessions.filter((session) => session.passed).length;

	return (
		<section
			aria-labelledby="exam-summary-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id="exam-summary-title" className="font-serif text-xl">
				Probni ispiti
			</h2>

			{latest ? (
				<>
					<p className="mt-2 text-[1.05rem] font-semibold">
						Položeno {passed} od {sessions.length}
					</p>
					<p
						className={cn(
							"mt-1 inline-flex items-center gap-1.5 text-[0.9rem]",
							latest.passed
								? "text-emerald-700 dark:text-emerald-400"
								: "text-rose-700 dark:text-rose-400",
						)}
					>
						{latest.passed ? (
							<CircleCheck className="size-4" aria-hidden="true" />
						) : (
							<CircleX className="size-4" aria-hidden="true" />
						)}
						Zadnji {formatDay(latest.finishedAt ?? latest.startedAt)}:{" "}
						{latest.passed ? "položio" : "nije položio"}, {latest.score} od{" "}
						{latest.questionIds.length}
					</p>
				</>
			) : (
				<p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
					Još nisi riješio probni ispit. Kad ga predaš, ovdje vidiš kako ti ide.
				</p>
			)}

			<Link
				to={latest ? "/ispit/povijest" : "/ispit"}
				className="mt-3 -ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 font-semibold text-[#0a63b0] hover:bg-accent dark:text-[#4cc2ff]"
			>
				{latest ? "Povijest ispita" : "Riješi probni ispit"}
				<ChevronRight className="size-4" aria-hidden="true" />
			</Link>
		</section>
	);
}
