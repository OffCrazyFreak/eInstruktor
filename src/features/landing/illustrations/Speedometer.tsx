import { motion } from "motion/react";

/**
 * Readiness shown as a speedometer gauge: a 270 degree arc with the gap
 * centered at the bottom (rotate 135 puts the start at 7:30 and the end at
 * 4:30). Reused across every concept, recolored per page via props.
 */

type SpeedometerProps = {
	value: number;
	size?: number;
	/** Unfilled arc color. */
	track: string;
	/** Filled arc color. */
	fill: string;
	/** Center number + label colors. */
	valueColor: string;
	labelColor: string;
	label?: string;
	animated: boolean;
	glow?: boolean;
};

export function Speedometer({
	value,
	size = 240,
	track,
	fill,
	valueColor,
	labelColor,
	label = "SPREMNOST",
	animated,
	glow = false,
}: SpeedometerProps) {
	const r = 84;
	const circumference = 2 * Math.PI * r;
	const arc = 0.75; // 270 degrees, gap centered at the bottom
	const trackLen = circumference * arc;
	const target = trackLen * (value / 100);

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 220 220"
			role="img"
			aria-label={`Spremnost za ispit ${value} posto`}
		>
			<circle
				cx="110"
				cy="110"
				r={r}
				fill="none"
				stroke={track}
				strokeWidth="15"
				strokeLinecap="round"
				strokeDasharray={`${trackLen} ${circumference}`}
				transform="rotate(135 110 110)"
			/>
			<motion.circle
				cx="110"
				cy="110"
				r={r}
				fill="none"
				stroke={fill}
				strokeWidth="15"
				strokeLinecap="round"
				transform="rotate(135 110 110)"
				style={glow ? { filter: `drop-shadow(0 0 6px ${fill})` } : undefined}
				strokeDasharray={`${target} ${circumference}`}
				initial={animated ? { strokeDasharray: `0 ${circumference}` } : false}
				whileInView={
					animated
						? { strokeDasharray: `${target} ${circumference}` }
						: undefined
				}
				viewport={{ once: true }}
				transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
			/>
			<text
				x="110"
				y="104"
				textAnchor="middle"
				fontSize="46"
				fontFamily="var(--font-serif)"
				fill={valueColor}
			>
				{value}%
			</text>
			<text
				x="110"
				y="132"
				textAnchor="middle"
				fontSize="11"
				letterSpacing="2"
				fontFamily="var(--font-mono)"
				fill={labelColor}
			>
				{label}
			</text>
		</svg>
	);
}
