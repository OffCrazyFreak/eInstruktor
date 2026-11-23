import { TriangleAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import type { IStudyCard } from "@/content/types";
import CardTags from "@/features/practice/components/flashcards/card-tags";

interface IFlashCardProps {
	card: IStudyCard;
	subject: string;
	revealed: boolean;
	onReveal: () => void;
}

const CARD_CLASS =
	"block w-full rounded-[1.6rem] border border-border bg-card p-5 text-left shadow-[0_1px_0_rgba(0,44,120,0.06),0_12px_32px_-18px_rgba(0,44,120,0.35)] sm:p-7";

export default function FlashCard({
	card,
	subject,
	revealed,
	onReveal,
}: IFlashCardProps) {
	const backRef = useRef<HTMLElement>(null);

	// The front button disappears on reveal, so focus goes to the answer instead of falling back to the page.
	useEffect(() => {
		if (revealed) {
			backRef.current?.focus();
		}
	}, [revealed]);

	if (!revealed) {
		return (
			<button
				type="button"
				onClick={onReveal}
				className={`${CARD_CLASS} min-h-[16rem] cursor-pointer outline-none hover:border-[#0a63b0]/40 focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:hover:border-[#4cc2ff]/50`}
			>
				<CardTags card={card} subject={subject} />
				<span className="mt-6 block font-serif text-[1.45rem] leading-snug sm:text-[1.7rem]">
					{card.prompt}
				</span>
				<span className="mt-6 block text-[0.9rem] text-muted-foreground">
					Odgovori naglas, pa otkrij.
				</span>
			</button>
		);
	}

	return (
		<article
			ref={backRef}
			tabIndex={-1}
			aria-labelledby={`card-${card.id}`}
			className={`${CARD_CLASS} outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60`}
		>
			<CardTags card={card} subject={subject} />
			<h2
				id={`card-${card.id}`}
				className="mt-4 font-serif text-[1.15rem] leading-snug text-muted-foreground"
			>
				{card.prompt}
			</h2>

			<p className="mt-4 font-mono text-[0.72rem] tracking-[0.18em] text-[#0a63b0] dark:text-[#4cc2ff]">
				ODGOVOR
			</p>
			<p className="mt-1.5 whitespace-pre-line text-[1.02rem] leading-relaxed">
				{card.answer}
			</p>

			{card.correction && (
				<aside
					role="note"
					aria-label="Ispravak"
					className="mt-5 rounded-2xl border-l-4 border-[#ffb43c] bg-[#fff6e6] p-4 dark:bg-[#3a2a0c]"
				>
					<p className="flex items-center gap-2 text-[0.88rem] font-semibold text-[#8a5200] dark:text-[#ffd48a]">
						<TriangleAlert className="size-4" aria-hidden="true" />
						Ispravak
					</p>
					<p className="mt-1.5 text-[0.95rem] leading-relaxed">
						{card.correction}
					</p>
				</aside>
			)}

			<p className="mt-5 font-mono text-[0.72rem] text-muted-foreground">
				Pitanje {card.ref} iz pripremnog materijala
			</p>
		</article>
	);
}
