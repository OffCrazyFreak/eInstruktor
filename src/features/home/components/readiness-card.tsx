import { Link } from "@tanstack/react-router";
import ReadinessExplainer from "@/components/custom/readiness/readiness-explainer";
import SubjectRow, {
	LABEL_TEXT,
} from "@/components/custom/readiness/subject-row";
import { Button } from "@/components/ui/button";
import { isExamSubjectId } from "@/content/voditelj-brodice/subjects";
import type { IReadiness } from "@/lib/progress/readiness";

interface IReadinessCardProps {
	readiness: IReadiness;
}

export default function ReadinessCard({ readiness }: IReadinessCardProps) {
	const showWeakest =
		readiness.subjects.length > 1 && readiness.weakest !== null;

	const weakest = readiness.weakest;

	return (
		<section
			aria-labelledby="readiness-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<div className="flex items-baseline justify-between gap-3">
				<h2 id="readiness-title" className="font-serif text-xl">
					Spremnost
				</h2>
				<span className="text-[0.8rem] text-muted-foreground">
					Procjena, ne jamstvo
				</span>
			</div>

			<p className="mt-1 text-[0.95rem]">
				<span className="text-muted-foreground">Ukupno: </span>
				<span className="font-semibold">{LABEL_TEXT[readiness.overall]}</span>
			</p>

			<ul className="mt-3 space-y-1">
				{readiness.subjects.map((subject) => (
					<SubjectRow
						key={subject.id}
						subject={subject}
						weakest={showWeakest && subject.id === readiness.weakest?.id}
					/>
				))}
			</ul>

			<ReadinessExplainer className="mt-3" />

			{weakest && (
				<Button
					asChild
					variant="outline"
					className="mt-3 h-11 w-full rounded-full font-semibold"
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
