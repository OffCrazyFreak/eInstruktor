import { useState } from "react";
import {
	DIGITS,
	type ICodeWord,
	LETTERS,
	spell,
} from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";
import { cn } from "@/lib/utils";

interface ISpellingDrillProps {
	words: readonly string[];
}

/** Three code words per symbol, letters among letters and digits among digits. Distractors rotate so the answer is not always first. */
function choicesFor(symbol: string, position: number): string[] {
	const pool = /\d/.test(symbol) ? DIGITS : LETTERS;
	const index = pool.findIndex((word) => word.symbol === symbol);
	const options = [0, 7, -5].map((offset) =>
		sayWord(pool[(index + offset + pool.length * 2) % pool.length]),
	);

	return options.map(
		(_, slot) => options[(slot + position) % options.length] ?? "",
	);
}

function sayWord(word: ICodeWord | null | undefined): string {
	return word ? [word.spoken, word.english].filter(Boolean).join(" ") : "";
}

export default function SpellingDrill({ words }: ISpellingDrillProps) {
	const [wordIndex, setWordIndex] = useState(0);
	const [done, setDone] = useState<string[]>([]);
	const [wrong, setWrong] = useState<string | null>(null);
	const word = words[wordIndex % words.length] ?? "Vis";
	const letters = spell(word).filter((item) => item.word);
	const current = letters[done.length];
	const finished = done.length === letters.length;

	function answer(choice: string) {
		if (choice === sayWord(current?.word)) {
			setDone([...done, choice]);
			setWrong(null);
		} else {
			setWrong(choice);
		}
	}

	function nextWord() {
		setWordIndex(wordIndex + 1);
		setDone([]);
		setWrong(null);
	}

	return (
		<div className="space-y-4">
			<div>
				<p className="font-mono text-[0.72rem] tracking-[0.14em] text-ocean uppercase">
					Sriči
				</p>
				<p className="font-serif text-3xl">{word}</p>
			</div>

			<ol
				className="m-0 flex list-none flex-wrap gap-1.5 p-0"
				aria-label="Već sricano"
			>
				{letters.map((item, position) => (
					<li
						key={`${item.symbol}-${position.toString()}`}
						className={cn(
							"min-w-11 rounded-xl border px-2.5 py-1 text-center text-[0.86rem]",
							position < done.length
								? "border-[#14a05a] bg-[#14a05a]/10"
								: position === done.length
									? "border-[#ffb43c] bg-[#ffe89a]/50"
									: "border-ink/10",
						)}
					>
						<span className="font-mono font-bold">{item.symbol}</span>
						{position < done.length && (
							<span className="block">{done[position]}</span>
						)}
					</li>
				))}
			</ol>

			{current && !finished && (
				<div className="space-y-2">
					<p className="text-[0.92rem]">
						Kako izgovaraš {/\d/.test(current.symbol) ? "znamenku" : "slovo"}{" "}
						<strong className="font-mono">{current.word?.symbol}</strong>
						{current.hasMark ? " (bez kvačice)" : ""}?
					</p>
					<div className="flex flex-wrap gap-2">
						{choicesFor(current.word?.symbol ?? "A", done.length).map(
							(choice) => (
								<button
									key={choice}
									type="button"
									onClick={() => answer(choice)}
									className={cn(
										"min-h-11 rounded-2xl border px-4 text-[0.92rem] font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
										wrong === choice
											? "border-[#e0322b] bg-[#e0322b]/10"
											: "border-ink/15 bg-paper hover:border-[#00aef3]",
									)}
								>
									{choice}
								</button>
							),
						)}
					</div>
				</div>
			)}

			<div aria-live="polite">
				{finished && (
					<div className="space-y-2">
						<p className="font-semibold">Točno: {done.join(", ")}.</p>
						{words.length > 1 && (
							<button
								type="button"
								onClick={nextWord}
								className="inline-flex min-h-10 items-center rounded-full bg-brand px-4 text-[0.88rem] font-semibold text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
							>
								Sljedeći otok
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
