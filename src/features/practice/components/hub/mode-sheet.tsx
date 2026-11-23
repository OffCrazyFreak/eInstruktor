import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { ExamLevel } from "@/content/course-types";
import ModeSheetBody from "@/features/practice/components/hub/mode-sheet-body";
import type { IPracticeContext } from "@/features/practice/utils/practice-pool";
import type { PracticeMode } from "@/features/practice/utils/practice-search";

interface IModeSheetProps {
	/** The mode being set up; null keeps the sheet closed. */
	mode: PracticeMode | null;
	learnerLevel: ExamLevel;
	context: IPracticeContext;
	onClose: () => void;
}

export default function ModeSheet({
	mode,
	learnerLevel,
	context,
	onClose,
}: IModeSheetProps) {
	return (
		<Sheet open={mode !== null} onOpenChange={(open) => !open && onClose()}>
			<SheetContent
				side="bottom"
				className="mx-auto max-h-[90svh] max-w-xl gap-0 overflow-y-auto rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				{mode && (
					<ModeSheetBody
						key={mode}
						mode={mode}
						learnerLevel={learnerLevel}
						context={context}
					/>
				)}
			</SheetContent>
		</Sheet>
	);
}
