import { useId, useState } from "react";
import {
	BEAUFORT,
	smallBoatAdvice,
} from "@/components/custom/visuals/beaufort-scale/beaufort-data";
import SeaState from "@/components/custom/visuals/beaufort-scale/sea-state";
import {
	readBoolean,
	readNumber,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["explore"] as const;

export interface IBeaufortScaleProps {
	mode?: (typeof MODES)[number];
	/** Force to start on, 0 to 12. */
	value?: number;
	/** Question media: the sea and the force only, with no name, speed or scale. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IBeaufortScaleProps {
	return {
		mode: readOption(props, "mode", MODES),
		value: readNumber(props, "value", { min: 0, max: 12 }),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

export default function BeaufortScale({
	value = 3,
	hideAnswer = false,
}: IBeaufortScaleProps) {
	const sliderId = useId();
	const [force, setForce] = useState(Math.round(value));
	const level = BEAUFORT[force] ?? BEAUFORT[0];

	if (!level) {
		return null;
	}

	if (hideAnswer) {
		return (
			<div className="space-y-2">
				<SeaState force={force} label={`More pri ${force} Bofora`} />
				<p className="font-serif text-2xl">{force} Bofora</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 md:items-center">
			<SeaState force={force} label={`More pri ${force} Bf: ${level.sea}`} />

			<div className="space-y-3">
				<div className="flex items-end gap-3">
					<p className="font-serif text-6xl leading-none">{force}</p>
					<div className="pb-1">
						<p className="font-mono text-[0.72rem] tracking-[0.14em] text-ocean uppercase">
							Bofora
						</p>
						<p className="font-serif text-xl leading-tight">{level.name}</p>
					</div>
				</div>
				<p className="font-mono text-[0.95rem]">{level.knots} čvorova</p>

				<label htmlFor={sliderId} className="sr-only">
					Snaga vjetra u Boforima
				</label>
				<input
					id={sliderId}
					type="range"
					min={0}
					max={12}
					value={force}
					onChange={(event) => setForce(Number(event.target.value))}
					className="w-full accent-ink"
				/>
				<div className="flex justify-between font-mono text-[0.7rem] text-ink/60">
					<span>0</span>
					<span>6</span>
					<span>12</span>
				</div>

				<p className="text-[0.92rem] leading-relaxed">{level.sea}</p>
				<p
					className="rounded-xl bg-[#ffe89a]/60 p-2.5 text-[0.9rem] leading-relaxed"
					aria-live="polite"
				>
					<span className="font-semibold">Za malu brodicu: </span>
					{smallBoatAdvice(force)}
				</p>
			</div>
		</div>
	);
}
