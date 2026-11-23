interface IBeaufortLevel {
	/** DHMZ name of the force. */
	name: string;
	knots: string;
	sea: string;
}

/** Names as DHMZ uses them in Adriatic forecasts; knot ranges are the standard scale. */
export const BEAUFORT: IBeaufortLevel[] = [
	{ name: "tišina", knots: "manje od 1", sea: "More je glatko kao ogledalo." },
	{ name: "lahor", knots: "1 do 3", sea: "Sitni nabori bez pjene." },
	{
		name: "povjetarac",
		knots: "4 do 6",
		sea: "Mali valići, kreste se ne lome.",
	},
	{
		name: "slabi vjetar",
		knots: "7 do 10",
		sea: "Veći valići, kreste se počinju lomiti, ponegdje bijele kapice.",
	},
	{
		name: "umjereni vjetar",
		knots: "11 do 16",
		sea: "Mali valovi koji se produžuju, česte bijele kreste.",
	},
	{
		name: "umjereno jaki vjetar",
		knots: "17 do 21",
		sea: "Umjereni, duži valovi, mnogo bijelih kresta, ponegdje prska.",
	},
	{
		name: "jaki vjetar",
		knots: "22 do 27",
		sea: "Stvaraju se veliki valovi, bijele kreste su posvuda, sve više prskanja.",
	},
	{
		name: "žestoki vjetar",
		knots: "28 do 33",
		sea: "More se gomila, pjena s lomljenih valova pruža se u prugama niz vjetar.",
	},
	{
		name: "olujni vjetar",
		knots: "34 do 40",
		sea: "Duži i viši valovi, vrhovi se lome u prskanje, pjena u jasnim prugama.",
	},
	{
		name: "jaki olujni vjetar",
		knots: "41 do 47",
		sea: "Visoki valovi, guste pruge pjene, kreste se prevrću, prskanje smanjuje vidljivost.",
	},
	{
		name: "orkanski vjetar",
		knots: "48 do 55",
		sea: "Vrlo visoki valovi s dugim prevrnutim krestama, more je bijelo od pjene.",
	},
	{
		name: "jaki orkanski vjetar",
		knots: "56 do 63",
		sea: "Izuzetno visoki valovi, more je prekriveno pjenom, vidljivost je slaba.",
	},
	{
		name: "orkan",
		knots: "64 i više",
		sea: "Zrak je pun pjene i prskanja, more je potpuno bijelo, vidljivost vrlo slaba.",
	},
];

/** General guidance for a small open boat, following the lesson: from about 4 Bf it gets wet and unstable. */
export function smallBoatAdvice(force: number): string {
	if (force <= 2) {
		return "Mirni uvjeti. I dalje prati prognozu prije i tijekom plovidbe.";
	}

	if (force === 3) {
		return "Mala brodica još plovi ugodno. Pazi hoće li vjetar jačati.";
	}

	if (force === 4) {
		return "Pojavljuju se bijele kreste: mala otvorena brodica postaje mokra i nestabilna. Ako nisi iskusan, ne isplovljavaj.";
	}

	if (force <= 6) {
		return "Opasno za malu brodicu. Ostani u luci ili se skloni u najbližu luku ili uvalu.";
	}

	return "Ne isplovljavaj. Ako si već vani, odmah traži zaklon i po potrebi zovi pomoć.";
}
