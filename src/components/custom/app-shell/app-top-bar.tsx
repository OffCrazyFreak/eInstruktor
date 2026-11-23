import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import LevelChip from "@/components/custom/app-shell/level-chip";
import BrandMark from "@/components/custom/layout/brand-mark";
import Wordmark from "@/components/custom/layout/wordmark";
import signInWithGoogle from "@/lib/auth/sign-in-with-google";

export default function AppTopBar() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
			<div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-6">
				<Link
					to="/"
					className="flex items-center gap-2 rounded-lg"
					aria-label="eInstruktor, naslovnica"
				>
					<BrandMark />
					<span className="hidden min-[400px]:inline">
						<Wordmark />
					</span>
				</Link>

				<div className="flex items-center gap-2">
					<LevelChip />

					<button
						type="button"
						onClick={signInWithGoogle}
						aria-label="Prijava Googleom"
						title="Prijava Googleom"
						className="grid size-10 place-items-center rounded-full border border-[#002c78]/20 bg-card text-primary outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60"
					>
						<UserRound className="size-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</header>
	);
}
