import {
	type IScheduledSound,
	signalLength,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";
import { cn } from "@/lib/utils";

interface ISignalStripProps {
	sounds: readonly IScheduledSound[];
	/** Seconds into playback, or null when not playing. */
	elapsed: number | null;
}

const LABELS = {
	short: "kratki",
	long: "dugi",
	bell: "zvono",
	stroke: "udarac zvona",
} as const;

/** Dots for short blasts and bars for long ones, drawn to scale; the one sounding now lights up. */
export default function SignalStrip({ sounds, elapsed }: ISignalStripProps) {
	const length = signalLength(sounds);

	return (
		<div
			className="relative h-7 w-full"
			role="img"
			aria-label={sounds.map((sound) => LABELS[sound.element]).join(", ")}
		>
			<div className="absolute inset-x-0 top-1/2 h-px bg-[#002c78]/15" />
			{sounds.map((sound) => {
				const active =
					elapsed !== null &&
					elapsed >= sound.start &&
					elapsed < sound.start + sound.duration;

				return (
					<span
						key={sound.start}
						className={cn(
							"absolute top-1/2 h-3 -translate-y-1/2 rounded-full",
							sound.element === "bell"
								? "h-4 bg-[repeating-linear-gradient(90deg,#0a63b0_0_3px,transparent_3px_6px)]"
								: "bg-[#002c78]",
							sound.element === "stroke" && "h-4 w-1.5 rounded-sm",
							active && "bg-[#ffb43c] shadow-[0_0_0_4px_rgba(255,180,60,0.35)]",
						)}
						style={{
							left: `${(sound.start / length) * 100}%`,
							width:
								sound.element === "stroke"
									? undefined
									: `max(0.75rem, ${(sound.duration / length) * 100}%)`,
						}}
					/>
				);
			})}
		</div>
	);
}
