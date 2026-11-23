import { describe, expect, it } from "vitest";
import { pluralHr } from "@/lib/plural";

const lekcija = (count: number) =>
	pluralHr(count, "lekcija", "lekcije", "lekcija");
const dan = (count: number) => pluralHr(count, "dan", "dana", "dana");

describe("pluralHr", () => {
	it("follows the Croatian count forms", () => {
		expect(lekcija(1)).toBe("lekcija");
		expect(lekcija(3)).toBe("lekcije");
		expect(lekcija(5)).toBe("lekcija");
		expect(lekcija(12)).toBe("lekcija");
		expect(lekcija(22)).toBe("lekcije");
		expect(dan(21)).toBe("dan");
		expect(dan(11)).toBe("dana");
	});
});
