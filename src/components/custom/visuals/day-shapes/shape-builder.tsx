import { Eraser, Undo2 } from "lucide-react";
import { useState } from "react";
import DayShapeIcon from "@/components/custom/visuals/day-shapes/day-shape-icon";
import {
	DAY_STATES,
	type DayState,
	matchesState,
	SHAPE_NAMES,
	SHAPES,
	type Shape,
	STATES,
} from "@/components/custom/visuals/day-shapes/day-shape-states";
import MastFigure from "@/components/custom/visuals/day-shapes/mast-figure";

const MAX_SHAPES = 3;

/** Hang shapes on the line one tap at a time until they match the asked state. */
export default function ShapeBuilder() {
	const [target, setTarget] = useState<DayState>("restricted-manoeuvrability");
	const [stack, setStack] = useState<Shape[]>([]);
	const [checked, setChecked] = useState(false);
	const correct = matchesState(stack, target);

	function add(shape: Shape) {
		if (stack.length < MAX_SHAPES) {
			setStack([...stack, shape]);
			setChecked(false);
		}
	}

	function nextTarget() {
		const others = STATES.filter((state) => state !== target);

		setTarget(others[Math.floor(Math.random() * others.length)] ?? "anchored");
		setStack([]);
		setChecked(false);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<MastFigure
				shapes={stack}
				label={`Na užetu: ${stack.map((shape) => SHAPE_NAMES[shape]).join(", ") || "ništa"}`}
			/>

			<div className="space-y-3">
				<p className="font-serif text-[1.02rem] leading-snug">
					Složi dnevni znak: <strong>{DAY_STATES[target].name}</strong>
				</p>

				<div className="grid grid-cols-3 gap-2">
					{SHAPES.map((shape) => (
						<button
							key={shape}
							type="button"
							onClick={() => add(shape)}
							disabled={stack.length >= MAX_SHAPES}
							aria-label={`Dodaj: ${SHAPE_NAMES[shape]}`}
							className="flex h-14 items-center justify-center rounded-2xl border border-ink/15 bg-paper outline-none hover:border-[#00aef3] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60 disabled:opacity-40"
						>
							<svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
								<DayShapeIcon shape={shape} x={20} y={20} />
							</svg>
						</button>
					))}
				</div>

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setStack(stack.slice(0, -1))}
						className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-ink/20 px-3 text-[0.85rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						<Undo2 className="size-4" aria-hidden /> Makni zadnji
					</button>
					<button
						type="button"
						onClick={() => setStack([])}
						className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-ink/20 px-3 text-[0.85rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						<Eraser className="size-4" aria-hidden /> Očisti
					</button>
					<button
						type="button"
						onClick={() => setChecked(true)}
						className="inline-flex min-h-10 items-center rounded-full bg-brand px-4 text-[0.85rem] font-semibold text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						Provjeri
					</button>
				</div>

				<div aria-live="polite" className="text-[0.9rem] leading-relaxed">
					{checked && (
						<>
							<p className="font-semibold">
								{correct ? "Točno." : "Nije još."}
							</p>
							<p>
								{correct
									? DAY_STATES[target].note
									: "Pogledaj redoslijed odozgo prema dolje i broj znakova."}
							</p>
							{correct && (
								<button
									type="button"
									onClick={nextTarget}
									className="mt-2 inline-flex min-h-10 items-center rounded-full bg-[#ffb43c] px-4 text-[0.85rem] font-semibold text-[#04142e] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
								>
									Sljedeći znak
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
