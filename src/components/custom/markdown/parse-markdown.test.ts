import { describe, expect, it } from "vitest";
import {
	isSafeHref,
	parseInline,
	parseMarkdown,
} from "@/components/custom/markdown/parse-markdown";

function plain(nodes: ReturnType<typeof parseInline>): unknown[] {
	return nodes.map((node) => {
		switch (node.kind) {
			case "text":
				return node.text;
			case "break":
				return "<br>";
			case "link":
				return { link: node.href, children: plain(node.children) };
			default:
				return { [node.kind]: plain(node.children) };
		}
	});
}

describe("parseInline", () => {
	it("reads bold, italics and links", () => {
		expect(
			plain(parseInline("Uzmi **B**, *ne* [A](https://example.com).")),
		).toEqual([
			"Uzmi ",
			{ strong: ["B"] },
			", ",
			{ em: ["ne"] },
			" ",
			{ link: "https://example.com", children: ["A"] },
			".",
		]);
	});

	it("turns an unsafe link into its plain text", () => {
		expect(plain(parseInline("[klik](javascript:alert(1))"))).toEqual(["klik"]);
		expect(isSafeHref("data:text/html,x")).toBe(false);
		expect(isSafeHref("//evil.example")).toBe(false);
		expect(isSafeHref("/ucenje")).toBe(true);
	});

	it("refuses links that browsers read as another host", () => {
		expect(isSafeHref("/\\evil.example")).toBe(false);
		expect(isSafeHref("/%5Cevil.example")).toBe(false);
		expect(isSafeHref("/%5cevil.example")).toBe(false);
	});

	it("keeps balanced parentheses inside a link target", () => {
		expect(
			plain(
				parseInline(
					"[COLREG](https://hr.wikipedia.org/wiki/COLREG_(1972)) je pravilnik",
				),
			),
		).toEqual([
			{
				link: "https://hr.wikipedia.org/wiki/COLREG_(1972)",
				children: ["COLREG"],
			},
			" je pravilnik",
		]);
	});

	it("does not italicise arithmetic with spaced stars", () => {
		expect(plain(parseInline("2 * 3 * 4 = 24"))).toEqual(["2 * 3 * 4 = 24"]);
		expect(plain(parseInline("a *b* c"))).toEqual(["a ", { em: ["b"] }, " c"]);
	});

	it("leaves HTML as text", () => {
		expect(plain(parseInline("<b>x</b>"))).toEqual(["<b>x</b>"]);
	});
});

describe("parseMarkdown", () => {
	it("splits paragraphs on blank lines and keeps single line breaks", () => {
		const blocks = parseMarkdown("Prvi red\ndrugi red\n\nNovi odlomak");

		expect(blocks.map((block) => block.kind)).toEqual([
			"paragraph",
			"paragraph",
		]);
		expect(
			blocks[0]?.kind === "paragraph" && plain(blocks[0].children),
		).toEqual(["Prvi red", "<br>", "drugi red"]);
	});

	it("reads ordered and unordered lists", () => {
		const blocks = parseMarkdown(
			"**Koraci**\n\n1. **Prvi.** Odmah\n2. Drugi\n\n- jedan\n- dva",
		);

		expect(
			blocks.map((block) =>
				block.kind === "list" ? `list:${block.ordered}` : block.kind,
			),
		).toEqual(["paragraph", "list:true", "list:false"]);

		const ordered = blocks[1];

		expect(
			ordered?.kind === "list" &&
				ordered.items.map((item) => plain(item.children)),
		).toEqual([[{ strong: ["Prvi."] }, " Odmah"], ["Drugi"]]);
	});

	it("starts an ordered list at its first number", () => {
		const [list] = parseMarkdown("3. treći\n4. četvrti");

		expect(list?.kind === "list" && list.start).toBe(3);
	});

	it("reads a line that starts with a date as text, not as a list", () => {
		const [block] = parseMarkdown("23. studenoga 2026. stižu nova pravila");

		expect(block?.kind).toBe("paragraph");
	});

	it("gives every node a unique key", () => {
		const keys = parseMarkdown("a **b** *c*\n\n- d\n- e").flatMap((block) =>
			block.kind === "list"
				? [block.key, ...block.items.map((item) => item.key)]
				: [block.key],
		);

		expect(new Set(keys).size).toBe(keys.length);
	});
});
