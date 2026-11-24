import { useId, useState } from "react";
import {
	CALL_SCRIPTS,
	type CallId,
	DEFAULT_FIELDS,
	FIELD_LABELS,
	type ICallFields,
} from "@/components/custom/visuals/vhf-radio-call/call-scripts";
import RadioFace from "@/components/custom/visuals/vhf-radio-call/radio-face";
import { cn } from "@/lib/utils";

interface ICallScriptProps {
	call: CallId;
}

/** Fill in your own details, then say the call one line at a time with the radio set as it should be. */
export default function CallScript({ call }: ICallScriptProps) {
	const formId = useId();
	const script = CALL_SCRIPTS[call];
	const [fields, setFields] = useState<ICallFields>(DEFAULT_FIELDS[call]);
	const [shown, setShown] = useState(1);
	const steps = script.steps(fields);
	const current = steps[Math.min(shown, steps.length) - 1] ?? steps[0];

	return (
		<div className="space-y-4">
			<div>
				<p className="font-serif text-lg">{script.name}</p>
				<p className="text-[0.9rem] leading-relaxed text-ink/80">
					{script.when}
				</p>
			</div>

			<details className="rounded-2xl bg-tint p-3">
				<summary className="cursor-pointer text-[0.88rem] font-semibold">
					Tvoji podaci
				</summary>
				<div className="mt-2 grid gap-2 sm:grid-cols-2">
					{script.fields.map((field) => (
						<label
							key={field}
							htmlFor={`${formId}-${field}`}
							className="text-[0.8rem]"
						>
							{script.labels?.[field] ?? FIELD_LABELS[field]}
							<input
								id={`${formId}-${field}`}
								value={fields[field]}
								onChange={(event) =>
									setFields({ ...fields, [field]: event.target.value })
								}
								className="mt-0.5 min-h-10 w-full rounded-lg border border-ink/20 bg-paper px-2 text-[0.88rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
							/>
						</label>
					))}
				</div>
			</details>

			<div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
				{current && (
					<RadioFace
						state={{
							on: true,
							channel: current.channel,
							power: current.power,
							squelch: 3,
							dualWatch: false,
							dim: false,
							transmitting: !current.reply,
						}}
						onControl={() => undefined}
						onChange={() => undefined}
					/>
				)}

				<ol className="m-0 list-none space-y-2 p-0" aria-live="polite">
					{steps.slice(0, shown).map((step, position) => (
						<li
							key={step.title}
							className={cn(
								"rounded-2xl p-3",
								step.reply
									? "ml-6 bg-tint"
									: "mr-6 border border-ink/12 bg-paper",
								position === shown - 1 && "ring-2 ring-[#ffb43c]",
							)}
						>
							<p className="font-mono text-[0.7rem] tracking-[0.12em] text-ocean uppercase">
								{position + 1}. {step.title}
							</p>
							<p className="mt-0.5 text-[0.94rem] leading-snug">{step.line}</p>
						</li>
					))}
				</ol>
			</div>

			<div className="flex flex-wrap gap-2">
				{shown < steps.length ? (
					<button
						type="button"
						onClick={() => setShown(shown + 1)}
						className="min-h-10 rounded-full bg-brand px-4 text-[0.88rem] font-semibold text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						Sljedeći korak
					</button>
				) : (
					<p className="text-[0.9rem] font-semibold">Poziv je gotov.</p>
				)}
				<button
					type="button"
					onClick={() => setShown(1)}
					className="min-h-10 rounded-full border border-ink/20 px-4 text-[0.88rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
				>
					Ispočetka
				</button>
			</div>
		</div>
	);
}
