import LighthouseScene from "@/components/custom/visuals/light-characteristic-reader/lighthouse-scene";
import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";
import { buildLightSequence } from "@/components/custom/visuals/shared/light/light-sequence";
import LightTimeline from "@/components/custom/visuals/shared/light/light-timeline";
import { parseLightCode } from "@/components/custom/visuals/shared/light/parse-light-code";
import { useLightPlayback } from "@/components/custom/visuals/shared/light/use-light-playback";
import { useAutoplay } from "@/components/custom/visuals/shared/use-autoplay";

interface ILightPlayerProps {
	code: string;
	/** Colour of the sector the boat is in; alternating lights keep their own colours. */
	color: LightColor;
}

/** Lighthouse and timeline for one code; remount with a key when the code or colour changes. */
export default function LightPlayer({ code, color }: ILightPlayerProps) {
	const [playing, setPlaying] = useAutoplay();
	const light = parseLightCode(code);
	const segments = buildLightSequence(
		light,
		light.rhythm === "alternating" ? undefined : color,
	);
	const { segment, progress } = useLightPlayback(segments, playing);

	return (
		<>
			<LighthouseScene
				lit={segment?.on ?? true}
				color={segment?.color ?? color}
				label={`Svjetionik s karakteristikom ${code}`}
			/>
			<LightTimeline
				segments={segments}
				progress={progress}
				playing={playing}
				onTogglePlaying={() => setPlaying(!playing)}
				label={`Ritam svjetla ${code}`}
			/>
		</>
	);
}
