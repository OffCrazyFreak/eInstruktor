import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	type ReadinessSubjectId,
	SUBJECT_LABELS,
} from "@/content/voditelj-brodice/subjects";
import {
	type IReadiness,
	type ISubjectReadiness,
	MIN_ANSWERS,
	READY_ACCURACY,
	type ReadinessLabel,
} from "@/lib/progress/readiness";
import { cn } from "@/lib/utils";

interface IReadinessCardProps {
	readiness: IReadiness;
}

const LABEL_TEXT: Record<ReadinessLabel, string> = {
	"premalo-podataka": "Premalo podataka",
	"za-pocetak": "Za početak",
	"na-dobrom-putu": "Na dobrom putu",
	spreman: "Spreman",
};

function subjectLabel(id: string): string {
	return SUBJECT_LABELS[id as ReadinessSubjectId] ?? id;
}

function SubjectRow({
	subject,
	weakest,
}: {
	subject: ISubjectReadiness;
	weakest: boolean;
}) {
	const measured =
		subject.label !== "premalo-podataka" && subject.accuracy !== null;

	return (
		<li
			className={cn(
				"rounded-xl px-3 py-2.5",
				weakest && "bg-[#fff6e6] ring-1 ring-[#ffb43c]/60 dark:bg-[#3a2a0c]",
			)}
		>
			<div className="flex items-baseline justify-between gap-3 text-[0.92rem]">
				<span className="min-w-0 font-semibold leading-snug">
					{subjectLabel(subject.id)}
				</span>
				<span className="shrink-0 text-[0.82rem] text-muted-foreground">
					{measured
						? `${Math.round((subject.accuracy ?? 0) * 100)} %`
						: `${subject.answered}/${MIN_ANSWERS}`}
				</span>
			</div>

			<div className="relative mt-2 h-2 rounded-full bg-[#eaf3ff] dark:bg-accent">
				{measured && (
					<div
						className="h-full rounded-full bg-[#0a63b0] dark:bg-[#4cc2ff]"
						style={{ width: `${(subject.accuracy ?? 0) * 100}%` }}
					/>
				)}
				<span
					aria-hidden="true"
					title="Cilj za Spreman"
					className="absolute -top-1 h-4 w-0.5 rounded-full bg-[#002c78]/50 dark:bg-white/50"
					style={{ left: `${READY_ACCURACY * 100}%` }}
				/>
			</div>

			<p className="mt-1.5 text-[0.8rem] text-muted-foreground">
				{weakest && (
					<span className="font-semibold text-[#a35f00] dark:text-[#ffd48a]">
						Najslabije.{" "}
					</span>
				)}
				{LABEL_TEXT[subject.label]}
			</p>
		</li>
	);
}

export default function ReadinessCard({ readiness }: IReadinessCardProps) {
	const showWeakest =
		readiness.subjects.length > 1 &&
		readiness.weakest?.label !== "premalo-podataka";

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

			<Button
				asChild
				variant="outline"
				className="mt-3 h-11 w-full rounded-full font-semibold"
			>
				<Link to="/vjezba">Vježbaj najslabije</Link>
			</Button>
		</section>
	);
}
