import { Flag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import type { IExamBlock } from "@/features/exam/utils/exam-blocks";
import { cn } from "@/lib/utils";

interface IQuestionGridSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	blocks: IExamBlock[];
	current: number;
	isAnswered: (questionId: string) => boolean;
	isFlagged: (questionId: string) => boolean;
	onGoTo: (index: number) => void;
	onSubmit: () => void;
}

function cellLabel(number: number, answered: boolean, flagged: boolean) {
	return [
		`Pitanje ${number}`,
		answered ? "odgovoreno" : "bez odgovora",
		flagged ? "označeno" : null,
	]
		.filter(Boolean)
		.join(", ");
}

// Focus lands on the open question, so a keyboard user starts where they are.
function focusCurrentCell(event: Event) {
	const sheet = event.currentTarget;

	if (!(sheet instanceof HTMLElement)) {
		return;
	}

	const cell = sheet.querySelector<HTMLElement>('[aria-current="step"]');

	if (cell) {
		event.preventDefault();
		cell.focus();
	}
}

/** "Pregled": every question by subject, so the learner can jump back to an empty or flagged one before handing in. */
export default function QuestionGridSheet({
	open,
	onOpenChange,
	blocks,
	current,
	isAnswered,
	isFlagged,
	onGoTo,
	onSubmit,
}: IQuestionGridSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				onOpenAutoFocus={focusCurrentCell}
				className="mx-auto max-h-[88svh] max-w-2xl gap-0 overflow-y-auto rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				<SheetTitle className="font-serif text-xl">Pregled</SheetTitle>
				<SheetDescription className="mt-1">
					Dodirni broj da otvoriš pitanje.
				</SheetDescription>

				<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.82rem] text-muted-foreground">
					<li className="inline-flex items-center gap-1.5">
						<span
							aria-hidden="true"
							className="size-4 rounded-[0.3rem] bg-[#0a63b0] dark:bg-[#4cc2ff]"
						/>
						Odgovoreno
					</li>
					<li className="inline-flex items-center gap-1.5">
						<span
							aria-hidden="true"
							className="size-4 rounded-[0.3rem] border-2 border-dashed border-ink/30 dark:border-white/30"
						/>
						Bez odgovora
					</li>
					<li className="inline-flex items-center gap-1.5">
						<Flag
							className="size-4 fill-current text-[#c77800] dark:text-[#ffb43c]"
							aria-hidden="true"
						/>
						Označeno
					</li>
				</ul>

				<div className="mt-4 space-y-5">
					{blocks.map((block) => {
						const answered = block.questions.filter((question) =>
							isAnswered(question.id),
						).length;

						return (
							<section key={block.subjectId} aria-label={block.label}>
								<div className="flex items-baseline justify-between gap-3">
									<h3 className="min-w-0 text-[0.95rem] font-semibold leading-snug">
										{block.label}
									</h3>
									<span className="shrink-0 font-mono text-[0.8rem] text-muted-foreground tabular-nums">
										{answered}/{block.questions.length}
									</span>
								</div>

								<ol className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(2.9rem,1fr))] gap-2">
									{block.questions.map((question, offset) => {
										const index = block.startIndex + offset;
										const done = isAnswered(question.id);
										const flagged = isFlagged(question.id);

										return (
											<li key={question.id}>
												<button
													type="button"
													onClick={() => onGoTo(index)}
													aria-label={cellLabel(index + 1, done, flagged)}
													aria-current={index === current ? "step" : undefined}
													className={cn(
														"relative grid h-12 w-full place-items-center rounded-[0.8rem] border-2 font-mono text-[0.95rem] font-semibold tabular-nums outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60",
														done
															? "border-ocean bg-[#0a63b0] text-white dark:border-[#4cc2ff] dark:bg-[#4cc2ff] dark:text-[#04142e]"
															: "border-dashed border-ink/30 bg-card text-foreground dark:border-white/30",
														index === current &&
															"ring-[3px] ring-[#00aef3] ring-offset-2 ring-offset-background",
													)}
												>
													{index + 1}

													{flagged && (
														<Flag
															className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-background fill-[#ffb43c] p-0.5 text-[#c77800] box-content"
															aria-hidden="true"
														/>
													)}
												</button>
											</li>
										);
									})}
								</ol>
							</section>
						);
					})}
				</div>

				<Button
					type="button"
					onClick={onSubmit}
					className="mt-6 h-12 w-full rounded-full text-[1rem] font-semibold"
				>
					<Send className="size-4" aria-hidden="true" />
					Predaj ispit
				</Button>
			</SheetContent>
		</Sheet>
	);
}
