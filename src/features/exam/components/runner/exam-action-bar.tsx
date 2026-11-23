import { ChevronLeft, ChevronRight, LayoutGrid, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IExamActionBarProps {
	isFirst: boolean;
	isLast: boolean;
	onPrevious: () => void;
	onNext: () => void;
	onOpenGrid: () => void;
	onSubmit: () => void;
}

export default function ExamActionBar({
	isFirst,
	isLast,
	onPrevious,
	onNext,
	onOpenGrid,
	onSubmit,
}: IExamActionBarProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:left-24">
			<div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
				<Button
					type="button"
					variant="outline"
					onClick={onPrevious}
					disabled={isFirst}
					className="h-12 flex-1 rounded-full text-[0.95rem] font-semibold"
				>
					<ChevronLeft className="size-5" aria-hidden="true" />
					Prethodno
				</Button>

				<Button
					type="button"
					variant="outline"
					onClick={onOpenGrid}
					aria-label="Pregled svih pitanja"
					className="h-12 shrink-0 rounded-full px-4 text-[0.95rem] font-semibold"
				>
					<LayoutGrid className="size-5" aria-hidden="true" />
					<span className="hidden sm:inline">Pregled</span>
				</Button>

				{isLast ? (
					<Button
						type="button"
						onClick={onSubmit}
						className="h-12 flex-1 rounded-full text-[0.95rem] font-semibold"
					>
						Predaj
						<Send className="size-4" aria-hidden="true" />
					</Button>
				) : (
					<Button
						type="button"
						onClick={onNext}
						className="h-12 flex-1 rounded-full text-[0.95rem] font-semibold"
					>
						Sljedeće
						<ChevronRight className="size-5" aria-hidden="true" />
					</Button>
				)}
			</div>
		</div>
	);
}
