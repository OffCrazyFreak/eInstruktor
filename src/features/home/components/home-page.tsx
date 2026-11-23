import course from "@/content/voditelj-brodice";
import FirstVisit from "@/features/home/components/first-visit";
import HomeDashboard from "@/features/home/components/home-dashboard";
import { getLesson } from "@/lib/content/course-selectors";
import { hasAnyProgress } from "@/lib/progress/progress-schema";
import useProgress from "@/lib/progress/use-progress";

function HomeSkeleton() {
	return (
		<div aria-busy="true" className="space-y-4">
			<span className="sr-only">Učitavam tvoj napredak</span>
			<div className="h-9 w-56 animate-pulse rounded-xl bg-muted" />
			<div className="h-48 animate-pulse rounded-[1.6rem] bg-muted" />
			<div className="h-32 animate-pulse rounded-[1.4rem] bg-muted" />
		</div>
	);
}

export default function HomePage() {
	const { progress, ready, level } = useProgress();
	const intro = getLesson(course, course.introLessonSlug);

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			{!ready ? (
				<HomeSkeleton />
			) : !hasAnyProgress(progress) && intro ? (
				<FirstVisit intro={intro} />
			) : (
				<HomeDashboard progress={progress} level={level} />
			)}
		</main>
	);
}
