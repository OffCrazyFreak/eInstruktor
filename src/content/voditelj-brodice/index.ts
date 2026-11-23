import type { ICourse } from "@/content/course-types";
import izbjegavanjeSudaraArea from "./areas/izbjegavanje-sudara/area";
import izbjegavanjeSudaraLessons from "./areas/izbjegavanje-sudara/lessons";
import izbjegavanjeSudaraQuestions from "./areas/izbjegavanje-sudara/questions";
import karteNavigacijaArea from "./areas/karte-navigacija/area";
import karteNavigacijaLessons from "./areas/karte-navigacija/lessons";
import karteNavigacijaQuestions from "./areas/karte-navigacija/questions";
import meteorologijaArea from "./areas/meteorologija/area";
import meteorologijaLessons from "./areas/meteorologija/lessons";
import meteorologijaQuestions from "./areas/meteorologija/questions";
import motoristikaArea from "./areas/motoristika/area";
import motoristikaLessons from "./areas/motoristika/lessons";
import motoristikaQuestions from "./areas/motoristika/questions";
import plovneOznakeArea from "./areas/plovne-oznake/area";
import plovneOznakeLessons from "./areas/plovne-oznake/lessons";
import plovneOznakeQuestions from "./areas/plovne-oznake/questions";
import pomorstvoManevriranjeArea from "./areas/pomorstvo-manevriranje/area";
import pomorstvoManevriranjeLessons from "./areas/pomorstvo-manevriranje/lessons";
import pomorstvoManevriranjeQuestions from "./areas/pomorstvo-manevriranje/questions";
import propisiArea from "./areas/propisi/area";
import propisiLessons from "./areas/propisi/lessons";
import propisiQuestions from "./areas/propisi/questions";
import sigurnostPrvaPomocArea from "./areas/sigurnost-prva-pomoc/area";
import sigurnostPrvaPomocLessons from "./areas/sigurnost-prva-pomoc/lessons";
import sigurnostPrvaPomocQuestions from "./areas/sigurnost-prva-pomoc/questions";
import svjetlaZnakoviArea from "./areas/svjetla-znakovi/area";
import svjetlaZnakoviLessons from "./areas/svjetla-znakovi/lessons";
import svjetlaZnakoviQuestions from "./areas/svjetla-znakovi/questions";
import vhfRadioArea from "./areas/vhf-radio/area";
import vhfRadioLessons from "./areas/vhf-radio/lessons";
import vhfRadioQuestions from "./areas/vhf-radio/questions";
import lectureZero from "./lecture-0";
import studyCards from "./study-cards";

const areaModules = [
	{
		area: karteNavigacijaArea,
		lessons: karteNavigacijaLessons,
		questions: karteNavigacijaQuestions,
	},
	{
		area: plovneOznakeArea,
		lessons: plovneOznakeLessons,
		questions: plovneOznakeQuestions,
	},
	{
		area: svjetlaZnakoviArea,
		lessons: svjetlaZnakoviLessons,
		questions: svjetlaZnakoviQuestions,
	},
	{
		area: izbjegavanjeSudaraArea,
		lessons: izbjegavanjeSudaraLessons,
		questions: izbjegavanjeSudaraQuestions,
	},
	{
		area: meteorologijaArea,
		lessons: meteorologijaLessons,
		questions: meteorologijaQuestions,
	},
	{
		area: pomorstvoManevriranjeArea,
		lessons: pomorstvoManevriranjeLessons,
		questions: pomorstvoManevriranjeQuestions,
	},
	{
		area: sigurnostPrvaPomocArea,
		lessons: sigurnostPrvaPomocLessons,
		questions: sigurnostPrvaPomocQuestions,
	},
	{ area: propisiArea, lessons: propisiLessons, questions: propisiQuestions },
	{
		area: motoristikaArea,
		lessons: motoristikaLessons,
		questions: motoristikaQuestions,
	},
	{
		area: vhfRadioArea,
		lessons: vhfRadioLessons,
		questions: vhfRadioQuestions,
	},
];

// The app's own mock exam: the real exam is oral and has no official question count or pass mark.
const course: ICourse = {
	slug: "voditelj-brodice",
	title: "Voditelj brodice",
	introLessonSlug: lectureZero.slug,
	areas: areaModules.map((module) => module.area),
	lessons: [lectureZero, ...areaModules.flatMap((module) => module.lessons)],
	questions: areaModules.flatMap((module) => module.questions),
	studyCards,
	examFormats: {
		A: { questions: 20, minutes: 20, passPercent: 70, perSubject: false },
		B: { questionsPerSubject: 8, minutes: 45, passPerSubject: 6 },
	},
};

export default course;
