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
					? "border-[#002c78] bg-[#002c78] text-white hover:text-white"
					: "border-[#002c78]/15 bg-white text-[#002c78] hover:border-[#00aef3] hover:text-[#002c78]",
			)}
		>
			{label}
		</Link>
	);
}
