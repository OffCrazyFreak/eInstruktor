import {
	type MotionValue,
	useAnimationFrame,
	useMotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import {
	type ILightSegment,
	total,
} from "@/components/custom/visuals/shared/light/light-sequence";

interface ILightPlayback {
	segment: ILightSegment | undefined;
	/** Share of the period already shown, 0 to 1, for the timeline playhead. */
	progress: MotionValue<number>;
}

/** Steps through a light sequence on the animation clock, so the lamp and the playhead never drift apart. Remount it (with a `key`) to start a new sequence from zero. */
export function useLightPlayback(
	segments: readonly ILightSegment[],
	playing: boolean,
): ILightPlayback {
	const progress = useMotionValue(0);
	const [index, setIndex] = useState(0);
	const clock = useRef(0);
	const lastFrame = useRef<number | null>(null);
	const shownIndex = useRef(0);

	useAnimationFrame((time) => {
		const length = total(segments);

		if (!playing || length === 0) {
			lastFrame.current = null;
			return;
		}

		const delta = lastFrame.current === null ? 0 : time - lastFrame.current;

		lastFrame.current = time;
		clock.current = (clock.current + delta / 1000) % length;
		progress.set(clock.current / length);

		const next = segmentAt(segments, clock.current);

		if (next !== shownIndex.current) {
			shownIndex.current = next;
			setIndex(next);
		}
	});

	return { segment: segments[index], progress };
}

function segmentAt(
	segments: readonly ILightSegment[],
	seconds: number,
): number {
	let elapsed = 0;

	for (const [index, segment] of segments.entries()) {
		elapsed += segment.duration;

		if (seconds < elapsed) {
			return index;
		}
	}

	return segments.length - 1;
}
