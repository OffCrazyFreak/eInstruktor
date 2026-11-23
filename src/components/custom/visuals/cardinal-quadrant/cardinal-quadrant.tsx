import { useState } from "react";
import CardinalQuiz from "@/components/custom/visuals/cardinal-quadrant/cardinal-quiz";
import QuadrantChart from "@/components/custom/visuals/cardinal-quadrant/quadrant-chart";
import {
	QUADRANT_MARK,
	QUADRANTS,
	type Quadrant,
} from "@/components/custom/visuals/cardinal-quadrant/quadrant-math";
import { MARKS } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import MarkScene from "@/components/custom/visuals/shared/buoy/mark-scene";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import {
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["explore", "identify", "pass", "quiz"] as const;

export interface ICardinalQuadrantProps {
	/** "identify" and "quiz" ask which mark is shown, "pass" asks which side to pass it on. */
	mode?: (typeof MODES)[number];
	mark?: Quadrant;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): ICardinalQuadrantProps {
	return {
		mode: readOption(props, "mode", MODES),
		mark: readOption(props, "mark", QUADRANTS),
	};
}

export default function CardinalQuadrant({
	mode = "explore",
	mark = "N",
}: ICardinalQuadrantProps) {
	const [quadrant, setQuadrant] = useState<Quadrant>(mark);

	if (mode !== "explore") {
		return (
			<CardinalQuiz kind={mode === "pass" ? "pass" : "identify"} start={mark} />
		);
	}

	const selected = MARKS[QUADRANT_MARK[quadrant]];

	return (
		<div className="space-y-4">
			<p className="text-[0.92rem] leading-relaxed">
				Povuci brodicu oko opasnosti ili odaberi kvadrant. Kardinalna oznaka
				stoji u kvadrantu sigurne vode, a prolaziš sa strane po kojoj se zove.
			</p>

			<OptionButtons
				label="Kvadrant"
				options={QUADRANTS.map((option) => ({
					value: option,
					label: MARKS[QUADRANT_MARK[option]].name,
				}))}
				value={quadrant}
				onChange={setQuadrant}
			/>

			<div className="grid gap-4 md:grid-cols-2">
				<QuadrantChart selected={quadrant} onSelect={setQuadrant} />

				<div className="space-y-3">
					<MarkScene key={quadrant} mark={selected} />

					<div className="rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem] leading-relaxed">
						<p className="font-serif text-lg">{selected.name}</p>
						<p>
							{selected.colorText}; {selected.topmarkText}.
						</p>
						<p className="font-semibold">{selected.pass}</p>
						<p className="mt-1 text-[#002c78]/75">
							Bljeskovi su kao brojke na satu: istok 3, jug 6 i jedan dugi,
							zapad 9, a sjever svijetli bez prekida.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
