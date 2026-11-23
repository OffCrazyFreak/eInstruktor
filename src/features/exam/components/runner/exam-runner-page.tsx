import { Link, Navigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import ExamRunner from "@/features/exam/components/runner/exam-runner";
import ExamSkeleton from "@/features/exam/components/shared/exam-skeleton";
import { findExamSession } from "@/lib/progress/exam-session-selectors";
import useProgress from "@/lib/progress/use-progress";

interface IExamRunnerPageProps {
	sessionId: string;
	questionNumber: number | undefined;
}

export default function ExamRunnerPage({
	sessionId,
	questionNumber,
}: IExamRunnerPageProps) {
	const { progress, ready } = useProgress();
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
			<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 sm:px-6">
				<h1 className="font-serif text-3xl leading-tight">
					Ovaj ispit ne postoji
				</h1>
				<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
					Ispiti se spremaju samo u ovom pregledniku. Možda je započet na drugom
					uređaju ili je zamijenjen novim ispitom.
				</p>
				<Button
					asChild
					className="mt-8 h-12 rounded-full px-6 text-[1rem] font-semibold"
				>
					<Link to="/ispit">Na probni ispit</Link>
				</Button>
			</main>
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

	return <ExamRunner session={session} questionNumber={questionNumber} />;
}
