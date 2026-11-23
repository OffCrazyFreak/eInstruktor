import { describe, expect, it } from "vitest";
import {
	BEAUFORT,
	smallBoatAdvice,
} from "@/components/custom/visuals/beaufort-scale/beaufort-data";

describe("Beaufort lookup", () => {
	it("has thirteen forces with the DHMZ names", () => {
		expect(BEAUFORT).toHaveLength(13);
		expect(BEAUFORT[6]).toMatchObject({
			name: "jaki vjetar",
			knots: "22 do 27",
		});
		expect(BEAUFORT[7]?.name).toBe("žestoki vjetar");
		expect(BEAUFORT[10]?.name).toBe("orkanski vjetar");
		expect(BEAUFORT[11]?.name).toBe("jaki orkanski vjetar");
		expect(BEAUFORT[12]?.knots).toBe("64 i više");
	});

	it("warns a small boat from force 4 up", () => {
		expect(smallBoatAdvice(2)).toContain("Mirni");
		expect(smallBoatAdvice(4)).toContain("bijele kreste");
		expect(smallBoatAdvice(8)).toContain("Ne isplovljavaj");
	});
});
