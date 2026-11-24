import type { ILesson } from "@/content/types";

interface ICheatSheetProps {
	lessons: ILesson[];
}

export default function CheatSheet({ lessons }: ICheatSheetProps) {
	const withNotes = lessons.filter((lesson) => lesson.cheatSheet.length > 0);

	return (
		<section
			id="brzi-pregled"
			aria-labelledby="brzi-pregled-title"
			className="scroll-mt-20 rounded-[1.6rem] border border-border bg-card p-5 sm:p-6"
		>
			<h2 id="brzi-pregled-title" className="font-serif text-2xl">
				Brzi pregled
			</h2>
			<p className="mt-1 text-[0.92rem] text-muted-foreground">
				Najvažnije iz svake lekcije, za ponavljanje prije ispita.
			</p>

			<div className="mt-5 space-y-5">
				{withNotes.map((lesson) => (
					<div key={lesson.slug}>
						<h3 className="font-mono text-[0.74rem] tracking-[0.14em] text-ocean dark:text-[#4cc2ff]">
							{lesson.title.toUpperCase()}
						</h3>
						<ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.98rem] leading-relaxed">
							{lesson.cheatSheet.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
