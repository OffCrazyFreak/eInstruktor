import { Link } from "@tanstack/react-router";
import { APP_NAV_ITEMS } from "@/components/custom/app-shell/app-nav-items";

export default function BottomNav() {
	return (
		<nav
			aria-label="Glavna navigacija"
			className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
		>
			<ul className="mx-auto grid max-w-xl grid-cols-5 gap-1 px-1">
				{APP_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
					<li key={to}>
						<Link
							to={to}
							className="group relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.72rem] font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 data-[status=active]:text-primary"
						>
							<span
								aria-hidden="true"
								className="absolute top-0 h-0.5 w-8 rounded-full bg-transparent group-data-[status=active]:bg-[#00aef3]"
							/>
							<Icon className="size-5" aria-hidden="true" />
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
