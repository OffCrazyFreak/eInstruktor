import { useState } from "react";
import QuizChoices from "@/components/custom/visuals/shared/quiz-choices";
import SignalRow from "@/components/custom/visuals/sound-signal-player/signal-row";
import {
	PATTERNS,
	type PatternId,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";
import { useSignalPlayer } from "@/components/custom/visuals/sound-signal-player/use-signal-player";

interface ISignalQuizProps {
	ids: readonly PatternId[];
}

/** Plays a signal from the set and asks what it means. */
export default function SignalQuiz({ ids }: ISignalQuizProps) {
	const player = useSignalPlayer();
	const [current, setCurrent] = useState<PatternId>(ids[0] ?? "short");
	const [round, setRound] = useState(0);

	function next() {
		player.stop();
		const others = ids.filter((id) => id !== current);

		setCurrent(others[Math.floor(Math.random() * others.length)] ?? current);
		setRound(round + 1);
	}

	return (
		<div className="space-y-4">
			<SignalRow
				id={current}
				playing={player.playingId === current}
				elapsed={player.elapsed}
				onPlay={() => player.play(current)}
				onStop={player.stop}
			>
				<p className="text-[0.82rem] text-[#002c78]/70">
					Pritisni zvučnik i poslušaj. Crtice su dugi, točke kratki signali.
				</p>
			</SignalRow>

			<QuizChoices
				key={`${current}-${round}`}
				prompt="Što znači ovaj signal?"
				choices={ids.map((id) => ({ value: id, label: PATTERNS[id].meaning }))}
				answer={current}
				onNext={next}
			/>
		</div>
	);
}
