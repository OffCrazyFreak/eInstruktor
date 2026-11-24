import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { IArea, ILesson } from "@/content/types";
import CourseLine from "@/features/home/components/course-line";

interface IContinueCardProps {
	lesson: ILesson;
	area: IArea | undefined;
	/** Share of the lesson already read; 0 for a lesson not started yet. */
	percent: number;
}

export default function ContinueCard({
	lesson,
	area,
	percent,
}: IContinueCardProps) {
	const started = percent > 0;

	return (
		<Link
			to="/ucenje/$area/$lesson"
			params={{ area: lesson.area, lesson: lesson.slug }}
			className="group relative block overflow-hidden rounded-[1.6rem] bg-brand dark:ring-1 dark:ring-white/15 p-5 text-[#eaf3ff] outline-none hover:text-[#eaf3ff] focus-visible:ring-[3px] focus-visible:ring-ring sm:p-6"
		>
			<span
				aria-hidden="true"
				className="absolute -top-12 -right-8 size-40 rounded-full bg-[#ffb43c]/30 blur-2xl"
			/>

			<span className="relative font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				NASTAVI
			</span>
			<span className="relative mt-3 block text-[0.85rem] text-[#eaf3ff]/75">
				{area?.title ?? "Prije svega"}
			</span>
			<span className="relative mt-1 block font-serif text-[1.6rem] leading-tight text-white">
				{lesson.title}
			</span>

			<span className="relative mt-5 block">
				<CourseLine percent={percent} />
			</span>

			<span className="relative mt-2 flex items-center justify-between gap-3 text-[0.9rem]">
				<span className="text-[#eaf3ff]/80">
					{started
						? `Pročitano ${Math.round(percent * 100)} %`
						: `Nova lekcija, ${lesson.minutes} min`}
				</span>
				<span className="inline-flex items-center gap-1.5 font-semibold text-white">
					{started ? "Nastavi" : "Počni"}
					<ArrowRight
						className="size-4 transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</span>
			</span>
		</Link>
	);
}
