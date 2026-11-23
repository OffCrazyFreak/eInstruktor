import {
	type EngineMode,
	pistonLift,
	strokeIndexAt,
} from "@/components/custom/visuals/four-stroke-engine/engine-cycles";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IEngineCylinderProps {
	mode: EngineMode;
	angle: number;
	label: string;
}

const HEAD = 60;
const BDC_TOP = 190;
const STROKE_PX = 100;
const CRANK = { x: 120, y: 262, r: 24 };

const GAS = {
	"four-stroke": ["#8fd3f7", "#3f8fca", "#ffb43c", "#9aa3b2"],
	diesel: ["#cfe8fb", "#3f8fca", "#ff8a3c", "#9aa3b2"],
	"two-stroke": ["#3f8fca", "#ffb43c"],
} as const;

/** Cross-section of one cylinder: valves or ports, spark plug or injector, piston, rod and crank. */
export default function EngineCylinder({
	mode,
	angle,
	label,
}: IEngineCylinderProps) {
	const lift = pistonLift(mode, angle);
	const pistonTop = BDC_TOP - lift * STROKE_PX;
	const crankAngle =
		((mode === "two-stroke" ? angle + 180 : angle) * Math.PI) / 180;
	const pin = {
		x: CRANK.x + CRANK.r * Math.sin(crankAngle),
		y: CRANK.y - CRANK.r * Math.cos(crankAngle),
	};
	const index = strokeIndexAt(mode, angle);
	const within = (((angle % 180) + 180) % 180) / 180;
	const opening = Math.sin(within * Math.PI) * 12;
	const intakeOpen = mode !== "two-stroke" && index === 0 ? opening : 0;
	const exhaustOpen = mode !== "two-stroke" && index === 3 ? opening : 0;
	const igniting =
		(mode === "two-stroke" ? index === 1 : index === 2) && within < 0.18;
	const portsOpen = mode === "two-stroke" && pistonTop > 160;
	const goingUp = mode === "two-stroke" ? index === 0 : index % 2 === 1;

	return (
		<svg
			viewBox="0 0 240 300"
			className="mx-auto block w-full max-w-64"
			role="img"
			aria-label={label}
		>
			<rect width="240" height="300" rx="16" fill={PALETTE.light} />
			<rect
				x="70"
				y={HEAD}
				width="100"
				height={pistonTop - HEAD}
				fill={GAS[mode][index] ?? PALETTE.sea}
				opacity="0.85"
			/>
			<path
				d={`M62 ${HEAD - 18} H178 V232 H170 V${HEAD} H70 V232 H62 z`}
				fill="#5b6475"
			/>

			{mode === "two-stroke" ? (
				<g fill={portsOpen ? PALETTE.sun : "#3a4253"}>
					<rect x="62" y="166" width="8" height="22" />
					<rect x="170" y="160" width="8" height="22" />
				</g>
			) : (
				<g stroke="#1d2433" strokeWidth="3" fill="#1d2433">
					<line x1="92" y1={HEAD - 30} x2="92" y2={HEAD + intakeOpen - 2} />
					<rect x="82" y={HEAD - 3 + intakeOpen} width="20" height="4" />
					<line x1="148" y1={HEAD - 30} x2="148" y2={HEAD + exhaustOpen - 2} />
					<rect x="138" y={HEAD - 3 + exhaustOpen} width="20" height="4" />
				</g>
			)}

			{mode === "diesel" ? (
				<g>
					<rect
						x="114"
						y={HEAD - 34}
						width="12"
						height="30"
						rx="3"
						fill="#3a4253"
					/>
					{igniting && (
						<path
							d={`M120 ${HEAD} l-14 26 h28 z`}
							fill="#ff8a3c"
							opacity="0.8"
						/>
					)}
				</g>
			) : (
				<g>
					<rect
						x="115"
						y={HEAD - 36}
						width="10"
						height="32"
						rx="2"
						fill="#eaf3ff"
						stroke="#1d2433"
					/>
					{igniting && (
						<circle
							cx="120"
							cy={HEAD + 6}
							r="10"
							fill={PALETTE.sunPale}
							stroke={PALETTE.sun}
							strokeWidth="3"
						/>
					)}
				</g>
			)}

			<rect
				x="72"
				y={pistonTop}
				width="96"
				height="40"
				rx="4"
				fill="#8a94a6"
				stroke="#1d2433"
			/>
			<line
				x1="120"
				y1={pistonTop + 26}
				x2={pin.x}
				y2={pin.y}
				stroke="#1d2433"
				strokeWidth="8"
				strokeLinecap="round"
			/>
			<circle
				cx={CRANK.x}
				cy={CRANK.y}
				r={CRANK.r + 6}
				fill="none"
				stroke="#5b6475"
				strokeWidth="2"
				strokeDasharray="3 4"
			/>
			<circle cx={pin.x} cy={pin.y} r="6" fill="#1d2433" />
			<circle cx={CRANK.x} cy={CRANK.y} r="5" fill="#5b6475" />

			<g
				transform={`translate(206 ${(HEAD + BDC_TOP) / 2}) rotate(${goingUp ? 0 : 180})`}
			>
				<path d="M0 -26 L12 -8 H4 V26 H-4 V-8 H-12 z" fill={PALETTE.navy} />
			</g>
			<g fontSize="9" fill={PALETTE.navy} textAnchor="middle">
				{mode !== "two-stroke" && (
					<text x="92" y="16">
						usis
					</text>
				)}
				{mode !== "two-stroke" && (
					<text x="148" y="16">
						ispuh
					</text>
				)}
				<text x="120" y="16">
					{mode === "diesel" ? "rasprskač" : "svjećica"}
				</text>
			</g>
		</svg>
	);
}
