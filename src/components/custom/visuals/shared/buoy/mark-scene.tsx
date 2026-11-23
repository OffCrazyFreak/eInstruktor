import BuoyFigure from "@/components/custom/visuals/shared/buoy/buoy-figure";
import type { IMark } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import { buildLightSequence } from "@/components/custom/visuals/shared/light/light-sequence";
import LightTimeline from "@/components/custom/visuals/shared/light/light-timeline";
import { parseLightCode } from "@/components/custom/visuals/shared/light/parse-light-code";
import { useLightPlayback } from "@/components/custom/visuals/shared/light/use-light-playback";
import { useAutoplay } from "@/components/custom/visuals/shared/use-autoplay";

interface IMarkSceneProps {
	mark: IMark;
	/** Keeps the name out of the screen reader label when the mark is a quiz question. */
	hideName?: boolean;
}

/** The mark at dusk, so its colours and its flashing light read at the same time. */
export default function MarkScene({ mark, hideName = false }: IMarkSceneProps) {
	const [playing, setPlaying] = useAutoplay();
	const light = parseLightCode(mark.light);
	const segments = buildLightSequence(light);
	const { segment, progress } = useLightPlayback(segments, playing);
	const lit = segment?.on ?? true;

	return (
		<div className="flex h-full flex-col gap-3 rounded-2xl bg-[linear-gradient(180deg,#0c2550_0%,#3a4f86_46%,#ffb43c_78%,#ffe89a_100%)] p-3">
			<svg
				viewBox="0 0 200 210"
				className="mx-auto block h-56 w-full max-w-xs"
				role="img"
				aria-label={
					hideName
						? "Oznaka koju treba prepoznati"
						: `${mark.name}: ${mark.colorText}, vršni znak ${mark.topmarkText}`
				}
			>
				<circle cx="160" cy="162" r="22" fill="#ffe89a" opacity="0.9" />
				<BuoyFigure
					mark={mark}
					lit={lit}
					lampColor={segment?.color ?? light.colors[0] ?? "white"}
					transform="translate(40 4)"
				/>
				<path
					d="M0 186 q12 -5 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V210 H0 z"
					fill="#0a63b0"
				/>
				<path
					d="M0 194 q12 -4 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V210 H0 z"
					fill="#002c78"
					opacity="0.75"
				/>
			</svg>

			<div className="rounded-xl bg-[#04142e]/80 p-2.5">
				<LightTimeline
					segments={segments}
					progress={progress}
					playing={playing}
					onTogglePlaying={() => setPlaying(!playing)}
					label={`Ritam svjetla ${mark.light}`}
				/>
			</div>
		</div>
	);
}
