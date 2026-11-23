import { useId, useState } from "react";
import AreasChart from "@/components/custom/visuals/navigation-areas-map/areas-chart";
import {
	AREA_IDS,
	AREAS,
	type AreaId,
	areaAt,
	CERTIFICATE_AREAS,
	certificateFor,
} from "@/components/custom/visuals/navigation-areas-map/navigation-areas";
import {
	readBoolean,
	readOption,
	readStringList,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const CERTIFICATES = ["A", "B"] as const;
const DEFAULT_RINGS = [1, 3, 6, 12, 20];

export interface INavigationAreasMapProps {
	highlight?: AreaId;
	/** Tints every area this certificate covers. */
	certificate?: (typeof CERTIFICATES)[number];
	/** Distance rings to draw, in NM. */
	rings?: number[];
	showCertificate?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): INavigationAreasMapProps {
	const rings = readStringList(props, "rings")
		.map(Number)
		.filter((nm) => Number.isFinite(nm) && nm > 0);

	return {
		highlight: readOption(props, "highlight", AREA_IDS),
		certificate: readOption(props, "certificate", CERTIFICATES),
		rings: rings.length > 0 ? rings : undefined,
		showCertificate: readBoolean(props, "showCertificate"),
	};
}

/** Middle of an area, where the boat starts when the content highlights it. */
function middleOf(area: AreaId): number {
	const index = AREA_IDS.indexOf(area);
	const inner = AREAS[AREA_IDS[index - 1] ?? "IV"].limit;
	const outer = Number.isFinite(AREAS[area].limit) ? AREAS[area].limit : 24;

	return area === "IV" ? 0 : (inner + outer) / 2;
}

export default function NavigationAreasMap({
	highlight,
	certificate,
	rings = DEFAULT_RINGS,
	showCertificate = false,
}: INavigationAreasMapProps) {
	const sliderId = useId();
	const [distance, setDistance] = useState(highlight ? middleOf(highlight) : 2);
	const area = areaAt(distance);
	const licence = certificateFor(area);
	const tinted = certificate ? CERTIFICATE_AREAS[certificate] : [area];

	return (
		<div className="space-y-3">
			<AreasChart
				distance={distance}
				onDistanceChange={setDistance}
				tinted={tinted}
				rings={rings}
			/>

			<label
				htmlFor={sliderId}
				className="flex justify-between text-[0.85rem] font-medium"
			>
				<span>Udaljenost od najbliže obale</span>
				<span className="font-mono">
					{distance <= 0
						? "u luci"
						: `${String(distance).replace(".", ",")} NM`}
				</span>
			</label>
			<input
				id={sliderId}
				type="range"
				min={0}
				max={25}
				step={0.1}
				value={distance}
				onChange={(event) => setDistance(Number(event.target.value))}
				className="w-full accent-[#002c78]"
			/>

			<div className="grid gap-2 sm:grid-cols-2">
				<div className="rounded-2xl bg-[#eaf3ff] p-3" aria-live="polite">
					<p className="font-mono text-[0.72rem] tracking-[0.14em] text-[#0a63b0] uppercase">
						Područje
					</p>
					<p className="font-serif text-2xl">{area}</p>
					<p className="text-[0.9rem]">{AREAS[area].text}</p>
				</div>

				{(showCertificate || certificate) && (
					<div className="rounded-2xl bg-[#ffe89a]/50 p-3 text-[0.9rem] leading-relaxed">
						{certificate ? (
							<p>
								Kategorija <strong>{certificate}</strong> smije u područja{" "}
								{CERTIFICATE_AREAS[certificate].join(", ")}.
							</p>
						) : (
							<p>
								{licence === "A" && "Tu smiješ s kategorijom A ili B."}
								{licence === "B" &&
									"Tu smiješ samo s kategorijom B: A ide najdalje 6 NM od obale."}
								{licence === null &&
									"Ovdje ne smiješ ni s A ni s B: B ide najdalje 12 NM od obale."}
							</p>
						)}
						<p className="mt-1 text-[0.8rem] text-[#002c78]/70">
							Ograničenja tvoje brodice piše i u upisnom listu.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
