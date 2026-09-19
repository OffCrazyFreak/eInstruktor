import { Badge } from "@/components/ui/badge";
import { cta } from "@/features/landing/content";
import { cn } from "@/lib/utils";

/** The "100% besplatno" chip, built on the shadcn Badge. */
export function FreeChip({ onDark }: { onDark?: boolean }) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-2 rounded-full px-3 py-1.5 font-mono text-[0.72rem] font-normal tracking-wide",
				onDark
					? "border-white/40 text-[#eaf3ff]"
					: "border-[#00aef3]/55 text-[#0a63b0]",
			)}
		>
			<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00aef3]" />
			{cta.free}
		</Badge>
	);
}
