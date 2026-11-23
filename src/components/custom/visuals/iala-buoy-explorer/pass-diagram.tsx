import { useId } from "react";
import LateralChannel from "@/components/custom/visuals/iala-buoy-explorer/lateral-channel";
import OpenWater from "@/components/custom/visuals/iala-buoy-explorer/open-water";
import type { IMark } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import RouteArrowMarker from "@/components/custom/visuals/shared/sea/route-arrow-marker";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

export type Direction = "inbound" | "outbound";

interface IPassDiagramProps {
	mark: IMark;
	direction: Direction;
	pass: string;
}

/** Top-down sketch of where the boat goes past the selected mark. */
export default function PassDiagram({
	mark,
	direction,
	pass,
}: IPassDiagramProps) {
	const arrowId = useId();

	return (
		<svg
			viewBox="0 0 200 200"
			className="block h-full max-h-64 w-full"
			role="img"
			aria-label={`Kuda prolaziš: ${pass}`}
		>
			<defs>
				<RouteArrowMarker id={arrowId} />
			</defs>
			<rect width="200" height="200" rx="14" fill={PALETTE.sea} />
			{mark.group === "lateral" ? (
				<LateralChannel mark={mark} direction={direction} arrowId={arrowId} />
			) : (
				<OpenWater mark={mark} arrowId={arrowId} />
			)}
		</svg>
	);
}
