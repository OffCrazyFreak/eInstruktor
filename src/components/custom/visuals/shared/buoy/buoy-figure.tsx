import { useId } from "react";
import type {
	BuoyShape,
	IMark,
} from "@/components/custom/visuals/shared/buoy/buoy-marks";
import BuoyTopmark from "@/components/custom/visuals/shared/buoy/buoy-topmark";
import Lamp from "@/components/custom/visuals/shared/light/lamp";
import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";

interface IBuoyFigureProps {
	mark: IMark;
	lit: boolean;
	lampColor: LightColor;
	/** Group transform so callers can place and scale the 120 by 200 buoy inside their own SVG. */
	transform?: string;
}

const BODY_PATHS: Record<BuoyShape, string> = {
	can: "M36 118 h48 v64 h-48 z",
	cone: "M32 182 L50 112 h20 L88 182 z",
	pillar: "M48 84 h24 v78 h18 l-6 20 h-48 l-6 -20 h18 z",
};

const BODY_TOP: Record<BuoyShape, number> = { can: 118, cone: 112, pillar: 84 };

/** Side view of an IALA mark: painted body, mast, lamp and topmark, floating on a waterline at y 182. */
export default function BuoyFigure({
	mark,
	lit,
	lampColor,
	transform,
}: IBuoyFigureProps) {
	const clipId = useId();
	const top = BODY_TOP[mark.shape];

	return (
		<g transform={transform}>
			<clipPath id={clipId}>
				<path d={BODY_PATHS[mark.shape]} />
			</clipPath>

			<line x1="60" y1={top} x2="60" y2="30" stroke="#1d2433" strokeWidth="3" />

			<g clipPath={`url(#${clipId})`}>
				{paintPieces(mark).map((piece) => (
					<rect key={`${piece.x}-${piece.y}`} {...piece} />
				))}
			</g>

			<path
				d={BODY_PATHS[mark.shape]}
				fill="none"
				stroke="rgba(0,0,0,0.35)"
				strokeWidth="1.5"
			/>

			<BuoyTopmark
				topmark={mark.topmark}
				color={mark.topmarkColor}
				x={60}
				y={36}
			/>
			<Lamp cx={60} cy={top - 12} r={5} color={lampColor} lit={lit} />
		</g>
	);
}

/** Bands split the body height evenly; stripes split the width. A half pixel overlap hides seams. */
function paintPieces(mark: IMark) {
	const top = BODY_TOP[mark.shape];
	const { kind, colors } = mark.paint;
	const height = 182 - top;

	return colors.map((fill, index) =>
		kind === "bands"
			? {
					fill,
					x: 20,
					y: top + (height / colors.length) * index,
					width: 80,
					height: height / colors.length + 0.5,
				}
			: {
					fill,
					x: 28 + (64 / colors.length) * index,
					y: top,
					width: 64 / colors.length + 0.5,
					height,
				},
	);
}
