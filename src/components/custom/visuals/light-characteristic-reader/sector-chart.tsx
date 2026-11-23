import { SECTORS } from "@/components/custom/visuals/light-characteristic-reader/light-sectors";
import {
	PALETTE,
	SIGNAL,
} from "@/components/custom/visuals/shared/visual-palette";

interface ISectorChartProps {
	/** Boat bearing from the lighthouse, degrees clockwise from north. */
	bearing: number;
}

const L = { x: 150, y: 34 };

function polar(angle: number, radius: number): [number, number] {
	const radians = (angle * Math.PI) / 180;

	return [L.x + radius * Math.sin(radians), L.y - radius * Math.cos(radians)];
}

function wedge(from: number, to: number, radius: number): string {
	const [x1, y1] = polar(from, radius);
	const [x2, y2] = polar(to, radius);

	return `M${L.x} ${L.y} L${x1} ${y1} A${radius} ${radius} 0 0 1 ${x2} ${y2} z`;
}

/** Chart view of a sector light: white over safe water, red over the shoals on either side. */
export default function SectorChart({ bearing }: ISectorChartProps) {
	const [boatX, boatY] = polar(bearing, 150);

	return (
		<svg
			viewBox="0 0 300 220"
			className="block w-full"
			role="img"
			aria-label={`Brod je na smjeru ${Math.round(bearing)}° od svjetionika.`}
		>
			<rect width="300" height="220" rx="14" fill={PALETTE.sea} />
			{SECTORS.map((sector) => (
				<path
					key={sector.from}
					d={wedge(sector.from, sector.to, 190)}
					fill={sector.color === "red" ? SIGNAL.red : "#fff7d6"}
					opacity={sector.color === "red" ? 0.25 : 0.7}
				/>
			))}
			<path
				d="M0 0 H300 V30 Q220 46 150 30 T0 34 z"
				fill={PALETTE.land}
				stroke={PALETTE.landEdge}
			/>
			<g fill="#7a6a55" opacity="0.75">
				<circle cx="40" cy="120" r="6" />
				<circle cx="54" cy="132" r="4" />
				<circle cx="262" cy="116" r="6" />
				<circle cx="250" cy="130" r="4" />
			</g>
			<g fontSize="9" fill={PALETTE.navy}>
				<text x="30" y="150">
					plićina
				</text>
				<text x="236" y="150">
					plićina
				</text>
			</g>
			<circle cx={L.x} cy={L.y} r="6" fill={PALETTE.navy} />
			<circle
				cx={boatX}
				cy={boatY}
				r="7"
				fill={PALETTE.navy}
				stroke="white"
				strokeWidth="2"
			/>
		</svg>
	);
}
