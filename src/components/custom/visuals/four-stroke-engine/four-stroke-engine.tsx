import { useState } from "react";
import EngineAnimation from "@/components/custom/visuals/four-stroke-engine/engine-animation";
import {
	ENGINE_MODES,
	type EngineMode,
	STROKE_IDS,
	type StrokeId,
} from "@/components/custom/visuals/four-stroke-engine/engine-cycles";
import InstrumentPanel from "@/components/custom/visuals/four-stroke-engine/instrument-panel";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = [...ENGINE_MODES, "instruments"] as const;

export interface IFourStrokeEngineProps {
	/** Engine type to animate, or "instruments" for the gauge panel. */
	mode?: (typeof MODES)[number];
	stroke?: StrokeId;
	/** With `stroke`, freezes the picture on that stroke for a question. */
	paused?: boolean;
	/** Question media: the cylinder only, with no stroke names. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IFourStrokeEngineProps {
	return {
		mode: readOption(props, "mode", MODES),
		stroke: readOption(props, "stroke", STROKE_IDS),
		paused: readBoolean(props, "paused"),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

const MODE_LABELS: Record<EngineMode, string> = {
	"four-stroke": "Četverotaktni benzinski",
	"two-stroke": "Dvotaktni",
	diesel: "Diesel",
};

export default function FourStrokeEngine({
	mode = "four-stroke",
	stroke,
	paused = false,
	hideAnswer = false,
}: IFourStrokeEngineProps) {
	const [engine, setEngine] = useState<EngineMode>(
		mode === "instruments" ? "four-stroke" : mode,
	);

	if (mode === "instruments") {
		return <InstrumentPanel />;
	}

	const frozen = paused && stroke ? stroke : undefined;

	return (
		<div className="space-y-4">
			{!frozen && !hideAnswer && (
				<OptionButtons
					label="Vrsta motora"
					options={ENGINE_MODES.map((id) => ({
						value: id,
						label: MODE_LABELS[id],
					}))}
					value={engine}
					onChange={setEngine}
				/>
			)}
			<EngineAnimation
				key={engine}
				mode={engine}
				frozenStroke={frozen}
				drawingOnly={hideAnswer}
			/>
		</div>
	);
}
