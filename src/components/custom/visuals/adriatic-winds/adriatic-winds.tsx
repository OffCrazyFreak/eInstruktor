import { useState } from "react";
import AdriaticMap from "@/components/custom/visuals/adriatic-winds/adriatic-map";
import MaestralDay from "@/components/custom/visuals/adriatic-winds/maestral-day";
import WindCard from "@/components/custom/visuals/adriatic-winds/wind-card";
import {
	DIRECTIONS,
	type Direction,
	WIND_IDS,
	WINDS,
	type WindId,
} from "@/components/custom/visuals/adriatic-winds/winds";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import QuizChoices from "@/components/custom/visuals/shared/quiz-choices";
import {
	readOption,
	readOptionList,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["explore", "quiz"] as const;
const SHOWS = ["signs", "day-cycle"] as const;

export interface IAdriaticWindsProps {
	mode?: (typeof MODES)[number];
	highlight?: WindId;
	/** Two winds side by side, e.g. bura and jugo. */
	compare?: WindId[];
	/** "signs" opens the warning signs, "day-cycle" the maestral clock. */
	show?: (typeof SHOWS)[number];
	/** Quiz: the direction whose wind the learner must name. */
	direction?: Direction;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IAdriaticWindsProps {
	return {
		mode: readOption(props, "mode", MODES),
		highlight: readOption(props, "highlight", WIND_IDS),
		compare: readOptionList(props, "compare", WIND_IDS),
		show: readOption(props, "show", SHOWS),
		direction: readOption(props, "direction", DIRECTIONS),
	};
}

export default function AdriaticWinds({
	mode = "explore",
	highlight,
	compare = [],
	show,
	direction = "SW",
}: IAdriaticWindsProps) {
	const [selected, setSelected] = useState<WindId>(
		highlight ?? compare[0] ?? "bura",
	);
	const [quizDirection, setQuizDirection] = useState<Direction>(direction);
	const [round, setRound] = useState(0);

	if (mode === "quiz") {
		const answer =
			WIND_IDS.find((id) => WINDS[id].direction === quizDirection) ?? "lebic";

		return (
			<div className="grid gap-4 md:grid-cols-2">
				<AdriaticMap selected={[answer]} hideNames />
				<QuizChoices
					key={`${answer}-${round}`}
					prompt={`Koji vjetar puše iz smjera ${quizDirection}?`}
					choices={WIND_IDS.map((id) => ({ value: id, label: WINDS[id].name }))}
					answer={answer}
					explanation={`${WINDS[answer].name} puše ${WINDS[answer].directionName}.`}
					onNext={() => {
						const others = DIRECTIONS.filter((item) => item !== quizDirection);

						setQuizDirection(
							others[Math.floor(Math.random() * others.length)] ?? "N",
						);
						setRound(round + 1);
					}}
				/>
			</div>
		);
	}

	const comparing = compare.length >= 2;
	const shown: WindId[] = comparing ? compare.slice(0, 2) : [selected];

	return (
		<div className="space-y-4">
			{!comparing && (
				<OptionButtons
					label="Vjetar"
					options={WIND_IDS.map((id) => ({ value: id, label: WINDS[id].name }))}
					value={selected}
					onChange={setSelected}
				/>
			)}

			<div className="grid gap-4 md:grid-cols-2 md:items-start">
				<AdriaticMap
					selected={shown}
					onSelect={comparing ? undefined : setSelected}
				/>

				<div className="space-y-3">
					{shown.map((id) => (
						<WindCard
							key={`${id}-${show}`}
							wind={id}
							showSigns={show === "signs" || comparing}
						/>
					))}
				</div>
			</div>

			{(show === "day-cycle" || selected === "maestral") && !comparing && (
				<MaestralDay />
			)}
		</div>
	);
}
