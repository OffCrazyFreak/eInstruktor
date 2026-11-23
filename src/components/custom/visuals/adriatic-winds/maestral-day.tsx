import { useId, useState } from "react";
import { maestralStrength } from "@/components/custom/visuals/adriatic-winds/winds";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

const HOURS = Array.from({ length: 61 }, (_, index) => 6 + index * 0.25);

function describe(hour: number): string {
	if (hour < 8 || hour >= 20.5) {
		return "Noć i rano jutro: slabi burin puše s kopna prema moru.";
	}

	if (hour < 10) {
		return "Jutro: tišina, more se smiruje. Maestral još ne puše.";
	}

	if (hour < 13) {
		return "Prije podne: maestral počinje i jača.";
	}

	if (hour <= 16) {
		return "Rano poslijepodne: maestral je najjači.";
	}

	return "Kasno poslijepodne: maestral slabi i prestaje prije zalaska sunca.";
}

/** Drag the clock through a summer day and watch the maestral rise and fall. */
export default function MaestralDay() {
	const sliderId = useId();
	const [hour, setHour] = useState(14);
	const path = HOURS.map(
		(h, index) =>
			`${index === 0 ? "M" : "L"}${((h - 6) / 15) * 280 + 10} ${90 - maestralStrength(h) * 70}`,
	).join(" ");
	const markerX = ((hour - 6) / 15) * 280 + 10;

	return (
		<div className="space-y-2 rounded-2xl border border-[#002c78]/10 bg-white p-3">
			<p className="font-semibold">Maestral kroz ljetni dan</p>
			<svg
				viewBox="0 0 300 110"
				className="block w-full"
				role="img"
				aria-label={describe(hour)}
			>
				<path d={`${path} L290 90 L10 90 z`} fill={PALETTE.sky} opacity="0.2" />
				<path d={path} fill="none" stroke={PALETTE.ocean} strokeWidth="2.5" />
				<line
					x1="10"
					y1="90"
					x2="290"
					y2="90"
					stroke={PALETTE.navy}
					strokeOpacity="0.3"
				/>
				{[6, 9, 12, 15, 18, 21].map((h) => (
					<text
						key={h}
						x={((h - 6) / 15) * 280 + 10}
						y="104"
						textAnchor="middle"
						fontSize="9"
						fontFamily="var(--font-mono)"
						fill={PALETTE.navy}
					>
						{h}h
					</text>
				))}
				<line
					x1={markerX}
					y1="12"
					x2={markerX}
					y2="90"
					stroke={PALETTE.sun}
					strokeWidth="2"
				/>
				<circle
					cx={markerX}
					cy={90 - maestralStrength(hour) * 70}
					r="5"
					fill={PALETTE.sun}
				/>
			</svg>
			<label htmlFor={sliderId} className="flex justify-between text-[0.82rem]">
				<span>Sat</span>
				<span className="font-mono">
					{String(Math.floor(hour)).padStart(2, "0")}:
					{hour % 1 === 0.5 ? "30" : "00"}
				</span>
			</label>
			<input
				id={sliderId}
				type="range"
				min={6}
				max={21}
				step={0.5}
				value={hour}
				onChange={(event) => setHour(Number(event.target.value))}
				className="w-full accent-[#ffb43c]"
			/>
			<p className="text-[0.9rem]" aria-live="polite">
				{describe(hour)}
			</p>
		</div>
	);
}
