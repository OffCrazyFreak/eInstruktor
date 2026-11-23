import LetterGrid from "@/components/custom/visuals/phonetic-alphabet/letter-grid";
import SpellInput from "@/components/custom/visuals/phonetic-alphabet/spell-input";
import SpellingDrill from "@/components/custom/visuals/phonetic-alphabet/spelling-drill";
import {
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
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IPhoneticAlphabetProps {
	const words = readStringList(props, "words");

	return {
		mode: readOption(props, "mode", MODES),
		words: words.length > 0 ? words : undefined,
	};
}

export default function PhoneticAlphabet({
	mode = "letters",
	words = DEFAULT_WORDS,
}: IPhoneticAlphabetProps) {
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
