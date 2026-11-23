export type InlineNode =
	| { kind: "text"; key: string; text: string }
	| { kind: "break"; key: string }
	| { kind: "strong" | "em"; key: string; children: InlineNode[] }
	| { kind: "link"; key: string; href: string; children: InlineNode[] };

export type BlockNode =
	| { kind: "paragraph"; key: string; children: InlineNode[] }
	| {
			kind: "list";
			key: string;
			ordered: boolean;
			items: { key: string; children: InlineNode[] }[];
	  };

const INLINE_PATTERN = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/;

const LIST_ITEM_PATTERN = /^\s*(?:(-|\*)|(\d+)\.)\s+(.*)$/;

// Content is ours, but the renderer still refuses script and data URLs so a typo can never become one.
const SAFE_HREF_PATTERN = /^(?:https?:\/\/|mailto:|\/(?!\/)|#)/i;

export function isSafeHref(href: string): boolean {
	return SAFE_HREF_PATTERN.test(href);
}

export function parseInline(text: string, keyPrefix = "i"): InlineNode[] {
	const nodes: InlineNode[] = [];
	let rest = text;

	while (rest.length > 0) {
		const match = INLINE_PATTERN.exec(rest);
		const key = `${keyPrefix}.${nodes.length}`;

		if (!match) {
			nodes.push({ kind: "text", key, text: rest });
			break;
		}

		if (match.index > 0) {
			nodes.push({ kind: "text", key, text: rest.slice(0, match.index) });
		}

		const [whole, strong, em, linkText, href] = match;
		const nodeKey = `${keyPrefix}.${nodes.length}`;

		if (strong !== undefined) {
			nodes.push({
				kind: "strong",
				key: nodeKey,
				children: parseInline(strong, nodeKey),
			});
		} else if (em !== undefined) {
			nodes.push({
				kind: "em",
				key: nodeKey,
				children: parseInline(em, nodeKey),
			});
		} else if (
			linkText !== undefined &&
			href !== undefined &&
			isSafeHref(href)
		) {
			nodes.push({
				kind: "link",
				key: nodeKey,
				href,
				children: parseInline(linkText, nodeKey),
			});
		} else {
			nodes.push({ kind: "text", key: nodeKey, text: linkText ?? whole });
		}

		rest = rest.slice(match.index + whole.length);
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
		const item = LIST_ITEM_PATTERN.exec(line);

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
