import { Link } from "@tanstack/react-router";
import type { ExamLevel } from "@/content/course-types";
import course from "@/content/voditelj-brodice";
import ContinueCard from "@/features/home/components/continue-card";
import ExamDateChip from "@/features/home/components/exam-date-chip";
import ReadinessCard from "@/features/home/components/readiness-card";
import TodayCard from "@/features/home/components/today-card";
import WeakAreasCard, {
	type IWeakArea,
} from "@/features/home/components/weak-areas-card";
import { getArea, getLesson } from "@/lib/content/course-selectors";
import { firstUnreadLesson } from "@/lib/content/lesson-order";
import { areaGroups, subjectGroups } from "@/lib/content/question-groups";
import { toStudyDay } from "@/lib/dates/study-day";
import { weakGroups } from "@/lib/progress/accuracy";
import { todayActivity } from "@/lib/progress/daily-goal";
import type { IProgressState } from "@/lib/progress/progress-schema";
import { readiness } from "@/lib/progress/readiness";
import { streak } from "@/lib/progress/streak";

interface IHomeDashboardProps {
	progress: IProgressState;
	level: ExamLevel;
}

function continueTarget(progress: IProgressState, level: ExamLevel) {
	const last = progress.lastLesson
		? getLesson(course, progress.lastLesson.slug)
		: undefined;

	if (last && progress.lessonsDone[last.slug] === undefined) {
		return { lesson: last, percent: progress.lastLesson?.percent ?? 0 };
	}

	const unread = firstUnreadLesson(course, level, progress.lessonsDone);

	return unread ? { lesson: unread, percent: 0 } : null;
}

export default function HomeDashboard({
	progress,
	level,
}: IHomeDashboardProps) {
	const today = toStudyDay(new Date());
	const target = continueTarget(progress, level);

	const weakAreas = weakGroups(
		areaGroups(course, level),
		progress.attempts,
	).flatMap<IWeakArea>((group) => {
		const area = getArea(course, group.id as IWeakArea["area"]["slug"]);

		return area
			? [{ area, accuracy: group.accuracy, answered: group.answered }]
			: [];
	});

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="font-serif text-3xl leading-tight">Tvoja priprema</h1>
				{progress.examDate && (
					<ExamDateChip examDate={progress.examDate} today={today} />
				)}
			</div>

			<div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start">
				<div className="space-y-4">
					{target ? (
						<ContinueCard
							lesson={target.lesson}
							area={getArea(course, target.lesson.area)}
							percent={target.percent}
						/>
					) : (
						<section className="rounded-[1.6rem] bg-[#002c78] p-5 text-[#eaf3ff] sm:p-6">
							<p className="font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
								SVE LEKCIJE SU GOTOVE
							</p>
							<p className="mt-2 font-serif text-2xl text-white">
								Sad je red na pitanja.
							</p>
							<Link
								to="/vjezba"
								className="mt-4 inline-flex min-h-11 items-center font-semibold text-white hover:text-white"
							>
								Idi na vježbu
							</Link>
						</section>
					)}

					<TodayCard
						today={todayActivity(progress, today)}
						streak={streak(progress.studyDays, today)}
					/>
				</div>

				<div className="space-y-4">
					<ReadinessCard
						readiness={readiness(
							subjectGroups(course, level),
							progress.attempts,
						)}
					/>
					<WeakAreasCard areas={weakAreas} />
				</div>
			</div>
		</>
	);
}
