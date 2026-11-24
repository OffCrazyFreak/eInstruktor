import { Link } from "@tanstack/react-router";
import { Gauge, LogOut, UserRound } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IViewer } from "@/lib/auth/auth-status-context";
import signInWithGoogle from "@/lib/auth/sign-in-with-google";
import useAuthStatus from "@/lib/auth/use-auth-status";
import useSignOut from "@/lib/auth/use-sign-out";

const ROUND_BUTTON =
	"grid size-11 place-items-center overflow-hidden rounded-full border border-ink/20 bg-card text-primary outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:border-white/20";

const MENU_ITEM = "min-h-11 cursor-pointer gap-2.5 px-3 text-[0.95rem]";

function avatarContent(user: IViewer) {
	if (user.image) {
		return (
			<img
				src={user.image}
				alt=""
				referrerPolicy="no-referrer"
				className="size-full object-cover"
			/>
		);
	}

	return (
		<span className="font-semibold" aria-hidden="true">
			{user.name.trim().charAt(0).toUpperCase() || "?"}
		</span>
	);
}

/** "Prijava" for an anonymous learner, a menu with Napredak, Račun and Odjava once signed in; nothing while sign-in is off. */
export default function AccountMenu() {
	const { googleSignIn, viewer } = useAuthStatus();
	const signOut = useSignOut();

	if (viewer.status === "loading") {
		return <span className="size-11" aria-hidden="true" />;
	}

	if (viewer.status === "anonymous") {
		if (!googleSignIn) {
			return null;
		}

		return (
			<button
				type="button"
				onClick={() => signInWithGoogle()}
				aria-label="Prijava Googleom"
				title="Prijava Googleom"
				className={ROUND_BUTTON}
			>
				<UserRound className="size-5" aria-hidden="true" />
			</button>
		);
	}

	const { user } = viewer;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label={`Račun: ${user.name}`}
				className={ROUND_BUTTON}
			>
				{avatarContent(user)}
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-64 rounded-2xl p-1.5">
				<DropdownMenuLabel className="px-3 py-2">
					<span className="block truncate font-semibold">{user.name}</span>
					<span className="block truncate text-[0.82rem] font-normal text-muted-foreground">
						{user.email}
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild className={MENU_ITEM}>
					<Link to="/napredak">
						<Gauge aria-hidden="true" />
						Napredak
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className={MENU_ITEM}>
					<Link to="/racun">
						<UserRound aria-hidden="true" />
						Račun
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className={MENU_ITEM} onSelect={() => signOut()}>
					<LogOut aria-hidden="true" />
					Odjava
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
