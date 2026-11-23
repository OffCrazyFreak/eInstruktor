import { CircleCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ILessonActionBarProps {
	done: boolean;
	nextLabel: string;
	onFinish: () => void;
	onUnread: () => void;
	onNext: () => void;
}

export default function LessonActionBar({
	done,
	nextLabel,
	onFinish,
	onUnread,
	onNext,
}: ILessonActionBarProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:left-24">
			<div className="mx-auto flex max-w-2xl gap-2 px-4 py-3">
				{done ? (
					<>
						<Button
							type="button"
							variant="outline"
							onClick={onUnread}
							className="h-12 flex-1 rounded-full text-[0.95rem] font-semibold sm:flex-none sm:px-5"
						>
							<RotateCcw className="size-4" aria-hidden="true" />
							Vrati u nepročitano
						</Button>
						<Button
							type="button"
							onClick={onNext}
							className="h-12 flex-1 rounded-full text-[0.95rem] font-semibold"
						>
							{nextLabel}
						</Button>
					</>
				) : (
					<Button
						type="button"
						onClick={onFinish}
						className="h-12 w-full rounded-full text-[1rem] font-semibold"
					>
						<CircleCheck className="size-5" aria-hidden="true" />
						Označi kao gotovo i nastavi
					</Button>
				)}
			</div>
		</div>
	);
}
