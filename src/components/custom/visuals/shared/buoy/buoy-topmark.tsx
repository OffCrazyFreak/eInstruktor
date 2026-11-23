import type { Topmark } from "@/components/custom/visuals/shared/buoy/buoy-marks";

interface IBuoyTopmarkProps {
	topmark: Topmark;
	color: string;
	/** Centre of the topmark. */
	x: number;
	y: number;
}

const S = 11;

/** IALA topmarks drawn around a centre point; cone tips encode the cardinal direction. */
export default function BuoyTopmark({
	topmark,
	color,
	x,
	y,
}: IBuoyTopmarkProps) {
	const up = (cy: number) =>
		`${x - S},${cy + S * 0.8} ${x + S},${cy + S * 0.8} ${x},${cy - S * 0.8}`;
	const down = (cy: number) =>
		`${x - S},${cy - S * 0.8} ${x + S},${cy - S * 0.8} ${x},${cy + S * 0.8}`;
	const stroke = {
		stroke: color,
		strokeWidth: 5,
		strokeLinecap: "round" as const,
	};

	switch (topmark) {
		case "can":
			return <rect x={x - 9} y={y - 10} width="18" height="20" fill={color} />;

		case "cone-up":
			return <polygon points={up(y)} fill={color} />;

		case "cones-up":
			return (
				<g fill={color}>
					<polygon points={up(y - 9)} />
					<polygon points={up(y + 10)} />
				</g>
			);

		case "cones-down":
			return (
				<g fill={color}>
					<polygon points={down(y - 10)} />
					<polygon points={down(y + 9)} />
				</g>
			);

		case "cones-base-to-base":
			return (
				<g fill={color}>
					<polygon points={up(y - 9)} />
					<polygon points={down(y + 9)} />
				</g>
			);

		case "cones-point-to-point":
			return (
				<g fill={color}>
					<polygon points={down(y - 9)} />
					<polygon points={up(y + 9)} />
				</g>
			);

		case "two-spheres":
			return (
				<g fill={color}>
					<circle cx={x} cy={y - 9} r="8" />
					<circle cx={x} cy={y + 9} r="8" />
				</g>
			);

		case "sphere":
			return <circle cx={x} cy={y} r="9" fill={color} />;

		case "x":
			return (
				<g {...stroke}>
					<line x1={x - 9} y1={y - 9} x2={x + 9} y2={y + 9} />
					<line x1={x + 9} y1={y - 9} x2={x - 9} y2={y + 9} />
				</g>
			);

		case "cross":
			return (
				<g {...stroke}>
					<line x1={x} y1={y - 11} x2={x} y2={y + 11} />
					<line x1={x - 9} y1={y - 3} x2={x + 9} y2={y - 3} />
				</g>
			);
	}
}
