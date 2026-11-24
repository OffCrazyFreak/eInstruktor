import { Link } from "@tanstack/react-router";
import AccountMenu from "@/components/custom/app-shell/account-menu";
import LevelChip from "@/components/custom/app-shell/level-chip";
import BrandMark from "@/components/custom/layout/brand-mark";
import Wordmark from "@/components/custom/layout/wordmark";

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

					<AccountMenu />
				</div>
			</div>
		</header>
	);
}
