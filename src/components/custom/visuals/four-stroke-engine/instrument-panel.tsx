import { useState } from "react";
import Gauge from "@/components/custom/visuals/four-stroke-engine/gauge";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";

const GAUGES = [
	{
		id: "oil",
		name: "Tlak ulja (manometar)",
		unit: "bar",
		normal: [0.4, 0.75] as [number, number],
	},
	{
		id: "temperature",
		name: "Temperatura (termometar)",
		unit: "°C",
		normal: [0.35, 0.65] as [number, number],
	},
	{
		id: "rpm",
		name: "Okretaji (brojač)",
		unit: "o/min",
		normal: [0.15, 0.8] as [number, number],
	},
	{
		id: "voltage",
		name: "Napon (voltmetar)",
		unit: "V",
		normal: [0.45, 0.7] as [number, number],
	},
	{
		id: "fuel",
		name: "Gorivo (nivokaz)",
		unit: "",
		normal: [0.25, 1] as [number, number],
	},
] as const;

type GaugeId = (typeof GAUGES)[number]["id"];

const SITUATIONS = {
	normal: {
		label: "Sve normalno",
		values: {
			oil: 0.58,
			temperature: 0.5,
			rpm: 0.45,
			voltage: 0.58,
			fuel: 0.7,
		},
		text: "Sve kazaljke su u zelenom. Motor pratiš i sluhom, vidom (dim, kontrolni mlaz vode) i opipom izlazne vode.",
	},
	overheating: {
		label: "Pregrijavanje",
		values: {
			oil: 0.55,
			temperature: 0.92,
			rpm: 0.5,
			voltage: 0.58,
			fuel: 0.7,
		},
		text: "Temperatura raste. Smanji gas na prazni hod i pogledaj kontrolni mlaz. Ako vode nema, ugasi motor i provjeri usis morske vode i impeler.",
	},
	"oil-pressure": {
		label: "Pad tlaka ulja",
		values: {
			oil: 0.12,
			temperature: 0.55,
			rpm: 0.45,
			voltage: 0.58,
			fuel: 0.7,
		},
		text: "Nagli pad tlaka ulja: motor odmah ugasi, inače se može oštetiti. Provjeri razinu ulja šipkom.",
	},
	charging: {
		label: "Napon pada",
		values: {
			oil: 0.58,
			temperature: 0.5,
			rpm: 0.45,
			voltage: 0.25,
			fuel: 0.7,
		},
		text: "Akumulator se ne puni. Štedi struju (VHF ti treba za pomoć) i kad je sigurno provjeri spojeve i remen.",
	},
} satisfies Record<
	string,
	{ label: string; values: Record<GaugeId, number>; text: string }
>;

type SituationId = keyof typeof SITUATIONS;

/** Engine instrument panel with unnumbered green bands, and what each typical fault looks like. */
export default function InstrumentPanel() {
	const [situation, setSituation] = useState<SituationId>("normal");
	const current = SITUATIONS[situation];

	return (
		<div className="space-y-4">
			<OptionButtons
				label="Situacija"
				options={(Object.keys(SITUATIONS) as SituationId[]).map((id) => ({
					value: id,
					label: SITUATIONS[id].label,
				}))}
				value={situation}
				onChange={setSituation}
			/>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
				{GAUGES.map((gauge) => (
					<Gauge
						key={gauge.id}
						name={gauge.name}
						unit={gauge.unit}
						value={current.values[gauge.id]}
						normal={gauge.normal}
					/>
				))}
			</div>

			<p
				className="rounded-2xl bg-tint p-3 text-[0.92rem] leading-relaxed"
				aria-live="polite"
			>
				{current.text}
			</p>
			<p className="text-[0.8rem] leading-relaxed text-ink/70">
				Zeleno područje je normalno prema uputama proizvođača. Točne vrijednosti
				ovise o motoru, a na ispitu je dovoljno znati što koji instrument
				pokazuje i što znači nagla promjena.
			</p>
		</div>
	);
}
