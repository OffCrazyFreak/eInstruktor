import { HardDrive } from "lucide-react";
import GoogleSignInButton from "@/components/custom/auth/google-sign-in-button";

/** The quiet note for anonymous learners; it promises only what sign-in does today. */
export default function LocalOnlyCard() {
	return (
		<section
			aria-labelledby="local-only-title"
			className="rounded-[1.4rem] border border-dashed border-[#002c78]/25 p-4 sm:p-5 dark:border-white/20"
		>
			<h2
				id="local-only-title"
				className="flex items-center gap-2 font-semibold"
			>
				<HardDrive
					className="size-4 text-[#0a63b0] dark:text-[#4cc2ff]"
					aria-hidden="true"
				/>
				Napredak je samo u ovom pregledniku
			</h2>
			<p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
				Ako očistiš podatke preglednika, nestaje. Prijava Googleom sprema ga na
				račun i prenosi na drugi uređaj, a što si već riješio, ostaje. Besplatno
				je i ostaje.
			</p>
			<GoogleSignInButton className="mt-4" />
		</section>
	);
}
