import type { IVesselState } from "@/components/custom/visuals/collision-situations/collision-rules";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IVesselMarkerProps {
	vessel: IVesselState;
	label: string;
	role: "give-way" | "stand-on";
	own: boolean;
}

/** Vessel seen from above with its role tag; a sail is drawn for sailing vessels. */
export default function VesselMarker({
	vessel,
	label,
	role,
	own,
}: IVesselMarkerProps) {
	const fill = own ? PALETTE.navy : PALETTE.ocean;

	return (
		<g>
			{role === "give-way" && (
				<circle
					cx={vessel.x}
					cy={vessel.y}
					r="22"
					fill="none"
					stroke={PALETTE.sun}
					strokeWidth="3"
					strokeDasharray="4 3"
				/>
			)}
			<BoatIcon
				x={vessel.x}
				y={vessel.y}
				heading={vessel.heading}
				scale={1.25}
				fill={fill}
			/>
			{vessel.kind === "sail" && (
				<g
					transform={`translate(${vessel.x} ${vessel.y}) rotate(${vessel.heading})`}
				>
					<path
						d="M0 -8 Q9 2 0 10"
						fill="#eaf3ff"
						stroke={PALETTE.navy}
						strokeWidth="1.2"
					/>
				</g>
			)}
			<g fontSize="10" fontWeight="700" textAnchor="middle">
				<rect
					x={vessel.x - 34}
					y={vessel.y + 24}
					width="68"
					height="28"
					rx="6"
					fill="white"
					opacity="0.9"
				/>
				<text x={vessel.x} y={vessel.y + 35} fill={PALETTE.navy}>
					{label}
				</text>
				<text
					x={vessel.x}
					y={vessel.y + 47}
					fill={role === "give-way" ? "#b46a00" : "#0b7a43"}
				>
					{role === "give-way" ? "uklanja se" : "ima prednost"}
				</text>
			</g>
		</g>
	);
}
