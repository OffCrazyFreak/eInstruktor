import { type PointerEvent, useRef, useState } from "react";
import {
	AREA_IDS,
	AREAS,
	type AreaId,
	areaAt,
} from "@/components/custom/visuals/navigation-areas-map/navigation-areas";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IAreasChartProps {
	distance: number;
	onDistanceChange: (distance: number) => void;
	/** Areas to tint, e.g. everything a certificate covers. */
	tinted: readonly AreaId[];
	rings: readonly number[];
}

const COAST = 44;
const WIDTH = 340;
const MAX_NM = 25;

/** Square-root scale so the 1, 3 and 6 NM rings near the coast stay readable next to 20 NM. */
function xAt(distance: number): number {
	return (
		COAST + (WIDTH - COAST - 8) * Math.sqrt(Math.min(distance, MAX_NM) / MAX_NM)
	);
}

function distanceAt(x: number): number {
	const share = Math.max(0, (x - COAST) / (WIDTH - COAST - 8));

	return Math.round(share ** 2 * MAX_NM * 10) / 10;
}

export default function AreasChart({
	distance,
	onDistanceChange,
	tinted,
	rings,
}: IAreasChartProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [dragging, setDragging] = useState(false);
	const area = areaAt(distance);
	const boatX = distance <= 0 ? 22 : xAt(distance);
	const boatY = distance <= 0 ? 58 : 150;

	function move(event: PointerEvent<SVGSVGElement>) {
		const box = svgRef.current?.getBoundingClientRect();

		if (box) {
			onDistanceChange(
				distanceAt(((event.clientX - box.left) / box.width) * WIDTH),
			);
		}
	}

	return (
		<svg
			ref={svgRef}
			viewBox={`0 0 ${WIDTH} 230`}
			className="block w-full touch-none select-none"
			role="img"
			aria-label={`Područja plovidbe od obale prema pučini. Brodica je u području ${area}.`}
			onPointerDown={(event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				setDragging(true);
				move(event);
			}}
			onPointerMove={(event) => dragging && move(event)}
			onPointerUp={() => setDragging(false)}
			onPointerCancel={() => setDragging(false)}
		>
			<rect width={WIDTH} height="230" rx="16" fill={PALETTE.sea} />
			{AREA_IDS.filter((id) => id !== "IV").map((id, index, list) => {
				const inner = index === 0 ? 0 : AREAS[list[index - 1] ?? "IV"].limit;
				const x = xAt(inner);
				const end = xAt(
					Number.isFinite(AREAS[id].limit) ? AREAS[id].limit : MAX_NM,
				);

				return (
					<g key={id}>
						<rect
							x={x}
							y="0"
							width={end - x}
							height="230"
							fill={tinted.includes(id) ? PALETTE.sun : PALETTE.seaDeep}
							opacity={
								tinted.includes(id) ? 0.35 : index % 2 === 0 ? 0.12 : 0.28
							}
						/>
						<text
							x={(x + end) / 2}
							y="222"
							textAnchor="middle"
							fontSize={id.length > 3 ? 8.5 : 10}
							fontWeight="700"
							fill={PALETTE.navy}
						>
							{id}
						</text>
					</g>
				);
			})}
			{rings.map((nm) => (
				<g key={nm}>
					<line
						x1={xAt(nm)}
						y1="0"
						x2={xAt(nm)}
						y2="206"
						stroke={PALETTE.navy}
						strokeOpacity="0.45"
						strokeDasharray="4 4"
					/>
					<text
						x={xAt(nm) + 2}
						y="14"
						fontSize="9"
						fontFamily="var(--font-mono)"
						fill={PALETTE.navy}
					>
						{nm} NM
					</text>
				</g>
			))}
			<path
				d={`M0 0 H${COAST} C${COAST - 8} 40 ${COAST + 6} 80 ${COAST} 120 S${COAST - 6} 190 ${COAST} 230 H0 z`}
				fill={PALETTE.land}
				stroke={PALETTE.landEdge}
			/>
			<path
				d="M0 36 H34 C40 44 40 72 34 80 H0 z"
				fill={tinted.includes("IV") ? "#ffd889" : PALETTE.sea}
				stroke={PALETTE.landEdge}
			/>
			<text x="6" y="98" fontSize="8.5" fill={PALETTE.navy} fontWeight="700">
				IV
			</text>
			<BoatIcon
				x={boatX}
				y={boatY}
				heading={90}
				scale={1.4}
				fill={PALETTE.navy}
			/>
		</svg>
	);
}
