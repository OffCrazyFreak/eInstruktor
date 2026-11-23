import { describe, expect, it } from "vitest";
import {
	readBoolean,
	readNumber,
	readOption,
	readOptionList,
	readStringList,
} from "@/components/custom/visuals/shared/visual-props";

const OPTIONS = ["bura", "jugo"] as const;

describe("visual prop readers", () => {
	it("keeps known options and drops unknown values or types", () => {
		expect(readOption({ wind: "bura" }, "wind", OPTIONS)).toBe("bura");
		expect(readOption({ wind: "tramontana" }, "wind", OPTIONS)).toBeUndefined();
		expect(readOption({ wind: 3 }, "wind", OPTIONS)).toBeUndefined();
		expect(readOption(undefined, "wind", OPTIONS)).toBeUndefined();
	});

	it("clamps numbers and accepts numeric strings", () => {
		expect(readNumber({ value: 6 }, "value", { min: 0, max: 12 })).toBe(6);
		expect(readNumber({ value: "40" }, "value", { min: 0, max: 12 })).toBe(12);
		expect(
			readNumber({ value: "x" }, "value", { min: 0, max: 12 }),
		).toBeUndefined();
	});

	it("treats an empty string as missing, not as zero", () => {
		expect(
			readNumber({ value: "" }, "value", { min: 0, max: 12 }),
		).toBeUndefined();
		expect(
			readNumber({ value: "  " }, "value", { min: 0, max: 12 }),
		).toBeUndefined();
	});

	it("rounds to the slider step", () => {
		expect(readNumber({ value: 6.4 }, "value", { min: 0, max: 12 })).toBe(6);
		expect(
			readNumber({ value: 2.26 }, "value", { min: 0, max: 25, step: 0.5 }),
		).toBe(2.5);
	});

	it("keeps only non-empty strings in a string list", () => {
		const props = { words: ["Vis", "", 7, " Hvar "] } as unknown as Parameters<
			typeof readStringList
		>[0];

		expect(readStringList(props, "words")).toEqual(["Vis", "Hvar"]);
	});

	it("reads booleans and filters lists", () => {
		expect(readBoolean({ paused: true }, "paused")).toBe(true);
		expect(readBoolean({ paused: "no" }, "paused")).toBe(false);
		expect(
			readOptionList({ compare: ["jugo", "x", "bura"] }, "compare", OPTIONS),
		).toEqual(["jugo", "bura"]);
	});
});
