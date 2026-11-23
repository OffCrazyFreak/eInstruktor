import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IHazardRockProps {
	x: number;
	y: number;
	label?: string;
}

export default function HazardRock({ x, y, label = "hrid" }: IHazardRockProps) {
	return (
		<g>
			<path
				d={`M${x - 16} ${y + 8} l8 -18 l12 -4 l12 10 l2 12 z`}
				fill="#7a6a55"
				stroke="#4d4234"
				strokeWidth="1.5"
			/>
			<text
				x={x}
				y={y + 24}
				textAnchor="middle"
				fontSize="9"
				fill={PALETTE.navy}
			>
				{label}
			</text>
		</g>
	);
}
