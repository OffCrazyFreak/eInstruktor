import { useAnimationFrame } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getAudioContext } from "@/components/custom/visuals/shared/audio-context";
import { playSchedule } from "@/components/custom/visuals/sound-signal-player/horn-audio";
import {
	type PatternId,
	scheduleSignal,
	signalLength,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";

interface IPlayback {
	id: PatternId;
	startedAt: number;
}

/** Plays one signal at a time, only after a tap, and reports how far into it we are for the display. */
export function useSignalPlayer() {
	const silence = useRef<(() => void) | null>(null);
	const [playback, setPlayback] = useState<IPlayback | null>(null);
	const [elapsed, setElapsed] = useState(0);

	function stop() {
		silence.current?.();
		silence.current = null;
		setPlayback(null);
		setElapsed(0);
	}

	function play(id: PatternId) {
		stop();
		const context = getAudioContext();

		if (context) {
			void context.resume();
			silence.current = playSchedule(context, scheduleSignal(id));
		}

		setPlayback({ id, startedAt: performance.now() });
	}

	useAnimationFrame(() => {
		if (!playback) {
			return;
		}

		const seconds = (performance.now() - playback.startedAt) / 1000;

		if (seconds > signalLength(scheduleSignal(playback.id)) + 0.3) {
			stop();
		} else {
			setElapsed(seconds);
		}
	});

	useEffect(() => {
		return () => {
			silence.current?.();
		};
	}, []);

	return { playingId: playback?.id ?? null, elapsed, play, stop };
}
