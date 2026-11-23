import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import course from "@/content/voditelj-brodice";
import ExamRunner from "@/features/exam/components/runner/exam-runner";
import ExamSkeleton from "@/features/exam/components/shared/exam-skeleton";
import { examBlocks, isPlayableExam } from "@/features/exam/utils/exam-blocks";
import { discardExamSession } from "@/lib/progress/exam-session-actions";
import { findExamSession } from "@/lib/progress/exam-session-selectors";
import useProgress from "@/lib/progress/use-progress";

interface IExamRunnerPageProps {
	sessionId: string;
	questionNumber: number | undefined;
}

interface IMissingExamProps {
	title: string;
	description: string;
	/** Shown for a stored exam that can no longer run, so the learner can drop it. */
	action?: ReactNode;
}

function MissingExam({ title, description, action }: IMissingExamProps) {
	return (
		<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 sm:px-6">
			<h1 className="font-serif text-3xl leading-tight">{title}</h1>
			<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
				{description}
			</p>

			<div className="mt-8 flex flex-wrap gap-2.5">
				<Button
					asChild
					className="h-12 rounded-full px-6 text-[1rem] font-semibold"
				>
					<Link to="/ispit">Na probni ispit</Link>
				</Button>
				{action}
			</div>
		</main>
	);
}

export default function ExamRunnerPage({
	sessionId,
	questionNumber,
}: IExamRunnerPageProps) {
	const navigate = useNavigate();
	const { progress, ready, update } = useProgress();
	const session = findExamSession(progress, sessionId);

	if (!ready) {
		return (
			<main className="mx-auto max-w-3xl px-4 pt-6">
				<ExamSkeleton />
			</main>
		);
	}

	if (!session) {
		return (
			<MissingExam
				title="Ovaj ispit ne postoji"
				description="Ispiti se spremaju samo u ovom pregledniku. Možda je započet na drugom uređaju ili je zamijenjen novim ispitom."
			/>
		);
	}

	if (session.finishedAt !== null) {
		return (
			<Navigate
				to="/ispit/rezultat/$sessionId"
				params={{ sessionId }}
				replace
			/>
		);
	}

	if (
		!isPlayableExam(
			course,
			session.level,
			examBlocks(course, session.level, session.questionIds),
		)
	) {
		return (
			<MissingExam
				title="Ovaj ispit se više ne može nastaviti"
				description="U međuvremenu smo promijenili pitanja, pa ovaj ispit više nije potpun. Odustani od njega i započni novi."
				action={
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							update((current) => discardExamSession(current, sessionId));
							void navigate({ to: "/ispit" });
						}}
						className="h-12 rounded-full px-6 text-[1rem] font-semibold"
					>
						Odustani
					</Button>
				}
			/>
		);
	}

	return <ExamRunner session={session} questionNumber={questionNumber} />;
}
