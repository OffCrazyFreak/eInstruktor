import type { IExamBlock } from "@/features/exam/utils/exam-blocks";

interface ISubjectHeaderProps {
	block: IExamBlock;
	blockNumber: number;
	blockCount: number;
	/** Position inside the block, from 0. */
	positionInBlock: number;
}

export default function SubjectHeader({
	block,
	blockNumber,
	blockCount,
	positionInBlock,
}: ISubjectHeaderProps) {
	return (
		<div className="mb-5 border-l-4 border-[#00aef3] pl-3">
			<p className="font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-ocean dark:text-[#4cc2ff]">
				{blockCount > 1
					? `PREDMET ${blockNumber} OD ${blockCount}`
					: "JEDAN PREDMET"}
			</p>
			<h1 className="mt-0.5 font-serif text-xl leading-snug">{block.label}</h1>
			<p className="mt-0.5 text-[0.85rem] text-muted-foreground">
				Pitanje {positionInBlock + 1} od {block.questions.length}
			</p>
		</div>
	);
}
