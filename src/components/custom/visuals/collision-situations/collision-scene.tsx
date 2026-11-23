import { useAnimationFrame, useInView } from "motion/react";
import { useId, useRef, useState } from "react";
import {
	classifySituation,
	type IVesselState,
} from "@/components/custom/visuals/collision-situations/collision-rules";
import type { IScenario } from "@/components/custom/visuals/collision-situations/collision-scenarios";
import VesselMarker from "@/components/custom/visuals/collision-situations/vessel-marker";
import PlayToggle from "@/components/custom/visuals/shared/play-toggle";
import RouteArrowMarker from "@/components/custom/visuals/shared/sea/route-arrow-marker";
import { useAutoplay } from "@/components/custom/visuals/shared/use-autoplay";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface ICollisionSceneProps {
	scenario: IScenario;
	/** Question media: both vessels hold course and nothing marks who gives way. */
	hideAnswer?: boolean;
}

const LOOP_SECONDS = 5;
const TURN_AT = 0.25;
const TURN_DEGREES = 40;

/** Position after `t` (0 to 1) of the loop; a give-way vessel turns to starboard early, a stand-on vessel holds course. */
function positionAt(
	vessel: IVesselState,
	speed: number,
	t: number,
	turns: boolean,
): IVesselState {
	const step = (
		from: IVesselState,
		heading: number,
		duration: number,
	): IVesselState => {
		const radians = (heading * Math.PI) / 180;

		return {
			...from,
			heading,
			x: from.x + Math.sin(radians) * speed * duration,
			y: from.y - Math.cos(radians) * speed * duration,
		};
	};

	if (!turns || t <= TURN_AT) {
		return step(vessel, vessel.heading, t);
	}

	return step(
		step(vessel, vessel.heading, TURN_AT),
		vessel.heading + TURN_DEGREES,
		t - TURN_AT,
	);
}

function trackPath(
	vessel: IVesselState,
	speed: number,
	turns: boolean,
): string {
	const points = Array.from({ length: 11 }, (_, index) =>
		positionAt(vessel, speed, index / 10, turns),
	);

	return points
		.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
		.join(" ");
}

export default function CollisionScene({
	scenario,
	hideAnswer = false,
}: ICollisionSceneProps) {
	const arrowId = useId();
	const [playing, setPlaying] = useAutoplay();
	const [t, setT] = useState(0);
	const verdict = classifySituation(
		scenario.own,
		scenario.other,
		scenario.windFrom,
	);
	const ownTurns = !hideAnswer && verdict.giveWay !== "b";
	const otherTurns = !hideAnswer && verdict.giveWay !== "a";
	const [ownSpeed, otherSpeed] = scenario.speeds;

	const rootRef = useRef<HTMLDivElement>(null);
	const onScreen = useInView(rootRef);

	useAnimationFrame((_, delta) => {
		if (playing && onScreen) {
			setT((previous) => (previous + delta / 1000 / LOOP_SECONDS) % 1);
		}
	});

	return (
		<div ref={rootRef} className="space-y-2">
			<svg
				viewBox="0 0 300 300"
				className="block w-full"
				role="img"
				aria-label={
					hideAnswer
						? "Dva plovila na kursevima koji se sijeku"
						: `${scenario.title}. ${scenario.explanation}`
				}
			>
				<defs>
					<RouteArrowMarker id={arrowId} />
				</defs>
				<rect width="300" height="300" rx="16" fill={PALETTE.sea} />

				{scenario.windFrom !== undefined && (
					<g transform={`rotate(${scenario.windFrom} 270 32)`}>
						<line
							x1="270"
							y1="12"
							x2="270"
							y2="48"
							stroke={PALETTE.navy}
							strokeWidth="3"
						/>
						<path d="M262 40 L270 54 L278 40 z" fill={PALETTE.navy} />
					</g>
				)}
				{scenario.windFrom !== undefined && (
					<text
						x="270"
						y="70"
						textAnchor="middle"
						fontSize="10"
						fill={PALETTE.navy}
					>
						vjetar
					</text>
				)}

				<path
					d={trackPath(scenario.own, ownSpeed, ownTurns)}
					fill="none"
					stroke={PALETTE.navy}
					strokeOpacity="0.4"
					strokeWidth="2"
					strokeDasharray="3 5"
					markerEnd={`url(#${arrowId})`}
				/>
				<path
					d={trackPath(scenario.other, otherSpeed, otherTurns)}
					fill="none"
					stroke={PALETTE.ocean}
					strokeOpacity="0.4"
					strokeWidth="2"
					strokeDasharray="3 5"
					markerEnd={`url(#${arrowId})`}
				/>

				<VesselMarker
					vessel={positionAt(scenario.other, otherSpeed, t, otherTurns)}
					label="drugo plovilo"
					role={hideAnswer ? null : otherTurns ? "give-way" : "stand-on"}
					own={false}
				/>
				<VesselMarker
					vessel={positionAt(scenario.own, ownSpeed, t, ownTurns)}
					label="Ti"
					role={hideAnswer ? null : ownTurns ? "give-way" : "stand-on"}
					own
				/>
			</svg>

			<div className="flex items-center gap-3">
				<PlayToggle playing={playing} onToggle={() => setPlaying(!playing)} />
				<p className="text-[0.8rem] text-[#002c78]/70">
					Isprekidana crta je put.
					{!hideAnswer &&
						` Narančasti krug: plovilo koje se uklanja. Pravilo: ${verdict.rule}.`}
				</p>
			</div>
		</div>
	);
}
