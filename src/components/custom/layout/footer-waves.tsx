import { motion, useReducedMotion } from "motion/react";

export default function FooterWaves() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.svg
			viewBox="0 0 1440 60"
			preserveAspectRatio="none"
			className="pointer-events-none absolute bottom-0 -left-[15%] z-0 h-5 w-[130%] text-primary"
			aria-hidden="true"
			animate={reduceMotion ? undefined : { x: [0, -30, 0] }}
			transition={{
				duration: 7,
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			<path
				d="M0 30 C 240 8 430 48 720 28 S 1220 6 1440 32 L1440 60 L0 60 Z"
				fill="currentColor"
				opacity="0.18"
			/>
			<path
				d="M0 40 C 260 18 440 56 760 38 S 1240 18 1440 42 L1440 60 L0 60 Z"
				fill="currentColor"
				opacity="0.3"
			/>
		</motion.svg>
	);
}
