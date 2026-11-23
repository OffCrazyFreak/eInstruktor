import { useState } from "react";
import {
	DIGITS,
	type ICodeWord,
	LETTERS,
} from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";
import { cn } from "@/lib/utils";

/** All 26 letters and 10 digits; tap one to see how it is said on the radio. */
export default function LetterGrid() {
	const [selected, setSelected] = useState<ICodeWord>(LETTERS[0] as ICodeWord);

	return (
		<div className="space-y-3">
			<div
				aria-live="polite"
				className="rounded-2xl bg-[#eaf3ff] px-4 py-3 text-[#002c78]"
			>
				<p className="font-mono text-[0.72rem] tracking-[0.14em] text-[#0a63b0] uppercase">
					{/\d/.test(selected.symbol) ? "Znamenka" : "Slovo"} {selected.symbol}
				</p>
				<p className="font-serif text-3xl">
					{[selected.spoken, selected.english].filter(Boolean).join(" ")}
				</p>
				<p className="font-mono text-[0.8rem] text-[#002c78]/65">
					ITU: {selected.itu}
				</p>
			</div>

			<SymbolButtons
				words={LETTERS}
				selected={selected}
				onSelect={setSelected}
				className="grid-cols-4 sm:grid-cols-7 lg:grid-cols-9"
			/>
			<SymbolButtons
				words={DIGITS}
				selected={selected}
				onSelect={setSelected}
				className="grid-cols-5 sm:grid-cols-10"
			/>
		</div>
	);
}

interface ISymbolButtonsProps {
	words: readonly ICodeWord[];
	selected: ICodeWord;
	onSelect: (word: ICodeWord) => void;
	className: string;
}

function SymbolButtons({
	words,
	selected,
	onSelect,
	className,
}: ISymbolButtonsProps) {
	return (
		<ul className={cn("m-0 grid list-none gap-1.5 p-0", className)}>
			{words.map((word) => (
				<li key={word.symbol}>
					<button
						type="button"
						aria-pressed={word.symbol === selected.symbol}
						aria-label={`${word.symbol}: ${word.spoken}`}
						onClick={() => onSelect(word)}
						className={cn(
							"min-h-11 w-full rounded-xl border px-2 py-1 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
							word.symbol === selected.symbol
								? "border-[#002c78] bg-[#002c78] text-white"
								: "border-[#002c78]/10 bg-white hover:border-[#00aef3]",
						)}
					>
						<span className="font-serif text-xl font-bold">{word.symbol}</span>
						<span className="block truncate text-[0.78rem] leading-tight opacity-75">
							{word.spoken}
						</span>
					</button>
				</li>
			))}
		</ul>
	);
}
