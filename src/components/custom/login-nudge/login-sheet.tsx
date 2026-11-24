import { Cloud } from "lucide-react";
import GoogleSignInButton from "@/components/custom/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";

interface ILoginSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
}

// Promises only what sign-in does today (UX research section 8): no reminders, no email.
export default function LoginSheet({
	open,
	onOpenChange,
	title,
}: ILoginSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="mx-auto max-h-[90svh] max-w-xl gap-0 overflow-y-auto rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				<span className="grid size-12 place-items-center rounded-2xl bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
					<Cloud className="size-6" aria-hidden="true" />
				</span>

				<SheetTitle className="mt-4 font-serif text-xl">{title}</SheetTitle>
				<SheetDescription asChild>
					<div className="mt-2 space-y-2 text-[0.95rem] leading-relaxed">
						<p>
							Besplatno je i ostaje. Prijava Googleom sprema tvoj napredak i
							prenosi ga na drugi uređaj. Što si već riješio, ostaje.
						</p>
						<p>
							Bez prijave napredak je samo u ovom pregledniku i nestaje ako
							očistiš njegove podatke.
						</p>
					</div>
				</SheetDescription>

				<GoogleSignInButton className="mt-6 w-full" />

				<SheetClose asChild>
					<Button
						type="button"
						variant="ghost"
						className="mt-2 h-12 w-full rounded-full text-[1rem] font-semibold"
					>
						Ne sada
					</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}
