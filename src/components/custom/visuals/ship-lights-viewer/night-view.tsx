import { useId } from "react";
import Lamp from "@/components/custom/visuals/shared/light/lamp";
import {
	isVisibleFrom,
	screenX,
	VESSEL_LIGHTS,
	type VesselId,
} from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";
import { VESSELS } from "@/components/custom/visuals/ship-lights-viewer/vessels";

interface INightViewProps {
	vessel: VesselId;
	bearing: number;
	/** Hides the hull outline so a quiz shows only what you would see at night. */
	lightsOnly?: boolean;
	label: string;
}

const WIDTH = 320;
const HEIGHT = 190;
const WATERLINE = 150;
const HALF_LENGTH = 120;
const MAST_HEIGHT = 120;

/** What an observer sees at night from the chosen side: only the lights whose sectors face them. */
export default function NightView({
	vessel,
	bearing,
	lightsOnly = false,
	label,
}: INightViewProps) {
	const skyId = useId();
	const radians = (bearing * Math.PI) / 180;
	const hullHalf = 30 + Math.abs(Math.sin(radians)) * (HALF_LENGTH - 30);
	const visible = VESSEL_LIGHTS[vessel].filter((light) =>
		isVisibleFrom(light, bearing),
	);
	const mast = VESSELS[vessel].hull === "sail";

	return (
		<svg
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			className="block w-full"
			role="img"
			aria-label={label}
		>
			<defs>
				<linearGradient id={skyId} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0" stopColor="#020b1c" />
					<stop offset="0.75" stopColor="#0c2550" />
					<stop offset="1" stopColor="#123466" />
				</linearGradient>
			</defs>
			<rect width={WIDTH} height={HEIGHT} rx="14" fill={`url(#${skyId})`} />
			<g fill="#eaf3ff" opacity="0.5">
				<circle cx="34" cy="24" r="1" />
				<circle cx="96" cy="40" r="0.8" />
				<circle cx="262" cy="18" r="1.1" />
				<circle cx="210" cy="52" r="0.7" />
				<circle cx="292" cy="70" r="0.9" />
			</g>
			<rect
				y={WATERLINE + 6}
				width={WIDTH}
				height={HEIGHT - WATERLINE - 6}
				fill="#061a3a"
			/>

			{!lightsOnly && (
				<g opacity="0.35" fill="none" stroke="#8cc2ee" strokeWidth="1.5">
					<path
						d={`M${WIDTH / 2 - hullHalf} ${WATERLINE - 14} H${WIDTH / 2 + hullHalf} l-10 20 H${WIDTH / 2 - hullHalf + 10} z`}
					/>
					{mast ? (
						<line
							x1={WIDTH / 2}
							y1={WATERLINE - 14}
							x2={WIDTH / 2}
							y2={WATERLINE - MAST_HEIGHT - 6}
						/>
					) : (
						<rect
							x={WIDTH / 2 - hullHalf * 0.35}
							y={WATERLINE - 34}
							width={hullHalf * 0.6}
							height="20"
						/>
					)}
				</g>
			)}

			{visible.map((light) => {
				const x = WIDTH / 2 + screenX(light, bearing) * HALF_LENGTH;
				const y = WATERLINE - light.height * MAST_HEIGHT;

				return (
					<Lamp
						key={`${light.kind}-${light.color}-${light.height}-${light.along}`}
						cx={x}
						cy={y}
						r={4.5}
						color={light.color}
						lit
					/>
				);
			})}

			{visible.length === 0 && (
				<text
					x={WIDTH / 2}
					y={HEIGHT / 2}
					textAnchor="middle"
					fill="#eaf3ff"
					fontSize="12"
				>
					S ove strane ne vidiš nijedno svjetlo.
				</text>
			)}
		</svg>
	);
}
