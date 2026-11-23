import { describe, expect, it } from "vitest";
import {
	areaAt,
	certificateFor,
} from "@/components/custom/visuals/navigation-areas-map/navigation-areas";

describe("navigation areas", () => {
	it("maps distance from the coast to the narrowest area", () => {
		expect(areaAt(0)).toBe("IV");
		expect(areaAt(0.5)).toBe("IIIc");
		expect(areaAt(1)).toBe("IIIc");
		expect(areaAt(2.9)).toBe("IIIb");
		expect(areaAt(6)).toBe("IIIa");
		expect(areaAt(11)).toBe("III");
		expect(areaAt(20)).toBe("II");
		expect(areaAt(21)).toBe("I");
	});

	it("lets A go out to 6 NM and B to 12 NM", () => {
		expect(certificateFor("IIIa")).toBe("A");
		expect(certificateFor("III")).toBe("B");
		expect(certificateFor("II")).toBeNull();
	});
});
