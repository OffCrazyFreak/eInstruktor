import { Link } from "@tanstack/react-router";
import { APP_NAV_ITEMS } from "@/components/custom/app-shell/app-nav-items";
import { cn } from "@/lib/utils";

interface INavRailProps {
	/** Without the app top bar the rail starts at the top of the screen. */
	belowTopBar: boolean;
}

export default function NavRail({ belowTopBar }: INavRailProps) {
	return (
		<nav
			aria-label="Glavna navigacija"
			className={cn(
				"fixed bottom-0 left-0 z-30 hidden w-24 border-r border-border bg-card/70 pt-6 lg:block",
				belowTopBar ? "top-16" : "top-0",
			)}
		>
			<ul className="flex flex-col items-center gap-2">
				{APP_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
					<li key={to}>
						<Link
							to={to}
							className="group flex w-20 flex-col items-center gap-1.5 rounded-2xl py-2.5 text-[0.75rem] font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 data-[status=active]:text-primary"
						>
							<span className="grid h-8 w-14 place-items-center rounded-full transition-colors group-hover:bg-accent group-data-[status=active]:bg-tint dark:group-data-[status=active]:bg-accent">
								<Icon className="size-5" aria-hidden="true" />
							</span>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
