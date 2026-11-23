import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";
import { LAMP_COLORS } from "@/components/custom/visuals/shared/light/light-colors";

interface ILampProps {
	cx: number;
	cy: number;
	r: number;
	color: LightColor;
	lit: boolean;
}

/** A navigation light inside an SVG: a soft halo and a bright core when lit, a dim lens when dark. */
export default function Lamp({ cx, cy, r, color, lit }: ILampProps) {
	const tint = LAMP_COLORS[color];

	return (
		<g aria-hidden>
			{lit && <circle cx={cx} cy={cy} r={r * 3.2} fill={tint} opacity="0.18" />}
			{lit && <circle cx={cx} cy={cy} r={r * 1.8} fill={tint} opacity="0.35" />}
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={lit ? tint : "#1b2c4a"}
				stroke={lit ? "#ffffff" : "#33476b"}
				strokeWidth={lit ? r * 0.25 : 1}
			/>
		</g>
	);
}
