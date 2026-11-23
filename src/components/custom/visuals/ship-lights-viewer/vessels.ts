import type { VesselId } from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";

export type VesselGroup = "power-driven" | "sailing" | "special";

interface IVessel {
	name: string;
	group: VesselGroup;
	hull: "power" | "sail" | "small";
	note: string;
}

export const VESSELS: Record<VesselId, IVessel> = {
	"power-under-7m": {
		name: "Motorna brodica do 7 m, sporija od 7 čv",
		group: "power-driven",
		hull: "small",
		note: "Dovoljno je jedno bijelo svjetlo vidljivo sa svih strana; bočna ako je moguće.",
	},
	"power-under-12m": {
		name: "Motorno plovilo do 12 m",
		group: "power-driven",
		hull: "small",
		note: "Bočna svjetla (često u jednom fenjeru na pramcu) i bijelo kružno svjetlo.",
	},
	"power-12-50m": {
		name: "Motorno plovilo 12 do 50 m",
		group: "power-driven",
		hull: "power",
		note: "Jarbolno svjetlo, bočna svjetla i krmeno svjetlo.",
	},
	"power-over-50m": {
		name: "Motorno plovilo dulje od 50 m",
		group: "power-driven",
		hull: "power",
		note: "Dva jarbolna svjetla: prednje niže, stražnje više. Uz to bočna i krmeno.",
	},
	"sailing-under-20m": {
		name: "Jedrilica pod jedrima",
		group: "sailing",
		hull: "sail",
		note: "Bočna i krmeno svjetlo. Do 20 m smiju biti u jednom trobojnom fenjeru na vrhu jarbola.",
	},
	"motor-sailing": {
		name: "Jedrilica na jedra i motor",
		group: "sailing",
		hull: "sail",
		note: "Čim radi motor, to je motorno plovilo: nosi i jarbolno svjetlo.",
	},
	rowing: {
		name: "Brodica na vesla",
		group: "sailing",
		hull: "small",
		note: "Ne mora imati stalna svjetla, ali mora imati pripremljenu svjetiljku s bijelim svjetlom.",
	},
	trawler: {
		name: "Ribarsko plovilo koje koćari",
		group: "special",
		hull: "power",
		note: "Zeleno iznad bijelog kružnog. Dok plovi kroz vodu, još bočna i krmeno.",
	},
	fishing: {
		name: "Ribarsko plovilo, ostali ribolov",
		group: "special",
		hull: "power",
		note: "Crveno iznad bijelog kružnog. Dok plovi kroz vodu, još bočna i krmeno.",
	},
	towing: {
		name: "Tegljač (tegalj kraći od 200 m)",
		group: "special",
		hull: "power",
		note: "Dva jarbolna svjetla u okomici, bočna, krmeno i žuto svjetlo za tegljenje iznad krmenog.",
	},
	pilot: {
		name: "Peljarski brod u službi",
		group: "special",
		hull: "power",
		note: "Bijelo iznad crvenog kružnog. U plovidbi još bočna i krmeno.",
	},
	"not-under-command": {
		name: "Plovilo nesposobno za manevar",
		group: "special",
		hull: "power",
		note: "Dva crvena kružna svjetla u okomici. Kad plovi kroz vodu, dodaje bočna i krmeno.",
	},
	restricted: {
		name: "Plovilo ograničeno u manevriranju",
		group: "special",
		hull: "power",
		note: "Crveno, bijelo, crveno kružno u okomici. U plovidbi još jarbolno, bočna i krmeno.",
	},
	anchored: {
		name: "Usidreno plovilo (do 50 m)",
		group: "special",
		hull: "power",
		note: "Jedno bijelo kružno svjetlo na pramcu. Dulje od 50 m ima još jedno niže na krmi.",
	},
	aground: {
		name: "Nasukano plovilo",
		group: "special",
		hull: "power",
		note: "Svjetla usidrenog plovila i dva crvena kružna svjetla u okomici.",
	},
};
