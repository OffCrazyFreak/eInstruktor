import { describe, expect, it } from "vitest";
import {
	isVisibleFrom,
	screenX,
	VESSEL_LIGHTS,
} from "@/components/custom/visuals/ship-lights-viewer/vessel-lights";

function visibleKinds(bearing: number) {
	return VESSEL_LIGHTS["power-12-50m"]
		.filter((light) => isVisibleFrom(light, bearing))
		.map((light) => `${light.color}:${light.kind}`)
		.sort();
}

describe("isVisibleFrom", () => {
	it("shows masthead and both sidelights from ahead", () => {
		expect(visibleKinds(0)).toEqual([
			"green:side-starboard",
			"red:side-port",
			"white:masthead",
		]);
	});

	it("shows masthead and green from the starboard beam", () => {
		expect(visibleKinds(90)).toEqual([
			"green:side-starboard",
			"white:masthead",
		]);
	});

	it("shows masthead and red from the port beam", () => {
		expect(visibleKinds(270)).toEqual(["red:side-port", "white:masthead"]);
	});

	it("shows only the stern light from astern", () => {
		expect(visibleKinds(180)).toEqual(["white:stern"]);
	});

	it("hides the masthead light more than 22.5 degrees abaft the beam", () => {
		expect(visibleKinds(130)).toEqual(["white:stern"]);
	});
});

describe("screenX", () => {
	it("puts the green sidelight on the observer's left when the vessel comes head on", () => {
		const [, green] = VESSEL_LIGHTS["power-12-50m"].filter((light) =>
			light.kind.startsWith("side"),
		);

		expect(green && screenX(green, 0)).toBeLessThan(0);
	});
});
