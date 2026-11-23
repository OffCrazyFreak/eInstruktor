import { useId, useState } from "react";
import LightPlayer from "@/components/custom/visuals/light-characteristic-reader/light-player";
import SectorChart, {
	SECTORS,
} from "@/components/custom/visuals/light-characteristic-reader/sector-chart";
import {
	COLOR_CODES,
	type LightColor,
} from "@/components/custom/visuals/shared/light/light-code";
import { parseLightCode } from "@/components/custom/visuals/shared/light/parse-light-code";
import {
	readBoolean,
	readOption,
	readString,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";
import { cn } from "@/lib/utils";

const COLOR_KEYS = Object.keys(COLOR_CODES);

const PRESETS = [
	"B C Bl(4) 10s 21m 15-10M",
	"Fl(3) W 10s 21m 15M",
	"VQ(3) 5s",
	"Q(6)+LFl 15s",
	"Iso W 4s",
	"Oc R 5s",
	"Fl(2+1) R 10s",
	"Mo(A) 8s",
	"Al.Bu.Y",
];

export interface ILightCharacteristicReaderProps {
	code?: string;
	/** Overrides the colour, for codes written without one, e.g. "VQ(3) 5s" with color "W". */
	color?: string;
	showSectors?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): ILightCharacteristicReaderProps {
	return {
		code: readString(props, "code"),
		color: readOption(props, "color", COLOR_KEYS),
		showSectors: readBoolean(props, "showSectors"),
	};
}

export default function LightCharacteristicReader({
	code = PRESETS[0],
	color,
	showSectors = false,
}: ILightCharacteristicReaderProps) {
	const inputId = useId();
	const sliderId = useId();
	const [text, setText] = useState(color ? `${code} ${color}` : (code ?? ""));
	const [bearing, setBearing] = useState(170);
	const light = parseLightCode(text);
	const sector = SECTORS.find(
		(item) => bearing >= item.from && bearing < item.to,
	);
	const lampColor: LightColor = showSectors
		? (sector?.color ?? "white")
		: (light.colors[0] ?? "white");

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor={inputId} className="text-[0.85rem] font-semibold">
					Karakteristika svjetla
				</label>
				<input
					id={inputId}
					value={text}
					onChange={(event) => setText(event.target.value)}
					spellCheck={false}
					className="min-h-11 w-full rounded-xl border border-[#002c78]/20 bg-white px-3 font-mono text-[0.95rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
				/>
				<div className="flex flex-wrap gap-1.5">
					{PRESETS.map((preset) => (
						<button
							key={preset}
							type="button"
							onClick={() => setText(preset)}
							className={cn(
								"rounded-full border px-2.5 py-1 font-mono text-[0.75rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
								preset === text
									? "border-[#002c78] bg-[#002c78] text-white"
									: "border-[#002c78]/15 bg-white hover:border-[#00aef3]",
							)}
						>
							{preset}
						</button>
					))}
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-3 rounded-2xl bg-[#04142e] p-3 text-[#eaf3ff]">
					<LightPlayer
						key={`${text}-${lampColor}`}
						code={text}
						color={lampColor}
					/>

					{showSectors && (
						<div className="space-y-2">
							<SectorChart bearing={bearing} />
							<label
								htmlFor={sliderId}
								className="flex justify-between text-[0.82rem]"
							>
								<span>Položaj broda</span>
								<span>
									{sector
										? `${sector.color === "red" ? "crveni" : "bijeli"} sektor`
										: ""}
								</span>
							</label>
							<input
								id={sliderId}
								type="range"
								min={96}
								max={244}
								value={bearing}
								onChange={(event) => setBearing(Number(event.target.value))}
								className="w-full accent-[#ffb43c]"
							/>
							<p className="text-[0.85rem] leading-relaxed" aria-live="polite">
								{sector?.color === "red"
									? "Svjetlo je crveno: ušao si u sektor nad plićinom. Promijeni kurs dok opet ne vidiš bijelo."
									: "Svjetlo je bijelo: ploviš u sigurnom sektoru."}
							</p>
						</div>
					)}
				</div>

				<ol className="m-0 list-none space-y-2 p-0">
					{light.parts
						.map((part, position) => ({
							...part,
							id: `${position}:${part.text}`,
						}))
						.map((part) => (
							<li
								key={part.id}
								className={cn(
									"flex gap-3 rounded-xl p-2.5",
									part.known ? "bg-[#eaf3ff]" : "bg-[#e0322b]/10",
								)}
							>
								<code className="shrink-0 self-start border-0 bg-white px-2 py-0.5 font-mono text-[0.85rem] font-semibold">
									{part.text}
								</code>
								<span className="text-[0.88rem] leading-snug">
									{part.meaning}
								</span>
							</li>
						))}
					{light.colors.length > 1 && light.rhythm !== "alternating" && (
						<li className="rounded-xl bg-[#ffe89a]/50 p-2.5 text-[0.88rem] leading-snug">
							Više boja znači sektore: iz različitih smjerova vidiš drugu boju.
							Ritam je isti u svakom sektoru.
						</li>
					)}
				</ol>
			</div>
		</div>
	);
}
