export const CONTROL_IDS = [
	"volume",
	"squelch",
	"channel",
	"sixteen",
	"power",
	"dual-watch",
	"dimmer",
	"ptt",
	"distress",
] as const;

export type ControlId = (typeof CONTROL_IDS)[number];

export const CONTROLS: Record<ControlId, { name: string; what: string }> = {
	volume: {
		name: "Volume",
		what: "Pali i gasi uređaj i mijenja glasnoću. Nakon paljenja uređaj je na kanalu 16.",
	},
	squelch: {
		name: "Squelch",
		what: "Uklanja šum. Okreni ga samo toliko da šum nestane, nikad do kraja, jer tada ne čuješ slabe pozive u pogibelji.",
	},
	channel: {
		name: "Kanal",
		what: "Biraš kanal. Na 16 se samo pozoveš, razgovor ide na radnom kanalu.",
	},
	sixteen: {
		name: "Tipka 16",
		what: "Brzi prelazak na kanal 16, kanal pogibelji, poziva i sigurnosti.",
	},
	power: {
		name: "1/25 W",
		what: "Mala snaga za blizinu (marina, susjedni brod), velika za veće udaljenosti i za pogibelj, žurnost i sigurnost.",
	},
	"dual-watch": {
		name: "Dual watch",
		what: "Slušaš kanal 16 i još jedan kanal u isto vrijeme.",
	},
	dimmer: {
		name: "Dimmer",
		what: "Jačina osvjetljenja zaslona, da te noću ne zasljepljuje.",
	},
	ptt: {
		name: "Tipka na mikrofonu (PTT)",
		what: "Pritisnuta: govoriš i na zaslonu svijetli TX. Otpuštena: slušaš. Na jednom kanalu ne govore dvojica u isto vrijeme.",
	},
	distress: {
		name: "DISTRESS",
		what: "Crvena tipka pod poklopcem šalje digitalni (DSC) poziv u pogibelji na kanalu 70 s tvojim MMSI brojem. Drži je nekoliko sekundi, samo u stvarnoj pogibelji.",
	},
};
