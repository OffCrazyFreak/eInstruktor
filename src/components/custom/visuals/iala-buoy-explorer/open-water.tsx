import SmallMark from "@/components/custom/visuals/iala-buoy-explorer/small-mark";
import type {
	IMark,
	MarkId,
} from "@/components/custom/visuals/shared/buoy/buoy-marks";
import HazardRock from "@/components/custom/visuals/shared/sea/hazard-rock";
import {
	PALETTE,
	SIGNAL,
} from "@/components/custom/visuals/shared/visual-palette";

interface IOpenWaterProps {
	mark: IMark;
	arrowId: string;
}

const CARDINAL_OFFSET: Partial<Record<MarkId, [number, number]>> = {
	north: [0, -1],
	east: [1, 0],
	south: [0, 1],
	west: [-1, 0],
};

/** Marks that stand in open water: the dotted route shows which side, or how widely, to pass. */
export default function OpenWater({ mark, arrowId }: IOpenWaterProps) {
	const offset = CARDINAL_OFFSET[mark.id];

	if (offset) {
		const [dx, dy] = offset;

		return (
			<g>
				<HazardRock x={100} y={100} />
				<SmallMark
					x={100 + dx * 34}
					y={100 + dy * 34}
					color={SIGNAL.black}
					band={SIGNAL.yellow}
					active
				/>
				<path
					d={
						dx === 0 ? `M20 ${100 + dy * 66} H180` : `M${100 + dx * 66} 180 V20`
					}
					stroke={PALETTE.sun}
					strokeWidth="4"
					strokeDasharray="2 7"
					strokeLinecap="round"
					markerEnd={`url(#${arrowId})`}
				/>
			</g>
		);
	}

	const markColor =
		mark.group === "safe-water"
			? SIGNAL.red
			: mark.group === "special"
				? SIGNAL.yellow
				: mark.group === "new-danger"
					? SIGNAL.blue
					: SIGNAL.black;
	const band =
		mark.group === "safe-water"
			? SIGNAL.white
			: mark.group === "new-danger"
				? SIGNAL.yellow
				: mark.group === "isolated-danger"
					? SIGNAL.red
					: undefined;
	const radius =
		mark.group === "safe-water" ? 0 : mark.group === "new-danger" ? 62 : 44;

	return (
		<g>
			{mark.group === "isolated-danger" && <HazardRock x={100} y={100} />}
			{mark.group === "new-danger" && (
				<path d="M84 108 l12 -16 l20 6 l-6 14 z" fill="#5b6475" />
			)}
			{mark.group === "special" && (
				<rect
					x="40"
					y="58"
					width="120"
					height="84"
					rx="8"
					fill={SIGNAL.yellow}
					fillOpacity="0.18"
					stroke={SIGNAL.yellow}
					strokeDasharray="6 4"
					strokeWidth="2"
				/>
			)}
			<SmallMark
				x={100}
				y={mark.group === "special" ? 58 : 100}
				color={markColor}
				band={band}
				active
			/>
			{radius > 0 && mark.group !== "special" && (
				<circle
					cx="100"
					cy="100"
					r={radius}
					fill="none"
					stroke={PALETTE.sun}
					strokeWidth="4"
					strokeDasharray="2 7"
					strokeLinecap="round"
				/>
			)}
			{mark.group === "safe-water" && (
				<g
					stroke={PALETTE.sun}
					strokeWidth="4"
					strokeDasharray="2 7"
					strokeLinecap="round"
				>
					<path d="M72 180 V20" markerEnd={`url(#${arrowId})`} />
					<path d="M128 180 V20" markerEnd={`url(#${arrowId})`} />
				</g>
			)}
			{mark.group === "special" && (
				<path
					d="M20 170 H180"
					stroke={PALETTE.sun}
					strokeWidth="4"
					strokeDasharray="2 7"
					strokeLinecap="round"
					markerEnd={`url(#${arrowId})`}
				/>
			)}
		</g>
	);
}
