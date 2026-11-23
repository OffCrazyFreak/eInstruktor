import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { LIGHT } from "@/features/landing/constants/palette";
import { cn } from "@/lib/utils";

interface IGlassPanelProps {
	children: ReactNode;
	className?: string;
	dark?: boolean;
}

/** Translucent panel built on the shadcn Card so text stays legible over the sky. */
export default function GlassPanel({
	children,
	className,
	dark,
}: IGlassPanelProps) {
	return (
		<Card
			className={cn(
				"block rounded-[var(--radius)] border p-7 shadow-none backdrop-blur-md",
				className,
			)}
			style={
				dark
					? {
							background: "rgba(4,18,44,0.55)",
							borderColor: "rgba(180,214,255,0.16)",
							color: LIGHT,
						}
					: {
							background: "rgba(255,255,255,0.68)",
							borderColor: "rgba(0,44,120,0.12)",
						}
			}
		>
			{children}
		</Card>
	);
}
