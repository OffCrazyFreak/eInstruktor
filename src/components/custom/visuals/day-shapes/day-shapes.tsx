import { useState } from "react";
import {
	DAY_STATES,
	type DayState,
	SHAPE_NAMES,
	STATES,
} from "@/components/custom/visuals/day-shapes/day-shape-states";
import MastFigure from "@/components/custom/visuals/day-shapes/mast-figure";
import ShapeBuilder from "@/components/custom/visuals/day-shapes/shape-builder";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import QuizChoices from "@/components/custom/visuals/shared/quiz-choices";
import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["explore", "builder", "quiz"] as const;

export interface IDayShapesProps {
	/** "builder" asks the learner to hang the shapes; "quiz" shows shapes and asks for the state. */
	mode?: (typeof MODES)[number];
	state?: DayState;
	/** Question media: only the shapes, with no state name or picker. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IDayShapesProps {
	return {
		mode: readOption(props, "mode", MODES),
		state: readOption(props, "state", STATES),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

export default function DayShapes({
	mode = "explore",
	state,
	hideAnswer = false,
}: IDayShapesProps) {
	const [selected, setSelected] = useState<DayState>(state ?? "anchored");
	const [round, setRound] = useState(0);

	if (mode === "builder") {
		return <ShapeBuilder />;
	}

	const info = DAY_STATES[selected];
	const shapesText = info.shapes.map((shape) => SHAPE_NAMES[shape]).join(", ");

	if (hideAnswer) {
		return <MastFigure shapes={info.shapes} label="Dnevni znak na jarbolu" />;
	}

	if (mode === "quiz") {
		const choices = [
			selected,
			...STATES.filter((option) => option !== selected).slice(
				round % 4,
				(round % 4) + 3,
			),
		];

		return (
			<div className="grid gap-4 md:grid-cols-2">
				<MastFigure shapes={info.shapes} label={`Dnevni znak: ${shapesText}`} />
				<QuizChoices
					key={`${selected}-${round}`}
					prompt="Što javlja plovilo s ovim dnevnim znakom?"
					choices={choices.sort().map((option) => ({
						value: option,
						label: DAY_STATES[option].name,
					}))}
					answer={selected}
					explanation={info.note}
					onNext={() => {
						const others = STATES.filter((option) => option !== selected);

						setSelected(
							others[Math.floor(Math.random() * others.length)] ?? "anchored",
						);
						setRound(round + 1);
					}}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<OptionButtons
				label="Stanje plovila"
				options={STATES.map((option) => ({
					value: option,
					label: DAY_STATES[option].name,
				}))}
				value={selected}
				onChange={setSelected}
			/>

			<div className="grid gap-4 md:grid-cols-2 md:items-center">
				<MastFigure
					shapes={info.shapes}
					label={`${info.name}: ${shapesText}`}
				/>

				<div className="rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem] leading-relaxed">
					<p className="font-serif text-lg">{info.name}</p>
					<p className="font-semibold">{shapesText}</p>
					<p>{info.note}</p>
					<p className="mt-1 text-[#002c78]/70">
						Dnevni znakovi su crni i nose se danju, kad se svjetla ne vide.
					</p>
				</div>
			</div>
		</div>
	);
}
