import { ChevronDown, ChevronUp, Mic, Sun } from "lucide-react";
import type { ControlId } from "@/components/custom/visuals/vhf-radio-call/radio-controls";
import RadioKey from "@/components/custom/visuals/vhf-radio-call/radio-key";
import { cn } from "@/lib/utils";

export interface IRadioState {
	on: boolean;
	channel: number;
	power: "1 W" | "25 W";
	squelch: number;
	dualWatch: boolean;
	dim: boolean;
	transmitting: boolean;
}

interface IRadioFaceProps {
	state: IRadioState;
	highlight?: ControlId | null;
	onControl: (control: ControlId) => void;
	onChange: (state: IRadioState) => void;
}

const VALID_CHANNELS = [
	...Array.from({ length: 28 }, (_, index) => index + 1),
	...Array.from({ length: 29 }, (_, index) => index + 60),
].filter((channel) => channel !== 70);

function stepChannel(channel: number, direction: 1 | -1): number {
	const index = VALID_CHANNELS.indexOf(channel);

	return (
		VALID_CHANNELS[
			(index + direction + VALID_CHANNELS.length) % VALID_CHANNELS.length
		] ?? 16
	);
}

/** A fixed marine VHF set: amber display, channel keys, the 16 key, power switch, squelch and the covered DISTRESS key. */
export default function RadioFace({
	state,
	highlight,
	onControl,
	onChange,
}: IRadioFaceProps) {
	const set = (patch: Partial<IRadioState>, control: ControlId) => {
		onChange({ ...state, ...patch });
		onControl(control);
	};

	return (
		<div className="rounded-[1.6rem] bg-[#1d2433] p-3 text-[#eaf3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
			<div
				className={cn(
					"flex items-end justify-between rounded-xl px-3 py-2 font-mono text-[#04142e]",
					state.on
						? state.dim
							? "bg-[#b9a25a]"
							: "bg-[#ffe89a]"
						: "bg-[#3a4253]",
				)}
			>
				{state.on ? (
					<>
						<div className="text-[0.7rem] leading-tight">
							<p>{state.power === "25 W" ? "HI 25W" : "LO 1W"}</p>
							<p>{state.dualWatch ? "DW 16" : " "}</p>
						</div>
						<p
							className="text-5xl leading-none font-bold tabular-nums"
							aria-live="polite"
						>
							<span className="sr-only">Kanal </span>
							{String(state.channel).padStart(2, "0")}
						</p>
						<p
							className={cn(
								"rounded px-1 text-[0.75rem] font-bold",
								state.transmitting ? "bg-[#e0322b] text-white" : "opacity-30",
							)}
						>
							TX
						</p>
					</>
				) : (
					<p className="w-full py-3 text-center text-[0.8rem] text-[#eaf3ff]/60">
						Uređaj je ugašen
					</p>
				)}
			</div>

			<div className="mt-3 grid grid-cols-4 gap-2">
				<RadioKey
					label="VOL"
					active={highlight === "volume"}
					pressed={state.on}
					onClick={() => set({ on: !state.on, channel: 16 }, "volume")}
				>
					{state.on ? "ON" : "OFF"}
				</RadioKey>
				<RadioKey
					label="Kanal gore"
					active={highlight === "channel"}
					onClick={() =>
						set({ channel: stepChannel(state.channel, 1) }, "channel")
					}
				>
					<ChevronUp className="size-5" aria-hidden />
				</RadioKey>
				<RadioKey
					label="Kanal dolje"
					active={highlight === "channel"}
					onClick={() =>
						set({ channel: stepChannel(state.channel, -1) }, "channel")
					}
				>
					<ChevronDown className="size-5" aria-hidden />
				</RadioKey>
				<RadioKey
					label="16"
					active={highlight === "sixteen"}
					onClick={() => set({ channel: 16 }, "sixteen")}
					className="bg-[#e0322b] text-white"
				>
					16
				</RadioKey>
				<RadioKey
					label="1/25 W"
					active={highlight === "power"}
					onClick={() =>
						set({ power: state.power === "25 W" ? "1 W" : "25 W" }, "power")
					}
				>
					1/25
				</RadioKey>
				<RadioKey
					label="Dual watch"
					active={highlight === "dual-watch"}
					pressed={state.dualWatch}
					onClick={() => set({ dualWatch: !state.dualWatch }, "dual-watch")}
				>
					DW
				</RadioKey>
				<RadioKey
					label="Dimmer"
					active={highlight === "dimmer"}
					pressed={state.dim}
					onClick={() => set({ dim: !state.dim }, "dimmer")}
				>
					<Sun className="size-4" aria-hidden />
				</RadioKey>
				<RadioKey
					label="DISTRESS, digitalni poziv u pogibelji"
					active={highlight === "distress"}
					onClick={() => onControl("distress")}
					className="border-2 border-dashed border-[#ff5a4a] bg-[#7a1d18] text-[0.62rem] text-white"
				>
					DISTRESS
				</RadioKey>
			</div>

			<div
				className={cn(
					"mt-3 flex items-center gap-3 rounded-xl p-2",
					highlight === "squelch" && "ring-2 ring-[#ffb43c]",
				)}
			>
				<label className="flex flex-1 items-center gap-2 text-[0.75rem]">
					<span>SQL</span>
					<input
						type="range"
						min={0}
						max={10}
						value={state.squelch}
						onChange={(event) =>
							set({ squelch: Number(event.target.value) }, "squelch")
						}
						className="flex-1 accent-[#ffb43c]"
						aria-label="Squelch"
					/>
				</label>
				<button
					type="button"
					onPointerDown={() => set({ transmitting: true }, "ptt")}
					onPointerUp={() => onChange({ ...state, transmitting: false })}
					onPointerLeave={() =>
						state.transmitting && onChange({ ...state, transmitting: false })
					}
					onKeyDown={(event) =>
						event.key === " " && set({ transmitting: true }, "ptt")
					}
					onKeyUp={() => onChange({ ...state, transmitting: false })}
					aria-label="Tipka za govor, drži dok govoriš"
					className={cn(
						"inline-flex size-12 items-center justify-center rounded-full bg-[#3a4253] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
						highlight === "ptt" && "ring-2 ring-[#ffb43c]",
						state.transmitting && "bg-[#e0322b]",
					)}
				>
					<Mic className="size-5" aria-hidden />
				</button>
			</div>
		</div>
	);
}
