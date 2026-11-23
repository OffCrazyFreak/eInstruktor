import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { isExamSubjectId } from "@/content/voditelj-brodice/subjects";
import SubjectRow, { LABEL_TEXT } from "@/features/home/components/subject-row";
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

			<details className="mt-3 text-[0.88rem]">
				<summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-[#0a63b0] dark:text-[#4cc2ff]">
					Kako računamo?
				</summary>
				<p className="leading-relaxed text-muted-foreground">
					Za svaki predmet gledamo tvojih zadnjih 20 prvih odgovora i koliko si
					pitanja već vidio. Spreman si s barem 85 % točnih i 80 % viđenih
					pitanja, a ispit se polaže po predmetima, pa ukupna procjena prati
					najslabiji.
				</p>
			</details>

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
