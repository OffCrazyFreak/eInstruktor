interface ICodeWord {
	symbol: string;
	/** Official ITU spelling. */
	itu: string;
	/** How the Croatian scripts write the pronunciation. */
	spoken: string;
	/** Plain English digit, said after the code word ("Nove Najn"). */
	english?: string;
}

const LETTER_ROWS = [
	["A", "Alfa", "Alfa"],
	["B", "Bravo", "Bravo"],
	["C", "Charlie", "Čarli"],
	["D", "Delta", "Delta"],
	["E", "Echo", "Eko"],
	["F", "Foxtrot", "Fokstrot"],
	["G", "Golf", "Golf"],
	["H", "Hotel", "Hotel"],
	["I", "India", "Indija"],
	["J", "Juliett", "Džulijet"],
	["K", "Kilo", "Kilo"],
	["L", "Lima", "Lima"],
	["M", "Mike", "Majk"],
	["N", "November", "November"],
	["O", "Oscar", "Oskar"],
	["P", "Papa", "Papa"],
	["Q", "Quebec", "Kvibek"],
	["R", "Romeo", "Romio"],
	["S", "Sierra", "Siera"],
	["T", "Tango", "Tango"],
	["U", "Uniform", "Juniform"],
	["V", "Victor", "Viktor"],
	["W", "Whiskey", "Viski"],
	["X", "X-ray", "Iksrej"],
	["Y", "Yankee", "Jenki"],
	["Z", "Zulu", "Zulu"],
] as const;

const DIGIT_ROWS = [
	["0", "Nadazero", "Nada", "Ziro"],
	["1", "Unaone", "Una", "Uan"],
	["2", "Bissotwo", "Biso", "Tu"],
	["3", "Terrathree", "Tera", "Tri"],
	["4", "Kartefour", "Karte", "For"],
	["5", "Pantafive", "Panta", "Fajv"],
	["6", "Soxisix", "Soksi", "Siks"],
	["7", "Setteseven", "Sete", "Seven"],
	["8", "Oktoeight", "Okto", "Eit"],
	["9", "Novenine", "Nove", "Najn"],
] as const;

export const LETTERS: ICodeWord[] = LETTER_ROWS.map(
	([symbol, itu, spoken]) => ({ symbol, itu, spoken }),
);

export const DIGITS: ICodeWord[] = DIGIT_ROWS.map(
	([symbol, itu, spoken, english]) => ({ symbol, itu, spoken, english }),
);

const BY_SYMBOL = new Map(
	[...LETTERS, ...DIGITS].map((word) => [word.symbol, word]),
);

/** Č, Ć, Đ, Š and Ž are spelled with their base letter; say separately that the letter has a mark. */
const BASE_LETTER: Record<string, string> = {
	Č: "C",
	Ć: "C",
	Đ: "D",
	Š: "S",
	Ž: "Z",
};

export interface ISpelledSymbol {
	symbol: string;
	word: ICodeWord | null;
	hasMark: boolean;
}

export function spell(text: string): ISpelledSymbol[] {
	return [...text.toUpperCase()]
		.filter((symbol) => symbol.trim() !== "")
		.map((symbol) => {
			const base = BASE_LETTER[symbol] ?? symbol;

			return {
				symbol,
				word: BY_SYMBOL.get(base) ?? null,
				hasMark: base !== symbol,
			};
		});
}

/** "9A2817" becomes "Nove Najn, Alfa, Biso Tu, Okto Eit, Una Uan, Sete Seven", as in the lessons. */
export function spellAloud(text: string): string {
	return spell(text)
		.map(({ symbol, word }) =>
			word ? [word.spoken, word.english].filter(Boolean).join(" ") : symbol,
		)
		.join(", ");
}
