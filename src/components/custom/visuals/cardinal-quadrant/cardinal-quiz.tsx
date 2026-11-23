import { useState } from "react";
import {
	QUADRANT_MARK,
	QUADRANTS,
	type Quadrant,
} from "@/components/custom/visuals/cardinal-quadrant/quadrant-math";
import { MARKS } from "@/components/custom/visuals/shared/buoy/buoy-marks";
import MarkScene from "@/components/custom/visuals/shared/buoy/mark-scene";
import QuizChoices from "@/components/custom/visuals/shared/quiz-choices";

interface ICardinalQuizProps {
	/** "identify" asks which mark this is; "pass" asks which side to pass it on. */
	kind: "identify" | "pass";
	start: Quadrant;
}

const NAMES: Record<Quadrant, string> = {
	N: "sjeverna (N)",
	E: "istočna (E)",
	S: "južna (S)",
	W: "zapadna (W)",
};

const SIDES: Record<Quadrant, string> = {
	N: "sjeverno od nje",
	E: "istočno od nje",
	S: "južno od nje",
	W: "zapadno od nje",
};

export default function CardinalQuiz({ kind, start }: ICardinalQuizProps) {
	const [quadrant, setQuadrant] = useState<Quadrant>(start);
	const [round, setRound] = useState(0);
	const mark = MARKS[QUADRANT_MARK[quadrant]];

	function next() {
		const others = QUADRANTS.filter((option) => option !== quadrant);

		setQuadrant(others[Math.floor(Math.random() * others.length)] ?? "N");
		setRound(round + 1);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<MarkScene key={quadrant} mark={mark} hideName={kind === "identify"} />

			<QuizChoices
				key={`${quadrant}-${round}`}
				prompt={
					kind === "identify"
						? "Koja je ovo kardinalna oznaka?"
						: `Ispred pramca je ${NAMES[quadrant]} kardinalna oznaka. Kuda je prolaziš?`
				}
				choices={QUADRANTS.map((option) => ({
					value: option,
					label:
						kind === "identify" ? NAMES[option] : `Prođem ${SIDES[option]}`,
				}))}
				answer={quadrant}
				explanation={`${mark.colorText}, vršni znak: ${mark.topmarkText}. Vrhovi stožaca pokazuju gdje je crna boja. ${mark.pass}`}
				onNext={next}
			/>
		</div>
	);
}
