import { describe, expect, it } from "vitest";
import {
	compassFromMagnetic,
	formatCorrection,
	formatCourse,
	magneticFromTrue,
	pointName,
	quadrantName,
	reciprocal,
	trueFromCompass,
} from "@/components/custom/visuals/compass-course-calculator/course-math";

describe("course math", () => {
	it("works the lesson example: Kp 090, variation 3 E, deviation 2 W", () => {
		const magnetic = magneticFromTrue(90, 3);
		const compass = compassFromMagnetic(magnetic, -2);

		expect(magnetic).toBe(87);
		expect(compass).toBe(89);
		expect(trueFromCompass(compass, -2, 3)).toBe(90);
	});

	it("wraps around north", () => {
		expect(magneticFromTrue(2, 5)).toBe(357);
		expect(trueFromCompass(358, 1, 4)).toBe(3);
	});

	it("names points, quadrants and reciprocal courses", () => {
		expect(pointName(135)).toEqual({ code: "SE", name: "jugoistok" });
		expect(pointName(350).code).toBe("N");
		expect(quadrantName(135)).toBe("kvadrant II");
		expect(quadrantName(90)).toBe("granica kvadranata I i II");
		expect(quadrantName(0)).toBe("granica kvadranata IV i I");
		expect(reciprocal(45)).toBe(225);
		expect(reciprocal(300)).toBe(120);
	});

	it("formats courses with three digits and corrections with E or W", () => {
		expect(formatCourse(5)).toBe("005°");
		expect(formatCourse(87.5)).toBe("087,5°");
		expect(formatCorrection(3)).toBe("+3° E");
		expect(formatCorrection(-2)).toBe("-2° W");
	});
});
