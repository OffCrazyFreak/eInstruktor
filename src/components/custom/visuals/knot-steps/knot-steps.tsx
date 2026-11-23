import { useState } from "react";
import KnotDrawing from "@/components/custom/visuals/knot-steps/knot-drawing";
import KnotStepper from "@/components/custom/visuals/knot-steps/knot-stepper";
import {
	KNOT_IDS,
	KNOTS,
	type KnotId,
} from "@/components/custom/visuals/knot-steps/knots";
import {
	readBoolean,
	readOption,
	readOptionList,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";
import { cn } from "@/lib/utils";

export interface IKnotStepsProps {
	knot?: KnotId;
	/** Knots to show side by side as finished knots; picking one steps through it. */
	compare?: KnotId[];
	hideName?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IKnotStepsProps {
	return {
		knot: readOption(props, "knot", KNOT_IDS),
		compare: readOptionList(props, "compare", KNOT_IDS),
		hideName:
			readBoolean(props, "hideName") || readBoolean(props, "hideAnswer"),
	};
}

export default function KnotSteps({
	knot = "pasnjak",
	compare = [],
	hideName = false,
}: IKnotStepsProps) {
	const [selected, setSelected] = useState<KnotId>(knot);

	if (compare.length < 2) {
		return <KnotStepper knot={knot} hideName={hideName} />;
	}

	return (
		<div className="space-y-4">
			<div className="grid gap-2 sm:grid-cols-3">
				{compare.map((id) => (
					<button
						key={id}
						type="button"
						aria-pressed={id === selected}
						onClick={() => setSelected(id)}
						className={cn(
							"rounded-2xl border p-2 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
							id === selected
								? "border-[#002c78] ring-2 ring-[#002c78]/20"
								: "border-[#002c78]/12 hover:border-[#00aef3]",
						)}
					>
						<KnotDrawing
							knot={id}
							step={KNOTS[id].steps.length - 1}
							label={KNOTS[id].name}
						/>
						<span className="mt-1 block font-serif text-[1rem]">
							{KNOTS[id].name}
						</span>
						<span className="block text-[0.8rem] leading-snug text-[#002c78]/70">
							{KNOTS[id].use}
						</span>
					</button>
				))}
			</div>
			<KnotStepper key={selected} knot={selected} hideName={false} />
		</div>
	);
}
