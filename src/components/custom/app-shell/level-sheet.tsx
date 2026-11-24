import type { ReactNode } from "react";
import LevelForm from "@/components/custom/app-shell/level-form";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface ILevelSheetProps {
	/** The element that opens the sheet, such as the level chip. */
	children: ReactNode;
}

export default function LevelSheet({ children }: ILevelSheetProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent
				side="bottom"
				className="mx-auto max-h-[90svh] max-w-xl gap-0 overflow-y-auto rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				<SheetTitle className="font-serif text-xl">
					Za koju kategoriju učiš?
				</SheetTitle>
				<SheetDescription className="mt-1">
					Lekcije, pitanja i procjena spremnosti prate kategoriju koju odabereš.
					Možeš je promijeniti kad god želiš.
				</SheetDescription>

				<LevelForm className="mt-5" />

				<SheetClose asChild>
					<Button className="mt-6 h-12 w-full rounded-full text-[1rem] font-semibold">
						Gotovo
					</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}
