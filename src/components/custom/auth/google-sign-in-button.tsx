import GoogleIcon from "@/components/custom/icons/google-icon";
import { Button } from "@/components/ui/button";
import signInWithGoogle from "@/lib/auth/sign-in-with-google";
import useAuthStatus from "@/lib/auth/use-auth-status";
import { cn } from "@/lib/utils";

interface IGoogleSignInButtonProps {
	className?: string;
	/** Where to come back after sign-in; the current page by default. */
	returnTo?: string;
}

/** The Google sign-in button, or a plain note when sign-in is not configured on this server. */
export default function GoogleSignInButton({
	className,
	returnTo,
}: IGoogleSignInButtonProps) {
	const { googleSignIn } = useAuthStatus();

	if (!googleSignIn) {
		return (
			<p className={cn("text-[0.9rem] text-muted-foreground", className)}>
				Prijava trenutačno nije uključena, pa se napredak sprema samo u ovom
				pregledniku.
			</p>
		);
	}

	return (
		<Button
			type="button"
			onClick={() => signInWithGoogle(returnTo)}
			className={cn("h-12 gap-2 rounded-full px-6 font-semibold", className)}
		>
			<GoogleIcon className="size-4" />
			Prijava Googleom
		</Button>
	);
}
