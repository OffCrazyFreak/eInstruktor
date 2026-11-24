interface IPracticeStatsCardProps {
	/** Share of the level's exam questions answered at least once. */
	coverage: number;
	/** Share right over the last 20 first answers, or null with none yet. */
	accuracy: number | null;
	answers: number;
	lessonsDone: number;
	lessonsTotal: number;
}

function percent(share: number): string {
	return `${Math.round(share * 100)} %`;
}

export default function PracticeStatsCard({
	coverage,
	accuracy,
	answers,
	lessonsDone,
	lessonsTotal,
}: IPracticeStatsCardProps) {
	const figures = [
		{ label: "Viđenih pitanja", value: percent(coverage) },
		{
			label: "Točnih, zadnjih 20",
			value: accuracy === null ? "Još ništa" : percent(accuracy),
		},
		{ label: "Odgovora", value: String(answers) },
		{ label: "Lekcija gotovo", value: `${lessonsDone} od ${lessonsTotal}` },
	];

	return (
		<section
			aria-labelledby="stats-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id="stats-title" className="font-serif text-xl">
				Pokrivenost i točnost
			</h2>

			<dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
				{figures.map((figure) => (
					<div
						key={figure.label}
						className="rounded-xl bg-[#eaf3ff] px-3 py-2.5 dark:bg-accent"
					>
						<dt className="text-[0.8rem] text-muted-foreground">
							{figure.label}
						</dt>
						<dd className="mt-0.5 font-serif text-[1.45rem] leading-tight tabular-nums">
							{figure.value}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
