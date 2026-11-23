import { describe, expect, it } from "vitest";
import {
	classifySituation,
	type IVesselState,
	tackOf,
} from "@/components/custom/visuals/collision-situations/collision-rules";

const vessel = (
	x: number,
	y: number,
	heading: number,
	kind: IVesselState["kind"] = "power",
): IVesselState => ({ x, y, heading, kind });

describe("classifySituation", () => {
	it("makes both alter course when meeting head on", () => {
		expect(
			classifySituation(vessel(150, 250, 0), vessel(150, 50, 180)),
		).toMatchObject({ situation: "head-on", giveWay: "both" });
	});

	it("makes the vessel with the other on its starboard side give way when crossing", () => {
		expect(
			classifySituation(vessel(150, 250, 0), vessel(260, 140, 270)),
		).toMatchObject({ situation: "crossing", giveWay: "a" });
		expect(
			classifySituation(vessel(150, 250, 0), vessel(40, 140, 90)),
		).toMatchObject({ situation: "crossing", giveWay: "b" });
	});

	it("makes the overtaking vessel give way, even under sail", () => {
		expect(
			classifySituation(vessel(150, 260, 0, "sail"), vessel(150, 130, 0)),
		).toMatchObject({ situation: "overtaking", giveWay: "a" });
	});

	it("makes power give way to sail", () => {
		expect(
			classifySituation(vessel(150, 250, 0), vessel(260, 140, 270, "sail")),
		).toMatchObject({ situation: "power-vs-sail", giveWay: "a" });
	});

	it("makes the port tack sailing vessel give way", () => {
		const portTack = vessel(80, 230, 45, "sail");
		const starboardTack = vessel(220, 230, 315, "sail");

		expect(tackOf(portTack, 0)).toBe("port");
		expect(tackOf(starboardTack, 0)).toBe("starboard");
		expect(classifySituation(portTack, starboardTack, 0)).toMatchObject({
			situation: "sail-opposite-tacks",
			giveWay: "a",
		});
	});

	it("makes the windward vessel give way on the same tack", () => {
		const windward = vessel(210, 250, 340, "sail");
		const leeward = vessel(110, 240, 20, "sail");

		expect(classifySituation(windward, leeward, 90)).toMatchObject({
			situation: "sail-same-tack",
			giveWay: "a",
		});
		expect(classifySituation(leeward, windward, 90)).toMatchObject({
			giveWay: "b",
		});
	});
});
