import { type MotionValue, motion, useTransform } from "motion/react";
import { LAMP_COLORS } from "@/components/custom/visuals/shared/light/light-colors";
import {
	type ILightSegment,
	total,
} from "@/components/custom/visuals/shared/light/light-sequence";
import PlayToggle from "@/components/custom/visuals/shared/play-toggle";

interface ILightTimelineProps {
	segments: readonly ILightSegment[];
	progress: MotionValue<number>;
	playing: boolean;
	onTogglePlaying: () => void;
	label: string;
}

const WIDTH = 300;

/** The light's period drawn as lit and dark blocks, with a playhead and a play button. */
export default function LightTimeline({
	segments,
	progress,
	playing,
	onTogglePlaying,
	label,
}: ILightTimelineProps) {
	const length = total(segments);
	const playheadX = useTransform(progress, (value) => value * WIDTH);
	const blocks = segments.map((segment, index) => ({
		segment,
		start: total(segments.slice(0, index)),
	}));

	return (
		<div className="flex items-center gap-3">
			<PlayToggle playing={playing} onToggle={onTogglePlaying} tone="night" />

			<div className="min-w-0 flex-1">
				<svg
					viewBox={`0 0 ${WIDTH} 22`}
					className="block h-6 w-full"
					preserveAspectRatio="none"
					role="img"
					aria-label={label}
				>
					<rect width={WIDTH} height="22" rx="4" fill="#0c2550" />

					{blocks.map(({ segment, start }) => (
						<rect
							key={start}
							x={(start / length) * WIDTH}
							y="3"
							width={(segment.duration / length) * WIDTH}
							height="16"
							fill={segment.on ? LAMP_COLORS[segment.color] : "transparent"}
						/>
					))}

					<motion.line
						x1={0}
						x2={0}
						y1="0"
						y2="22"
						stroke="#ffb43c"
						strokeWidth="2.5"
						style={{ x: playheadX }}
					/>
				</svg>

				<div className="mt-1 flex justify-between font-mono text-[0.7rem] text-[#eaf3ff]/70">
					<span>0 s</span>
					<span>{formatSeconds(length)} s</span>
				</div>
			</div>
		</div>
	);
}

function formatSeconds(seconds: number): string {
	return Number.isInteger(seconds)
		? String(seconds)
		: seconds.toFixed(1).replace(".", ",");
}
