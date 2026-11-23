import type { RopeTone } from "@/components/custom/visuals/knot-steps/rope-path";

export const KNOT_IDS = [
	"pasnjak",
	"muski",
	"zastavni",
	"vrzni",
	"sidreni",
	"osmica",
] as const;

export type KnotId = (typeof KNOT_IDS)[number];

interface IRope {
	d: string;
	tone: RopeTone;
}

interface IKnotStep {
	caption: string;
	/** Drawn in order: later stretches cross over earlier ones. */
	ropes: IRope[];
}

interface IKnot {
	name: string;
	use: string;
	/** Something the rope is tied to, drawn under the rope. */
	prop?: "post" | "ring";
	mnemonic?: string;
	steps: IKnotStep[];
}

const r = (d: string, tone: RopeTone = "rope"): IRope => ({ d, tone });

export const KNOTS: Record<KnotId, IKnot> = {
	pasnjak: {
		name: "Pašnjak",
		use: "Čvrsta omča na kraju konopa koja se ne steže; za vez na bitvu ili spašavanje osobe.",
		mnemonic: "Zec izađe iz rupe, obiđe drvo i vrati se u rupu.",
		steps: [
			{
				caption:
					"Na stojećem dijelu napravi malu petlju (rupu). Slobodni kraj ostavi dovoljno dug za omču.",
				ropes: [
					r("M120 8 V66"),
					r("M120 66 C152 66 152 104 120 104 C96 104 92 84 106 74"),
					r("M106 74 C82 92 66 150 96 176 C120 196 168 178 160 140", "active"),
				],
			},
			{
				caption:
					"Slobodni kraj provuci kroz petlju odozdo i obiđi njime stojeći dio sa stražnje strane.",
				ropes: [
					r("M120 66 C152 66 152 104 120 104 C96 104 92 84 106 74"),
					r(
						"M106 74 C82 92 66 150 96 176 C120 196 168 178 150 126 C144 110 134 98 130 84",
					),
					r("M130 84 C128 64 132 44 118 42 C104 40 102 54 108 60", "active"),
					r("M120 8 V66"),
				],
			},
			{
				caption: "Vrati kraj natrag kroz istu petlju i zategni.",
				ropes: [
					r("M108 60 C114 70 118 88 114 116", "active"),
					r("M120 66 C152 66 152 104 120 104 C96 104 92 84 106 74"),
					r(
						"M106 74 C82 92 66 150 96 176 C120 196 168 178 150 126 C144 110 134 98 130 84",
					),
					r("M130 84 C128 64 132 44 118 42 C104 40 102 54 108 60"),
					r("M120 8 V66"),
				],
			},
		],
	},
	muski: {
		name: "Muški uzao",
		use: "Spaja dva konopa iste debljine.",
		steps: [
			{
				caption: "Desni kraj stavi preko lijevog i provuci ga ispod.",
				ropes: [
					r("M10 120 C70 120 100 70 140 70 C170 70 170 100 150 104"),
					r("M230 120 C170 120 140 80 100 84 C76 86 76 110 98 112", "second"),
				],
			},
			{
				caption: "Sada lijevi kraj stavi preko desnog i provuci ga ispod.",
				ropes: [
					r("M120 72 C150 72 150 128 120 128", "second"),
					r("M120 72 C90 72 90 128 120 128"),
					r("M10 72 H120 M10 128 H120"),
					r("M230 72 H120 M230 128 H120", "second"),
				],
			},
			{
				caption:
					"Zategni. Oba kraja istog konopa izlaze na istu stranu; ako ne, dobio si ženski uzao koji popušta.",
				ropes: [
					r("M126 84 C146 84 146 116 126 116", "second"),
					r("M114 84 C94 84 94 116 114 116"),
					r("M10 84 H126 M10 116 H126"),
					r("M230 84 H114 M230 116 H114", "second"),
				],
			},
		],
	},
	zastavni: {
		name: "Zastavni uzao",
		use: "Spaja dva konopa različite debljine, ili konop s omčom zastave.",
		steps: [
			{
				caption: "Na debljem konopu napravi zavoj u obliku slova U.",
				ropes: [r("M230 70 H120 C88 70 88 130 120 130 H230", "second")],
			},
			{
				caption:
					"Tanji konop provuci kroz zavoj odozdo i obiđi njime oko oba kraja debljeg konopa.",
				ropes: [
					r(
						"M20 170 C70 170 104 150 108 110 C110 80 120 46 150 50 C176 54 176 140 150 148",
						"active",
					),
					r("M230 70 H120 C88 70 88 130 120 130 H230", "second"),
				],
			},
			{
				caption: "Provuci ga ispod samog sebe i zategni.",
				ropes: [
					r("M230 70 H120 C88 70 88 130 120 130 H230", "second"),
					r("M150 148 C126 152 118 104 100 104 C80 104 70 100 60 96", "active"),
					r(
						"M20 170 C70 170 104 150 108 110 C110 80 120 46 150 50 C176 54 176 140 150 148",
					),
				],
			},
		],
	},
	vrzni: {
		name: "Vrzni uzao",
		use: "Brzi vez za stup, ogradu ili bitvu; vješanje bokobrana.",
		prop: "post",
		steps: [
			{
				caption: "Obavij konop jednom oko stupa.",
				ropes: [
					r("M20 150 C60 150 90 130 135 100"),
					r("M135 100 C150 96 150 80 135 80", "active"),
				],
			},
			{
				caption:
					"Napravi drugi zavoj preko prvog, tako da se na prednjoj strani ukrste.",
				ropes: [
					r("M20 150 C60 150 90 130 135 100"),
					r("M135 70 C100 82 105 120 105 120", "active"),
					r("M105 120 C90 124 90 140 105 142", "active"),
				],
			},
			{
				caption:
					"Kraj provuci ispod drugog zavoja i zategni. Za duži vez osiguraj ga još jednim polu-uzlom.",
				ropes: [
					r("M220 110 C190 112 160 108 135 112", "active"),
					r("M20 150 C60 150 90 130 135 100"),
					r("M135 70 L105 120"),
				],
			},
		],
	},
	sidreni: {
		name: "Sidreni uzao",
		use: "Vezanje konopa za kolut (oko) sidra.",
		prop: "ring",
		steps: [
			{
				caption:
					"Provuci kraj kroz kolut sidra dvaput, da napraviš dva zavoja.",
				ropes: [
					r("M120 190 V90 C120 60 150 50 150 30 C150 14 124 14 120 30"),
					r("M128 190 V96 C128 66 160 52 158 30", "active"),
				],
			},
			{
				caption: "Kraj obiđi oko stojećeg dijela i provuci ga kroz oba zavoja.",
				ropes: [
					r("M120 190 V90 C120 60 150 50 150 30 C150 14 124 14 120 30"),
					r("M158 30 C160 70 90 80 100 110 C106 126 140 120 136 96", "active"),
				],
			},
			{
				caption: "Dodaj jedan polu-uzao oko stojećeg dijela i zategni.",
				ropes: [
					r("M120 190 V90 C120 60 150 50 150 30 C150 14 124 14 120 30"),
					r("M158 30 C160 70 90 80 100 110 C106 126 140 120 136 96"),
					r(
						"M136 96 C150 120 100 150 104 140 C108 130 140 140 150 160",
						"active",
					),
				],
			},
		],
	},
	osmica: {
		name: "Osmica",
		use: "Zadebljanje na kraju da konop ne isklizne kroz koloturnik ili rupu.",
		steps: [
			{
				caption: "Napravi petlju na kraju konopa.",
				ropes: [
					r(
						"M20 100 H90 C130 100 130 50 100 50 C80 50 80 90 110 100",
						"active",
					),
				],
			},
			{
				caption: "Kraj obiđi oko stojećeg dijela.",
				ropes: [
					r("M20 100 H90 C130 100 130 50 100 50 C80 50 80 90 110 100"),
					r(
						"M110 100 C140 110 140 150 110 150 C86 150 84 120 100 110",
						"active",
					),
				],
			},
			{
				caption:
					"Provuci kraj kroz petlju odozgo i zategni: uzao izgleda kao broj 8.",
				ropes: [
					r("M110 100 C140 110 140 150 110 150 C86 150 84 120 100 110"),
					r("M20 100 H90 C130 100 130 50 100 50 C80 50 80 90 110 100"),
					r("M100 110 C104 90 120 80 220 80", "active"),
				],
			},
		],
	},
};
