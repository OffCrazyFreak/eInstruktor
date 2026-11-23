import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

/** A narrow channel: keep to its starboard side and do not hamper a larger vessel that can only use the fairway. */
export default function NarrowChannel() {
	return (
		<div className="space-y-2">
			<svg
				viewBox="0 0 300 300"
				className="block w-full"
				role="img"
				aria-label="Uski kanal: brodica plovi uz desni rub, a veliki brod sredinom plovnog puta."
			>
				<rect width="300" height="300" rx="16" fill={PALETTE.land} />
				<path
					d="M70 0 C60 80 80 200 64 300 H236 C220 200 240 80 230 0 z"
					fill={PALETTE.sea}
				/>
				<path
					d="M118 0 C112 100 124 200 116 300 M182 0 C176 100 188 200 184 300"
					stroke={PALETTE.seaDeep}
					strokeWidth="2"
					strokeDasharray="6 6"
					fill="none"
				/>
				<rect
					x="136"
					y="70"
					width="28"
					height="110"
					rx="12"
					fill={PALETTE.ocean}
				/>
				<text
					x="150"
					y="196"
					textAnchor="middle"
					fontSize="10"
					fill={PALETTE.navy}
				>
					veliki brod
				</text>
				<BoatIcon x={212} y={220} heading={0} scale={1.3} />
				<text
					x="212"
					y="248"
					textAnchor="middle"
					fontSize="11"
					fontWeight="700"
					fill={PALETTE.navy}
				>
					Ti
				</text>
				<path
					d="M212 200 V120"
					stroke={PALETTE.sun}
					strokeWidth="3"
					strokeDasharray="2 6"
					strokeLinecap="round"
				/>
			</svg>
			<p className="text-[0.9rem] leading-relaxed">
				U uskom kanalu drži se njegova desnog ruba. Brodica ne smije ometati
				veliki brod koji može ploviti samo sredinom kanala, a pretjecanje se
				najavljuje zvučnim signalima i čeka pristanak.
			</p>
		</div>
	);
}
