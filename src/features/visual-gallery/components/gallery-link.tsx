import { Link } from "@tanstack/react-router";
import type { VisualId } from "@/content/types";
import { cn } from "@/lib/utils";

interface IGalleryLinkProps {
	to: VisualId | undefined;
	active: boolean;
	label: string;
}

export default function GalleryLink({ to, active, label }: IGalleryLinkProps) {
	return (
		<Link
			to="/vizuali"
			search={to ? { v: to } : {}}
			aria-current={active ? "page" : undefined}
			className={cn(
				"rounded-full border px-3 py-1 text-[0.8rem] font-medium no-underline",
				active
					? "border-ink bg-brand text-white hover:text-white"
					: "border-ink/15 bg-paper text-ink hover:border-[#00aef3] hover:text-ink",
			)}
		>
			{label}
		</Link>
	);
}
