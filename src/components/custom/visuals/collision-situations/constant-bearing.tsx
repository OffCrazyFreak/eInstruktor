import { useAnimationFrame, useInView } from "motion/react";
import { useRef, useState } from "react";
import { bearingFrom } from "@/components/custom/visuals/shared/bearing";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import PlayToggle from "@/components/custom/visuals/shared/play-toggle";
import BoatIcon from "@/components/custom/visuals/shared/sea/boat-icon";
import { useAutoplay } from "@/components/custom/visuals/shared/use-autoplay";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

type Case = "risk" | "ahead" | "astern";

/** Speed of the other vessel; at 160 both reach the same point together, so the bearing never changes. */
const OTHER_SPEED: Record<Case, number> = {
	risk: 160,
	ahead: 230,
	astern: 105,
};

const VERDICTS: Record<Case, string> = {
	risk: "Smjer prema drugom plovilu se ne mijenja: postoji rizik sudara. Djeluj na vrijeme.",
	ahead:
		"Smjer se pomiče prema naprijed: drugo plovilo će proći ispred tvog pramca.",
	astern:
		"Smjer se pomiče prema natrag: drugo plovilo će proći iza tvoje krme.",
};

const SAMPLES = [0, 0.25, 0.5];
const END = 0.85;

function positions(t: number, otherCase: Case) {
	return {
		own: { x: 150, y: 270 - 160 * t },
		other: { x: 310 - OTHER_SPEED[otherCase] * t, y: 110 },
	};
}

interface IConstantBearingProps {
	/** Question media: no case picker and no verdict, only the moving picture. */
	hideAnswer?: boolean;
}

/** The 45 degree picture of rule 7: watch the bearing to the other vessel over time. */
export default function ConstantBearing({
	hideAnswer = false,
}: IConstantBearingProps) {
	const [caseId, setCaseId] = useState<Case>("risk");
	const [playing, setPlaying] = useAutoplay();
	const [t, setT] = useState(0.5);
	const now = positions(t, caseId);
	const bearing = Math.round(
		bearingFrom(now.other.x - now.own.x, now.other.y - now.own.y),
	);

	const rootRef = useRef<HTMLDivElement>(null);
	const onScreen = useInView(rootRef);

	useAnimationFrame((_, delta) => {
		if (playing && onScreen) {
			setT((previous) => (previous + delta / 1000 / 6) % END);
		}
	});

	return (
		<div ref={rootRef} className="space-y-3">
			{!hideAnswer && (
				<OptionButtons
					label="Što se događa"
					options={[
						{ value: "risk", label: "Smjer stoji" },
						{ value: "ahead", label: "Prolazi ispred" },
						{ value: "astern", label: "Prolazi iza" },
					]}
					value={caseId}
					onChange={setCaseId}
				/>
			)}

			<svg
				viewBox="0 0 300 300"
				className="mx-auto block w-full max-w-lg"
				role="img"
				aria-label={
					hideAnswer
						? "Dva plovila i smjer prema drugom plovilu"
						: VERDICTS[caseId]
				}
			>
				<rect width="300" height="300" rx="16" fill={PALETTE.sea} />
				{SAMPLES.filter((sample) => sample < t).map((sample) => {
					const past = positions(sample, caseId);

					return (
						<g key={sample} opacity="0.45">
							<line
								x1={past.own.x}
								y1={past.own.y}
								x2={past.other.x}
								y2={past.other.y}
								stroke={PALETTE.navy}
								strokeDasharray="4 4"
							/>
							<circle
								cx={past.own.x}
								cy={past.own.y}
								r="3"
								fill={PALETTE.navy}
							/>
							<circle
								cx={past.other.x}
								cy={past.other.y}
								r="3"
								fill={PALETTE.ocean}
							/>
						</g>
					);
				})}
				<line
					x1={now.own.x}
					y1={now.own.y}
					x2={now.other.x}
					y2={now.other.y}
					stroke={PALETTE.sun}
					strokeWidth="2.5"
				/>
				<BoatIcon x={now.own.x} y={now.own.y} heading={0} scale={1.3} />
				<BoatIcon
					x={now.other.x}
					y={now.other.y}
					heading={270}
					scale={1.3}
					fill={PALETTE.ocean}
				/>
				<text
					x="12"
					y="22"
					fontSize="12"
					fontFamily="var(--font-mono)"
					fill={PALETTE.navy}
				>
					smjer: {String(bearing).padStart(3, "0")}°
				</text>
			</svg>

			<div className="flex items-center gap-3">
				<PlayToggle playing={playing} onToggle={() => setPlaying(!playing)} />
				{!hideAnswer && (
					<p className="text-[0.9rem] leading-snug" aria-live="polite">
						{VERDICTS[caseId]}
					</p>
				)}
			</div>
		</div>
	);
}
