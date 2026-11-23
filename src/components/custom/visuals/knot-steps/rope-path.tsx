export type RopeTone = "rope" | "active" | "second";

interface IRopePathProps {
	d: string;
	tone: RopeTone;
}

const COLORS: Record<RopeTone, { core: string; edge: string }> = {
	rope: { core: "#e8d7b0", edge: "#8a6a3a" },
	active: { core: "#ffb43c", edge: "#9a5a00" },
	second: { core: "#8cc2ee", edge: "#0a63b0" },
};

/** One stretch of rope; stretches drawn later lie on top, which is how crossings show over and under. */
export default function RopePath({ d, tone }: IRopePathProps) {
	const color = COLORS[tone];

	return (
		<g fill="none" strokeLinecap="round" strokeLinejoin="round">
			<path d={d} stroke={color.edge} strokeWidth="12" />
			<path d={d} stroke={color.core} strokeWidth="8" />
			<path
				d={d}
				stroke={color.edge}
				strokeWidth="1"
				strokeDasharray="2 5"
				opacity="0.5"
			/>
		</g>
	);
}
