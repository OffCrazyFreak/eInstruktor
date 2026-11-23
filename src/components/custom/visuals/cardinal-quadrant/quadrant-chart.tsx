import { type PointerEvent, useId, useRef, useState } from "react";
import {
	QUADRANT_MARK,
	QUADRANTS,
	type Quadrant,
	quadrantOf,
} from "@/components/custom/visuals/cardinal-quadrant/quadrant-math";
import { bearingFrom } from "@/components/custom/visuals/shared/bearing";
import BuoyFigure from "@/components/custom/visuals/shared/buoy/buoy-figure";
import { MARKS } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import HazardRock from "@/components/custom/visuals/shared/sea/hazard-rock";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IQuadrantChartProps {
	selected: Quadrant;
	onSelect: (quadrant: Quadrant) => void;
}

const SIZE = 300;
const C = SIZE / 2;

const MARK_POSITION: Record<Quadrant, [number, number]> = {
	N: [C, 62],
	E: [238, C],
	S: [C, 238],
	W: [62, C],
};

/** Wedges for each quadrant, split along the NE, SE, SW and NW diagonals. */
const WEDGES: Record<Quadrant, string> = {
	N: `M${C} ${C} L0 0 H${SIZE} z`,
	E: `M${C} ${C} L${SIZE} 0 V${SIZE} z`,
	S: `M${C} ${C} L${SIZE} ${SIZE} H0 z`,
	W: `M${C} ${C} L0 ${SIZE} V0 z`,
};

/** Hazard in the middle, a cardinal mark in each quadrant, and a boat you can drag around it. */
export default function QuadrantChart({
	selected,
	onSelect,
}: IQuadrantChartProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [dragged, setDragged] = useState<[number, number] | null>(null);
	const [dragging, setDragging] = useState(false);

	function moveBoat(event: PointerEvent<SVGSVGElement>) {
		const box = svgRef.current?.getBoundingClientRect();

		if (!box) {
			return;
		}

		const x = ((event.clientX - box.left) / box.width) * SIZE;
		const y = ((event.clientY - box.top) / box.height) * SIZE;
		const distance = Math.hypot(x - C, y - C);

		if (distance < 30) {
			return;
		}

		setDragged([x, y]);
		onSelect(quadrantOf(bearingFrom(x - C, y - C)));
	}

	const clipId = useId();
	const boat = boatPosition(dragged, selected);
	const heading = bearingFrom(C - boat[0], C - boat[1]) + 90;

	return (
		<svg
			ref={svgRef}
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			className="block w-full touch-none select-none"
			role="img"
			aria-label={`Kvadranti oko opasnosti. Brodica je u kvadrantu ${selected}.`}
			onPointerDown={(event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				setDragging(true);
				moveBoat(event);
			}}
			onPointerMove={(event) => dragging && moveBoat(event)}
			onPointerUp={() => setDragging(false)}
			onPointerCancel={() => setDragging(false)}
		>
			<defs>
				<clipPath id={clipId}>
					<rect width={SIZE} height={SIZE} rx="18" />
				</clipPath>
			</defs>

			<rect width={SIZE} height={SIZE} rx="18" fill={PALETTE.sea} />

			<g clipPath={`url(#${clipId})`}>
				{QUADRANTS.map((quadrant) => (
					<path
						key={quadrant}
						d={WEDGES[quadrant]}
						fill={PALETTE.sun}
						opacity={quadrant === selected ? 0.28 : 0}
					/>
				))}

				<g stroke={PALETTE.navy} strokeOpacity="0.25" strokeDasharray="4 5">
					<line x1="0" y1="0" x2={SIZE} y2={SIZE} />
					<line x1={SIZE} y1="0" x2="0" y2={SIZE} />
				</g>
			</g>

			<g
				fontFamily="var(--font-mono)"
				fontSize="11"
				fill={PALETTE.navy}
				opacity="0.6"
			>
				<text x="8" y="16">
					NW
				</text>
				<text x={SIZE - 26} y="16">
					NE
				</text>
				<text x="8" y={SIZE - 8}>
					SW
				</text>
				<text x={SIZE - 24} y={SIZE - 8}>
					SE
				</text>
			</g>

			<circle cx={C} cy={C} r="34" fill="#a3b4c8" opacity="0.45" />
			<HazardRock x={C} y={C} label="opasnost" />

			{QUADRANTS.map((quadrant) => {
				const [x, y] = MARK_POSITION[quadrant];

				return (
					<g key={quadrant}>
						<BuoyFigure
							mark={MARKS[QUADRANT_MARK[quadrant]]}
							lit={false}
							lampColor="white"
							transform={`translate(${x - 15} ${y - 32}) scale(0.25)`}
						/>
						<text
							x={x + 18}
							y={y + 4}
							fontSize="14"
							fontWeight="700"
							fill={PALETTE.navy}
						>
							{quadrant}
						</text>
					</g>
				);
			})}

			<BoatIcon x={boat[0]} y={boat[1]} heading={heading} scale={1.3} />
		</svg>
	);
}

/** Follows the drag, but jumps beside the chosen mark when the quadrant was picked with a button. */
function boatPosition(
	dragged: [number, number] | null,
	selected: Quadrant,
): [number, number] {
	if (
		dragged &&
		quadrantOf(bearingFrom(dragged[0] - C, dragged[1] - C)) === selected
	) {
		return dragged;
	}

	const [x, y] = MARK_POSITION[selected];

	return [C + (x - C) * 1.32, C + (y - C) * 1.32];
}
