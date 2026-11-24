import { useId, useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface IDeleteAccountDialogProps {
	pending: boolean;
	failed: boolean;
	onConfirm: (clearBrowser: boolean) => void;
}

// An in-page dialog, because native confirm() is unreliable inside embedded browsers.
export default function DeleteAccountDialog({
	pending,
	failed,
	onConfirm,
}: IDeleteAccountDialogProps) {
	const [clearBrowser, setClearBrowser] = useState(false);
	const switchId = useId();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="h-12 w-full rounded-full border-destructive/40 text-[0.98rem] font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto sm:px-6"
				>
					Obriši račun
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent className="rounded-[1.4rem] p-5 sm:p-6">
				<AlertDialogHeader className="text-left">
					<AlertDialogTitle className="font-serif text-xl">
						Obrisati račun?
					</AlertDialogTitle>
					<AlertDialogDescription asChild>
						<div className="space-y-2 text-[0.95rem] leading-relaxed">
							<p>
								Brišemo vezu s Googleom (ID računa i ključeve za prijavu), sve
								tvoje prijave na drugim uređajima, kategoriju i datum ispita.
								Ime, e-mail i sliku zamjenjujemo anonimnim podacima. To se ne
								može poništiti.
							</p>
							<p>
								Odgovori, lekcije i ispiti ostaju u bazi bez veze s tobom, kao
								statistika o tome koja su pitanja teška.
							</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="flex min-h-12 items-center justify-between gap-4 rounded-2xl bg-muted px-4 py-3">
					<label htmlFor={switchId} className="text-[0.95rem] leading-snug">
						Obriši i napredak u ovom pregledniku
					</label>
					<Switch
						id={switchId}
						checked={clearBrowser}
						onCheckedChange={setClearBrowser}
						disabled={pending}
					/>
				</div>

				{failed && (
					<p role="alert" className="text-[0.92rem] text-destructive">
						Brisanje nije uspjelo. Provjeri vezu i pokušaj ponovno.
					</p>
				)}

				<AlertDialogFooter className="mt-2">
					<AlertDialogCancel
						disabled={pending}
						className="h-12 rounded-full text-[0.95rem] font-semibold"
					>
						Odustani
					</AlertDialogCancel>
					<Button
						type="button"
						variant="destructive"
						disabled={pending}
						onClick={() => onConfirm(clearBrowser)}
						className="h-12 rounded-full text-[0.95rem] font-semibold"
					>
						{pending ? "Brišemo račun" : "Obriši račun"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
