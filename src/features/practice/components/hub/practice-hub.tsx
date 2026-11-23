import { useState } from "react";
import type { ExamLevel } from "@/content/course-types";
import course from "@/content/voditelj-brodice";
import ModeCard from "@/features/practice/components/hub/mode-card";
import ModeSheet from "@/features/practice/components/hub/mode-sheet";
import OralExamCard from "@/features/practice/components/hub/oral-exam-card";
import QuickStartCard from "@/features/practice/components/hub/quick-start-card";
import {
	HUB_MODES,
	PRACTICE_MODE_INFO,
} from "@/features/practice/constants/practice-modes";
import {
	ALL_DECKS,
	deckCards,
	deckStats,
} from "@/features/practice/utils/flashcard-deck";
import {
	type IPracticeContext,
	modeQuestionIds,
	practicePool,
} from "@/features/practice/utils/practice-pool";
import type { PracticeMode } from "@/features/practice/utils/practice-search";
import { areaGroups } from "@/lib/content/question-groups";
import { toStudyDay } from "@/lib/dates/study-day";
import { pluralHr } from "@/lib/plural";
import useProgress from "@/lib/progress/use-progress";

function questionCount(count: number): string {
	return `${count} ${pluralHr(count, "pitanje", "pitanja", "pitanja")}`;
}

// Area and mixed sets always have questions, so their chip says how big the pool is instead of a count to clear.
function countLabel(
	mode: PracticeMode,
	count: number,
	level: ExamLevel,
): string {
	if (mode === "podrucje") {
		return `${areaGroups(course, level).length} područja`;
	}

	return questionCount(count);
}

export default function PracticeHub() {
	const { progress, ready, level } = useProgress();
	const [openMode, setOpenMode] = useState<PracticeMode | null>(null);

	const context: IPracticeContext = {
		progress,
		today: toStudyDay(new Date()),
	};

	const counts = Object.fromEntries(
		HUB_MODES.map((mode) => [
			mode,
			modeQuestionIds(course, { mode, level }, context).length,
		]),
	) as Record<PracticeMode, number>;

	const cards = deckCards(course, level, ALL_DECKS);
	const cardStats = deckStats(cards, progress.cardBoxes, context.today);

	return (
		<main className="mx-auto max-w-5xl px-4 pt-7 pb-8 sm:px-6 lg:pt-10">
			<h1 className="font-serif text-3xl leading-tight sm:text-4xl">Vježba</h1>
			<p className="mt-2 text-[1rem] text-muted-foreground">
				{questionCount(practicePool(course, level).length)} za kategoriju{" "}
				{level}. Svaki odgovor ide u tvoju procjenu spremnosti.
			</p>

			<div className="mt-6">
				<QuickStartCard dueCount={ready ? counts.ponavljanje : 0} />
			</div>

			<h2 className="mt-10 font-mono text-[0.74rem] tracking-[0.2em] text-[#0a63b0] dark:text-[#4cc2ff]">
				NAČINI VJEŽBE
			</h2>

			<ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{HUB_MODES.map((mode) => {
					const alwaysOpen = mode === "podrucje" || mode === "mjesovito";
					const empty = ready && !alwaysOpen && counts[mode] === 0;

					return (
						<li key={mode}>
							<ModeCard
								info={PRACTICE_MODE_INFO[mode]}
								countLabel={
									ready || alwaysOpen
										? countLabel(mode, counts[mode], level)
										: null
								}
								empty={empty}
								onOpen={() => setOpenMode(mode)}
							/>
						</li>
					);
				})}
			</ul>

			<h2 className="mt-10 font-mono text-[0.74rem] tracking-[0.2em] text-[#0a63b0] dark:text-[#4cc2ff]">
				USMENI ISPIT
			</h2>

			<div className="mt-3">
				<OralExamCard
					total={cards.length}
					dueCount={
						ready && cardStats.due < cards.length ? cardStats.due : null
					}
				/>
			</div>

			<ModeSheet
				mode={openMode}
				learnerLevel={level}
				context={context}
				onClose={() => setOpenMode(null)}
			/>
		</main>
	);
}
