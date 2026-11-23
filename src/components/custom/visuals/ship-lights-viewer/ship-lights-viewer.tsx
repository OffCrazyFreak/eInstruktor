import { useId, useState } from "react";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";
import LightsQuiz from "@/components/custom/visuals/ship-lights-viewer/lights-quiz";
import NightView from "@/components/custom/visuals/ship-lights-viewer/night-view";
import SectorDiagram from "@/components/custom/visuals/ship-lights-viewer/sector-diagram";
import {
	VESSEL_IDS,
	type VesselId,
} from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";
import {
	VESSELS,
	type VesselGroup,
} from "@/components/custom/visuals/ship-lights-viewer/vessels";

const FOCUSES = ["sectors", "power-driven", "sailing", "special"] as const;
const VIEWS = ["bow", "starboard", "port", "stern", "beam"] as const;
const MODES = ["explore", "quiz"] as const;

type View = (typeof VIEWS)[number];

export interface IShipLightsViewerProps {
	/** Limits the vessel list to one group; "sectors" keeps every vessel and opens on the arcs. */
	focus?: (typeof FOCUSES)[number];
	vessel?: VesselId;
	/** "beam" is the starboard side. */
	view?: View;
	mode?: (typeof MODES)[number];
	/** Question media: the lights from the given view only, with no vessel name or arcs. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IShipLightsViewerProps {
	return {
		focus: readOption(props, "focus", FOCUSES),
		vessel: readOption(props, "vessel", VESSEL_IDS),
		view: readOption(props, "view", VIEWS),
		mode: readOption(props, "mode", MODES),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

const VIEW_BEARINGS: Record<View, number> = {
	bow: 0,
	starboard: 90,
	beam: 90,
	stern: 180,
	port: 270,
};

const VIEW_OPTIONS = [
	{ value: "0", label: "Sprijeda" },
	{ value: "90", label: "S desnog boka" },
	{ value: "270", label: "S lijevog boka" },
	{ value: "180", label: "Straga" },
] as const;

const GROUP_LABELS: Record<VesselGroup, string> = {
	"power-driven": "Motorna plovila",
	sailing: "Jedrilice i vesla",
	special: "Ribari, tegljači i posebna stanja",
};

export default function ShipLightsViewer({
	focus,
	vessel,
	view,
	mode = "explore",
	hideAnswer = false,
}: IShipLightsViewerProps) {
	const selectId = useId();
	const sliderId = useId();
	const [vesselId, setVesselId] = useState<VesselId>(vessel ?? "power-12-50m");
	const [bearing, setBearing] = useState(view ? VIEW_BEARINGS[view] : 0);

	if (hideAnswer) {
		return (
			<div className="rounded-2xl bg-[#04142e] p-3">
				<NightView
					vessel={vesselId}
					bearing={bearing}
					lightsOnly
					label="Svjetla plovila noću"
				/>
			</div>
		);
	}

	if (mode === "quiz") {
		return <LightsQuiz />;
	}

	const groups: VesselGroup[] =
		focus && focus !== "sectors"
			? [focus]
			: ["power-driven", "sailing", "special"];
	const listed = VESSEL_IDS.filter(
		(id) => groups.includes(VESSELS[id].group) || id === vessel,
	);
	const info = VESSELS[vesselId];

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-1.5">
				<label htmlFor={selectId} className="text-[0.82rem] font-semibold">
					Plovilo
				</label>
				<select
					id={selectId}
					value={vesselId}
					onChange={(event) => setVesselId(event.target.value as VesselId)}
					className="min-h-11 w-full rounded-xl border border-[#002c78]/20 bg-white px-3 text-[0.92rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
				>
					{groups.map((group) => (
						<optgroup key={group} label={GROUP_LABELS[group]}>
							{listed
								.filter((id) => VESSELS[id].group === group)
								.map((id) => (
									<option key={id} value={id}>
										{VESSELS[id].name}
									</option>
								))}
						</optgroup>
					))}
				</select>
			</div>

			<OptionButtons
				label="Odakle gledaš"
				options={VIEW_OPTIONS}
				value={String(bearing)}
				onChange={(value) => setBearing(Number(value))}
			/>

			<div className="grid gap-4 rounded-2xl bg-[#04142e] p-3 text-[#eaf3ff] md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
				<NightView
					vessel={vesselId}
					bearing={bearing}
					label={`${info.name}, gledano s ${Math.round(bearing)}° od pramca`}
				/>
				<div className="mx-auto w-full max-w-64">
					<SectorDiagram bearing={bearing} />
				</div>

				<div className="md:col-span-2">
					<label
						htmlFor={sliderId}
						className="flex justify-between text-[0.82rem]"
					>
						<span>Obiđi plovilo u krug</span>
						<span className="font-mono">{Math.round(bearing)}°</span>
					</label>
					<input
						id={sliderId}
						type="range"
						min={0}
						max={359}
						value={bearing}
						onChange={(event) => setBearing(Number(event.target.value))}
						className="mt-1 w-full accent-[#ffb43c]"
					/>
				</div>
			</div>

			<div className="rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem] leading-relaxed">
				<p className="font-serif text-lg">{info.name}</p>
				<p>{info.note}</p>
				{focus === "sectors" && (
					<p className="mt-1 text-[#002c78]/75">
						Jarbolno svjetlo svijetli 225° prema naprijed, svako bočno 112,5°, a
						krmeno 135° prema natrag. Zajedno pokrivaju cijeli krug.
					</p>
				)}
			</div>
		</div>
	);
}
