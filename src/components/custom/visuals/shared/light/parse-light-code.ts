import {
	COLOR_CODES,
	COLOR_NAMES,
	type ILightCharacteristic,
	type ILightPart,
	type LightColor,
	RHYTHM_CODES,
	RHYTHM_NAMES,
} from "@/components/custom/visuals/shared/light/light-code";
import { MORSE_CODE } from "@/components/custom/visuals/shared/light/morse-code";

/** Real lights group at most 9 flashes (west cardinal) in at most 3 groups; Morse lights show one or two letters. */
const LIMITS = { flashesPerGroup: 9, groups: 3, morseLetters: 2 } as const;

/** Longer than any real characteristic, so a pasted paragraph cannot flood the explanation list. */
export const MAX_INPUT_LENGTH = 60;

const RHYTHM_PATTERN =
	/^(?:Al\.?)?(LFl|DBl|Fl|Bl|Oc|Pk|Iso|Izo|UQ|UK|VQ|VK|Q|K|Mo|F)(?:\(([^)]*)\))?(?:\+(LFl|DBl))?$/;

/** Reads a light characteristic such as "Fl(3) W 10s 21m 15M" or "B C Bl(4) 10s 21m 15-10M". */
export function parseLightCode(input: string): ILightCharacteristic {
	const result: ILightCharacteristic = {
		rhythm: "fixed",
		groups: [],
		plusLongFlash: false,
		morse: null,
		colors: [],
		period: null,
		height: null,
		ranges: [],
		parts: [],
	};

	for (const token of tokenize(input)) {
		result.parts.push(readToken(token, result));
	}

	if (result.colors.length === 0) {
		result.colors.push("white");
	}

	return result;
}

function tokenize(input: string): string[] {
	return input
		.slice(0, MAX_INPUT_LENGTH)
		.replace(/\s+\(/g, "(")
		.replace(/\s*\+\s*/g, "+")
		.replace(/(\d)\s+(s|m|M)\b/g, "$1$2")
		.replace(/^Al\.?\s*/, "Al.")
		.split(/\s+/)
		.filter((token) => token !== "");
}

function readToken(token: string, result: ILightCharacteristic): ILightPart {
	const alternating = token.startsWith("Al.");
	const body = alternating ? token.slice(3) : token;
	const rhythm = RHYTHM_PATTERN.exec(token);

	if (rhythm?.[1]) {
		return readRhythm(token, rhythm, alternating, result);
	}

	const colors = readColors(body);

	if (colors) {
		result.colors.push(...colors);

		if (alternating) {
			result.rhythm = "alternating";
		}

		const names = colors.map((color) => COLOR_NAMES[color]).join(" i ");

		return {
			text: token,
			meaning: alternating
				? `naizmjenično ${names} svjetlo`
				: `boja: ${names} svjetlo`,
			known: true,
		};
	}

	return readMeasure(token, result);
}

function readRhythm(
	token: string,
	match: RegExpExecArray,
	alternating: boolean,
	result: ILightCharacteristic,
): ILightPart {
	const kind = RHYTHM_CODES[match[1] ?? ""] ?? "fixed";
	const inside = match[2]?.trim() ?? "";

	result.rhythm = alternating ? "alternating" : kind;
	result.plusLongFlash = match[3] !== undefined;

	if (kind === "morse") {
		const letters = inside.toUpperCase();

		if (!isValidMorse(letters)) {
			return unreadable(
				token,
				`Morseov znak piše se kao jedno ili dva slova ili znamenke, na primjer Mo(A).`,
			);
		}

		result.morse = letters || null;
	} else if (inside !== "") {
		const groups = inside
			.split("+")
			.map((count) => Number.parseInt(count, 10))
			.filter((count) => Number.isFinite(count) && count > 0);

		if (!areValidGroups(groups)) {
			return unreadable(
				token,
				`Skupina ima najviše ${LIMITS.flashesPerGroup} bljeskova, a svjetlo najviše ${LIMITS.groups} skupine, na primjer Fl(2+1).`,
			);
		}

		result.groups = groups;
	}

	const extras = [
		result.groups.length > 1
			? `skupine od ${result.groups.join(" pa ")} bljeska`
			: result.groups[0]
				? `${result.groups[0]} u skupini`
				: "",
		result.morse ? `slovo ${result.morse}` : "",
		result.plusLongFlash ? "pa jedan dugi bljesak" : "",
	].filter((extra) => extra !== "");

	return {
		text: token,
		meaning: [RHYTHM_NAMES[kind], ...extras].join("; "),
		known: true,
	};
}

function isValidMorse(letters: string): boolean {
	return (
		letters.length <= LIMITS.morseLetters &&
		[...letters].every((letter) => letter in MORSE_CODE)
	);
}

function areValidGroups(groups: readonly number[]): boolean {
	return (
		groups.length <= LIMITS.groups &&
		groups.every((count) => count <= LIMITS.flashesPerGroup)
	);
}

function unreadable(token: string, meaning: string): ILightPart {
	return { text: token, meaning, known: false };
}

function readColors(body: string): LightColor[] | null {
	const codes = body
		.split(".")
		.flatMap((piece) => piece.match(/Bu|Pl|Ž|[A-Z]/g) ?? []);
	const joined = codes.join("");

	if (codes.length === 0 || joined !== body.replaceAll(".", "")) {
		return null;
	}

	const colors = codes.map((code) => COLOR_CODES[code]);

	return colors.every((color) => color !== undefined)
		? (colors as LightColor[])
		: null;
}

function readMeasure(token: string, result: ILightCharacteristic): ILightPart {
	const period = /^(\d+(?:[.,]\d+)?)s$/.exec(token);

	if (period?.[1]) {
		result.period = parseDecimal(period[1]);

		return {
			text: token,
			meaning: `period: cijeli ciklus traje ${period[1]} s, pa se ponavlja`,
			known: true,
		};
	}

	const height = /^(\d+(?:[.,]\d+)?)m$/.exec(token);

	if (height?.[1]) {
		result.height = parseDecimal(height[1]);

		return {
			text: token,
			meaning: `visina: svjetlo je ${height[1]} m iznad mora`,
			known: true,
		};
	}

	const range = /^(\d+(?:[.,]\d+)?(?:-\d+(?:[.,]\d+)?)*)M$/.exec(token);

	if (range?.[1]) {
		result.ranges = range[1].split("-").map(parseDecimal);

		return { text: token, meaning: describeRanges(result), known: true };
	}

	return unreadable(token, "ovaj dio ne prepoznajemo, provjeri zapis");
}

function parseDecimal(text: string): number {
	return Number.parseFloat(text.replace(",", "."));
}

function describeRanges(result: ILightCharacteristic): string {
	const { ranges, colors } = result;

	if (ranges.length > 1 && ranges.length === colors.length) {
		const perColor = ranges.map(
			(miles, index) =>
				`${miles} M za ${COLOR_NAMES[colors[index] ?? "white"]}`,
		);

		return `domet: ${perColor.join(", ")} (M je nautička milja)`;
	}

	return `domet: ${ranges.join(" do ")} nautičkih milja (M)`;
}
