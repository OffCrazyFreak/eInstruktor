/**
 * Single source of truth for the FACTS shown across the landing concepts.
 * Prices, procedure and rules change, so copy stays deliberately soft ("okvirno")
 * and points people to official sources. Each concept imports these facts and
 * dresses them in its own voice and layout.
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
		summary: "Osnovna, manje brodice uz obalu",
		detail:
			"Od 15 godina. Za manje brodice u priobalju. Dovoljno za mirno ljeto blizu luke.",
		recommended: false,
	},
	{
		code: "B",
		minAge: 16,
		title: "Kategorija B",
		summary: "Uobičajen izbor, pokriva A i daje puno više slobode",
		detail:
			"Od 16 godina. Pokriva sve iz kategorije A i otvara znatno veći doseg. Za većinu ljudi pravi izbor.",
		recommended: true,
	},
];

export type ExamArea = {
	id: string;
	name: string;
	blurb: string;
};

/** The 8 exam areas ("ispitna područja"). */
export const examAreas: ExamArea[] = [
	{
		id: "navigacija",
		name: "Pomorske karte i navigacija",
		blurb: "Čitanje karte, kurs, pozicija.",
	},
	{
		id: "iala",
		name: "IALA plovne oznake",
		blurb: "Bove i oznake plovnog puta.",
	},
	{
		id: "svjetla",
		name: "Svjetla i dnevni znakovi",
		blurb: "Tko je tko na moru noću i danju.",
	},
	{
		id: "sudari",
		name: "Pravila izbjegavanja sudara",
		blurb: "Tko koga propušta i kako.",
	},
	{
		id: "meteorologija",
		name: "Meteorologija",
		blurb: "Jadranski vjetrovi: bura, jugo, maestral, nevera.",
	},
	{
		id: "motoristika",
		name: "Motoristika",
		blurb: "Motor, gorivo, osnovni kvarovi.",
	},
	{
		id: "sigurnost",
		name: "Sigurnost i prva pomoć",
		blurb: "Prsluci, oprema, postupci u nuždi.",
	},
	{
		id: "vhf",
		name: "VHF i radiotelefonija",
		blurb: "Kanal 16, poziv MAYDAY.",
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
		detail: "E-poštom zatraži datum ispita.",
	},
	{ n: 5, title: "Pripremi dokumente", detail: "Osobna, uplatnice i prijava." },
	{ n: 6, title: "Uplati pristojbu", detail: "Iznos ovisi o kategoriji." },
	{
		n: 7,
		title: "Izađi na ispit",
		detail: "Najčešće usmeno, pred ispitnim povjerenstvom.",
	},
	{
		n: 8,
		title: "Rezultat i pregled",
		detail: "Pregled grešaka, a po potrebi ponovni izlazak.",
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

/** Approximate, changeable costs in EUR. */
export const costs: CostItem[] = [
	{ label: "Ispit A", range: "20 - 40 EUR", note: "okvirno" },
	{ label: "Ispit B", range: "50 - 80 EUR", note: "okvirno" },
	{
		label: "Tečaj (nije obavezan)",
		range: "150 - 350 EUR",
		note: "ako nemaš iskustva",
	},
];

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

export type Wind = {
	name: string;
	deg: number;
	from: string;
	note: string;
};

/** Adriatic winds for the meteorology topic (also drives the wind rose). */
export const winds: Wind[] = [
	{
		name: "Bura",
		deg: 45,
		from: "sjeveroistok",
		note: "Hladna, na mahove, iznenada jaka.",
	},
	{
		name: "Jugo",
		deg: 135,
		from: "jugoistok",
		note: "Toplo, vlažno, diže valove.",
	},
	{
		name: "Maestral",
		deg: 315,
		from: "sjeverozapad",
		note: "Ljetni, ugodan, popodnevni.",
	},
	{
		name: "Nevera",
		deg: 250,
		from: "zapad",
		note: "Nagla ljetna oluja, kratka i žestoka.",
	},
];

export type Badge = {
	name: string;
	detail: string;
};

/** Readiness + light gamification (no streaks; the app is for one-time prep). */
export const readiness = {
	label: "Spremnost za ispit",
	sublabel: "Raste kako svladavaš područja",
	sampleValue: 78,
	badges: [
		{ name: "Lekcija 0", detail: "Prva svladana lekcija." },
		{ name: "Prvi probni ispit", detail: "Prošao si prvu simulaciju." },
		{ name: "Sva područja", detail: "Dotaknuo si svih 8 tema." },
	] satisfies Badge[],
};

export type Faq = {
	q: string;
	a: string;
};

export const faqs: Faq[] = [
	{
		q: "Mogu li polagati na engleskom ili njemačkom?",
		a: "Ovisi o kapetaniji, pa provjeri kod njih prije prijave.",
	},
	{
		q: "Kada su ispiti?",
		a: "Termini se razlikuju po gradovima. Prijavi se nekoliko dana ranije.",
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

/** One quote per concept, assigned uniquely. */
export const quotes = {
	karta: "Tko zna kamo plovi, svaki mu je vjetar povoljan.",
	most: "Dobar se pomorac ne poznaje po mirnom moru.",
	sat: "Sigurna luka počinje dobrom pripremom.",
} as const;

/** Shared, tokenized CTA copy so every concept says the same thing. */
export const cta = {
	primary: "Počni besplatno",
	secondary: "Prijava Googleom",
	free: "100% besplatno",
	freeNote: "Bez registracije. Napredak i slabe teme prati anonimno.",
} as const;
