import { motion } from "motion/react";
import { NAVY, OCEAN } from "@/features/landing/constants/palette";

interface ISailboatProps {
	reduce: boolean;
	className?: string;
}

export default function Sailboat({ reduce, className }: ISailboatProps) {
	return (
		<motion.svg
			viewBox="0 0 120 90"
			className={className}
			aria-hidden="true"
			initial={reduce ? false : { x: -30 }}
			animate={reduce ? undefined : { x: [-14, 14, -14], y: [0, -4, 0] }}
			transition={
				reduce
					? undefined
					: { duration: 8, repeat: Infinity, ease: "easeInOut" }
			}
		>
			<path d="M20 66 L100 66 L88 78 L32 78 Z" fill={NAVY} />
			<path d="M60 10 L60 62 L26 62 Z" fill={NAVY} />
			<path d="M64 20 L64 62 L92 62 Z" fill={OCEAN} opacity="0.85" />
			<line x1="60" y1="8" x2="60" y2="66" stroke={NAVY} strokeWidth="2" />
		</motion.svg>
	);
}
