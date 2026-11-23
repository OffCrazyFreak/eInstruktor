import type { IArea } from "@/content/types";
import izbjegavanjeSudara from "./areas/izbjegavanje-sudara/area";
import karteNavigacija from "./areas/karte-navigacija/area";
import meteorologija from "./areas/meteorologija/area";
import motoristika from "./areas/motoristika/area";
import plovneOznake from "./areas/plovne-oznake/area";
import pomorstvoManevriranje from "./areas/pomorstvo-manevriranje/area";
import propisi from "./areas/propisi/area";
import sigurnostPrvaPomoc from "./areas/sigurnost-prva-pomoc/area";
import svjetlaZnakovi from "./areas/svjetla-znakovi/area";
import vhfRadio from "./areas/vhf-radio/area";

// Area metadata without lessons or questions, so pages such as the landing stay small.
const areasIndex: IArea[] = [
	karteNavigacija,
	plovneOznake,
	svjetlaZnakovi,
	izbjegavanjeSudara,
	meteorologija,
	pomorstvoManevriranje,
	sigurnostPrvaPomoc,
	propisi,
	motoristika,
	vhfRadio,
].sort((first, second) => first.order - second.order);

export default areasIndex;
