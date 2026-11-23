import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface ISeaStateProps {
	force: number;
	label: string;
}

const CRESTS = Array.from({ length: 8 }, (_, index) => 20 + index * 40);

/** Waves, white crests, streaks of foam and a flag that grow with the Beaufort force. */
export default function SeaState({ force, label }: ISeaStateProps) {
	const amplitude = 1 + force * 2.2;
	const wave = (y: number) =>
		`M0 ${y} ${Array.from({ length: 8 }, (_, index) => `Q${index * 40 + 20} ${y - amplitude * 2} ${index * 40 + 40} ${y}`).join(" ")} V200 H0 z`;
	const sky = force >= 8 ? "#5a6b86" : force >= 5 ? "#9fb6d6" : PALETTE.sea;
	const flagLift = Math.min(force, 8) * 9;

	return (
		<svg
			viewBox="0 0 320 200"
			className="block w-full"
			role="img"
			aria-label={label}
		>
			<rect width="320" height="200" rx="16" fill={sky} />
			<line
				x1="270"
				y1="30"
				x2="270"
				y2="110"
				stroke={PALETTE.navy}
				strokeWidth="3"
			/>
			<path
				d={`M270 34 L${270 - 40} ${34 + 70 - flagLift} L${270 - 36} ${46 + 70 - flagLift} L270 50 z`}
				fill={PALETTE.sun}
			/>
			<path d={wave(120)} fill={PALETTE.ocean} />
			<path d={wave(150)} fill={PALETTE.navy} opacity="0.85" />
			{force >= 3 && (
				<g fill="white">
					{CRESTS.slice(0, Math.min(8, force - 1)).map((x) => (
						<ellipse
							key={x}
							cx={x}
							cy={120 - amplitude * 1.1}
							rx={4 + force}
							ry="2.5"
							opacity="0.9"
						/>
					))}
				</g>
			)}
			{force >= 7 && (
				<g stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6">
					{CRESTS.map((x) => (
						<line key={x} x1={x - 10} y1="170" x2={x + 14} y2="176" />
					))}
				</g>
			)}
			{force >= 9 && (
				<rect
					width="320"
					height="200"
					rx="16"
					fill="white"
					opacity={(force - 8) * 0.12}
				/>
			)}
		</svg>
	);
}
