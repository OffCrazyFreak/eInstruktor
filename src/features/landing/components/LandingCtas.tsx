import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { cta } from "@/features/landing/content";
import { signInWithGoogle } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

/**
 * The two primary calls to action, shared across concepts. Built on the shadcn
 * Button with brand-blue styling layered on top.
 */
export function LandingCtas({ onDark }: { onDark?: boolean }) {
	return (
		<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
			<Button
				asChild
				className="h-auto rounded-full bg-[#002c78] px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_10px_30px_rgba(0,44,120,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#002c78]"
			>
				<a href="#pocni">{cta.primary}</a>
			</Button>
			<Button
				type="button"
				onClick={signInWithGoogle}
				variant="outline"
				className={cn(
					"h-auto gap-2 rounded-full border px-6 py-3.5 text-[0.98rem] font-semibold transition-transform hover:-translate-y-0.5",
					onDark
						? "border-white/45 bg-transparent text-[#eaf3ff] hover:bg-white/10 hover:text-white"
						: "border-[#0a63b0] bg-transparent text-[#0a63b0] hover:bg-[#0a63b0]/5 hover:text-[#0a63b0]",
				)}
			>
				<GoogleIcon className="h-4 w-4" />
				{cta.secondary}
			</Button>
		</div>
	);
}
