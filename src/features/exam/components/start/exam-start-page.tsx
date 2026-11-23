import { Link, useNavigate } from "@tanstack/react-router";
import { History, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ExamLevel } from "@/content/course-types";
import course from "@/content/voditelj-brodice";
import ExamSkeleton from "@/features/exam/components/shared/exam-skeleton";
import ChoiceCard from "@/features/exam/components/start/choice-card";
import ExamRules from "@/features/exam/components/start/exam-rules";
import PracticeHint from "@/features/exam/components/start/practice-hint";
import ResumeCard from "@/features/exam/components/start/resume-card";
import {
	examEndsAt,
	type TimerChoice,
	timerMinutes,
} from "@/features/exam/utils/exam-timer";
import { questionsForExam } from "@/lib/content/exam-questions";
import { startExamSession } from "@/lib/progress/exam-session-actions";
import {
	activeExamSession,
	finishedExamSessions,
} from "@/lib/progress/exam-session-selectors";
import useProgress from "@/lib/progress/use-progress";
import randomId from "@/lib/random-id";

const LEVELS: { level: ExamLevel; title: string }[] = [
	{ level: "A", title: "Kategorija A" },
	{ level: "B", title: "Kategorija B" },
];

const TIMER_TITLES: Record<TimerChoice, string> = {
	standard: "Standardno",
	extended: "Produlji",
	none: "Bez vremena",
};

function timerDetail(level: ExamLevel, choice: TimerChoice): string {
	const minutes = timerMinutes(course, level, choice);

	if (minutes === null) {
		return "Rješavaj svojim tempom, sat ne teče.";
	}

	return choice === "extended"
		? `${minutes} minuta, dvostruko vrijeme.`
		: `${minutes} minuta, kao u našoj simulaciji.`;
}

function newSeed(): number {
	const values = new Uint32Array(1);

	if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
		crypto.getRandomValues(values);
		return values[0] ?? 0;
	}

	return Math.floor(Math.random() * 2 ** 32);
}

export default function ExamStartPage() {
	const navigate = useNavigate();
	const { progress, ready, level: learnerLevel, update } = useProgress();
	const [pickedLevel, setPickedLevel] = useState<ExamLevel | null>(null);
	const [timer, setTimer] = useState<TimerChoice>("standard");

	const level = pickedLevel ?? learnerLevel;
	const running = activeExamSession(progress);
	const hasHistory = finishedExamSessions(progress).length > 0;

	function handleStart() {
		const id = randomId();
		const seed = newSeed();
		const startedAt = Date.now();

		update((current) =>
			startExamSession(current, {
				id,
				level,
				seed,
				questionIds: questionsForExam(course, level, seed).map(
					(question) => question.id,
				),
				startedAt,
				endsAt: examEndsAt(startedAt, timerMinutes(course, level, timer)),
			}),
		);

		void navigate({ to: "/ispit/$sessionId", params: { sessionId: id } });
	}

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="font-serif text-3xl leading-tight">Probni ispit</h1>

				{hasHistory && (
					<Link
						to="/ispit/povijest"
						className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-semibold text-[#0a63b0] hover:bg-accent dark:text-[#4cc2ff]"
					>
						<History className="size-4" aria-hidden="true" />
						Povijest ispita
					</Link>
				)}
			</div>

			{!ready ? (
				<div className="mt-5">
					<ExamSkeleton />
				</div>
			) : (
				<div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
					<div className="space-y-4">
						{running && <ResumeCard session={running} />}

						<fieldset className="space-y-2.5">
							<legend className="mb-2.5 font-serif text-xl">Kategorija</legend>

							{LEVELS.map((choice) => (
								<ChoiceCard
									key={choice.level}
									name="exam-level"
									value={choice.level}
									checked={level === choice.level}
									onSelect={() => setPickedLevel(choice.level)}
									marker={choice.level}
									title={choice.title}
									detail={
										choice.level === learnerLevel
											? "Za ovu kategoriju učiš."
											: choice.level === "A"
												? "Samo osnove plovidbe."
												: "Svih pet predmeta."
									}
								/>
							))}
						</fieldset>

						<fieldset className="space-y-2.5">
							<legend className="mb-2.5 font-serif text-xl">Vrijeme</legend>

							{(Object.keys(TIMER_TITLES) as TimerChoice[]).map((choice) => (
								<ChoiceCard
									key={choice}
									name="exam-timer"
									value={choice}
									checked={timer === choice}
									onSelect={() => setTimer(choice)}
									marker={
										choice === "none"
											? "∞"
											: (timerMinutes(course, level, choice) ?? "")
									}
									title={TIMER_TITLES[choice]}
									detail={timerDetail(level, choice)}
								/>
							))}
						</fieldset>
					</div>

					<div className="space-y-4">
						<ExamRules course={course} level={level} />
						<PracticeHint
							course={course}
							level={level}
							attempts={progress.attempts}
						/>

						<Button
							type="button"
							onClick={handleStart}
							className="h-14 w-full rounded-full text-[1.05rem] font-semibold"
						>
							<Play className="size-5" aria-hidden="true" />
							{running ? "Započni novi ispit" : "Započni ispit"}
						</Button>
					</div>
				</div>
			)}
		</main>
	);
}
