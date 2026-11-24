import {
	Bookmark,
	History,
	type LucideIcon,
	PenLine,
	TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CalloutKind = "remember" | "warning" | "example" | "source-note";

interface ICalloutBlockProps {
	kind: CalloutKind;
	title?: string;
	children: ReactNode;
}

const CALLOUTS: Record<
	CalloutKind,
	{ label: string; icon: LucideIcon; className: string; iconClassName: string }
> = {
	remember: {
		label: "Zapamti",
		icon: Bookmark,
		className: "border-[#00aef3]/45 bg-tint dark:bg-accent",
		iconClassName: "text-ocean dark:text-[#4cc2ff]",
	},
	warning: {
		label: "Pažnja",
		icon: TriangleAlert,
		className: "border-[#ffb43c]/70 bg-[#fff6e6] dark:bg-[#3a2a0c]",
		iconClassName: "text-[#a35f00] dark:text-[#ffd48a]",
	},
	example: {
		label: "Primjer",
		icon: PenLine,
		className: "border-dashed border-ocean/40 bg-card",
		iconClassName: "text-ocean dark:text-[#4cc2ff]",
	},
	"source-note": {
		label: "Napomena o izvoru",
		icon: History,
		className: "border-border bg-muted",
		iconClassName: "text-muted-foreground",
	},
};

export default function CalloutBlock({
	kind,
	title,
	children,
}: ICalloutBlockProps) {
	const { label, icon: Icon, className, iconClassName } = CALLOUTS[kind];

	return (
		<div
			role="note"
			aria-label={label}
			className={cn("rounded-2xl border-2 p-4 sm:p-5", className)}
		>
			<p
				className={cn(
					"flex items-center gap-2 font-mono text-[0.74rem] font-semibold tracking-[0.16em]",
					iconClassName,
				)}
			>
				<Icon className="size-4" aria-hidden="true" />
				{label.toUpperCase()}
			</p>

			{title && <p className="mt-2 font-semibold">{title}</p>}

			<div className="mt-2 text-[1rem] leading-relaxed">{children}</div>
		</div>
	);
}
