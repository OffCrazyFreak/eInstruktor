import type { LightColor } from "@/components/custom/visuals/shared/light/light-code";
import { SIGNAL } from "@/components/custom/visuals/shared/visual-palette";

/** How a lit lamp of each colour glows on a night background. */
export const LAMP_COLORS: Record<LightColor, string> = {
	white: SIGNAL.lightWhite,
	red: SIGNAL.lightRed,
	green: SIGNAL.lightGreen,
	yellow: SIGNAL.lightYellow,
	blue: SIGNAL.lightBlue,
};
