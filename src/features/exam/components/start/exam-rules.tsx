import { Info } from "lucide-react";
import type { ExamLevel, ICourse } from "@/content/course-types";

interface IExamRulesProps {
	course: ICourse;
	level: ExamLevel;
}

function rulesFor(course: ICourse, level: ExamLevel): string[] {
	if (level === "A") {
		const format = course.examFormats.A;
		const needed = Math.ceil((format.questions * format.passPercent) / 100);

		return [
			`${format.questions} pitanja iz osnova plovidbe.`,
			`${format.minutes} minuta, ako ne odabereš drukčije.`,
			`Prolaziš sa ${format.passPercent} % točnih, to je ${needed} od ${format.questions}.`,
		];
	}

	const format = course.examFormats.B;
	const subjects = new Set(course.areas.map((area) => area.subject)).size;
	const total = format.questionsPerSubject * subjects;

	return [
		`${total} pitanja, ${format.questionsPerSubject} iz svakog od ${subjects} predmeta, predmet po predmet.`,
		`${format.minutes} minuta, ako ne odabereš drukčije.`,
		`Predmet prolaziš sa ${format.passPerSubject} od ${format.questionsPerSubject} točnih, a ispit samo ako prođeš sve predmete.`,
	];
}

export default function ExamRules({ course, level }: IExamRulesProps) {
	return (
		<section
			aria-labelledby="exam-rules-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id="exam-rules-title" className="font-serif text-xl">
				Pravila
			</h2>

			<ul className="mt-3 space-y-2 text-[0.98rem] leading-snug">
				{rulesFor(course, level).map((rule) => (
					<li key={rule} className="flex gap-2.5">
						<span
							aria-hidden="true"
							className="mt-2 size-1.5 shrink-0 rounded-full bg-[#00aef3]"
						/>
						{rule}
					</li>
				))}
				<li className="flex gap-2.5">
					<span
						aria-hidden="true"
						className="mt-2 size-1.5 shrink-0 rounded-full bg-[#00aef3]"
					/>
					Možeš se vraćati na bilo koje pitanje, označiti ga za kasnije i
					predati ispit prije kraja.
				</li>
			</ul>

			<p className="mt-4 flex gap-2.5 rounded-xl bg-[#fff6e6] p-3 text-[0.92rem] leading-snug text-[#6b4300] dark:bg-[#3a2a0c] dark:text-[#ffd48a]">
				<Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
				Stvarni ispit je usmeni i nema službenog broja pitanja. Ovo je naša
				simulacija.
			</p>
		</section>
	);
}
