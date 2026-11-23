import type { VisualProps } from "@/components/custom/visuals/shared/visual-props";
import type { VisualId } from "@/content/types";
import course from "@/content/voditelj-brodice";

interface IGalleryVisual {
	id: VisualId;
	title: string;
	/** Every prop combination the course content passes, plus the extra modes each visual offers; question media are added below. */
	variants: VisualProps[];
}

const BASE_GALLERY: IGalleryVisual[] = [
	{
		id: "iala-buoy-explorer",
		title: "IALA oznake",
		variants: [
			{ focus: "all" },
			{ focus: "lateral" },
			{ focus: "other" },
			{ mark: "port", direction: "inbound" },
			{ mark: "starboard", direction: "outbound" },
			{ mark: "preferred-channel-starboard", direction: "inbound" },
			{ mark: "isolated-danger" },
			{ mark: "new-danger" },
		],
	},
	{
		id: "cardinal-quadrant",
		title: "Kardinalne oznake",
		variants: [
			{ mode: "explore" },
			{ mark: "N" },
			{ mode: "identify", mark: "N" },
			{ mode: "identify", mark: "E" },
			{ mark: "S", mode: "pass" },
			{ mode: "quiz" },
		],
	},
	{
		id: "ship-lights-viewer",
		title: "Svjetla plovila",
		variants: [
			{ focus: "sectors", vessel: "power-12-50m" },
			{ focus: "power-driven", vessel: "power-over-50m" },
			{ focus: "sailing", vessel: "sailing-under-20m" },
			{ focus: "special", vessel: "trawler" },
			{ vessel: "power-12-50m", view: "bow" },
			{ vessel: "power-12-50m", view: "starboard" },
			{ vessel: "power-12-50m", view: "port" },
			{ vessel: "power-12-50m", view: "stern" },
			{ vessel: "power-over-50m", view: "bow" },
			{ vessel: "not-under-command", view: "beam" },
			{ vessel: "trawler", view: "beam" },
			{ mode: "quiz" },
		],
	},
	{
		id: "day-shapes",
		title: "Dnevni znakovi",
		variants: [
			{ mode: "builder" },
			{ state: "anchored" },
			{ state: "aground" },
			{ state: "motor-sailing" },
			{ state: "restricted-manoeuvrability" },
			{ mode: "quiz" },
		],
	},
	{
		id: "sound-signal-player",
		title: "Zvučni signali",
		variants: [
			{ set: "manoeuvre" },
			{ set: "fog" },
			{ set: "fog", mode: "quiz" },
			{ pattern: "short" },
			{ pattern: "short-short-short" },
			{ pattern: "five-short" },
			{ pattern: "long" },
			{ pattern: "long-long-short-short" },
			{ pattern: "long-short-long-short" },
			{ pattern: "fog-power-making-way" },
			{ pattern: "fog-power-stopped" },
			{ pattern: "fog-long-short-short" },
			{ pattern: "sos" },
		],
	},
	{
		id: "collision-situations",
		title: "Izbjegavanje sudara",
		variants: [
			{ focus: "constant-bearing" },
			{ situation: "head-on" },
			{ situation: "crossing" },
			{ situation: "crossing", own: "stand-on" },
			{ situation: "crossing", own: "give-way" },
			{ situation: "overtaking" },
			{ situation: "sail-opposite-tacks", showWind: true },
			{ situation: "sail-same-tack" },
			{ situation: "power-vs-sail" },
			{ situation: "narrow-channel" },
		],
	},
	{
		id: "compass-course-calculator",
		title: "Kurs i kompas",
		variants: [
			{ mode: "course" },
			{ mode: "course", trueCourse: 135 },
			{
				mode: "variation-deviation",
				trueCourse: 90,
				variation: 3,
				deviation: -2,
			},
		],
	},
	{
		id: "light-characteristic-reader",
		title: "Karakteristika svjetla",
		variants: [
			{ code: "B C Bl(4) 10s 21m 15-10M" },
			{ code: "B C Bl(4) 10s 21m 15-10M", showSectors: true },
			{ code: "VQ(3) 5s", color: "W" },
		],
	},
	{
		id: "vhf-radio-call",
		title: "VHF poziv",
		variants: [
			{ mode: "controls" },
			{ call: "mayday" },
			{ call: "mayday", mode: "order" },
			{ call: "pan-pan" },
			{ call: "securite" },
			{ call: "routine" },
		],
	},
	{
		id: "phonetic-alphabet",
		title: "Sricanje",
		variants: [
			{ mode: "letters" },
			{ mode: "drill", words: ["Vis", "Hvar", "Krk", "Mljet", "Lastovo"] },
			{ mode: "drill", words: ["Hvar"] },
		],
	},
	{
		id: "adriatic-winds",
		title: "Vjetrovi Jadrana",
		variants: [
			{ mode: "explore" },
			{ compare: ["bura", "jugo"], show: "signs" },
			{ highlight: "maestral", show: "day-cycle" },
			{ highlight: "bura" },
			{ highlight: "jugo", show: "signs" },
			{ mode: "quiz", direction: "SW" },
		],
	},
	{
		id: "beaufort-scale",
		title: "Beaufortova ljestvica",
		variants: [{ mode: "explore" }, { value: 6 }],
	},
	{
		id: "four-stroke-engine",
		title: "Motor",
		variants: [
			{ mode: "four-stroke" },
			{ mode: "two-stroke" },
			{ mode: "diesel" },
			{ mode: "four-stroke", stroke: "compression", paused: true },
			{ mode: "instruments" },
		],
	},
	{
		id: "navigation-areas-map",
		title: "Područja plovidbe",
		variants: [
			{ rings: ["1", "3", "6", "12", "20"], showCertificate: true },
			{ highlight: "III" },
			{ highlight: "II" },
			{ highlight: "IIIb" },
			{ certificate: "A" },
		],
	},
	{
		id: "knot-steps",
		title: "Uzlovi",
		variants: [
			{ knot: "pasnjak" },
			{ knot: "muski", compare: ["muski", "zastavni", "vrzni"] },
			{ knot: "sidreni" },
			{ knot: "osmica" },
			{ knot: "pasnjak", hideName: true },
			{ knot: "vrzni", hideName: true },
		],
	},
];

/** Every question's media as the learner sees it before answering, so the gallery can check nothing gives the answer away. */
function questionMediaVariants(id: VisualId): VisualProps[] {
	const seen = new Set<string>();

	return course.questions.flatMap((question) => {
		if (question.media?.visual !== id) {
			return [];
		}

		const props = { ...question.media.props, hideAnswer: true };
		const key = JSON.stringify(props);

		if (seen.has(key)) {
			return [];
		}

		seen.add(key);

		return [props];
	});
}

export const GALLERY: IGalleryVisual[] = BASE_GALLERY.map((visual) => ({
	...visual,
	variants: [...visual.variants, ...questionMediaVariants(visual.id)],
}));
