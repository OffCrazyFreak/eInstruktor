import { useAnimationFrame } from "motion/react";
import { useState } from "react";
import {
	CYCLES,
	cycleDegrees,
	type EngineMode,
	middleOf,
	type StrokeId,
	strokeIndexAt,
} from "@/components/custom/visuals/four-stroke-engine/engine-cycles";
import EngineCylinder from "@/components/custom/visuals/four-stroke-engine/engine-cylinder";
import PlayToggle from "@/components/custom/visuals/shared/play-toggle";
import { useAutoplay } from "@/components/custom/visuals/shared/use-autoplay";
import { cn } from "@/lib/utils";

interface IEngineAnimationProps {
	mode: EngineMode;
	/** Freezes the picture on this stroke and hides its name until revealed, for questions. */
	frozenStroke?: StrokeId;
}

const DEGREES_PER_SECOND = 120;

export default function EngineAnimation({
	mode,
	frozenStroke,
}: IEngineAnimationProps) {
	const [playing, setPlaying] = useAutoplay(!frozenStroke);
	const [angle, setAngle] = useState(
		frozenStroke ? middleOf(mode, frozenStroke) : 30,
	);
	const [revealed, setRevealed] = useState(!frozenStroke);
	const strokes = CYCLES[mode];
	const index = strokeIndexAt(mode, angle);
	const stroke = strokes[index];

	useAnimationFrame((_, delta) => {
		if (playing) {
			setAngle(
				(previous) =>
					(previous + (delta / 1000) * DEGREES_PER_SECOND) % cycleDegrees(mode),
			);
		}
	});

	return (
		<div className="grid gap-4 md:grid-cols-2 md:items-center">
			<EngineCylinder
				mode={mode}
				angle={angle}
				label={
					revealed && stroke
						? `${stroke.name}: ${stroke.text}`
						: "Presjek cilindra; strelica pokazuje kamo ide klip."
				}
			/>

			<div className="space-y-3">
				<ol className="m-0 grid list-none gap-1.5 p-0">
					{strokes.map((item, position) => (
						<li key={item.id}>
							<button
								type="button"
								onClick={() => {
									setPlaying(false);
									setAngle(position * 180 + 90);
									setRevealed(true);
								}}
								aria-pressed={revealed && position === index}
								className={cn(
									"w-full rounded-xl border px-3 py-2 text-left text-[0.88rem] font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
									revealed && position === index
										? "border-[#002c78] bg-[#002c78] text-white"
										: "border-[#002c78]/15 bg-white",
								)}
							>
								{item.name}
							</button>
						</li>
					))}
				</ol>

				<div
					className="min-h-16 rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem] leading-relaxed"
					aria-live="polite"
				>
					{revealed && stroke ? (
						stroke.text
					) : (
						<button
							type="button"
							onClick={() => setRevealed(true)}
							className="font-semibold text-[#0a63b0] underline underline-offset-2 outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
						>
							Pokaži koji je takt
						</button>
					)}
				</div>

				<div className="flex items-center gap-3">
					<PlayToggle playing={playing} onToggle={() => setPlaying(!playing)} />
					<p className="text-[0.8rem] text-[#002c78]/70">
						{mode === "two-stroke"
							? "Dva takta u jednom okretaju radilice."
							: "Četiri takta u dva okretaja radilice."}
					</p>
				</div>
			</div>
		</div>
	);
}
