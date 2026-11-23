import { useState } from "react";
import {
	crossingAsStandOn,
	SCENARIO_IDS,
	SCENARIOS,
	type ScenarioId,
} from "@/components/custom/visuals/collision-situations/collision-scenarios";
import CollisionScene from "@/components/custom/visuals/collision-situations/collision-scene";
import ConstantBearing from "@/components/custom/visuals/collision-situations/constant-bearing";
import NarrowChannel from "@/components/custom/visuals/collision-situations/narrow-channel";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const SITUATIONS = [...SCENARIO_IDS, "narrow-channel"] as const;
const FOCUSES = ["constant-bearing"] as const;
const OWN_ROLES = ["give-way", "stand-on"] as const;

type SituationId = (typeof SITUATIONS)[number];

export interface ICollisionSituationsProps {
	situation?: SituationId;
	/** "constant-bearing" shows the risk-of-collision picture instead of the rule scenarios. */
	focus?: (typeof FOCUSES)[number];
	/** In a crossing, whether you are the vessel that gives way or the one that stands on. */
	own?: (typeof OWN_ROLES)[number];
	/** Question media: the scene only, with no situation name, rule or give-way marking. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): ICollisionSituationsProps {
	return {
		situation: readOption(props, "situation", SITUATIONS),
		focus: readOption(props, "focus", FOCUSES),
		own: readOption(props, "own", OWN_ROLES),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

const LABELS: Record<SituationId, string> = {
	"head-on": "Pramac u pramac",
	crossing: "Križanje",
	overtaking: "Pretjecanje",
	"sail-opposite-tacks": "Jedra, različiti bokovi",
	"sail-same-tack": "Jedra, isti bok",
	"power-vs-sail": "Motor i jedra",
	"narrow-channel": "Uski kanal",
};

export default function CollisionSituations({
	situation,
	focus,
	own,
	hideAnswer = false,
}: ICollisionSituationsProps) {
	const [selected, setSelected] = useState<SituationId>(situation ?? "head-on");

	if (focus === "constant-bearing") {
		return <ConstantBearing hideAnswer={hideAnswer} />;
	}

	const scenario =
		selected === "crossing" && own === "stand-on"
			? crossingAsStandOn()
			: selected === "narrow-channel"
				? null
				: SCENARIOS[selected as ScenarioId];

	if (hideAnswer) {
		return scenario ? (
			<CollisionScene scenario={scenario} hideAnswer />
		) : (
			<NarrowChannel hideAnswer />
		);
	}

	return (
		<div className="space-y-4">
			<OptionButtons
				label="Situacija"
				options={SITUATIONS.map((id) => ({ value: id, label: LABELS[id] }))}
				value={selected}
				onChange={setSelected}
			/>

			{scenario ? (
				<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
					<CollisionScene key={`${selected}-${own}`} scenario={scenario} />
					<div className="rounded-2xl bg-[#eaf3ff] p-3 text-[0.92rem] leading-relaxed">
						<p className="font-serif text-lg">{scenario.title}</p>
						<p>{scenario.explanation}</p>
					</div>
				</div>
			) : (
				<NarrowChannel />
			)}
		</div>
	);
}
