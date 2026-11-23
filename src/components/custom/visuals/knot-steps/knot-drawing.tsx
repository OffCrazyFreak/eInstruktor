import {
	KNOTS,
	type KnotId,
} from "@/components/custom/visuals/knot-steps/knots";
import RopePath from "@/components/custom/visuals/knot-steps/rope-path";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IKnotDrawingProps {
	knot: KnotId;
	step: number;
	label: string;
}

/** One step of a knot: the rope stretches in order, the part that moves in this step in orange. */
export default function KnotDrawing({ knot, step, label }: IKnotDrawingProps) {
	const { prop, steps } = KNOTS[knot];
	const current = steps[Math.min(step, steps.length - 1)];

	return (
		<svg
			viewBox="0 0 240 200"
			className="block w-full"
			role="img"
			aria-label={label}
		>
			<rect width="240" height="200" rx="16" fill={PALETTE.light} />
			{prop === "post" && (
				<rect x="105" y="20" width="30" height="170" rx="6" fill="#8a94a6" />
			)}
			{prop === "ring" && (
				<circle
					cx="137"
					cy="36"
					r="22"
					fill="none"
					stroke="#5b6475"
					strokeWidth="7"
				/>
			)}
			{current?.ropes.map((rope) => (
				<RopePath key={`${rope.tone}-${rope.d}`} d={rope.d} tone={rope.tone} />
			))}
		</svg>
	);
}
