import type { LessonBlock } from "@/content/types";

const SUMMARY_LENGTH = 90;

function firstLine(markdown: string): string {
	const plain = markdown
		.replace(/\*\*|\*/g, "")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/^\s*(?:-|\d+\.)\s+/gm, "")
		.split("\n")
		.map((line) => line.trim())
		.find((line) => line.length > 0);

	return plain ?? "";
}

function shorten(text: string): string {
	return text.length <= SUMMARY_LENGTH
		? text
		: `${text.slice(0, SUMMARY_LENGTH).trimEnd()}...`;
}

/** One line that tells an A learner what a collapsed B block is about. */
export function blockSummary(block: LessonBlock): string {
	switch (block.type) {
		case "text":
		case "warning":
		case "source-note":
			return shorten(firstLine(block.markdown));
		case "example":
			return shorten(block.title ?? firstLine(block.markdown));
		case "remember":
			return shorten(block.title ?? block.items[0] ?? "Zapamti");
		case "table":
			return shorten(block.caption ?? "Tablica");
		case "visual":
			return shorten(block.caption ?? "Interaktivni prikaz");
		case "check":
			return "Pitanje za provjeru";
	}
}
