import { Link } from "@tanstack/react-router";
import { ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import useExamClock from "@/features/exam/hooks/use-exam-clock";
import { formatClock } from "@/features/exam/utils/exam-timer";
import { answeredCount } from "@/lib/progress/exam-session-selectors";
import type { IExamSession } from "@/lib/progress/progress-schema";

interface IResumeCardProps {
	session: IExamSession;
}

function ignoreExpiry() {}

/** A started exam waits here; its clock keeps running while the learner is away. */
export default function ResumeCard({ session }: IResumeCardProps) {
	const remaining = useExamClock(session.endsAt ?? null, ignoreExpiry);
	const timeUp = remaining === 0;

	return (
		<section
			aria-labelledby="resume-title"
			className="rounded-[1.6rem] bg-brand p-5 text-[#eaf3ff] sm:p-6 dark:ring-1 dark:ring-white/15"
		>
			<p className="font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				ISPIT U TIJEKU · KATEGORIJA {session.level}
			</p>

			<h2 id="resume-title" className="mt-2 font-serif text-2xl text-white">
				{timeUp ? "Vrijeme je isteklo" : "Nastavi gdje si stao"}
			</h2>

			<p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem]">
				<span>
					Odgovoreno {answeredCount(session)} od {session.questionIds.length}
				</span>

				{remaining !== null && !timeUp && (
					<span className="inline-flex items-center gap-1.5">
						<Timer className="size-4" aria-hidden="true" />
						Još {formatClock(remaining)}
					</span>
				)}
			</p>

			<Button
				asChild
				className="mt-5 h-12 w-full rounded-full bg-[#ffb43c] text-[1rem] font-semibold text-[#002c78] hover:bg-[#ffc25e] sm:w-auto sm:px-7"
			>
				<Link to="/ispit/$sessionId" params={{ sessionId: session.id }}>
					{timeUp ? "Pogledaj rezultat" : "Nastavi ispit"}
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</Button>

			<p className="mt-3 text-[0.85rem] text-[#eaf3ff]/80">
				{timeUp
					? "Ako kreneš ispočetka, ovaj se predaje i ostaje u povijesti."
					: "Ako kreneš ispočetka, ovaj se ispit briše."}
			</p>
		</section>
	);
}
