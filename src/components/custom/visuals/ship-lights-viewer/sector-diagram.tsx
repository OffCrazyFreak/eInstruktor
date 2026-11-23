import {
	PALETTE,
	SIGNAL,
} from "@/components/custom/visuals/shared/visual-palette";

interface ISectorDiagramProps {
	bearing: number;
}

const C = 150;

function coords(angle: number, radius: number): [number, number] {
	const radians = (angle * Math.PI) / 180;

	return [C + radius * Math.sin(radians), C - radius * Math.cos(radians)];
}

function point(angle: number, radius: number): string {
	return coords(angle, radius).join(" ");
}

function wedge(from: number, to: number, radius: number): string {
	const sweep = (to - from + 360) % 360 || 360;
	const large = sweep > 180 ? 1 : 0;

	return `M${C} ${C} L${point(from, radius)} A${radius} ${radius} 0 ${large} 1 ${point(to, radius)} z`;
}

/** Top-down view with each light's arc: masthead 225°, sidelights 112,5° each, stern 135°. */
export default function SectorDiagram({ bearing }: ISectorDiagramProps) {
	const [eyeX, eyeY] = coords(bearing, 132);
	const [lineX, lineY] = coords(bearing, 120);

	return (
		<svg
			viewBox="0 0 300 300"
			className="block w-full max-w-72"
			role="img"
			aria-label={`Sektori svjetala gledano odozgo. Ti si na ${Math.round(bearing)}° od pramca.`}
		>
			<rect width="300" height="300" rx="16" fill={PALETTE.night} />
			<path d={wedge(247.5, 112.5, 118)} fill="#fff7d6" opacity="0.16" />
			<path d={wedge(112.5, 247.5, 118)} fill="#fff7d6" opacity="0.32" />
			<path d={wedge(0, 112.5, 88)} fill={SIGNAL.lightGreen} opacity="0.45" />
			<path d={wedge(247.5, 0, 88)} fill={SIGNAL.lightRed} opacity="0.45" />

			<g fontSize="11" fontFamily="var(--font-mono)" fill="#eaf3ff">
				<text x="10" y="20">
					jarbolno 225°
				</text>
				<text x="10" y="290">
					krmeno 135°
				</text>
				<text x="204" y="112">
					112,5°
				</text>
				<text x="64" y="112">
					112,5°
				</text>
			</g>

			<path
				d="M150 112 C162 126 164 160 160 186 H140 C136 160 138 126 150 112 z"
				fill="#eaf3ff"
			/>

			<g transform={`translate(${eyeX} ${eyeY})`}>
				<circle r="10" fill={PALETTE.sun} />
				<circle r="4" fill={PALETTE.night} />
			</g>
			<line
				x1={C}
				y1={C}
				x2={lineX}
				y2={lineY}
				stroke={PALETTE.sun}
				strokeDasharray="3 4"
			/>
		</svg>
	);
}
