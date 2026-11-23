import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { pluralHr } from "@/lib/plural";

interface ILeaveSetSheetProps {
	open: boolean;
	/** Answers already given in this set; they stay saved either way. */
	answered: number;
	onOpenChange: (open: boolean) => void;
}

export default function LeaveSetSheet({
	open,
	answered,
	onOpenChange,
}: ILeaveSetSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="mx-auto max-w-xl gap-0 rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				<SheetTitle className="pr-10 font-serif text-xl">
					Prekinuti seriju?
				</SheetTitle>
				<SheetDescription className="mt-1">
					{answered} {pluralHr(answered, "odgovor", "odgovora", "odgovora")} iz
					ove serije ostaje spremljeno, ali kraj serije s rezultatom nećeš
					vidjeti.
				</SheetDescription>

				<div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
					<SheetClose asChild>
						<Button className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1">
							Nastavi seriju
						</Button>
					</SheetClose>
					<Button
						asChild
						variant="outline"
						className="h-12 rounded-full text-[1rem] font-semibold sm:flex-1"
					>
						<Link to="/vjezba">Izađi</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
