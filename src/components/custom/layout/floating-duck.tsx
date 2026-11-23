import { motion, useReducedMotion } from "motion/react";

export default function FloatingDuck() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className="pointer-events-none absolute bottom-0.5 z-[5]"
			aria-hidden="true"
			style={{ left: "8%" }}
			animate={
				reduceMotion
					? undefined
					: {
							// wander: drift, pause, turn around, drift back
							left: [
								"8%",
								"34%",
								"34%",
								"34%",
								"18%",
								"18%",
								"18%",
								"56%",
								"56%",
								"80%",
								"80%",
								"80%",
								"8%",
								"8%",
								"8%",
							],
							// face travel direction (flips while paused)
							scaleX: [1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1],
						}
			}
			transition={{
				duration: 140,
				ease: "easeInOut",
				times: [
					0, 0.12, 0.16, 0.2, 0.32, 0.36, 0.4, 0.54, 0.6, 0.72, 0.76, 0.8, 0.92,
					0.96, 1,
				],
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			<motion.svg
				width="24"
				height="20"
				viewBox="0 0 40 34"
				animate={
					reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-6, 6, -6] }
				}
				transition={{
					duration: 3.6,
					ease: "easeInOut",
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				<ellipse cx="19" cy="22" rx="13" ry="8" fill="#f4c531" />
				<path d="M13 20 Q19 15 25 21 Q19 25 13 20 Z" fill="#e0ad1f" />
				<circle cx="29" cy="13" r="6.5" fill="#f4c531" />
				<path d="M34 13 L41 15 L34 17 Z" fill="#ef8a3a" />
				<circle cx="30" cy="11.5" r="1.3" fill="#22324f" />
			</motion.svg>
		</motion.div>
	);
}
