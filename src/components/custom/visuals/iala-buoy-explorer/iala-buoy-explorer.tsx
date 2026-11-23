import { useState } from "react";
import { describePass } from "@/components/custom/visuals/iala-buoy-explorer/describe-pass";
import PassDiagram, {
	type Direction,
} from "@/components/custom/visuals/iala-buoy-explorer/pass-diagram";
import {
	MARK_IDS,
	MARKS,
	type MarkGroup,
	type MarkId,
} from "@/components/custom/visuals/shared/buoy/buoy-marks";
import MarkScene from "@/components/custom/visuals/shared/buoy/mark-scene";
import OptionButtons from "@/components/custom/visuals/shared/option-buttons";
import {
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const FOCUSES = ["all", "lateral", "other"] as const;
const DIRECTIONS = ["inbound", "outbound"] as const;

type Focus = (typeof FOCUSES)[number];

export interface IIalaBuoyExplorerProps {
	/** "lateral" shows only lateral marks, "other" the marks besides lateral and cardinal. */
	focus?: Focus;
	mark?: MarkId;
	direction?: Direction;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IIalaBuoyExplorerProps {
	return {
		focus: readOption(props, "focus", FOCUSES),
		mark: readOption(props, "mark", MARK_IDS),
		direction: readOption(props, "direction", DIRECTIONS),
	};
}

const GROUP_LABELS: Record<MarkGroup, string> = {
	lateral: "Lateralne",
	cardinal: "Kardinalne",
	"isolated-danger": "Usamljena opasnost",
	"safe-water": "Sigurne vode",
	special: "Posebna",
	"new-danger": "Nova opasnost",
};

const FOCUS_GROUPS: Record<Focus, MarkGroup[]> = {
	all: [
		"lateral",
		"cardinal",
		"isolated-danger",
		"safe-water",
		"special",
		"new-danger",
	],
	lateral: ["lateral"],
	other: ["isolated-danger", "safe-water", "special", "new-danger"],
};

const SHORT_NAMES: Partial<Record<MarkId, string>> = {
	port: "Lijeva",
	starboard: "Desna",
	"preferred-channel-starboard": "Račvanje, kanal desno",
	"preferred-channel-port": "Račvanje, kanal lijevo",
	north: "N",
	east: "E",
	south: "S",
	west: "W",
};

export default function IalaBuoyExplorer({
	focus = "all",
	mark: initialMark,
	direction: initialDirection = "inbound",
}: IIalaBuoyExplorerProps) {
	const groups =
		initialMark && focus === "all" ? FOCUS_GROUPS.all : FOCUS_GROUPS[focus];
	const [markId, setMarkId] = useState<MarkId>(
		initialMark ??
			MARK_IDS.find((id) => MARKS[id].group === groups[0]) ??
			"port",
	);
	const [direction, setDirection] = useState<Direction>(initialDirection);
	const mark = MARKS[markId];
	const siblings = MARK_IDS.filter((id) => MARKS[id].group === mark.group);
	const pass = describePass(mark, direction);

	function selectGroup(group: MarkGroup) {
		setMarkId(MARK_IDS.find((id) => MARKS[id].group === group) ?? markId);
	}

	return (
		<div className="space-y-4">
			{groups.length > 1 && (
				<OptionButtons
					label="Vrsta oznake"
					options={groups.map((group) => ({
						value: group,
						label: GROUP_LABELS[group],
					}))}
					value={mark.group}
					onChange={selectGroup}
				/>
			)}

			{siblings.length > 1 && (
				<OptionButtons
					label="Oznaka"
					options={siblings.map((id) => ({
						value: id,
						label: SHORT_NAMES[id] ?? MARKS[id].name,
					}))}
					value={markId}
					onChange={setMarkId}
				/>
			)}

			<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				<MarkScene key={mark.id} mark={mark} />

				<div className="flex flex-col gap-3">
					<div>
						<p className="font-mono text-[0.7rem] tracking-[0.14em] text-[#0a63b0] uppercase">
							IALA regija A
						</p>
						<h3 className="mt-1 font-serif text-xl leading-tight">
							{mark.name}
						</h3>
						<p className="mt-1 text-[0.92rem] leading-relaxed text-[#002c78]/80">
							{mark.meaning}
						</p>
					</div>

					<dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[0.88rem]">
						<dt className="text-[#002c78]/60">Boja</dt>
						<dd className="m-0">{mark.colorText}</dd>
						<dt className="text-[#002c78]/60">Vršni znak</dt>
						<dd className="m-0">{mark.topmarkText}</dd>
						<dt className="text-[#002c78]/60">Svjetlo</dt>
						<dd className="m-0 font-mono">
							{mark.light}
							{mark.lightAlt && (
								<span className="text-[#002c78]/60"> ili {mark.lightAlt}</span>
							)}
						</dd>
					</dl>

					<div className="rounded-2xl bg-[#eaf3ff] p-3">
						{mark.group === "lateral" && (
							<OptionButtons
								label="Smjer plovidbe"
								options={[
									{ value: "inbound", label: "Uplovljavam" },
									{ value: "outbound", label: "Isplovljavam" },
								]}
								value={direction}
								onChange={setDirection}
								className="mb-2"
							/>
						)}
						<p className="text-[0.9rem] font-semibold">Kuda prolaziš</p>
						<p className="text-[0.9rem]">{pass}</p>
						<div className="mt-2 aspect-square max-h-64 w-full">
							<PassDiagram mark={mark} direction={direction} pass={pass} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
