import {
	DIGITS,
	LETTERS,
} from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";

/** All 26 letters and 10 digits: the symbol, how to say it, and the official ITU spelling under it. */
export default function LetterGrid() {
	return (
		<div className="space-y-3">
			<ul className="m-0 grid list-none grid-cols-3 gap-1.5 p-0 sm:grid-cols-5 lg:grid-cols-7">
				{LETTERS.map((word) => (
					<li
						key={word.symbol}
						className="rounded-xl border border-[#002c78]/10 bg-white px-2 py-1.5"
					>
						<span className="font-serif text-xl font-bold">{word.symbol}</span>
						<span className="block text-[0.86rem] font-semibold leading-tight">
							{word.spoken}
						</span>
						<span className="block font-mono text-[0.68rem] text-[#002c78]/55">
							{word.itu}
						</span>
					</li>
				))}
			</ul>
			<ul className="m-0 grid list-none grid-cols-2 gap-1.5 p-0 sm:grid-cols-5">
				{DIGITS.map((word) => (
					<li
						key={word.symbol}
						className="rounded-xl border border-[#002c78]/10 bg-[#eaf3ff] px-2 py-1.5"
					>
						<span className="font-serif text-xl font-bold">{word.symbol}</span>
						<span className="block text-[0.86rem] font-semibold leading-tight">
							{word.spoken} {word.english}
						</span>
						<span className="block font-mono text-[0.68rem] text-[#002c78]/55">
							{word.itu}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
