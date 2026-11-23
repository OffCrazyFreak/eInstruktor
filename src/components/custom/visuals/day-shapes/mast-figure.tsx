import { useId } from "react";
import DayShapeIcon from "@/components/custom/visuals/day-shapes/day-shape-icon";
import type { Shape } from "@/components/custom/visuals/day-shapes/day-shape-states";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IMastFigureProps {
	shapes: readonly Shape[];
	label: string;
}

const MAST_X = 150;
const TOP = 36;
const GAP = 40;

/** A vessel by day with black shapes hung in a vertical line from the forestay. */
export default function MastFigure({ shapes, label }: IMastFigureProps) {
	const skyId = useId();

	return (
		<svg
			viewBox="0 0 300 240"
			className="block w-full"
			role="img"
			aria-label={label}
		>
			<defs>
				<linearGradient id={skyId} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0" stopColor="#cfe8fb" />
					<stop offset="1" stopColor="#ffe89a" />
				</linearGradient>
			</defs>
			<rect width="300" height="240" rx="16" fill={`url(#${skyId})`} />
			<rect y="200" width="300" height="40" fill={PALETTE.ocean} />
			<path d="M40 182 H262 L246 206 H62 z" fill={PALETTE.navy} />
			<rect
				x="88"
				y="160"
				width="84"
				height="22"
				fill="#eaf3ff"
				stroke={PALETTE.navy}
				strokeWidth="1.5"
			/>
			<line
				x1={MAST_X + 40}
				y1="182"
				x2={MAST_X + 40}
				y2="22"
				stroke="#3a4f6e"
				strokeWidth="4"
			/>
			<line
				x1={MAST_X + 40}
				y1="24"
				x2="252"
				y2="182"
				stroke="#3a4f6e"
				strokeWidth="1.2"
			/>
			<line
				x1={MAST_X}
				y1="24"
				x2={MAST_X + 40}
				y2="24"
				stroke="#3a4f6e"
				strokeWidth="2"
			/>
			<line
				x1={MAST_X}
				y1="24"
				x2={MAST_X}
				y2={TOP + GAP * Math.max(shapes.length, 1) - 12}
				stroke="#3a4f6e"
				strokeWidth="1"
			/>

			{shapes
				.map((shape, index) => ({ shape, y: TOP + 14 + index * GAP }))
				.map(({ shape, y }) => (
					<DayShapeIcon key={y} shape={shape} x={MAST_X} y={y} />
				))}
		</svg>
	);
}
