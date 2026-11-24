import { Link } from "@tanstack/react-router";
import ReadinessExplainer from "@/components/custom/readiness/readiness-explainer";
import SubjectRow, {
	LABEL_TEXT,
} from "@/components/custom/readiness/subject-row";
import { Button } from "@/components/ui/button";
import {
	isExamSubjectId,
	type ReadinessSubjectId,
	SUBJECT_LABELS,
} from "@/content/voditelj-brodice/subjects";
import type { IReadiness } from "@/lib/progress/readiness";

interface IReadinessPanelProps {
	readiness: IReadiness;
}

export default function ReadinessPanel({ readiness }: IReadinessPanelProps) {
	const weakest = readiness.weakest;
	const showWeakest = readiness.subjects.length > 1 && weakest !== null;

	return (
		<section
			aria-labelledby="readiness-title"
			className="rounded-[1.6rem] bg-brand p-5 text-[#eaf3ff] sm:p-6 dark:ring-1 dark:ring-white/15"
		>
			<div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
				<h2 id="readiness-title" className="font-serif text-xl text-white">
					Spremnost za ispit
				</h2>
				<span className="text-[0.82rem] text-[#eaf3ff]/75">
					Procjena, ne jamstvo
				</span>
			</div>

			<p className="mt-3 font-serif text-[2rem] leading-tight text-white">
				{LABEL_TEXT[readiness.overall]}
			</p>

			{showWeakest && weakest && (
				<p className="mt-1 text-[0.95rem]">
					Najslabije:{" "}
					<span className="font-semibold text-[#ffb43c]">
						{SUBJECT_LABELS[weakest.id as ReadinessSubjectId] ?? weakest.id}
					</span>
				</p>
			)}

			<ul className="mt-5 space-y-1 rounded-[1.2rem] bg-card p-2 text-card-foreground">
				{readiness.subjects.map((subject) => (
					<SubjectRow
						key={subject.id}
						subject={subject}
						weakest={showWeakest && subject.id === weakest?.id}
					/>
				))}
			</ul>

			<ReadinessExplainer className="mt-3 [&_p]:text-[#eaf3ff]/80 [&_summary]:text-[#00aef3]" />

			{weakest && (
				<Button
					asChild
					variant="secondary"
					className="mt-3 h-12 w-full rounded-full font-semibold dark:bg-[#00aef3] dark:text-[#04142e] dark:hover:bg-[#4cc2ff]"
				>
					<Link
						to="/vjezba/serija"
						search={{
							mode: "mjesovito",
							subject: isExamSubjectId(weakest.id) ? weakest.id : undefined,
							length: 10,
						}}
					>
						Vježbaj najslabije
					</Link>
				</Button>
			)}
		</section>
	);
}
