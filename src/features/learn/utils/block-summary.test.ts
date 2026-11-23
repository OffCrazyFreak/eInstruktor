import { describe, expect, it } from "vitest";
import { blockSummary } from "@/features/learn/utils/block-summary";

describe("blockSummary", () => {
	it("takes the first line of text without markdown marks", () => {
		expect(
			blockSummary({
				type: "text",
				level: "B",
				markdown: "\n**Jahte** do 18 m\n\nDrugi odlomak",
			}),
		).toBe("Jahte do 18 m");
	});

	it("shortens long text", () => {
		const summary = blockSummary({
			type: "warning",
			level: "B",
			markdown: "a".repeat(200),
		});

		expect(summary.length).toBeLessThan(100);
		expect(summary.endsWith("...")).toBe(true);
	});

	it("uses titles and captions where a block has them", () => {
		expect(
			blockSummary({
				type: "table",
				level: "B",
				caption: "Svjetla",
				columns: [],
				rows: [],
			}),
		).toBe("Svjetla");
		expect(blockSummary({ type: "check", level: "B", questionId: "x" })).toBe(
			"Pitanje za provjeru",
		);
	});
});
