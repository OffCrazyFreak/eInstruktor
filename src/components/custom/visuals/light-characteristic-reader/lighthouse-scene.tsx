import { useId } from "react";
import Lamp from "@/components/custom/visuals/shared/light/lamp";
import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";
import { LAMP_COLORS } from "@/components/custom/visuals/shared/light/light-colors";

interface ILighthouseSceneProps {
	lit: boolean;
	color: LightColor;
	label: string;
}

/** A lighthouse at dusk; its lamp and beams follow the light sequence. */
export default function LighthouseScene({
	lit,
	color,
	label,
}: ILighthouseSceneProps) {
	const skyId = useId();
	const tint = LAMP_COLORS[color];

	return (
		<svg
			viewBox="0 0 300 200"
			className="block w-full"
			role="img"
			aria-label={label}
		>
			<defs>
				<linearGradient id={skyId} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0" stopColor="#020b1c" />
					<stop offset="0.7" stopColor="#0c2550" />
					<stop offset="1" stopColor="#3a4f86" />
				</linearGradient>
			</defs>
			<rect width="300" height="200" rx="14" fill={`url(#${skyId})`} />
			{lit && (
				<g fill={tint} opacity="0.22">
					<path d="M150 58 L0 30 V96 z" />
					<path d="M150 58 L300 30 V96 z" />
				</g>
			)}
			<path d="M0 170 Q60 150 120 156 T300 160 V200 H0 z" fill="#061a3a" />
			<path d="M136 160 L141 70 H159 L164 160 z" fill="#eaf3ff" />
			<path
				d="M139 112 H161 V122 H138 z M137 140 H163 V150 H136 z"
				fill="#e0322b"
			/>
			<rect x="138" y="48" width="24" height="22" rx="3" fill="#1b2c4a" />
			<path d="M134 48 L150 34 L166 48 z" fill="#e0322b" />
			<Lamp cx={150} cy={59} r={7} color={color} lit={lit} />
		</svg>
	);
}
