import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Starts animations on their own unless the reader asked the system for reduced motion; then they wait for a tap. */
export function useAutoplay(enabled = true) {
	const reduce = useReducedMotion();
	const [playing, setPlaying] = useState(enabled);

	useEffect(() => {
		if (reduce) {
			setPlaying(false);
		}
	}, [reduce]);

	return [playing, setPlaying] as const;
}
