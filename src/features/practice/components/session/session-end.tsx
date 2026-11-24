import { Link } from "@tanstack/react-router";
import { ListRestart, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoginNudgeSlot from "@/components/custom/login-nudge/login-nudge-slot";
import { Button } from "@/components/ui/button";
import type { IQuestion } from "@/content/types";
import AreaSplit from "@/features/practice/components/session/area-split";
import MistakesReview from "@/features/practice/components/session/mistakes-review";
import SessionActionBar from "@/features/practice/components/session/session-action-bar";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import type { ISessionAnswer } from "@/features/practice/utils/practice-session";
import { sessionSummary } from "@/features/practice/utils/session-summary";

interface ISessionEndProps {
	title: string;
	questions: IQuestion[];
	answers: ISessionAnswer[];
	onAgain: (answers: ISessionAnswer[]) => void;
}

function verdict(share: number): string {
	if (share >= 0.85) {
		return "Odlično, samo tako nastavi.";
	}

	if (share >= 0.6) {
		return "Dobro ide. Pogledaj pogreške dok su svježe.";
	}

	return "Pogledaj pogreške, pa pročitaj lekcije koje ih objašnjavaju.";
}

export default function SessionEnd({
	title,
	questions,
	answers,
	onAgain,
}: ISessionEndProps) {
	const [showMistakes, setShowMistakes] = useState(false);
	const headingRef = useRef<HTMLHeadingElement>(null);

	// The last "Dalje" disappears with the set, so focus starts at the score.
	useEffect(() => {
		headingRef.current?.focus({ preventScroll: true });
	}, []);
	const summary = sessionSummary(answers, questions);
	const share = summary.total === 0 ? 0 : summary.correct / summary.total;
	const mistakes = summary.wrongIds.length;

	return (
		<>
			<SessionTopBar
				title={title}
				closeTo="/vjezba"
				closeLabel="Natrag na vježbu"
				position={null}
			/>

			<main className="mx-auto max-w-2xl px-4 pt-8 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:px-6">
				<p className="font-mono text-[0.74rem] tracking-[0.2em] text-ocean dark:text-[#4cc2ff]">
					KRAJ SERIJE
				</p>
				<h1
					ref={headingRef}
					tabIndex={-1}
					className="mt-3 flex items-baseline gap-3 font-serif outline-none"
				>
					<span className="text-[3.4rem] leading-none tabular-nums">
						{summary.correct}
						<span className="text-muted-foreground"> / {summary.total}</span>
					</span>
					<span className="text-[1.05rem] text-muted-foreground">
						{Math.round(share * 100)} % točnih
					</span>
				</h1>
				<p className="mt-3 text-[1.02rem] leading-relaxed">{verdict(share)}</p>

				<AreaSplit scores={summary.byArea} />

				{mistakes > 0 && (
					<Button
						type="button"
						variant="outline"
						aria-expanded={showMistakes}
						onClick={() => setShowMistakes((open) => !open)}
						className="mt-8 h-12 w-full rounded-full text-[0.98rem] font-semibold"
					>
						<ListRestart className="size-4" aria-hidden="true" />
						{showMistakes
							? "Sakrij pogreške"
							: `Pogledaj pogreške (${mistakes})`}
					</Button>
				)}

				{showMistakes && (
					<MistakesReview questions={questions} answers={answers} />
				)}

				<LoginNudgeSlot trigger="practice-set" />
			</main>

			<SessionActionBar>
				<Button
					asChild
					variant="outline"
					className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1"
				>
					<Link to="/vjezba">Natrag na vježbu</Link>
				</Button>
				<Button
					type="button"
					onClick={() => onAgain(answers)}
					className="order-first h-12 rounded-full text-[1rem] font-semibold sm:order-none sm:flex-1"
				>
					<RotateCcw className="size-4" aria-hidden="true" />
					Još 10
				</Button>
			</SessionActionBar>
		</>
	);
}
