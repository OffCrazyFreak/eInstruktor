/**
 * Single source of truth for the FACTS shown on the landing page.
 * Prices, procedure and rules change, so copy stays deliberately soft ("okvirno")
 * and points people to official sources.
 */

export type Category = {
	code: "A" | "B";
	minAge: number;
	title: string;
	summary: string;
	detail: string;
	recommended: boolean;
};

export const categories: Category[] = [
	{
		code: "A",
		minAge: 15,
		title: "Kategorija A",
		summary: "Osnovna, mala brodica uz obalu",
		detail:
			"Od 15 godina. Brodica za osobne potrebe do 7 m i do 15 kW, do 6 NM od obale. Dovoljno za mirno ljeto blizu luke.",
		recommended: false,
	},
	{
		code: "B",
		minAge: 16,
		title: "Kategorija B",
		summary: "Uobičajen izbor, pokriva A i daje puno više slobode",
		detail:
			"Od 16 godina. Brodice do 15 m i jahte do 18 m za osobne potrebe, do 12 NM od obale. Motor jači od 15 kW tek s 18 godina. Pokriva sve iz kategorije A i za većinu ljudi je pravi izbor.",
		recommended: true,
	},
];

export type ProcedureStep = {
	n: number;
	title: string;
	detail: string;
	/** The step where eInstruktor helps. Studying can start right away. */
	app?: boolean;
};

/**
 * Ordered steps to the licence. Studying is placed early on purpose: with
 * eInstruktor you can start the moment you pick a category, while the paperwork
 * and the exam date are still ahead of you.
 */
export const procedure: ProcedureStep[] = [
	{
		n: 1,
		title: "Odaberi kategoriju",
		detail: "A ili B, ovisno o dobi i planovima.",
	},
	{
		n: 2,
		title: "Uči",
		detail: "Ovdje ulazi eInstruktor. Kreni odmah, dok ostalo još čeka.",
		app: true,
	},
	{
		n: 3,
		title: "Odaberi gdje polažeš",
		detail: "Ministarstvo u Zagrebu ili lučka kapetanija na obali.",
	},
	{
		n: 4,
		title: "Javi se za termin",
		detail:
			"E-poštom zatraži datum ispita. Termini nisu isti u svim gradovima.",
	},
	{
		n: 5,
		title: "Pripremi dokumente",
		detail: "Molba, preslika osobne i vozačke, dvije fotografije 3 x 3,5 cm.",
	},
	{
		n: 6,
		title: "Uplati pristojbu",
		detail: "Podatke za uplatu prepiši s obrasca ureda u kojem polažeš.",
	},
	{
		n: 7,
		title: "Izađi na ispit",
		detail: "Usmeno, pred tročlanim povjerenstvom. Vožnje brodicom nema.",
	},
	{
		n: 8,
		title: "Rezultat i pregled",
		detail: "Rezultat znaš odmah. Ako ne prođeš, prijaviš novi termin.",
	},
];

export type Harbour = {
	name: string;
	kind: "ministarstvo" | "kapetanija";
};

/** Where you can sit the exam. */
export const harbours: Harbour[] = [
	{ name: "Zagreb / Ministarstvo", kind: "ministarstvo" },
	{ name: "Pula", kind: "kapetanija" },
	{ name: "Rijeka", kind: "kapetanija" },
	{ name: "Senj", kind: "kapetanija" },
	{ name: "Zadar", kind: "kapetanija" },
	{ name: "Šibenik", kind: "kapetanija" },
	{ name: "Split", kind: "kapetanija" },
	{ name: "Ploče", kind: "kapetanija" },
	{ name: "Dubrovnik", kind: "kapetanija" },
];

export type CostItem = {
	label: string;
	range: string;
	note: string;
};

/** Approximate, changeable costs in EUR, matching Lekcija 0. */
export const costs: CostItem[] = [
	{ label: "Ispit A", range: "cca 23 EUR", note: "okvirno" },
	{ label: "Ispit B", range: "cca 58 EUR", note: "okvirno" },
	{
		label: "Tečaj (nije obavezan)",
		range: "cca 150 do 350 EUR",
		note: "ako nemaš iskustva",
	},
];

/** The day the facts on this page were last compared with official sources. */
export const factsCheckedOn = "23.11.2026.";

export type Pillar = {
	id: "ucenje" | "vjezbanje" | "ispit";
	step: string;
	name: string;
	tagline: string;
	detail: string;
};

/** The 3 app pillars. */
export const pillars: Pillar[] = [
	{
		id: "ucenje",
		step: "01",
		name: "Učenje",
		tagline: "Kratke vizualne lekcije",
		detail: "Gradivo razbijeno na male, jasne dijelove. Bez zida teksta.",
	},
	{
		id: "vjezbanje",
		step: "02",
		name: "Vježbanje",
		tagline: "Pitanja po područjima",
		detail: "Vježbaš po temama, a fokus ide na tvoje slabe točke.",
	},
	{
		id: "ispit",
		step: "03",
		name: "Ispit",
		tagline: "Simulacija pravog ispita",
		detail: "Bez odmah vidljivih odgovora, uz rezultat i pregled grešaka.",
	},
];

export type Badge = {
	name: string;
	detail: string;
};

/** Readiness and light gamification. */
export const readiness = {
	label: "Spremnost za ispit",
	sublabel: "Raste kako svladavaš područja",
	sampleValue: 78,
	badges: [
		{ name: "Lekcija 0", detail: "Prva svladana lekcija." },
		{ name: "Prvi probni ispit", detail: "Prošao si prvu simulaciju." },
		{ name: "Sva područja", detail: "Dotaknuo si sva područja gradiva." },
	] satisfies Badge[],
};

export type Faq = {
	q: string;
	a: string;
};

export const faqs: Faq[] = [
	{
		q: "Mogu li polagati na engleskom ili njemačkom?",
		a: "Ovisi o uredu i terminu, pa to dogovori unaprijed, kad se javljaš za termin.",
	},
	{
		q: "Kada su ispiti?",
		a: "Termine određuje ured u kojem polažeš i nisu isti u svim gradovima. Ured ti mjesto i vrijeme javlja unaprijed.",
	},
	{
		q: "Koliko traje priprema?",
		a: "Od nekoliko dana do dva tjedna, ovisno o tvom tempu.",
	},
	{
		q: "Je li stvarno besplatno?",
		a: "Da. Cijela aplikacija je 100% besplatna, bez skrivenih troškova.",
	},
];

export const quote = "Sigurna luka počinje dobrom pripremom.";

/** Shared CTA copy so every call to action says the same thing. */
export const cta = {
	primary: "Počni besplatno",
	startHref: "/ucenje/propisi/kako-do-dozvole",
	continue: "Nastavi",
	continueHref: "/pocetna",
	secondary: "Prijava Googleom",
	free: "100% besplatno",
	freeNote:
		"Bez registracije. Napredak ostaje u tvom pregledniku dok se ne prijaviš.",
} as const;
