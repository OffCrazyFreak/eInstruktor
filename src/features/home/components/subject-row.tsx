import {
	type ReadinessSubjectId,
	SUBJECT_LABELS,
} from "@/content/voditelj-brodice/subjects";
import {
	type ISubjectReadiness,
	MIN_ANSWERS,
	READY_ACCURACY,
	type ReadinessLabel,
} from "@/lib/progress/readiness";
import { cn } from "@/lib/utils";

interface ISubjectRowProps {
	subject: ISubjectReadiness;
	weakest: boolean;
}

export const LABEL_TEXT: Record<ReadinessLabel, string> = {
	"premalo-podataka": "Premalo podataka",
	"za-pocetak": "Za početak",
	"na-dobrom-putu": "Na dobrom putu",
	spreman: "Spreman",
};

function subjectLabel(id: string): string {
	return SUBJECT_LABELS[id as ReadinessSubjectId] ?? id;
}

export default function SubjectRow({ subject, weakest }: ISubjectRowProps) {
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
