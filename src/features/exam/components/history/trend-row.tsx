import { totalQuestions } from "@/features/exam/utils/stored-subject-scores";
import type { IExamSession } from "@/lib/progress/progress-schema";
import { cn } from "@/lib/utils";

interface ITrendRowProps {
	/** Newest first, as the history lists them. */
	sessions: IExamSession[];
}

const TREND_LENGTH = 10;

function share(session: IExamSession): number {
	const total = totalQuestions(session);

	return total === 0 ? 0 : (session.score ?? 0) / total;
}

/** The last ten results as bars, oldest on the left, so the direction reads at a glance. */
export default function TrendRow({ sessions }: ITrendRowProps) {
	const recent = sessions.slice(0, TREND_LENGTH).reverse();
	const summary = recent
		.map((session) => `${Math.round(share(session) * 100)} %`)
		.join(", ");

	return (
		<section
			aria-labelledby="trend-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<div className="flex items-baseline justify-between gap-3">
				<h2 id="trend-title" className="font-serif text-xl">
					Kretanje
				</h2>
				<span className="text-[0.82rem] text-muted-foreground">
					Zadnjih {recent.length}, starije lijevo
				</span>
			</div>

			<p className="sr-only">Točnost od starijeg prema novijem: {summary}.</p>

			<div aria-hidden="true" className="mt-4 flex h-24 items-end gap-1.5">
				{recent.map((session) => (
					<div
						key={session.id}
						className="flex h-full flex-1 flex-col justify-end"
					>
						<div
							className={cn(
								"min-h-1.5 rounded-t-[0.4rem]",
								session.passed
									? "bg-[#0a63b0] dark:bg-[#4cc2ff]"
									: "bg-[#0a63b0]/35 dark:bg-[#4cc2ff]/35",
							)}
							style={{ height: `${share(session) * 100}%` }}
						/>
					</div>
				))}
			</div>

			<div aria-hidden="true" className="mt-1.5 flex gap-1.5">
				{recent.map((session) => (
					<span
						key={session.id}
						className="flex-1 text-center font-mono text-[0.72rem] text-muted-foreground tabular-nums"
					>
						{Math.round(share(session) * 100)}
					</span>
				))}
			</div>

			<div
				aria-hidden="true"
				className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-muted-foreground"
			>
				<span className="inline-flex items-center gap-1.5">
					<span className="size-2.5 rounded-[0.2rem] bg-[#0a63b0] dark:bg-[#4cc2ff]" />
					Položio
				</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="size-2.5 rounded-[0.2rem] bg-[#0a63b0]/35 dark:bg-[#4cc2ff]/35" />
					Nije položio
				</span>
			</div>
		</section>
	);
}
