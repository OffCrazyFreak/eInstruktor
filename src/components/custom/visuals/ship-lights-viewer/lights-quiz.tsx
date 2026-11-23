import { useState } from "react";
import QuizChoices from "@/components/custom/visuals/shared/quiz-choices";
import {
	distractors,
	QUIZ_BEARINGS,
	QUIZ_VESSELS,
} from "@/components/custom/visuals/ship-lights-viewer/lights-quiz-pool";
import NightView from "@/components/custom/visuals/ship-lights-viewer/night-view";
import type { VesselId } from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";
import { VESSELS } from "@/components/custom/visuals/ship-lights-viewer/vessels";

interface IQuestion {
	vessel: VesselId;
	bearing: number;
	choices: VesselId[];
}

function pick<T>(items: readonly T[]): T {
	return items[Math.floor(Math.random() * items.length)] as T;
}

function buildQuestion(vessel: VesselId, bearing: number): IQuestion {
	const others = distractors(vessel, bearing)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3);

	return {
		vessel,
		bearing,
		choices: [vessel, ...others].sort(() => Math.random() - 0.5),
	};
}

/** Reverse mode: only the lights are shown, the learner names the vessel. */
export default function LightsQuiz() {
	const [question, setQuestion] = useState<IQuestion>({
		vessel: "trawler",
		bearing: 90,
		choices: ["power-12-50m", "trawler", "pilot", "fishing"],
	});
	const [round, setRound] = useState(0);

	function next() {
		setQuestion(buildQuestion(pick(QUIZ_VESSELS), pick(QUIZ_BEARINGS)));
		setRound(round + 1);
	}

	return (
		<div className="space-y-4">
			<NightView
				vessel={question.vessel}
				bearing={question.bearing}
				lightsOnly
				label="Svjetla plovila koje treba prepoznati"
			/>

			<QuizChoices
				key={round}
				prompt="Noću vidiš ova svjetla. Koje je to plovilo?"
				choices={question.choices.map((id) => ({
					value: id,
					label: VESSELS[id].name,
				}))}
				answer={question.vessel}
				explanation={VESSELS[question.vessel].note}
				onNext={next}
			/>
		</div>
	);
}
