import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IBoatIconProps {
	x: number;
	y: number;
	/** Degrees clockwise from up. */
	heading: number;
	scale?: number;
	fill?: string;
}

/** Top-down boat hull, bow pointing along `heading`. */
export default function BoatIcon({
	x,
	y,
	heading,
	scale = 1,
	fill = PALETTE.navy,
}: IBoatIconProps) {
	return (
		<g transform={`translate(${x} ${y}) rotate(${heading}) scale(${scale})`}>
			<path
				d="M0 -12 C6 -6 7 4 6 10 H-6 C-7 4 -6 -6 0 -12 z"
				fill={fill}
				stroke="white"
				strokeWidth="1.5"
			/>
		</g>
	);
}
