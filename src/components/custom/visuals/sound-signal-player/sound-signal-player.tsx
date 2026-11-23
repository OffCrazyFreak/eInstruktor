import { useState } from "react";
import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";
import SignalQuiz from "@/components/custom/visuals/sound-signal-player/signal-quiz";
import SignalRow from "@/components/custom/visuals/sound-signal-player/signal-row";
import {
	PATTERN_IDS,
	PATTERNS,
	type PatternId,
	type SignalSet,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";
import { useSignalPlayer } from "@/components/custom/visuals/sound-signal-player/use-signal-player";

const SETS = ["manoeuvre", "fog", "distress"] as const;
const MODES = ["list", "quiz"] as const;

export interface ISoundSignalPlayerProps {
	/** One signal on its own; its meaning stays hidden until the learner reveals it. */
	pattern?: PatternId;
	set?: SignalSet;
	mode?: (typeof MODES)[number];
	/** Question media: the meaning cannot be revealed. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): ISoundSignalPlayerProps {
	return {
		pattern: readOption(props, "pattern", PATTERN_IDS),
		set: readOption(props, "set", SETS),
		mode: readOption(props, "mode", MODES),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

const SET_TITLES: Record<SignalSet, string> = {
	manoeuvre: "Signali u manevru",
	fog: "Signali pri smanjenoj vidljivosti",
	distress: "Znak pogibelji",
};

export default function SoundSignalPlayer({
	pattern,
	set = "manoeuvre",
	mode = "list",
	hideAnswer = false,
}: ISoundSignalPlayerProps) {
	const player = useSignalPlayer();
	const [revealed, setRevealed] = useState(false);
	const ids = PATTERN_IDS.filter((id) => PATTERNS[id].set === set);

	if (mode === "quiz" && !pattern) {
		return (
			<SignalQuiz
				ids={ids.filter((id) =>
					PATTERNS[id].elements.every(
						(element) => element === "short" || element === "long",
					),
				)}
			/>
		);
	}

	const shown = pattern ? [pattern] : ids;

	return (
		<div className="space-y-3">
			<div className="flex items-baseline justify-between gap-3">
				<p className="font-serif text-lg">
					{pattern ? "Poslušaj signal" : SET_TITLES[set]}
				</p>
				<p className="font-mono text-[0.72rem] text-[#002c78]/60">
					kratki 1 s, dugi 4 do 6 s
				</p>
			</div>

			<div className="space-y-2">
				{shown.map((id) => (
					<SignalRow
						key={id}
						id={id}
						playing={player.playingId === id}
						elapsed={player.elapsed}
						onPlay={() => player.play(id)}
						onStop={player.stop}
					>
						{hideAnswer ? null : pattern && !revealed ? (
							<button
								type="button"
								onClick={() => setRevealed(true)}
								className="text-[0.85rem] font-semibold text-[#0a63b0] underline underline-offset-2 outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
							>
								Pokaži što znači
							</button>
						) : (
							<p className="text-[0.88rem] leading-snug">
								{PATTERNS[id].meaning}
							</p>
						)}
					</SignalRow>
				))}
			</div>

			<p className="text-[0.78rem] text-[#002c78]/60">
				Zvuk se pušta samo kad pritisneš zvučnik. Bez zvuka prati točke i
				crtice.
			</p>
		</div>
	);
}
