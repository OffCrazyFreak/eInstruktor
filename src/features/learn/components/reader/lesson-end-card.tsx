import { Link } from "@tanstack/react-router";
import { ArrowRight, ListChecks, NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AreaSlug, ILesson } from "@/content/types";

interface ILessonEndCardProps {
	next: ILesson | undefined;
	/** Null for Lekcija 0, which has no area cheat sheet. */
	cheatSheetArea: AreaSlug | null;
}

export default function LessonEndCard({
	next,
	cheatSheetArea,
}: ILessonEndCardProps) {
	return (
		<section
			aria-labelledby="lesson-end-title"
			className="rounded-[1.6rem] bg-[#002c78] dark:ring-1 dark:ring-white/15 p-5 text-[#eaf3ff] sm:p-7"
		>
			<p className="font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				KRAJ LEKCIJE
			</p>
			<h2 id="lesson-end-title" className="mt-2 font-serif text-2xl text-white">
				Što dalje?
			</h2>

			{next && (
				<Link
					to="/ucenje/$area/$lesson"
					params={{ area: next.area, lesson: next.slug }}
					className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white outline-none hover:bg-white/15 hover:text-white focus-visible:ring-[3px] focus-visible:ring-[#00aef3]"
				>
					<span className="min-w-0 flex-1">
						<span className="block text-[0.8rem] text-[#eaf3ff]/75">
							Sljedeća lekcija, {next.minutes} min
						</span>
						<span className="mt-0.5 block font-semibold">{next.title}</span>
					</span>
					<ArrowRight className="size-5 shrink-0" aria-hidden="true" />
				</Link>
			)}

			<div className="mt-3 flex flex-col gap-2 sm:flex-row">
				<Button
					asChild
					variant="secondary"
					className="h-12 rounded-full text-[0.95rem] font-semibold"
				>
					<Link to="/vjezba">
						<ListChecks className="size-4" aria-hidden="true" />
						Vježbaj ovu temu
					</Link>
				</Button>

				{cheatSheetArea && (
					<Button
						asChild
						variant="ghost"
						className="h-12 rounded-full text-[0.95rem] font-semibold text-[#eaf3ff] hover:bg-white/10 hover:text-white"
					>
						<Link
							to="/ucenje/$area"
							params={{ area: cheatSheetArea }}
							hash="brzi-pregled"
						>
							<NotebookText className="size-4" aria-hidden="true" />
							Brzi pregled područja
						</Link>
					</Button>
				)}
			</div>
		</section>
	);
}
