import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { ILesson } from "@/content/types";

interface IIntroLessonCardProps {
	lesson: ILesson;
	done: boolean;
}

export default function IntroLessonCard({
	lesson,
	done,
}: IIntroLessonCardProps) {
	return (
		<Link
			to="/ucenje/$area/$lesson"
			params={{ area: lesson.area, lesson: lesson.slug }}
			className="group relative block overflow-hidden rounded-[1.6rem] bg-brand dark:ring-1 dark:ring-white/15 p-5 text-[#eaf3ff] outline-none hover:text-[#eaf3ff] focus-visible:ring-[3px] focus-visible:ring-ring sm:p-6"
		>
			<span
				aria-hidden="true"
				className="absolute -top-10 -right-10 size-36 rounded-full bg-[#ffb43c]/25 blur-2xl"
			/>

			<span className="relative flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				PRIJE SVEGA
				{done && (
					<span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2 py-0.5 font-sans text-[0.75rem] tracking-normal text-white">
						<CircleCheck className="size-3.5" aria-hidden="true" />
						Gotovo
					</span>
				)}
			</span>

			<span className="relative mt-2 block font-serif text-2xl leading-tight text-white">
				{lesson.title}
			</span>
			<span className="relative mt-2 block max-w-prose text-[0.95rem] leading-relaxed text-[#eaf3ff]/85">
				{lesson.summary}
			</span>

			<span className="relative mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-white">
				{done ? "Pročitaj ponovno" : "Počni ovdje"}, {lesson.minutes} min
				<ArrowRight
					className="size-4 transition-transform group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>
		</Link>
	);
}
