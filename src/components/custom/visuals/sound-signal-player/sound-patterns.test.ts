import { describe, expect, it } from "vitest";
import {
	PATTERNS,
	scheduleSignal,
	signalLength,
} from "@/components/custom/visuals/sound-signal-player/sound-patterns";

function count(id: keyof typeof PATTERNS, element: string) {
	return PATTERNS[id].elements.filter((item) => item === element).length;
}

describe("sound signal patterns", () => {
	it("encodes the manoeuvring signals by number of short blasts", () => {
		expect(count("short", "short")).toBe(1);
		expect(count("short-short", "short")).toBe(2);
		expect(count("short-short-short", "short")).toBe(3);
		expect(count("five-short", "short")).toBe(5);
	});

	it("encodes overtaking requests and the reply", () => {
		expect(PATTERNS["long-long-short"].elements).toEqual([
			"long",
			"long",
			"short",
		]);
		expect(PATTERNS["long-long-short-short"].elements).toEqual([
			"long",
			"long",
			"short",
			"short",
		]);
		expect(PATTERNS["long-short-long-short"].elements).toEqual([
			"long",
			"short",
			"long",
			"short",
		]);
	});

	it("encodes the fog signals", () => {
		expect(PATTERNS["fog-power-making-way"].elements).toEqual(["long"]);
		expect(PATTERNS["fog-power-stopped"].elements).toEqual(["long", "long"]);
		expect(PATTERNS["fog-long-short-short"].elements).toEqual([
			"long",
			"short",
			"short",
		]);
	});

	it("spells SOS as three short, three long, three short", () => {
		expect(PATTERNS.sos.elements.join(" ")).toBe(
			"short short short long long long short short short",
		);
	});
});

describe("scheduleSignal", () => {
	it("uses 1 s short and 5 s long blasts with 1 s gaps", () => {
		const sounds = scheduleSignal("long-short-long-short");

		expect(sounds.map((sound) => sound.duration)).toEqual([5, 1, 5, 1]);
		expect(sounds.map((sound) => sound.start)).toEqual([0, 6, 8, 14]);
		expect(signalLength(sounds)).toBe(15);
	});

	it("leaves about 2 s between the two blasts of a stopped power vessel", () => {
		const sounds = scheduleSignal("fog-power-stopped");

		expect(sounds.map((sound) => sound.start)).toEqual([0, 7]);
		expect(signalLength(sounds)).toBe(12);
	});

	it("plays SOS at Morse speed so the long blasts stay distinct but short", () => {
		const sounds = scheduleSignal("sos");

		expect(sounds[0]?.duration).toBeLessThan(sounds[3]?.duration ?? 0);
		expect(signalLength(sounds)).toBeLessThan(10);
	});
});
