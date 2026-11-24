import { Link } from "@tanstack/react-router";
import course from "@/content/voditelj-brodice";
import lectureZero from "@/content/voditelj-brodice/lecture-0";
import BadgeCelebration from "@/features/progress/components/badge-celebration";
import BadgesSection from "@/features/progress/components/badges-section";
import ExamSummaryCard from "@/features/progress/components/exam-summary-card";
import LocalOnlyCard from "@/features/progress/components/local-only-card";
import PracticeStatsCard from "@/features/progress/components/practice-stats-card";
import ProgressSkeleton from "@/features/progress/components/progress-skeleton";
import ReadinessPanel from "@/features/progress/components/readiness-panel";
import StudyDaysCard from "@/features/progress/components/study-days-card";
import useBadgeAwards from "@/features/progress/hooks/use-badge-awards";
import useAuthStatus from "@/lib/auth/use-auth-status";
import { courseLessonOrder } from "@/lib/content/lesson-order";
import { subjectGroups } from "@/lib/content/question-groups";
import { toStudyDay } from "@/lib/dates/study-day";
import { coverage, recentAccuracy } from "@/lib/progress/accuracy";
import { finishedExamSessions } from "@/lib/progress/exam-session-selectors";
import { setPassed } from "@/lib/progress/progress-actions";
import { hasAnyProgress } from "@/lib/progress/progress-schema";
import { readiness } from "@/lib/progress/readiness";
import { streak } from "@/lib/progress/streak";
import useProgress from "@/lib/progress/use-progress";

export default function ProgressPage() {
	const { progress, ready, level, update } = useProgress();
	const { viewer } = useAuthStatus();
	const awards = useBadgeAwards();

	const groups = subjectGroups(course, level);
	const pool = groups.flatMap((group) => group.questionIds);
	const lessons = courseLessonOrder(course, level);
	const today = toStudyDay(new Date());

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			<h1 className="font-serif text-3xl leading-tight">Napredak</h1>
			<p className="mt-1 text-[0.95rem] text-muted-foreground">
				Kategorija {level}. Spremnost, točnost, dani učenja i značke.
			</p>

			{!ready ? (
				<ProgressSkeleton />
			) : (
				<>
					{awards.fresh.length > 0 && (
						<div className="mt-5">
							<BadgeCelebration
								badgeIds={awards.fresh}
								onDismiss={awards.dismiss}
							/>
						</div>
					)}

					{!hasAnyProgress(progress) && (
						<p className="mt-5 rounded-[1.4rem] bg-[#eaf3ff] p-4 text-[0.95rem] leading-relaxed dark:bg-accent">
							Ovdje se skuplja sve što riješiš. Kreni od{" "}
							<Link
								to="/ucenje/$area/$lesson"
								params={{ area: lectureZero.area, lesson: lectureZero.slug }}
								className="font-semibold text-[#0a63b0] underline underline-offset-2 dark:text-[#4cc2ff]"
							>
								Lekcije 0
							</Link>{" "}
							ili odgovori na nekoliko pitanja u vježbi.
						</p>
					)}

					<div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start">
						<div className="space-y-4">
							<ReadinessPanel
								readiness={readiness(groups, progress.attempts)}
							/>
							<PracticeStatsCard
								coverage={coverage(progress.attempts, pool)}
								accuracy={recentAccuracy(progress.attempts, pool).accuracy}
								answers={progress.attempts.length}
								lessonsDone={
									lessons.filter(
										(lesson) => progress.lessonsDone[lesson.slug] !== undefined,
									).length
								}
								lessonsTotal={lessons.length}
							/>
						</div>

						<div className="space-y-4">
							<StudyDaysCard
								streak={streak(progress.studyDays, today)}
								totalDays={progress.studyDays.length}
								passedAt={progress.passedAt}
								onPassedChange={(passed) =>
									update((current) => setPassed(current, passed, Date.now()))
								}
							/>
							<ExamSummaryCard sessions={finishedExamSessions(progress)} />
							{viewer.status === "anonymous" && <LocalOnlyCard />}
						</div>
					</div>

					<div className="mt-8">
						<BadgesSection earned={progress.badges} fresh={awards.fresh} />
					</div>
				</>
			)}
		</main>
	);
}
