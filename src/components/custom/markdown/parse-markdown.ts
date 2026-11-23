export type InlineNode =
	| { kind: "text"; key: string; text: string }
	| { kind: "break"; key: string }
	| { kind: "strong" | "em"; key: string; children: InlineNode[] }
	| { kind: "link"; key: string; href: string; children: InlineNode[] };

type UnkeyedInline = InlineNode extends infer Node
	? Node extends InlineNode
		? Omit<Node, "key">
		: never
	: never;

export type BlockNode =
	| { kind: "paragraph"; key: string; children: InlineNode[] }
	| {
			kind: "list";
			key: string;
			ordered: boolean;
			/** The first number of an ordered list, so "3." starts at 3. */
			start: number;
			items: { key: string; children: InlineNode[] }[];
	  };

// Markers need text right next to them, so "2 * 3 * 4" stays arithmetic.
const INLINE_PATTERN =
	/\*\*(?!\s)(.+?)(?<!\s)\*\*|\*(?!\s)([^*]+?)(?<!\s)\*|\[([^\]]+)\]\(/;

const LIST_ITEM_PATTERN = /^\s*(?:([-*])|(\d+)\.)\s+(.*)$/;

// "23. studenoga" is a date, not the 23rd item of a list.
const MONTH_PATTERN =
	/^(?:siječnja|veljače|ožujka|travnja|svibnja|lipnja|srpnja|kolovoza|rujna|listopada|studenoga?|prosinca)\b/;

// Content is ours, but the renderer still refuses script and data URLs so a typo can never become one.
const SAFE_HREF_PATTERN = /^(?:https?:\/\/|mailto:|\/(?![/\\]|%5c)|#)/i;

export function isSafeHref(href: string): boolean {
	return SAFE_HREF_PATTERN.test(href);
}

/** Reads a link target up to its closing parenthesis, allowing balanced parentheses inside; null when it never closes. */
function readHref(
	text: string,
	from: number,
): { href: string; end: number } | null {
	let depth = 1;

	for (let index = from; index < text.length; index++) {
		const character = text[index];

		if (character === undefined || /\s/.test(character)) {
			return null;
		}

		if (character === "(") {
			depth++;
		} else if (character === ")" && --depth === 0) {
			return { href: text.slice(from, index), end: index + 1 };
		}
	}

	return null;
}

export function parseInline(text: string, keyPrefix = "i"): InlineNode[] {
	const nodes: InlineNode[] = [];
	let rest = text;

	function push(node: UnkeyedInline) {
		nodes.push({ ...node, key: `${keyPrefix}.${nodes.length}` } as InlineNode);
	}

	while (rest.length > 0) {
		const match = INLINE_PATTERN.exec(rest);

		if (!match) {
			push({ kind: "text", text: rest });
			break;
		}

		if (match.index > 0) {
			push({ kind: "text", text: rest.slice(0, match.index) });
		}

		const [whole, strong, em, linkText] = match;
		const nodeKey = `${keyPrefix}.${nodes.length}`;
		let consumed = match.index + whole.length;

		if (strong !== undefined) {
			push({ kind: "strong", children: parseInline(strong, nodeKey) });
		} else if (em !== undefined) {
			push({ kind: "em", children: parseInline(em, nodeKey) });
		} else {
			const target = readHref(rest, consumed);

			if (target && isSafeHref(target.href)) {
				push({
					kind: "link",
					href: target.href,
					children: parseInline(linkText ?? "", nodeKey),
				});
				consumed = target.end;
			} else if (target) {
				push({ kind: "text", text: linkText ?? "" });
				consumed = target.end;
			} else {
				push({ kind: "text", text: whole });
			}
		}

		rest = rest.slice(consumed);
	}

	return nodes;
}

function paragraph(lines: string[], key: string): BlockNode {
	const children = lines.flatMap((line, index) => {
		const lineKey = `${key}.${index}`;
		const inline = parseInline(line, lineKey);

		return index === 0
			? inline
			: [{ kind: "break" as const, key: `${lineKey}.br` }, ...inline];
	});

	return { kind: "paragraph", key, children };
}

/** Paragraphs split by blank lines, single line breaks kept, and "-" or "1." lists; nothing else. */
export function parseMarkdown(markdown: string): BlockNode[] {
	const blocks: BlockNode[] = [];
	let lines: string[] = [];

	function flushParagraph() {
		if (lines.length > 0) {
			blocks.push(paragraph(lines, `b${blocks.length}`));
			lines = [];
		}
	}

	for (const line of markdown.split("\n")) {
		const match = LIST_ITEM_PATTERN.exec(line);
		const item =
			match && !(match[2] !== undefined && MONTH_PATTERN.test(match[3] ?? ""))
				? match
				: null;

		if (line.trim() === "") {
			flushParagraph();
			continue;
		}

		if (!item) {
			lines.push(line.trim());
			continue;
		}

		flushParagraph();

		const ordered = item[2] !== undefined;
		const last = blocks.at(-1);
		const list =
			last?.kind === "list" && last.ordered === ordered ? last : null;

		const target = list ?? {
			kind: "list" as const,
			key: `b${blocks.length}`,
			ordered,
			start: ordered ? Number(item[2]) : 1,
			items: [],
		};

		const itemKey = `${target.key}.${target.items.length}`;

		target.items.push({
			key: itemKey,
			children: parseInline(item[3] ?? "", itemKey),
		});

		if (!list) {
			blocks.push(target);
		}
	}

	flushParagraph();

	return blocks;
}
