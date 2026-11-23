import SafeMarkdown from "@/components/custom/markdown/safe-markdown";
import VisualFrame from "@/components/custom/visuals/visual-frame";
import type { LessonBlock as LessonBlockData } from "@/content/types";
import CalloutBlock from "@/features/learn/components/blocks/callout-block";
import CheckBlock from "@/features/learn/components/blocks/check-block";
import TableBlock from "@/features/learn/components/blocks/table-block";

interface ILessonBlockProps {
	block: LessonBlockData;
	lessonSlug: string;
	sessionId: string;
}

export default function LessonBlock({
	block,
	lessonSlug,
	sessionId,
}: ILessonBlockProps) {
	switch (block.type) {
		case "text":
			return (
				<SafeMarkdown
					markdown={block.markdown}
					className="text-[1.05rem] leading-relaxed"
				/>
			);
		case "remember":
			return (
				<CalloutBlock kind="remember" title={block.title}>
					<ul className="list-disc space-y-1.5 pl-5">
						{block.items.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</CalloutBlock>
			);
		case "warning":
		case "source-note":
			return (
				<CalloutBlock kind={block.type}>
					<SafeMarkdown markdown={block.markdown} />
				</CalloutBlock>
			);
		case "example":
			return (
				<CalloutBlock kind="example" title={block.title}>
					<SafeMarkdown markdown={block.markdown} />
				</CalloutBlock>
			);
		case "table":
			return (
				<TableBlock
					caption={block.caption}
					columns={block.columns}
					rows={block.rows}
				/>
			);
		case "visual":
			return (
				<VisualFrame
					visual={block.visual}
					caption={block.caption}
					props={block.props}
				/>
			);
		case "check":
			return (
				<CheckBlock
					questionId={block.questionId}
					lessonSlug={lessonSlug}
					sessionId={sessionId}
				/>
			);
	}
}
