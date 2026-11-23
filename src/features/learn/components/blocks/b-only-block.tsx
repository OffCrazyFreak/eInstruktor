import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import BBadge from "@/features/learn/components/blocks/b-badge";

interface IBOnlyBlockProps {
	/** A learners see a closed one-line summary; B learners see the block open. */
	collapsed: boolean;
	summary: string;
	children: ReactNode;
}

export default function BOnlyBlock({
	collapsed,
	summary,
	children,
}: IBOnlyBlockProps) {
	if (!collapsed) {
		return (
			<div className="border-l-2 border-primary/30 pl-3 sm:pl-4">
				<p className="mb-2">
					<BBadge />
				</p>
				{children}
			</div>
		);
	}

	return (
		<details className="group rounded-2xl border border-dashed border-[#002c78]/25 bg-card dark:border-white/20">
			<summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-3 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 [&::-webkit-details-marker]:hidden">
				<span className="min-w-0 flex-1">
					<BBadge />
					<span className="mt-1 block text-[0.92rem] text-muted-foreground">
						{summary}
					</span>
				</span>
				<ChevronDown
					className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
					aria-hidden="true"
				/>
			</summary>

			<div className="px-4 pb-4">{children}</div>
		</details>
	);
}
