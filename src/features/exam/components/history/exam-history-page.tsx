import { Link } from "@tanstack/react-router";
import { ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import HistoryItem from "@/features/exam/components/history/history-item";
import TrendRow from "@/features/exam/components/history/trend-row";
import ExamSkeleton from "@/features/exam/components/shared/exam-skeleton";
import useAuthStatus from "@/lib/auth/use-auth-status";
import { finishedExamSessions } from "@/lib/progress/exam-session-selectors";
import useProgress from "@/lib/progress/use-progress";

export default function ExamHistoryPage() {
	const { progress, ready } = useProgress();
	const signedIn = useAuthStatus().viewer.status === "signed-in";
	const sessions = finishedExamSessions(progress);
	const passedCount = sessions.filter((session) => session.passed).length;

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			<Link
				to="/ispit"
				className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 font-semibold text-ocean hover:bg-accent dark:text-[#4cc2ff]"
			>
				<ChevronLeft className="size-5" aria-hidden="true" />
				Probni ispit
			</Link>

			<h1 className="mt-2 font-serif text-3xl leading-tight">
				Povijest ispita
			</h1>

			{!ready ? (
				<div className="mt-5">
					<ExamSkeleton />
				</div>
			) : sessions.length === 0 ? (
				<div className="mt-5 max-w-xl rounded-[1.4rem] border border-border bg-card p-5">
					<p className="text-[1rem] leading-relaxed">
						Još nisi riješio nijedan probni ispit. Kad ga predaš, ovdje vidiš
						datum, rezultat po predmetima i kako napreduješ.
					</p>
					<Button
						asChild
						className="mt-5 h-12 rounded-full px-6 text-[1rem] font-semibold"
					>
						<Link to="/ispit">
							<Play className="size-4" aria-hidden="true" />
							Riješi prvi ispit
						</Link>
					</Button>
				</div>
			) : (
				<>
					<p className="mt-1 text-[0.95rem] text-muted-foreground">
						Položeno {passedCount} od {sessions.length}.
						{signedIn
							? " Spremljeno i na tvoj račun."
							: " Spremljeno samo u ovom pregledniku."}
					</p>

					<div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.3fr] lg:items-start">
						<TrendRow sessions={sessions} />

						<ul className="space-y-2.5">
							{sessions.map((session) => (
								<HistoryItem key={session.id} session={session} />
							))}
						</ul>
					</div>
				</>
			)}
		</main>
	);
}
