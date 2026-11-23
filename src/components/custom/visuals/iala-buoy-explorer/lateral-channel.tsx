import type { Direction } from "@/components/custom/visuals/iala-buoy-explorer/pass-diagram";
import SmallMark from "@/components/custom/visuals/iala-buoy-explorer/small-mark";
import type { IMark } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import {
	PALETTE,
	SIGNAL,
} from "@/components/custom/visuals/shared/visual-palette";

interface ILateralChannelProps {
	mark: IMark;
	direction: Direction;
	arrowId: string;
}

/** Channel into a harbour: red marks on the left and green on the right as seen when entering (IALA region A). */
export default function LateralChannel({
	mark,
	direction,
	arrowId,
}: ILateralChannelProps) {
	const fork = mark.id.startsWith("preferred-channel");
	const mainRight = mark.id === "preferred-channel-starboard";
	const route =
		fork && mainRight
			? "M100 190 C100 140 100 120 130 90 S150 40 150 22"
			: fork
				? "M100 190 C100 140 100 120 70 90 S50 40 50 22"
				: "M100 190 V22";

	return (
		<g>
			<path d="M0 0 H200 V16 H0 z" fill={PALETTE.land} />
			<text
				x="100"
				y="12"
				textAnchor="middle"
				fontSize="9"
				fill={PALETTE.navy}
				fontWeight="600"
			>
				LUKA
			</text>

			<SmallMark
				x={62}
				y={150}
				color={SIGNAL.red}
				active={mark.id === "port"}
			/>
			<SmallMark x={62} y={70} color={SIGNAL.red} active={false} />
			<SmallMark
				x={138}
				y={150}
				color={SIGNAL.green}
				active={mark.id === "starboard"}
			/>
			<SmallMark x={138} y={70} color={SIGNAL.green} active={false} />

			{fork && (
				<SmallMark
					x={100}
					y={104}
					color={mainRight ? SIGNAL.red : SIGNAL.green}
					band={mainRight ? SIGNAL.green : SIGNAL.red}
					active
				/>
			)}

			<path
				d={route}
				fill="none"
				stroke={PALETTE.sun}
				strokeWidth="4"
				strokeDasharray="2 7"
				strokeLinecap="round"
				markerEnd={direction === "inbound" ? `url(#${arrowId})` : undefined}
				markerStart={direction === "outbound" ? `url(#${arrowId})` : undefined}
			/>

			<BoatIcon
				x={direction === "inbound" ? 100 : fork ? (mainRight ? 150 : 50) : 100}
				y={direction === "inbound" ? 178 : 34}
				heading={direction === "inbound" ? 0 : 180}
			/>
		</g>
	);
}
