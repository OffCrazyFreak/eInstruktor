import { describe, expect, it } from "vitest";
import {
	spell,
	spellAloud,
} from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";

describe("spelling", () => {
	it("spells a call sign the way the lessons do", () => {
		expect(spellAloud("9A2817")).toBe(
			"Nove Najn, Alfa, Biso Tu, Okto Eit, Una Uan, Sete Seven",
		);
	});

	it("spells Croatian letters with their base letter and flags the mark", () => {
		const [first] = spell("Šolta");

		expect(first?.word?.itu).toBe("Sierra");
		expect(first?.hasMark).toBe(true);
	});

	it("skips spaces and keeps unknown symbols", () => {
		expect(
			spell("Vis 1").map((item) => item.word?.spoken ?? item.symbol),
		).toEqual(["Viktor", "Indija", "Siera", "Una"]);
		expect(spell("-")[0]?.word).toBeNull();
	});
});
