import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { pluralHr } from "@/lib/plural";

interface ISubmitDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	answered: number;
	total: number;
	flagged: number;
	onConfirm: () => void;
}

function openItems(unanswered: number, flagged: number): string {
	const parts = [
		unanswered > 0
			? `${unanswered} ${pluralHr(unanswered, "pitanje je", "pitanja su", "pitanja je")} bez odgovora`
			: null,
		flagged > 0
			? `${flagged} ${pluralHr(flagged, "pitanje je označeno", "pitanja su označena", "pitanja je označeno")}`
			: null,
	].filter(Boolean);

	return parts.length > 0
		? `${parts.join(", a ")}. Pitanje bez odgovora broji se kao netočno.`
		: "Nakon predaje odgovori se više ne mogu mijenjati.";
}

// An in-page dialog, because native confirm() is unreliable inside embedded browsers.
export default function SubmitDialog({
	open,
	onOpenChange,
	answered,
	total,
	flagged,
	onConfirm,
}: ISubmitDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="rounded-[1.4rem] p-5 sm:p-6">
				<AlertDialogHeader className="text-left">
					<AlertDialogTitle className="font-serif text-xl">
						Predati ispit?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-[0.95rem] leading-relaxed">
						Odgovorio si na {answered} od {total}.{" "}
						{openItems(total - answered, flagged)}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="mt-2">
					<AlertDialogCancel className="h-12 rounded-full text-[0.95rem] font-semibold">
						Nastavi ispit
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className="h-12 rounded-full text-[0.95rem] font-semibold"
					>
						Predaj ispit
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
