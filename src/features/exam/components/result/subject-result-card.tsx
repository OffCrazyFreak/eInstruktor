import { CircleCheck, CircleX } from "lucide-react";
import type { ISubjectScore } from "@/features/exam/utils/score-exam";
import { cn } from "@/lib/utils";

interface ISubjectResultCardProps {
	subject: ISubjectScore;
	/** "Treba 6 od 8" or "Treba 70 %". */
	requirement: string;
}

// Small exams show one tick per question; a long single-subject A exam shows a bar instead.
const MAX_TICKS = 10;

export default function SubjectResultCard({
	subject,
	requirement,
}: ISubjectResultCardProps) {
	const Icon = subject.passed ? CircleCheck : CircleX;

	return (
		<li
			className={cn(
				"rounded-[1.2rem] border-2 bg-card p-4",
				subject.passed
					? "border-emerald-600/35 dark:border-emerald-500/40"
					: "border-rose-600/45 dark:border-rose-500/50",
			)}
		>
			<div className="flex items-start justify-between gap-3">
				<h3 className="min-w-0 font-semibold leading-snug">{subject.label}</h3>
				<p className="shrink-0 font-mono text-[1.15rem] font-semibold tabular-nums">
					{subject.correct}/{subject.total}
				</p>
			</div>

			{subject.total <= MAX_TICKS ? (
				<div aria-hidden="true" className="mt-3 flex gap-1">
					{Array.from({ length: subject.total }, (_, index) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: ticks have no identity beyond their position.
							key={index}
							className={cn(
								"h-2 flex-1 rounded-full",
								index < subject.correct
									? "bg-[#0a63b0] dark:bg-[#4cc2ff]"
									: "bg-[#eaf3ff] dark:bg-accent",
							)}
						/>
					))}
				</div>
			) : (
				<div
					aria-hidden="true"
					className="mt-3 h-2 rounded-full bg-[#eaf3ff] dark:bg-accent"
				>
					<div
						className="h-full rounded-full bg-[#0a63b0] dark:bg-[#4cc2ff]"
						style={{ width: `${(subject.correct / subject.total) * 100}%` }}
					/>
				</div>
			)}

			<div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.85rem]">
				<span
					className={cn(
						"inline-flex items-center gap-1.5 font-semibold",
						subject.passed
							? "text-emerald-700 dark:text-emerald-400"
							: "text-rose-700 dark:text-rose-400",
					)}
				>
					<Icon className="size-4" aria-hidden="true" />
					{subject.passed ? "Zadovoljio" : "Nije zadovoljio"}
				</span>
				<span className="text-muted-foreground">{requirement}</span>
			</div>
		</li>
	);
}
