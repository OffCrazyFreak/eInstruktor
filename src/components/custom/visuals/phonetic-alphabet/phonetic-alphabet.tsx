import LetterGrid from "@/components/custom/visuals/phonetic-alphabet/letter-grid";
import SpellInput from "@/components/custom/visuals/phonetic-alphabet/spell-input";
import SpellingDrill from "@/components/custom/visuals/phonetic-alphabet/spelling-drill";
import {
	readBoolean,
	readOption,
	readStringList,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["letters", "drill"] as const;
const DEFAULT_WORDS = ["Vis", "Hvar", "Krk", "Mljet", "Lastovo"];

export interface IPhoneticAlphabetProps {
	mode?: (typeof MODES)[number];
	/** Words for the drill, usually island names. */
	words?: string[];
	/** Question media: the word to spell, with no code words. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IPhoneticAlphabetProps {
	const words = readStringList(props, "words");

	return {
		mode: readOption(props, "mode", MODES),
		words: words.length > 0 ? words : undefined,
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

export default function PhoneticAlphabet({
	mode = "letters",
	words = DEFAULT_WORDS,
	hideAnswer = false,
}: IPhoneticAlphabetProps) {
	if (hideAnswer) {
		return (
			<div className="rounded-2xl bg-[#eaf3ff] px-4 py-3 text-[#002c78]">
				<p className="font-mono text-[0.72rem] tracking-[0.14em] text-[#0a63b0] uppercase">
					Sriči
				</p>
				<p className="font-serif text-3xl">{words.join(", ")}</p>
			</div>
		);
	}

	if (mode === "drill") {
		return <SpellingDrill words={words} />;
	}

	return (
		<div className="space-y-4">
			<LetterGrid />
			<SpellInput />
		</div>
	);
}
