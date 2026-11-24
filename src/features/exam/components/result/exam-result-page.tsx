import { Link } from "@tanstack/react-router";
import { History, ListChecks, RotateCcw, SearchCheck } from "lucide-react";
import LoginNudgeSlot from "@/components/custom/login-nudge/login-nudge-slot";
import { Button } from "@/components/ui/button";
import course from "@/content/voditelj-brodice";
import ExamReview, {
	type ReviewFilter,
} from "@/features/exam/components/result/exam-review";
import SubjectResultCard from "@/features/exam/components/result/subject-result-card";
import VerdictCard from "@/features/exam/components/result/verdict-card";
import ExamSkeleton from "@/features/exam/components/shared/exam-skeleton";
import {
	storedSubjectScores,
	totalQuestions,
} from "@/features/exam/utils/stored-subject-scores";
import useAuthStatus from "@/lib/auth/use-auth-status";
import { findExamSession } from "@/lib/progress/exam-session-selectors";
import useProgress from "@/lib/progress/use-progress";

interface IExamResultPageProps {
	sessionId: string;
	review: ReviewFilter | null;
}

function requirementText(level: "A" | "B"): string {
	return level === "A"
		? `Treba ${course.examFormats.A.passPercent} %`
		: `Treba ${course.examFormats.B.passPerSubject} od ${course.examFormats.B.questionsPerSubject}`;
}

export default function ExamResultPage({
	sessionId,
	review,
}: IExamResultPageProps) {
	const { progress, ready } = useProgress();
	const signedIn = useAuthStatus().viewer.status === "signed-in";
	const session = findExamSession(progress, sessionId);

	if (!ready) {
		return (
			<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
				<ExamSkeleton />
			</main>
		);
	}

	if (!session || session.finishedAt === null) {
		return (
			<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 pb-8 sm:px-6">
				<h1 className="font-serif text-3xl leading-tight">
					{session ? "Ovaj ispit još traje" : "Ovaj rezultat ne postoji"}
				</h1>
				<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
					{session
						? "Rezultat dobiješ kad predaš ispit."
						: signedIn
							? "Rezultat s drugog uređaja stiže kad se napredak uskladi s računom."
							: "Rezultati se spremaju samo u ovom pregledniku."}
				</p>
				<Button
					asChild
					className="mt-8 h-12 rounded-full px-6 text-[1rem] font-semibold"
				>
					{session ? (
						<Link to="/ispit/$sessionId" params={{ sessionId }}>
							Nastavi ispit
						</Link>
					) : (
						<Link to="/ispit">Na probni ispit</Link>
					)}
				</Button>
			</main>
		);
	}

	if (review) {
		return (
			<main className="mx-auto max-w-3xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
				<ExamReview session={session} filter={review} />
			</main>
		);
	}

	const subjects = storedSubjectScores(session);
	const failed = subjects.filter((subject) => !subject.passed).length;
	const mistakes = totalQuestions(session) - (session.score ?? 0);

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			<div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start">
				<div className="space-y-4">
					<VerdictCard session={session} total={totalQuestions(session)} />

					<div className="grid gap-2.5 sm:grid-cols-2">
						<Button
							asChild
							className="h-12 rounded-full text-[0.98rem] font-semibold"
						>
							<Link
								to="/ispit/rezultat/$sessionId"
								params={{ sessionId }}
								search={{ pregled: mistakes > 0 ? "pogreske" : "sva" }}
							>
								<SearchCheck className="size-4" aria-hidden="true" />
								{mistakes > 0 ? "Pregledaj pogreške" : "Pregledaj pitanja"}
							</Link>
						</Button>

						<Button
							asChild
							variant="outline"
							className="h-12 rounded-full text-[0.98rem] font-semibold"
						>
							{/* Practice modes land with the practice screens; then this opens the weak subjects directly. */}
							<Link to="/vjezba">
								<ListChecks className="size-4" aria-hidden="true" />
								Vježbaj slabe predmete
							</Link>
						</Button>

						<Button
							asChild
							variant="outline"
							className="h-12 rounded-full text-[0.98rem] font-semibold"
						>
							<Link to="/ispit">
								<RotateCcw className="size-4" aria-hidden="true" />
								Novi ispit
							</Link>
						</Button>

						<Button
							asChild
							variant="ghost"
							className="h-12 rounded-full text-[0.98rem] font-semibold"
						>
							<Link to="/ispit/povijest">
								<History className="size-4" aria-hidden="true" />
								Povijest ispita
							</Link>
						</Button>
					</div>
				</div>

				<section aria-labelledby="subjects-title">
					<div className="flex items-baseline justify-between gap-3">
						<h2 id="subjects-title" className="font-serif text-xl">
							Po predmetima
						</h2>
						{subjects.length > 1 && (
							<span className="text-[0.85rem] text-muted-foreground">
								{failed === 0
									? "Svi zadovoljeni"
									: `Nije zadovoljeno: ${failed} od ${subjects.length}`}
							</span>
						)}
					</div>

					<ul className="mt-3 space-y-2.5">
						{subjects.map((subject) => (
							<SubjectResultCard
								key={subject.subjectId}
								subject={subject}
								requirement={requirementText(session.level)}
							/>
						))}
					</ul>

					<p className="mt-4 text-[0.85rem] leading-relaxed text-muted-foreground">
						Stvarni ispit je usmeni i nema službenog broja pitanja. Ovo je naša
						simulacija.
					</p>
				</section>
			</div>

			<LoginNudgeSlot trigger="exam-result" />
		</main>
	);
}
