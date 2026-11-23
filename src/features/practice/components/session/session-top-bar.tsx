import { Link } from "@tanstack/react-router";
import { Flag, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ISessionTopBarProps {
	title: string;
	closeTo: "/vjezba" | "/vjezba/usmeno";
	closeLabel: string;
	/** Replaces the close link with a button, so the caller can ask before leaving. */
	onClose?: () => void;
	/** Null on the end screen, which has no position or bar. */
	position: { current: number; total: number } | null;
	/** Read out before the position, such as "Kartica 3 / 7". */
	itemLabel?: string;
	flag?: { flagged: boolean; onToggle: () => void };
}

const ICON_BUTTON_CLASS =
	"grid size-11 shrink-0 place-items-center rounded-full text-primary outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:text-foreground";

export default function SessionTopBar({
	title,
	closeTo,
	closeLabel,
	onClose,
	position,
	itemLabel = "Pitanje",
	flag,
}: ISessionTopBarProps) {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-2 sm:px-4">
				{onClose ? (
					<button
						type="button"
						onClick={onClose}
						aria-label={closeLabel}
						aria-haspopup="dialog"
						className={ICON_BUTTON_CLASS}
					>
						<X className="size-6" aria-hidden="true" />
					</button>
				) : (
					<Link
						to={closeTo}
						aria-label={closeLabel}
						className={ICON_BUTTON_CLASS}
					>
						<X className="size-6" aria-hidden="true" />
					</Link>
				)}

				<p className="min-w-0 flex-1 truncate text-[0.95rem] font-semibold">
					{title}
				</p>

				{position && (
					<p className="shrink-0 font-mono text-[0.9rem] tabular-nums">
						<span className="sr-only">{itemLabel} </span>
						{position.current} / {position.total}
					</p>
				)}

				{flag && (
					<button
						type="button"
						onClick={flag.onToggle}
						aria-pressed={flag.flagged}
						aria-label="Označi za kasnije"
						title={flag.flagged ? "Označeno za kasnije" : "Označi za kasnije"}
						className={cn(
							ICON_BUTTON_CLASS,
							flag.flagged && "text-[#c27400] dark:text-[#ffb43c]",
						)}
					>
						<Flag
							className="size-5"
							fill={flag.flagged ? "currentColor" : "none"}
							aria-hidden="true"
						/>
					</button>
				)}
			</div>

			{position && (
				<div
					role="progressbar"
					aria-label="Napredak serije"
					aria-valuemin={0}
					aria-valuemax={position.total}
					aria-valuenow={position.current - 1}
					className="h-1 bg-[#eaf3ff] dark:bg-accent"
				>
					<div
						className="h-full origin-left bg-[#00aef3] transition-transform motion-reduce:transition-none"
						style={{
							transform: `scaleX(${(position.current - 1) / position.total})`,
						}}
					/>
				</div>
			)}
		</header>
	);
}
