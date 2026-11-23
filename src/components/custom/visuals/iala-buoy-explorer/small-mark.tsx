import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface ISmallMarkProps {
	x: number;
	y: number;
	color: string;
	band?: string;
	active: boolean;
}

/** A mark seen from above: coloured dot, optional band, dashed ring when it is the one being explained. */
export default function SmallMark({
	x,
	y,
	color,
	band,
	active,
}: ISmallMarkProps) {
	return (
		<g>
			{active && (
				<circle
					cx={x}
					cy={y}
					r="15"
					fill="none"
					stroke={PALETTE.navy}
					strokeWidth="2"
					strokeDasharray="3 3"
				/>
			)}
			<circle
				cx={x}
				cy={y}
				r="8"
				fill={color}
				stroke="#1d2433"
				strokeWidth="1.2"
			/>
			{band && <rect x={x - 8} y={y - 2.5} width="16" height="5" fill={band} />}
		</g>
	);
}
