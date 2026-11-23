import { useState } from "react";
import {
	CONTROL_IDS,
	CONTROLS,
	type ControlId,
} from "@/components/custom/visuals/vhf-radio-call/radio-controls";
import RadioFace, {
	type IRadioState,
} from "@/components/custom/visuals/vhf-radio-call/radio-face";

const INITIAL: IRadioState = {
	on: true,
	channel: 16,
	power: "25 W",
	squelch: 3,
	dualWatch: false,
	dim: false,
	transmitting: false,
};

/** Press any control, or step through them in order, and read what it does. */
export default function ControlsTour() {
	const [radio, setRadio] = useState(INITIAL);
	const [control, setControl] = useState<ControlId>("volume");
	const index = CONTROL_IDS.indexOf(control);
	const info = CONTROLS[control];
	const squelchTooHigh = control === "squelch" && radio.squelch >= 9;

	return (
		<div className="grid gap-4 md:grid-cols-2 md:items-start">
			<RadioFace
				state={radio}
				highlight={control}
				onControl={setControl}
				onChange={setRadio}
			/>

			<div
				className="space-y-3 rounded-2xl bg-[#eaf3ff] p-3"
				aria-live="polite"
			>
				<p className="font-mono text-[0.72rem] tracking-[0.14em] text-[#0a63b0] uppercase">
					Kontrola {index + 1} od {CONTROL_IDS.length}
				</p>
				<p className="font-serif text-lg">{info.name}</p>
				<p className="text-[0.92rem] leading-relaxed">{info.what}</p>
				{squelchTooHigh && (
					<p className="text-[0.9rem] font-semibold text-[#b02a22]">
						Squelch je skoro do kraja: slabi pozivi u pogibelji se više ne čuju.
					</p>
				)}
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() =>
							setControl(
								CONTROL_IDS[
									(index - 1 + CONTROL_IDS.length) % CONTROL_IDS.length
								] ?? "volume",
							)
						}
						className="min-h-10 rounded-full border border-[#002c78]/20 px-4 text-[0.85rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						Prethodna
					</button>
					<button
						type="button"
						onClick={() =>
							setControl(
								CONTROL_IDS[(index + 1) % CONTROL_IDS.length] ?? "volume",
							)
						}
						className="min-h-10 rounded-full bg-[#002c78] px-4 text-[0.85rem] font-semibold text-white outline-none hover:bg-[#0a63b0] focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
					>
						Sljedeća kontrola
					</button>
				</div>
			</div>
		</div>
	);
}
