import { describe, expect, it } from "vitest";
import { pluralHr } from "@/lib/plural";

function lekcija(count: number) {
	return pluralHr(count, "lekcija", "lekcije", "lekcija");
}
function dan(count: number) {
	return pluralHr(count, "dan", "dana", "dana");
}

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
