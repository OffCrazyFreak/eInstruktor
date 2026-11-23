import { describe, expect, it } from "vitest";
import {
	buildLightSequence,
	total,
} from "@/components/custom/visuals/shared/light/light-sequence";
import { parseLightCode } from "@/components/custom/visuals/shared/light/parse-light-code";

function flashes(code: string) {
	return buildLightSequence(parseLightCode(code)).filter(
		(segment) => segment.on,
	);
}

describe("parseLightCode", () => {
	it("reads the HHI lighthouse example from the script", () => {
		const light = parseLightCode("B C Bl (4) 10s 21m 15-10M");

		expect(light.rhythm).toBe("flash");
		expect(light.groups).toEqual([4]);
		expect(light.colors).toEqual(["white", "red"]);
		expect(light.period).toBe(10);
		expect(light.height).toBe(21);
		expect(light.ranges).toEqual([15, 10]);
		expect(light.parts.every((part) => part.known)).toBe(true);
		expect(light.parts.at(-1)?.meaning).toContain(
			"15 M za bijelo, 10 M za crveno",
		);
	});

	it("reads international codes with colour after the rhythm", () => {
		const light = parseLightCode("Fl(3) W 10s 21m 15M");

		expect(light.rhythm).toBe("flash");
		expect(light.groups).toEqual([3]);
		expect(light.colors).toEqual(["white"]);
		expect(light.ranges).toEqual([15]);
	});

	it("maps HHI abbreviations to the same rhythms", () => {
		expect(parseLightCode("DBl 10s").rhythm).toBe("long-flash");
		expect(parseLightCode("Pk C 5s").rhythm).toBe("occulting");
		expect(parseLightCode("Izo 4s").rhythm).toBe("isophase");
		expect(parseLightCode("VK(3) 5s").rhythm).toBe("very-quick");
		expect(parseLightCode("K").rhythm).toBe("quick");
	});

	it("reads composite groups, a long flash suffix and Morse letters", () => {
		expect(parseLightCode("Fl(2+1) R 10s").groups).toEqual([2, 1]);
		expect(parseLightCode("VQ(6) + LFl 10s").plusLongFlash).toBe(true);
		expect(parseLightCode("Mo(A) 8s").morse).toBe("A");
	});

	it("reads alternating colours of the new danger mark", () => {
		const light = parseLightCode("Al.Bu.Y");

		expect(light.rhythm).toBe("alternating");
		expect(light.colors).toEqual(["blue", "yellow"]);
	});

	it("flags parts it cannot read and defaults to white", () => {
		const light = parseLightCode("Fl xyz 5s");

		expect(light.colors).toEqual(["white"]);
		expect(light.parts.find((part) => part.text === "xyz")?.known).toBe(false);
	});
});

describe("buildLightSequence", () => {
	it("fills the stated period", () => {
		for (const code of [
			"Fl(4) 10s",
			"VQ(3) 5s",
			"Q(9) 15s",
			"VQ(6)+LFl 10s",
			"Fl(2+1) R 10s",
			"Oc 4s",
			"Iso 4s",
		]) {
			expect(total(buildLightSequence(parseLightCode(code)))).toBeCloseTo(
				parseLightCode(code).period ?? 0,
			);
		}
	});

	it("gives the cardinal flash counts", () => {
		expect(flashes("VQ(3) 5s")).toHaveLength(3);
		expect(flashes("VQ(9) 10s")).toHaveLength(9);

		const south = flashes("Q(6)+LFl 15s");

		expect(south).toHaveLength(7);
		expect(south.at(-1)?.duration).toBeGreaterThanOrEqual(2);
	});

	it("keeps isophase light and dark equal", () => {
		const [light, dark] = buildLightSequence(parseLightCode("Iso 6s"));

		expect(light?.duration).toBe(3);
		expect(dark?.duration).toBe(3);
	});

	it("makes occulting light longer than the eclipse", () => {
		const [lit, eclipse] = buildLightSequence(parseLightCode("Oc R 5s"));

		expect(lit?.on).toBe(true);
		expect(lit?.duration).toBeGreaterThan(eclipse?.duration ?? 0);
	});

	it("spells Morse A as a short then a long flash", () => {
		const [dot, dash] = flashes("Mo(A) 8s");

		expect(dot?.duration).toBeLessThan(dash?.duration ?? 0);
	});

	it("alternates colours for the new danger mark", () => {
		expect(flashes("Al.Bu.Y").map((segment) => segment.color)).toEqual([
			"blue",
			"yellow",
		]);
	});
});

describe("limits on what the parser accepts", () => {
	it("refuses absurd group sizes with a friendly note", () => {
		for (const code of ["Fl(99999999) 10s", "Fl(5000) 10s"]) {
			const light = parseLightCode(code);
			const rhythm = light.parts[0];

			expect(light.groups).toEqual([]);
			expect(rhythm?.known).toBe(false);
			expect(rhythm?.meaning).toContain("najviše 9");
			expect(buildLightSequence(light).length).toBeLessThan(10);
		}
	});

	it("accepts the largest real group, the west cardinal's nine flashes", () => {
		expect(parseLightCode("VQ(9) 10s").groups).toEqual([9]);
	});

	it("refuses more than three groups", () => {
		expect(parseLightCode("Fl(1+1+1+1) 20s").groups).toEqual([]);
	});

	it("ignores text past the length limit", () => {
		const light = parseLightCode(`Fl W 10s ${"15M ".repeat(500)}`);

		expect(light.parts.length).toBeLessThan(20);
	});
});

describe("Morse letters", () => {
	it("knows every letter, not only the common ones", () => {
		const light = parseLightCode("Mo(Q) 10s");

		expect(light.parts[0]?.known).toBe(true);
		expect(flashes("Mo(Q) 10s").map((segment) => segment.duration)).toEqual([
			1.5, 1.5, 0.5, 1.5,
		]);
	});

	it("refuses unknown signs", () => {
		expect(parseLightCode("Mo(?) 10s").parts[0]?.known).toBe(false);
	});
});

describe("flash rate", () => {
	it("keeps the ultra quick demo under 3 flashes a second", () => {
		const [on, off] = buildLightSequence(parseLightCode("UQ"));

		expect((on?.duration ?? 0) + (off?.duration ?? 0)).toBeGreaterThan(1 / 3);
	});
});
