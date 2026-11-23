import { type PointerEvent, useRef, useState } from "react";
import { bearingFrom } from "@/components/custom/visuals/shared/bearing";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface INorthArrow {
	label: string;
	/** Degrees from true north. */
	offset: number;
	color: string;
}

interface IRoseDialProps {
	heading: number;
	onHeadingChange: (heading: number) => void;
	norths?: INorthArrow[];
	/** Optional dashed track, e.g. the course made good with drift. */
	track?: number;
	label: string;
}

const C = 150;
const TICKS = Array.from({ length: 36 }, (_, index) => index * 10);
const LETTERS = [
	[0, "N"],
	[90, "E"],
	[180, "S"],
	[270, "W"],
] as const;

function polar(angle: number, radius: number): [number, number] {
	const radians = (angle * Math.PI) / 180;

	return [C + radius * Math.sin(radians), C - radius * Math.cos(radians)];
}

/** Compass rose you can turn by dragging the bow; north lines show true, magnetic and compass north. */
export default function RoseDial({
	heading,
	onHeadingChange,
	norths = [],
	track,
	label,
}: IRoseDialProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [dragging, setDragging] = useState(false);
	const [bowX, bowY] = polar(heading, 108);

	function turnTo(event: PointerEvent<SVGSVGElement>) {
		const box = svgRef.current?.getBoundingClientRect();

		if (box) {
			const x = ((event.clientX - box.left) / box.width) * 300;
			const y = ((event.clientY - box.top) / box.height) * 300;

			onHeadingChange(Math.round(bearingFrom(x - C, y - C)) % 360);
		}
	}

	return (
		<svg
			ref={svgRef}
			viewBox="0 0 300 300"
			className="block w-full max-w-80 touch-none select-none"
			role="img"
			aria-label={label}
			onPointerDown={(event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				setDragging(true);
				turnTo(event);
			}}
			onPointerMove={(event) => dragging && turnTo(event)}
			onPointerUp={() => setDragging(false)}
			onPointerCancel={() => setDragging(false)}
		>
			<circle
				cx={C}
				cy={C}
				r="146"
				fill={PALETTE.light}
				stroke={PALETTE.navy}
				strokeOpacity="0.2"
			/>
			{TICKS.map((angle) => {
				const [x1, y1] = polar(angle, angle % 90 === 0 ? 120 : 130);
				const [x2, y2] = polar(angle, 140);

				return (
					<line
						key={angle}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke={PALETTE.navy}
						strokeOpacity="0.5"
					/>
				);
			})}
			{LETTERS.map(([angle, letter]) => {
				const [x, y] = polar(angle, 106);

				return (
					<text
						key={letter}
						x={x}
						y={y + 5}
						textAnchor="middle"
						fontSize="15"
						fontWeight="700"
						fontFamily="var(--font-serif)"
						fill={PALETTE.navy}
					>
						{letter}
					</text>
				);
			})}

			{norths.map((north) => {
				const [x, y] = polar(north.offset, 92);

				return (
					<g key={north.label}>
						<line
							x1={C}
							y1={C}
							x2={x}
							y2={y}
							stroke={north.color}
							strokeWidth="2.5"
						/>
						<circle cx={x} cy={y} r="4" fill={north.color} />
					</g>
				);
			})}

			{track !== undefined && (
				<line
					x1={C}
					y1={C}
					x2={polar(track, 130)[0]}
					y2={polar(track, 130)[1]}
					stroke={PALETTE.sky}
					strokeWidth="3"
					strokeDasharray="5 5"
				/>
			)}
			<line
				x1={C}
				y1={C}
				x2={bowX}
				y2={bowY}
				stroke={PALETTE.sun}
				strokeWidth="4"
				strokeLinecap="round"
			/>
			<circle
				cx={bowX}
				cy={bowY}
				r="9"
				fill={PALETTE.sun}
				stroke="white"
				strokeWidth="2"
			/>
			<BoatIcon x={C} y={C} heading={heading} scale={2.2} />
		</svg>
	);
}
