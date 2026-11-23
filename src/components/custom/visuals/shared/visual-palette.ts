/** "Zlatni sat" colours shared by every visual, so day scenes, night scenes and controls match the landing. */
export const PALETTE = {
	navy: "#002c78",
	ocean: "#0a63b0",
	sky: "#00aef3",
	light: "#eaf3ff",
	foam: "#f6fafe",
	night: "#04142e",
	nightSoft: "#0c2550",
	sun: "#ffb43c",
	sunPale: "#ffe89a",
	mute: "rgba(0,44,120,0.68)",
	line: "rgba(0,44,120,0.14)",
	sea: "#cfe8fb",
	seaDeep: "#8cc2ee",
	land: "#f3e6c4",
	landEdge: "#d8c48f",
} as const;

/** Colours a mark, light or flag really has at sea; these stay true to the rules, not to the brand. */
export const SIGNAL = {
	red: "#e0322b",
	green: "#14a05a",
	yellow: "#f6c500",
	black: "#17191f",
	white: "#ffffff",
	blue: "#2f6fe4",
	lightWhite: "#fff7d6",
	lightRed: "#ff5a4a",
	lightGreen: "#3df08a",
	lightYellow: "#ffd23f",
	lightBlue: "#5aa8ff",
} as const;
