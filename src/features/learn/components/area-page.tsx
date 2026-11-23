import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";
import AreaIcon from "@/components/custom/content/area-icon";
import type { IArea } from "@/content/types";
import course from "@/content/voditelj-brodice";
import { SUBJECT_LABELS } from "@/content/voditelj-brodice/subjects";
import CheatSheet from "@/features/learn/components/cheat-sheet";
import LessonRow from "@/features/learn/components/lesson-row";
import ProgressMeter from "@/features/learn/components/progress-meter";
import { getLessonsByArea } from "@/lib/content/course-selectors";
import { pluralHr } from "@/lib/plural";
import useProgress from "@/lib/progress/use-progress";

interface IAreaPageProps {
	area: IArea;
}

export default function AreaPage({ area }: IAreaPageProps) {
	const { progress, ready, level } = useProgress();
	const lessons = getLessonsByArea(course, area.slug, level);
	const bOnly =
		level === "A"
			? getLessonsByArea(course, area.slug).filter(
					(lesson) => lesson.level === "B",
				)
			: [];
	const done = lessons.filter(
		(lesson) => progress.lessonsDone[lesson.slug] !== undefined,
	).length;

	function row(lesson: (typeof lessons)[number], position: number) {
		return (
			<li key={lesson.slug}>
				<LessonRow
					lesson={lesson}
					position={position}
					done={ready && progress.lessonsDone[lesson.slug] !== undefined}
					inProgress={ready && progress.lastLesson?.slug === lesson.slug}
				/>
			</li>
		);
	}

	return (
		<main className="mx-auto max-w-2xl px-4 pt-5 pb-8 sm:px-6 lg:pt-8">
			<Link
				to="/ucenje"
				className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-[0.9rem] font-medium text-[#0a63b0] hover:text-primary"
			>
				<ChevronLeft className="size-4" aria-hidden="true" />
				Učenje
			</Link>

			<div className="mt-3 flex items-start gap-4">
				<span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
					<AreaIcon name={area.icon} className="size-7" />
				</span>

				<div className="min-w-0">
					<p className="font-mono text-[0.72rem] tracking-[0.16em] text-[#0a63b0] dark:text-[#4cc2ff]">
						{SUBJECT_LABELS[area.subject].toUpperCase()}
					</p>
					<h1 className="mt-1 font-serif text-[1.75rem] leading-tight sm:text-4xl">
						{area.title}
					</h1>
				</div>
			</div>

			<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
				{area.summary}
			</p>

			<div className="mt-4">
				<ProgressMeter done={done} total={lessons.length} ready={ready} />
			</div>

			<h2 className="sr-only">Lekcije</h2>
			<ol className="mt-6 space-y-2.5">
				{lessons.map((lesson, index) => row(lesson, index + 1))}
			</ol>

			{bOnly.length > 0 && (
				<details className="group mt-4 rounded-2xl border border-dashed border-[#002c78]/25">
					<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 text-[0.95rem] font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 [&::-webkit-details-marker]:hidden">
						Još {bOnly.length}{" "}
						{pluralHr(bOnly.length, "lekcija", "lekcije", "lekcija")} samo za
						kategoriju B
						<ChevronDown
							className="size-5 text-muted-foreground transition-transform group-open:rotate-180"
							aria-hidden="true"
						/>
					</summary>
					<ul className="space-y-2.5 px-3 pb-3">
						{bOnly.map((lesson, index) =>
							row(lesson, lessons.length + index + 1),
						)}
					</ul>
				</details>
			)}

			<div className="mt-10">
				<CheatSheet lessons={lessons} />
			</div>
		</main>
	);
}
