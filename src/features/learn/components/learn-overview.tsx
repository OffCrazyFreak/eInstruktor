import course from "@/content/voditelj-brodice";
import AreaCard from "@/features/learn/components/area-card";
import IntroLessonCard from "@/features/learn/components/intro-lesson-card";
import { getLesson, getLessonsByArea } from "@/lib/content/course-selectors";
import useProgress from "@/lib/progress/use-progress";

export default function LearnOverview() {
	const { progress, ready, level } = useProgress();
	const intro = getLesson(course, course.introLessonSlug);
	const areas = [...course.areas].sort(
		(first, second) => first.order - second.order,
	);

	const lessonCount = areas.reduce(
		(sum, area) => sum + getLessonsByArea(course, area.slug, level).length,
		0,
	);

	return (
		<main className="mx-auto max-w-5xl px-4 pt-7 pb-8 sm:px-6 lg:pt-10">
			<h1 className="font-serif text-3xl leading-tight sm:text-4xl">Učenje</h1>
			<p className="mt-2 text-[1rem] text-muted-foreground">
				{areas.length} područja i {lessonCount} kratkih lekcija za kategoriju{" "}
				{level}. Kreni redom ili otvori temu koja te zanima.
			</p>

			{intro && (
				<div className="mt-6">
					<IntroLessonCard
						lesson={intro}
						done={ready && progress.lessonsDone[intro.slug] !== undefined}
					/>
				</div>
			)}

			<h2 className="mt-10 font-mono text-[0.74rem] tracking-[0.2em] text-ocean dark:text-[#4cc2ff]">
				PODRUČJA
			</h2>

			<ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{areas.map((area) => {
					const lessons = getLessonsByArea(course, area.slug, level);
					const done = lessons.filter(
						(lesson) => progress.lessonsDone[lesson.slug] !== undefined,
					).length;

					return (
						<li key={area.slug}>
							<AreaCard
								area={area}
								done={done}
								total={lessons.length}
								ready={ready}
							/>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
