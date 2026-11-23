import { spellAloud } from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";

export const CALL_IDS = ["mayday", "pan-pan", "securite", "routine"] as const;

export type CallId = (typeof CALL_IDS)[number];

export interface ICallFields {
	vessel: string;
	callSign: string;
	position: string;
	problem: string;
	help: string;
	people: string;
}

export const DEFAULT_FIELDS: Record<CallId, ICallFields> = {
	mayday: {
		vessel: "Galeb",
		callSign: "9A2817",
		position:
			"43 stupnja 20 minuta sjever, 016 stupnjeva 18 minuta istok, južno od Šolte",
		problem: "Požar u prostoru motora, ne možemo ga ugasiti",
		help: "Trebamo hitnu pomoć, spremamo se napustiti brodicu",
		people: "četiri osobe, svi imaju prsluke",
	},
	"pan-pan": {
		vessel: "Galeb",
		callSign: "9A2817",
		position: "pola milje istočno od rta Ploča",
		problem: "Kvar motora, usidreni smo, nema neposredne opasnosti",
		help: "Trebamo tegljenje do Rogoznice",
		people: "tri osobe",
	},
	securite: {
		vessel: "Galeb",
		callSign: "9A2817",
		position:
			"43 stupnja 25 minuta sjever, 016 stupnjeva 20 minuta istok, sredina Splitskog kanala",
		problem: "U 10 sati i 15 minuta uočen plutajući balvan dug oko 5 metara",
		help: "",
		people: "",
	},
	routine: {
		vessel: "Galeb",
		callSign: "9A2817",
		position: "Marina Kaštela",
		problem: "Stižemo za oko 20 minuta, brodica je duga 8 metara",
		help: "trebamo vez za jednu noć",
		people: "",
	},
};

export interface ICallStep {
	title: string;
	line: string;
	channel: number;
	power: "1 W" | "25 W";
	/** Someone else speaking, e.g. the marina answering. */
	reply?: boolean;
}

interface ICallScript {
	name: string;
	when: string;
	/** Which fields the learner can edit for this call. */
	fields: (keyof ICallFields)[];
	labels?: Partial<Record<keyof ICallFields, string>>;
	steps: (fields: ICallFields) => ICallStep[];
}

function thrice(word: string): string {
	return `${word}, ${word}, ${word}`;
}

export const FIELD_LABELS: Record<keyof ICallFields, string> = {
	vessel: "Ime brodice",
	callSign: "Pozivni znak",
	position: "Pozicija",
	problem: "Što se događa",
	help: "Pomoć koju trebaš",
	people: "Broj osoba",
};

export const CALL_SCRIPTS: Record<CallId, ICallScript> = {
	mayday: {
		name: "MAYDAY",
		when: "Pogibelj: ljudi i plovilo su u neposrednoj životnoj opasnosti. Kanal 16, puna snaga.",
		fields: ["vessel", "callSign", "position", "problem", "help", "people"],
		steps: (f) => [
			{
				title: "Signal pogibelji tri puta",
				line: "MAYDAY, MAYDAY, MAYDAY.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Tko zove",
				line: `Ovdje brodica ${thrice(f.vessel)}, pozivni znak ${spellAloud(f.callSign)}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "MAYDAY i ime još jednom",
				line: `MAYDAY, brodica ${f.vessel}, pozivni znak ${f.callSign}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Pozicija",
				line: `Pozicija: ${f.position}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Vrsta opasnosti",
				line: `${f.problem}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Pomoć koju trebaš",
				line: `${f.help}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Broj osoba i ostalo",
				line: `Na brodici su ${f.people}.`,
				channel: 16,
				power: "25 W",
			},
			{ title: "Kraj", line: "Prijem.", channel: 16, power: "25 W" },
		],
	},
	"pan-pan": {
		name: "PAN PAN",
		when: "Žurnost: ozbiljan problem, ali bez neposredne opasnosti za život. Kanal 16, pa radni kanal.",
		fields: ["vessel", "callSign", "position", "problem", "help", "people"],
		steps: (f) => [
			{
				title: "Signal žurnosti tri puta",
				line: "PAN PAN, PAN PAN, PAN PAN.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Kome",
				line: "Svim postajama, svim postajama, svim postajama.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Tko zove",
				line: `Ovdje brodica ${thrice(f.vessel)}, pozivni znak ${f.callSign}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Pozicija",
				line: `Pozicija: ${f.position}.`,
				channel: 16,
				power: "25 W",
			},
			{ title: "Problem", line: `${f.problem}.`, channel: 16, power: "25 W" },
			{
				title: "Pomoć koju trebaš",
				line: `${f.help}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Broj osoba",
				line: `Na brodici su ${f.people}.`,
				channel: 16,
				power: "25 W",
			},
			{ title: "Kraj", line: "Prijem.", channel: 16, power: "25 W" },
		],
	},
	securite: {
		name: "SECURITE",
		when: "Sigurnost: upozorenje drugima. Najava na kanalu 16, obavijest na radnom kanalu.",
		fields: ["vessel", "position", "problem"],
		steps: (f) => [
			{
				title: "Signal sigurnosti tri puta",
				line: "SECURITE, SECURITE, SECURITE.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Kome",
				line: "Svim postajama, svim postajama, svim postajama.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Tko zove",
				line: `Ovdje brodica ${thrice(f.vessel)}.`,
				channel: 16,
				power: "25 W",
			},
			{
				title: "Gdje slušati",
				line: "Slušajte navigacijsko upozorenje na kanalu 72. Gotovo.",
				channel: 16,
				power: "25 W",
			},
			{
				title: "Na radnom kanalu",
				line: `SECURITE, SECURITE, SECURITE. Svim postajama, ovdje brodica ${f.vessel}.`,
				channel: 72,
				power: "25 W",
			},
			{
				title: "Upozorenje",
				line: `${f.problem}, na poziciji ${f.position}. Opasnost za plovidbu.`,
				channel: 72,
				power: "25 W",
			},
			{ title: "Kraj", line: "Gotovo.", channel: 72, power: "25 W" },
		],
	},
	routine: {
		name: "Rutinski poziv",
		when: "Poziv marini na kanalu 17, malom snagom. Prijem predaje riječ, gotovo završava razgovor.",
		fields: ["vessel", "position", "problem", "help"],
		labels: {
			position: "Marina",
			problem: "Kad stižeš i kakva je brodica",
			help: "Što trebaš",
		},
		steps: (f) => [
			{
				title: "Pozovi marinu",
				line: `${f.position}, ${f.position}, ovdje brodica ${f.vessel}, ${f.vessel}. Prijem.`,
				channel: 17,
				power: "1 W",
			},
			{
				title: "Marina se javlja",
				line: `${f.vessel}, ovdje ${f.position}. Prijem.`,
				channel: 17,
				power: "1 W",
				reply: true,
			},
			{
				title: "Reci što trebaš",
				line: `${f.problem}, ${f.help}. Prijem.`,
				channel: 17,
				power: "1 W",
			},
			{
				title: "Marina odgovara",
				line: `${f.vessel}, primljeno. Vez na gatu B, mornar vas čeka na ulazu. Prijem.`,
				channel: 17,
				power: "1 W",
				reply: true,
			},
			{
				title: "Potvrdi i završi",
				line: "Primljeno, gat B. Hvala, gotovo.",
				channel: 17,
				power: "1 W",
			},
		],
	},
};
