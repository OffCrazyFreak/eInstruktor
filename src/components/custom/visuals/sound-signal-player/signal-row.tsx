import { Square, Volume2 } from "lucide-react";
import type { ReactNode } from "react";
import SignalStrip from "@/components/custom/visuals/sound-signal-player/signal-strip";
import {
	type PatternId,
	scheduleSignal,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";

interface ISignalRowProps {
	id: PatternId;
	playing: boolean;
	elapsed: number;
	onPlay: () => void;
	onStop: () => void;
	/** Meaning, or nothing when the learner should guess it first. */
	children?: ReactNode;
}

export default function SignalRow({
	id,
	playing,
	elapsed,
	onPlay,
	onStop,
	children,
}: ISignalRowProps) {
	return (
		<div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper p-3">
			<button
				type="button"
				onClick={playing ? onStop : onPlay}
				aria-label={playing ? "Zaustavi signal" : "Poslušaj signal"}
				className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
			>
				{playing ? (
					<Square className="size-4" aria-hidden />
				) : (
					<Volume2 className="size-5" aria-hidden />
				)}
			</button>
			<div className="min-w-0 flex-1 space-y-1.5">
				<SignalStrip
					sounds={scheduleSignal(id)}
					elapsed={playing ? elapsed : null}
				/>
				{children}
			</div>
		</div>
	);
}
