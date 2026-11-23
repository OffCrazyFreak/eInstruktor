import { SIGNAL } from "@/components/custom/visuals/shared/visual-palette";

export const MARK_IDS = [
	"port",
	"starboard",
	"preferred-channel-starboard",
	"preferred-channel-port",
	"north",
	"east",
	"south",
	"west",
	"isolated-danger",
	"safe-water",
	"special",
	"new-danger",
] as const;

export type MarkId = (typeof MARK_IDS)[number];

export type MarkGroup =
	| "lateral"
	| "cardinal"
	| "isolated-danger"
	| "safe-water"
	| "special"
	| "new-danger";

export type BuoyShape = "can" | "cone" | "pillar";

export type Topmark =
	| "can"
	| "cone-up"
	| "cones-up"
	| "cones-down"
	| "cones-base-to-base"
	| "cones-point-to-point"
	| "two-spheres"
	| "sphere"
	| "x"
	| "cross";

export interface IMark {
	id: MarkId;
	group: MarkGroup;
	name: string;
	shape: BuoyShape;
	/** Horizontal bands from top to bottom, or vertical stripes left to right. */
	paint: { kind: "bands" | "stripes"; colors: string[] };
	topmark: Topmark;
	topmarkColor: string;
	colorText: string;
	topmarkText: string;
	/** Light characteristic in international notation; `lightAlt` is the slower variant some marks use. */
	light: string;
	lightAlt?: string;
	meaning: string;
	pass: string;
}

const { red, green, yellow, black, white, blue } = SIGNAL;

