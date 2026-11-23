import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface IPlayToggleProps {
	playing: boolean;
	onToggle: () => void;
	tone?: "day" | "night";
	playLabel?: string;
	pauseLabel?: string;
}

export default function PlayToggle({
	playing,
	onToggle,
	tone = "day",
	playLabel = "Pokreni",
	pauseLabel = "Zaustavi",
}: IPlayToggleProps) {
	const label = playing ? pauseLabel : playLabel;

	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={label}
			title={label}
			className={cn(
				"inline-flex size-10 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
				tone === "day"
					? "bg-[#002c78] text-white hover:bg-[#0a63b0]"
					: "bg-[#ffb43c] text-[#04142e] hover:bg-[#ffe89a]",
			)}
		>
			{playing ? (
				<Pause className="size-4" aria-hidden />
			) : (
				<Play className="size-4 translate-x-px" aria-hidden />
			)}
		</button>
	);
}
