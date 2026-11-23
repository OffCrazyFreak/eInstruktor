import type { Shape } from "@/components/custom/visuals/day-shapes/day-shape-states";

interface IDayShapeIconProps {
	shape: Shape;
	/** Centre of the shape; each shape fits in a 28 by 28 box. */
	x: number;
	y: number;
	fill?: string;
}

const R = 14;

export default function DayShapeIcon({
	shape,
	x,
	y,
	fill = "#17191f",
}: IDayShapeIconProps) {
	switch (shape) {
		case "ball":
			return <circle cx={x} cy={y} r={R - 1} fill={fill} />;

		case "cone-up":
			return (
				<polygon
					points={`${x - R},${y + R} ${x + R},${y + R} ${x},${y - R}`}
					fill={fill}
				/>
			);

		case "cone-down":
			return (
				<polygon
					points={`${x - R},${y - R} ${x + R},${y - R} ${x},${y + R}`}
					fill={fill}
				/>
			);

		case "diamond":
			return (
				<polygon
					points={`${x},${y - R} ${x + R},${y} ${x},${y + R} ${x - R},${y}`}
					fill={fill}
				/>
			);

		case "hourglass":
			return (
				<polygon
					points={`${x - R},${y - R} ${x + R},${y - R} ${x},${y} ${x + R},${y + R} ${x - R},${y + R} ${x},${y}`}
					fill={fill}
				/>
			);

		case "cylinder":
			return (
				<rect
					x={x - R * 0.7}
					y={y - R}
					width={R * 1.4}
					height={R * 2}
					fill={fill}
				/>
			);
	}
}
