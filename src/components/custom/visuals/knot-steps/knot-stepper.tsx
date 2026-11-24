import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import KnotDrawing from "@/components/custom/visuals/knot-steps/knot-drawing";
import {
	KNOTS,
	type KnotId,
} from "@/components/custom/visuals/knot-steps/knots";

interface IKnotStepperProps {
	knot: KnotId;
	/** For questions: hides the name, the use and the captions that would give the answer away. */
	hideName: boolean;
}

export default function KnotStepper({ knot, hideName }: IKnotStepperProps) {
	const [step, setStep] = useState(hideName ? KNOTS[knot].steps.length - 1 : 0);
	const info = KNOTS[knot];
	const total = info.steps.length;
	const current = info.steps[step];

	return (
		<div className="grid gap-4 md:grid-cols-2 md:items-center">
			<KnotDrawing
				knot={knot}
				step={step}
				label={
					hideName
						? `Uzao, korak ${step + 1} od ${total}`
						: `${info.name}, korak ${step + 1} od ${total}: ${current?.caption ?? ""}`
				}
			/>

			<div className="space-y-3">
				{!hideName && (
					<div>
						<p className="font-serif text-xl">{info.name}</p>
						<p className="text-[0.9rem] text-ink/75">{info.use}</p>
					</div>
				)}

				<div className="min-h-20 rounded-2xl bg-tint p-3" aria-live="polite">
					<p className="font-mono text-[0.72rem] tracking-[0.14em] text-ocean uppercase">
						Korak {step + 1} od {total}
					</p>
					{!hideName && (
						<p className="mt-1 text-[0.92rem] leading-relaxed">
							{current?.caption}
						</p>
					)}
				</div>

				{!hideName && info.mnemonic && (
					<p className="text-[0.85rem] italic text-ink/75">{info.mnemonic}</p>
				)}

				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setStep(step - 1)}
						disabled={step === 0}
						className="inline-flex min-h-10 items-center gap-1 rounded-full border border-ink/20 px-3 text-[0.85rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60 disabled:opacity-40"
					>
						<ChevronLeft className="size-4" aria-hidden /> Natrag
					</button>
					<button
						type="button"
						onClick={() => setStep(step + 1)}
						disabled={step === total - 1}
						className="inline-flex min-h-10 items-center gap-1 rounded-full bg-brand px-4 text-[0.85rem] font-semibold text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60 disabled:opacity-40"
					>
						Sljedeći korak <ChevronRight className="size-4" aria-hidden />
					</button>
				</div>
			</div>
		</div>
	);
}
