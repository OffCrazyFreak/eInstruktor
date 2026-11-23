import {
	type InlineNode,
	parseMarkdown,
} from "@/components/custom/markdown/parse-markdown";
import { cn } from "@/lib/utils";

interface ISafeMarkdownProps {
	markdown: string;
	className?: string;
}

function renderInline(nodes: InlineNode[]) {
	return nodes.map((node) => {
		switch (node.kind) {
			case "text":
				return <span key={node.key}>{node.text}</span>;
			case "break":
				return <br key={node.key} />;
			case "strong":
				return (
					<strong key={node.key} className="font-semibold">
						{renderInline(node.children)}
					</strong>
				);
			case "em":
				return <em key={node.key}>{renderInline(node.children)}</em>;
			default: {
				const external = /^https?:/i.test(node.href);

				return (
					<a
						key={node.key}
						href={node.href}
						className="font-medium underline underline-offset-2"
						{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
					>
						{renderInline(node.children)}
					</a>
				);
			}
		}
	});
}

/** Renders lesson markdown as React elements: bold, italics, lists, line breaks and safe links only, never raw HTML. */
export default function SafeMarkdown({
	markdown,
	className,
}: ISafeMarkdownProps) {
	return (
		<div className={cn("space-y-3", className)}>
			{parseMarkdown(markdown).map((block) => {
				if (block.kind === "paragraph") {
					return <p key={block.key}>{renderInline(block.children)}</p>;
				}

				const List = block.ordered ? "ol" : "ul";

				return (
					<List
						key={block.key}
						className={cn(
							"space-y-1.5 pl-5",
							block.ordered ? "list-decimal" : "list-disc",
						)}
					>
						{block.items.map((item) => (
							<li key={item.key} className="pl-1">
								{renderInline(item.children)}
							</li>
						))}
					</List>
				);
			})}
		</div>
	);
}