export const MARKS: Record<MarkId, IMark> = {
	port: {
		id: "port",
		group: "lateral",
		name: "Lijeva lateralna oznaka",
		shape: "can",
		paint: { kind: "bands", colors: [red] },
		topmark: "can",
		topmarkColor: red,
		colorText: "crvena",
		topmarkText: "crveni valjak",
		light: "Fl R 4s",
		meaning: "Lijevi rub plovnog puta kad uplovljavaš u luku.",
		pass: "Uplovljavaš: ostavi je sebi s lijeve strane.",
	},
	starboard: {
		id: "starboard",
		group: "lateral",
		name: "Desna lateralna oznaka",
		shape: "cone",
		paint: { kind: "bands", colors: [green] },
		topmark: "cone-up",
		topmarkColor: green,
		colorText: "zelena",
		topmarkText: "zeleni stožac vrhom gore",
		light: "Fl G 4s",
		meaning: "Desni rub plovnog puta kad uplovljavaš u luku.",
		pass: "Uplovljavaš: ostavi je sebi s desne strane.",
	},
	"preferred-channel-starboard": {
		id: "preferred-channel-starboard",
		group: "lateral",
		name: "Račvanje: glavni kanal desno",
		shape: "can",
		paint: { kind: "bands", colors: [red, green, red] },
		topmark: "can",
		topmarkColor: red,
		colorText: "crvena sa širokim zelenim pojasom",
		topmarkText: "crveni valjak",
		light: "Fl(2+1) R 10s",
		meaning: "Mjesto gdje se kanal dijeli. Glavni plovni put nastavlja desno.",
		pass: "Za glavni kanal ostavi je lijevo, kao crvenu oznaku.",
	},
	"preferred-channel-port": {
		id: "preferred-channel-port",
		group: "lateral",
		name: "Račvanje: glavni kanal lijevo",
		shape: "cone",
		paint: { kind: "bands", colors: [green, red, green] },
		topmark: "cone-up",
		topmarkColor: green,
		colorText: "zelena sa širokim crvenim pojasom",
		topmarkText: "zeleni stožac vrhom gore",
		light: "Fl(2+1) G 10s",
		meaning: "Mjesto gdje se kanal dijeli. Glavni plovni put nastavlja lijevo.",
		pass: "Za glavni kanal ostavi je desno, kao zelenu oznaku.",
	},
	north: {
		id: "north",
		group: "cardinal",
		name: "Sjeverna kardinalna (N)",
		shape: "pillar",
		paint: { kind: "bands", colors: [black, yellow] },
		topmark: "cones-up",
		topmarkColor: black,
		colorText: "crna gore, žuta dolje",
		topmarkText: "dva crna stošca, oba vrhom gore",
		light: "VQ",
		lightAlt: "Q",
		meaning: "Sigurna voda je sjeverno od oznake.",
		pass: "Prođi sjeverno od nje.",
	},
	east: {
		id: "east",
		group: "cardinal",
		name: "Istočna kardinalna (E)",
		shape: "pillar",
		paint: { kind: "bands", colors: [black, yellow, black] },
		topmark: "cones-base-to-base",
		topmarkColor: black,
		colorText: "crna sa širokim žutim pojasom",
		topmarkText: "dva crna stošca spojena bazama",
		light: "VQ(3) 5s",
		lightAlt: "Q(3) 10s",
		meaning: "Sigurna voda je istočno od oznake.",
		pass: "Prođi istočno od nje.",
	},
	south: {
		id: "south",
		group: "cardinal",
		name: "Južna kardinalna (S)",
		shape: "pillar",
		paint: { kind: "bands", colors: [yellow, black] },
		topmark: "cones-down",
		topmarkColor: black,
		colorText: "žuta gore, crna dolje",
		topmarkText: "dva crna stošca, oba vrhom dolje",
		light: "VQ(6)+LFl 10s",
		lightAlt: "Q(6)+LFl 15s",
		meaning: "Sigurna voda je južno od oznake.",
		pass: "Prođi južno od nje.",
	},
	west: {
		id: "west",
		group: "cardinal",
		name: "Zapadna kardinalna (W)",
		shape: "pillar",
		paint: { kind: "bands", colors: [yellow, black, yellow] },
		topmark: "cones-point-to-point",
		topmarkColor: black,
		colorText: "žuta sa širokim crnim pojasom",
		topmarkText: "dva crna stošca spojena vrhovima",
		light: "VQ(9) 10s",
		lightAlt: "Q(9) 15s",
		meaning: "Sigurna voda je zapadno od oznake.",
		pass: "Prođi zapadno od nje.",
	},
	"isolated-danger": {
		id: "isolated-danger",
		group: "isolated-danger",
		name: "Usamljena opasnost",
		shape: "pillar",
		paint: { kind: "bands", colors: [black, red, black] },
		topmark: "two-spheres",
		topmarkColor: black,
		colorText: "crna s jednim ili više crvenih pojaseva",
		topmarkText: "dvije crne kugle jedna iznad druge",
		light: "Fl(2) W 5s",
		meaning: "Mala opasnost (npr. hrid) oko koje je plovna voda.",
		pass: "Možeš je proći sa svih strana, ali na sigurnoj udaljenosti.",
	},
	"safe-water": {
		id: "safe-water",
		group: "safe-water",
		name: "Sigurne vode",
		shape: "pillar",
		paint: { kind: "stripes", colors: [red, white, red, white] },
		topmark: "sphere",
		topmarkColor: red,
		colorText: "okomite crvene i bijele pruge",
		topmarkText: "jedna crvena kugla",
		light: "Iso W 4s",
		lightAlt: "LFl W 10s",
		meaning: "Oko oznake je plovna voda, često sredina kanala ili prilaz luci.",
		pass: "Voda je sigurna sa svih strana.",
	},
	special: {
		id: "special",
		group: "special",
		name: "Posebna oznaka",
		shape: "pillar",
		paint: { kind: "bands", colors: [yellow] },
		topmark: "x",
		topmarkColor: yellow,
		colorText: "žuta",
		topmarkText: "žuti križ u obliku slova X",
		light: "Fl Y 5s",
		meaning:
			"Područje posebne namjene: kabel, uzgajalište, vojna zona, granica kupališta.",
		pass: "Nije za vođenje plovidbe. Na karti provjeri što označava.",
	},
	"new-danger": {
		id: "new-danger",
		group: "new-danger",
		name: "Nova opasnost",
		shape: "pillar",
		paint: {
			kind: "stripes",
			colors: [blue, yellow, blue, yellow, blue, yellow],
		},
		topmark: "cross",
		topmarkColor: yellow,
		colorText: "okomite plave i žute pruge",
		topmarkText: "žuti uspravni križ",
		light: "Al.Bu.Y",
		meaning: "Opasnost koja još nije na kartama, npr. olupina.",
		pass: "Zaobiđi je široko, dok je ne zamijene stalne oznake.",
	},
};
