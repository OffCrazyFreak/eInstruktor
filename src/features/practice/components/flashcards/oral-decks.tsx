import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import course from "@/content/voditelj-brodice";
import { deckTitle } from "@/features/practice/utils/deck-title";
import {
	ALL_DECKS,
	type DeckId,
	deckCards,
	deckStats,
	type IDeckStats,
} from "@/features/practice/utils/flashcard-deck";
import { EXAM_SUBJECT_IDS } from "@/features/practice/utils/practice-search";
import { toStudyDay } from "@/lib/dates/study-day";
import { pluralHr } from "@/lib/plural";
import useProgress from "@/lib/progress/use-progress";

function statsLine(stats: IDeckStats, ready: boolean): string {
	const total = `${stats.total} ${pluralHr(stats.total, "kartica", "kartice", "kartica")}`;

	if (!ready || stats.due === stats.total) {
		return total;
	}

	const parts = [total, `${stats.due} za ponoviti`];

	if (stats.unknown > 0) {
		parts.push(
			`${stats.unknown} ${pluralHr(stats.unknown, "nepoznata", "nepoznate", "nepoznatih")}`,
		);
	}

	return parts.join(", ");
}

export default function OralDecks() {
	const { progress, ready, level } = useProgress();
	const today = toStudyDay(new Date());

	const decks = ([ALL_DECKS, ...EXAM_SUBJECT_IDS] as DeckId[])
		.map((deck) => {
			const cards = deckCards(course, level, deck);

			return { deck, stats: deckStats(cards, progress.cardBoxes, today) };
		})
		.filter(({ stats }) => stats.total > 0);

	return (
		<main className="mx-auto max-w-3xl px-4 pt-7 pb-8 sm:px-6 lg:pt-10">
			<Link
				to="/vjezba"
				className="-ml-1 inline-flex min-h-11 items-center gap-1 text-[0.92rem] font-semibold text-[#0a63b0] dark:text-[#4cc2ff]"
			>
				<ChevronLeft className="size-4" aria-hidden="true" />
				Vježba
			</Link>
			<h1 className="font-serif text-3xl leading-tight sm:text-4xl">
				Usmeni ispit
			</h1>
			<p className="mt-2 max-w-xl text-[1rem] leading-relaxed text-muted-foreground">
				Na ispitu ispitivač pita, a ti odgovaraš naglas. Pročitaj pitanje,
				odgovori, pa otkrij odgovor i reci jesi li ga znao.
			</p>

			<ul className="mt-6 space-y-2.5">
				{decks.map(({ deck, stats }) => (
					<li key={deck}>
						<Link
							to="/vjezba/usmeno/$deck"
							params={{ deck }}
							className="flex min-h-16 items-center gap-3 rounded-[1.2rem] border border-border bg-card p-4 text-foreground outline-none hover:border-[#0a63b0]/40 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:hover:border-[#4cc2ff]/50"
						>
							<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
								<Layers className="size-5" aria-hidden="true" />
							</span>
							<span className="min-w-0 flex-1">
								<span className="block font-semibold leading-snug">
									{deckTitle(deck)}
								</span>
								<span className="text-[0.85rem] text-muted-foreground">
									{statsLine(stats, ready)}
								</span>
							</span>
							<ChevronRight
								className="size-5 shrink-0 text-muted-foreground"
								aria-hidden="true"
							/>
						</Link>
					</li>
				))}
			</ul>

			<p className="mt-6 text-[0.85rem] leading-relaxed text-muted-foreground">
				Pitanja i odgovori su iz pripremnog materijala za ispit, prepisani kako
				jesu. Gdje se stari odgovor razlikuje od današnjih pravila, uz njega je
				napomena.
			</p>
		</main>
	);
}
