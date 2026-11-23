import {
	PALETTE,
	SIGNAL,
} from "@/components/custom/visuals/shared/visual-palette";

interface IGaugeProps {
	name: string;
	unit: string;
	/** Needle position, 0 to 1 of the dial. */
	value: number;
	/** Normal band on the dial, 0 to 1. */
	normal: [number, number];
}

const START = -120;
const SWEEP = 240;

function polar(fraction: number, radius: number): [number, number] {
	const radians = ((START + fraction * SWEEP) * Math.PI) / 180;

	return [50 + radius * Math.sin(radians), 52 - radius * Math.cos(radians)];
}

function arc(from: number, to: number, radius: number): string {
	const [x1, y1] = polar(from, radius);
	const [x2, y2] = polar(to, radius);

	return `M${x1} ${y1} A${radius} ${radius} 0 ${(to - from) * SWEEP > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

/** Round dial with an unnumbered green band: the normal range depends on the engine. */
export default function Gauge({ name, unit, value, normal }: IGaugeProps) {
	const [needleX, needleY] = polar(value, 30);
	const inRange = value >= normal[0] && value <= normal[1];

	return (
		<figure className="m-0 rounded-2xl bg-[#1d2433] p-2 text-center text-[#eaf3ff]">
			<svg
				viewBox="0 0 100 80"
				className="block w-full"
				role="img"
				aria-label={`${name}: ${inRange ? "u normalnom području" : "izvan normalnog područja"}`}
			>
				<path d={arc(0, 1, 38)} fill="none" stroke="#3a4253" strokeWidth="7" />
				<path
					d={arc(normal[0], normal[1], 38)}
					fill="none"
					stroke={SIGNAL.green}
					strokeWidth="7"
				/>
				<line
					x1="50"
					y1="52"
					x2={needleX}
					y2={needleY}
					stroke={inRange ? PALETTE.sunPale : SIGNAL.lightRed}
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<circle cx="50" cy="52" r="4" fill="#eaf3ff" />
				<text
					x="50"
					y="74"
					textAnchor="middle"
					fontSize="8"
					fill="#eaf3ff"
					opacity="0.7"
				>
					{unit}
				</text>
			</svg>
			<figcaption className="text-[0.75rem] leading-tight font-medium">
				{name}
			</figcaption>
		</figure>
	);
}
