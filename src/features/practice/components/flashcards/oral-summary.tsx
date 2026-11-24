import { Link } from "@tanstack/react-router";
import { CircleCheck, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import SessionActionBar from "@/features/practice/components/session/session-action-bar";
import { pluralHr } from "@/lib/plural";

interface IOralSummaryProps {
	round: number;
	known: number;
	missed: number;
	onRepeat: () => void;
}

function cards(count: number): string {
	return `${count} ${pluralHr(count, "kartica", "kartice", "kartica")}`;
}

export default function OralSummary({
	round,
	known,
	missed,
	onRepeat,
}: IOralSummaryProps) {
	const allKnown = missed === 0;
	const headingRef = useRef<HTMLHeadingElement>(null);

	// The grade buttons are gone with the last card, so focus starts at the round's result.
	useEffect(() => {
		headingRef.current?.focus({ preventScroll: true });
	}, []);

	return (
		<>
			<main className="mx-auto max-w-2xl px-4 pt-8 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:px-6">
				<p className="font-mono text-[0.74rem] tracking-[0.2em] text-ocean dark:text-[#4cc2ff]">
					{round === 1 ? "KRAJ KRUGA" : `KRAJ ${round}. KRUGA`}
				</p>
				<h1
					ref={headingRef}
					tabIndex={-1}
					className="mt-2 font-serif text-[1.9rem] leading-tight outline-none"
				>
					{allKnown ? "Sve znaš za sada" : `Još ${cards(missed)} za ponoviti`}
				</h1>

				<dl className="mt-6 grid grid-cols-2 gap-3">
					<div className="rounded-[1.2rem] border border-border bg-card p-4">
						<dt className="text-[0.85rem] text-muted-foreground">Znao sam</dt>
						<dd className="mt-1 font-serif text-3xl tabular-nums">{known}</dd>
					</div>
					<div className="rounded-[1.2rem] border border-border bg-card p-4">
						<dt className="text-[0.85rem] text-muted-foreground">Nisam znao</dt>
						<dd className="mt-1 font-serif text-3xl tabular-nums">{missed}</dd>
					</div>
				</dl>

				<p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
					{allKnown
						? "Kartice koje znaš vraćaju se za 2, pa za 6 dana, da ih ne zaboraviš do ispita."
						: "Nepoznate kartice ponovi odmah, dok je odgovor svjež. Vraćaju se i sutra."}
				</p>
			</main>

			<SessionActionBar>
				<Button
					asChild
					variant="outline"
					className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1"
				>
					<Link to="/vjezba/usmeno">Natrag na kartice</Link>
				</Button>
				{allKnown ? null : (
					<Button
						type="button"
						onClick={onRepeat}
						className="order-first h-12 rounded-full text-[1rem] font-semibold sm:order-none sm:flex-1"
					>
						<RotateCcw className="size-4" aria-hidden="true" />
						Ponovi {missed} {pluralHr(missed, "karticu", "kartice", "kartica")}
					</Button>
				)}
				{allKnown && (
					<Button
						asChild
						className="order-first h-12 rounded-full text-[1rem] font-semibold sm:order-none sm:flex-1"
					>
						<Link to="/vjezba">
							<CircleCheck className="size-4" aria-hidden="true" />
							Na vježbu pitanja
						</Link>
					</Button>
				)}
			</SessionActionBar>
		</>
	);
}
