import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QuestionView from "@/components/custom/question/question-view";
import course from "@/content/voditelj-brodice";
import ExamActionBar from "@/features/exam/components/runner/exam-action-bar";
import ExamTopBar from "@/features/exam/components/runner/exam-top-bar";
import QuestionGridSheet from "@/features/exam/components/runner/question-grid-sheet";
import SubjectHeader from "@/features/exam/components/runner/subject-header";
import SubmitDialog from "@/features/exam/components/runner/submit-dialog";
import useExamClock from "@/features/exam/hooks/use-exam-clock";
import {
	blockOfIndex,
	blockQuestions,
	examBlocks,
} from "@/features/exam/utils/exam-blocks";
import { scoreExam } from "@/features/exam/utils/score-exam";
import {
	finishExamSession,
	setExamAnswer,
	toggleExamFlag,
} from "@/lib/progress/exam-session-actions";
import {
	answeredCount,
	findExamSession,
	isAnswered,
	isFlagged,
} from "@/lib/progress/exam-session-selectors";
import type { IExamSession } from "@/lib/progress/progress-schema";
import useProgress from "@/lib/progress/use-progress";
import randomId from "@/lib/random-id";

interface IExamRunnerProps {
	session: IExamSession;
	/** The question from the address, counted from 1. */
	questionNumber: number | undefined;
}

function clamp(value: number, max: number): number {
	return Math.min(Math.max(value, 0), Math.max(max, 0));
}

export default function ExamRunner({
	session,
	questionNumber,
}: IExamRunnerProps) {
	const navigate = useNavigate({ from: "/ispit/$sessionId" });
	const { update } = useProgress();
	const [gridOpen, setGridOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const questionRef = useRef<HTMLDivElement>(null);
	const movedRef = useRef(false);

	const blocks = examBlocks(course, session.level, session.questionIds);
	const questions = blockQuestions(blocks);
	const lastIndex = questions.length - 1;

	// A resumed exam opens on its first empty question; after that the address keeps the place across reloads.
	const [index, setIndex] = useState(() =>
		clamp(
			questionNumber !== undefined
				? questionNumber - 1
				: questions.findIndex((question) => !isAnswered(session, question.id)),
			lastIndex,
		),
	);

	const question = questions[index];
	const block = blockOfIndex(blocks, index);

	const remaining = useExamClock(session.endsAt ?? null, () =>
		finish(Math.min(Date.now(), session.endsAt ?? Date.now())),
	);

	useEffect(() => {
		void navigate({ search: { pitanje: index + 1 }, replace: true });

		if (movedRef.current) {
			questionRef.current?.focus();
		}
	}, [index, navigate]);

	function goTo(next: number) {
		movedRef.current = true;
		setIndex(clamp(next, lastIndex));
		window.scrollTo({ top: 0 });
	}

	function finish(finishedAt: number) {
		setConfirmOpen(false);
		setGridOpen(false);

		update((current) => {
			const latest = findExamSession(current, session.id);

			if (!latest) {
				return current;
			}

			const score = scoreExam(
				course,
				latest.level,
				examBlocks(course, latest.level, latest.questionIds),
				latest.answers ?? {},
			);

			return finishExamSession(current, session.id, score, {
				finishedAt,
				makeId: randomId,
			});
		});
	}

	function openSubmit() {
		setGridOpen(false);
		setConfirmOpen(true);
	}

	if (!question || !block) {
		return null;
	}

	const blockNumber = blocks.indexOf(block) + 1;

	return (
		<>
			<ExamTopBar
				blocks={blocks}
				block={block}
				position={index}
				total={questions.length}
				remaining={remaining}
				flagged={isFlagged(session, question.id)}
				onToggleFlag={() =>
					update((current) => toggleExamFlag(current, session.id, question.id))
				}
				answeredPerBlock={blocks.map(
					(item) =>
						item.questions.filter((entry) => isAnswered(session, entry.id))
							.length,
				)}
			/>

			<main className="mx-auto max-w-3xl px-4 pt-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-6">
				<div ref={questionRef} tabIndex={-1} className="outline-none">
					<SubjectHeader
						block={block}
						blockNumber={blockNumber}
						blockCount={blocks.length}
						positionInBlock={index - block.startIndex}
					/>

					<QuestionView
						key={question.id}
						question={question}
						selected={session.answers?.[question.id] ?? []}
						onSelectedChange={(selected) =>
							update((current) =>
								setExamAnswer(current, session.id, question.id, selected),
							)
						}
						revealed={false}
						showLessonLink={false}
					/>
				</div>
			</main>

			<ExamActionBar
				isFirst={index === 0}
				isLast={index === lastIndex}
				onPrevious={() => goTo(index - 1)}
				onNext={() => goTo(index + 1)}
				onOpenGrid={() => setGridOpen(true)}
				onSubmit={openSubmit}
			/>

			<QuestionGridSheet
				open={gridOpen}
				onOpenChange={setGridOpen}
				blocks={blocks}
				current={index}
				isAnswered={(id) => isAnswered(session, id)}
				isFlagged={(id) => isFlagged(session, id)}
				onGoTo={(next) => {
					setGridOpen(false);
					goTo(next);
				}}
				onSubmit={openSubmit}
			/>

			<SubmitDialog
				open={confirmOpen}
				onOpenChange={setConfirmOpen}
				answered={answeredCount(session)}
				total={questions.length}
				flagged={session.flaggedIds?.length ?? 0}
				onConfirm={() => finish(Date.now())}
			/>
		</>
	);
}
