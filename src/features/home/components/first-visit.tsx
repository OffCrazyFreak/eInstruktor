import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import LevelSheet from "@/components/custom/app-shell/level-sheet";
import { Button } from "@/components/ui/button";
import type { ILesson } from "@/content/types";

interface IFirstVisitProps {
	intro: ILesson;
}

export default function FirstVisit({ intro }: IFirstVisitProps) {
	return (
		<section
			aria-labelledby="first-visit-title"
			className="relative overflow-hidden rounded-[1.8rem] bg-brand dark:ring-1 dark:ring-white/15 px-5 pt-8 pb-6 text-[#eaf3ff] sm:px-8 sm:pt-10"
		>
			<span
				aria-hidden="true"
				className="absolute -top-16 -right-10 size-56 rounded-full bg-[#ffb43c]/35 blur-3xl"
			/>

			<p className="relative font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				DOBRO DOŠAO
			</p>
			<h1
				id="first-visit-title"
				className="relative mt-3 max-w-md font-serif text-[2rem] leading-tight text-white sm:text-4xl"
			>
				Kreni od Lekcije 0
			</h1>
			<p className="relative mt-3 max-w-md text-[1rem] leading-relaxed text-[#eaf3ff]/85">
				Za {intro.minutes} minuta saznaš koja ti kategorija treba, gdje se
				prijaviti, što ponijeti i kako izgleda usmeni ispit.
			</p>

			<div className="relative mt-7 flex flex-col gap-2 sm:flex-row">
				<Button
					asChild
					className="h-12 rounded-full bg-white px-6 text-[1rem] font-semibold text-[#002c78] hover:bg-[#eaf3ff]"
				>
					<Link
						to="/ucenje/$area/$lesson"
						params={{ area: intro.area, lesson: intro.slug }}
					>
						Počni s Lekcijom 0
						<ArrowRight className="size-4" aria-hidden="true" />
					</Link>
				</Button>

				<LevelSheet>
					<Button
						type="button"
						variant="ghost"
						className="h-12 rounded-full px-6 text-[1rem] font-semibold text-white hover:bg-white/10 hover:text-white"
					>
						Odaberi razinu
					</Button>
				</LevelSheet>
			</div>

			<p className="relative mt-6 text-[0.85rem] text-[#eaf3ff]/70">
				Bez registracije. Napredak ostaje u ovom pregledniku.
			</p>
		</section>
	);
}
