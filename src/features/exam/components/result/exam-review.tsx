import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { isCorrectSelection } from "@/components/custom/question/grade-answer";
import QuestionView from "@/components/custom/question/question-view";
import type { IQuestion } from "@/content/types";
import course from "@/content/voditelj-brodice";
import { examBlocks } from "@/features/exam/utils/exam-blocks";
import type { IExamSession } from "@/lib/progress/progress-schema";
import { cn } from "@/lib/utils";

export type ReviewFilter = "pogreske" | "sva";

interface IExamReviewProps {
	session: IExamSession;
	filter: ReviewFilter;
}

type ReviewStatus = "correct" | "wrong" | "empty";

const STATUS_TEXT: Record<ReviewStatus, string> = {
	correct: "Točno",
	wrong: "Netočno",
	empty: "Bez odgovora",
};

function ignoreChange() {}

// The grade saved at hand-in is the record, so the review matches the score even after a question is reworded; older sessions are graded again.
function wasCorrect(
	session: IExamSession,
	question: IQuestion,
	selected: string[],
): boolean {
	return (
		session.graded?.[question.id] ?? isCorrectSelection(question, selected)
	);
}

/** Every exam question with the learner's answer, the right one and the explanation. */
export default function ExamReview({ session, filter }: IExamReviewProps) {
	const answers = session.answers ?? {};

	const blocks = examBlocks(course, session.level, session.questionIds).map(
		(block) => ({
			...block,
			items: block.questions.map((question, offset) => {
				const selected = answers[question.id] ?? [];
				const status: ReviewStatus =
					selected.length === 0
						? "empty"
						: wasCorrect(session, question, selected)
							? "correct"
							: "wrong";

				return {
					question,
					selected,
					status,
					number: block.startIndex + offset + 1,
				};
			}),
		}),
	);

	const all = blocks.flatMap((block) => block.items);
	const mistakes = all.filter((item) => item.status !== "correct").length;

	const tabs: { value: ReviewFilter; label: string }[] = [
		{ value: "pogreske", label: `Pogreške (${mistakes})` },
		{ value: "sva", label: `Sva pitanja (${all.length})` },
	];

	return (
		<>
			<Link
				to="/ispit/rezultat/$sessionId"
				params={{ sessionId: session.id }}
				className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 font-semibold text-[#0a63b0] hover:bg-accent dark:text-[#4cc2ff]"
			>
				<ChevronLeft className="size-5" aria-hidden="true" />
				Rezultat
			</Link>

			<h1 className="mt-2 font-serif text-3xl leading-tight">Pregled ispita</h1>

			<nav aria-label="Što prikazati" className="mt-4 flex flex-wrap gap-2">
				{tabs.map((tab) => (
					<Link
						key={tab.value}
						to="/ispit/rezultat/$sessionId"
						params={{ sessionId: session.id }}
						search={{ pregled: tab.value }}
						replace
						aria-current={filter === tab.value ? "page" : undefined}
						className={cn(
							"inline-flex min-h-11 items-center rounded-full border-2 px-4 text-[0.92rem] font-semibold",
							filter === tab.value
								? "border-primary bg-primary text-primary-foreground"
								: "border-border bg-card hover:bg-accent",
						)}
					>
						{tab.label}
					</Link>
				))}
			</nav>

			{filter === "pogreske" && mistakes === 0 && (
				<p className="mt-6 rounded-[1.2rem] border border-border bg-card p-5 text-[1rem]">
					Nema pogrešaka. Svako pitanje je točno.
				</p>
			)}

			<div className="mt-6 space-y-8">
				{blocks.map((block) => {
					const items = block.items.filter(
						(item) => filter === "sva" || item.status !== "correct",
					);

					if (items.length === 0) {
						return null;
					}

					return (
						<section key={block.subjectId} aria-label={block.label}>
							<h2 className="border-l-4 border-[#00aef3] pl-3 font-serif text-xl leading-snug">
								{block.label}
							</h2>

							<ol className="mt-4 space-y-4">
								{items.map((item) => (
									<li
										key={item.question.id}
										className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
									>
										<p className="mb-3 flex items-center justify-between gap-3 font-mono text-[0.78rem] font-semibold tracking-[0.12em] text-muted-foreground">
											<span>PITANJE {item.number}</span>
											{item.status === "empty" && (
												<span className="rounded-full bg-muted px-2.5 py-0.5 tracking-normal">
													{STATUS_TEXT.empty}
												</span>
											)}
										</p>

										<QuestionView
											question={item.question}
											selected={item.selected}
											onSelectedChange={ignoreChange}
											revealed
											readOnly
										/>
									</li>
								))}
							</ol>
						</section>
					);
				})}
			</div>
		</>
	);
}
