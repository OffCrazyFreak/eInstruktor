import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { signInWithGoogle } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

/** `active` marks the current page: it stays light blue; the rest are navy. */
const NAV = [
	{ label: "Lekcije", href: "#lekcije", active: false },
	{ label: "Vježba", href: "#vjezba", active: false },
	{ label: "Ispit", href: "#ispit", active: false },
];

function BrandMark() {
	return (
		<svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
			<circle
				cx="16"
				cy="16"
				r="15"
				fill="none"
				stroke="#002c78"
				strokeWidth="2"
			/>
			<path d="M16 3 L19 16 L16 21 L13 16 Z" fill="#00aef3" />
			<path d="M16 29 L13 16 L16 11 L19 16 Z" fill="#002c78" />
			<path d="M3 16 L16 13 L21 16 L16 19 Z" fill="#002c78" opacity="0.5" />
		</svg>
	);
}

function Wordmark() {
	return (
		<span className="text-lg font-semibold tracking-tight text-[#002c78]">
			<span className="text-[#00aef3]">e</span>Instruktor
		</span>
	);
}

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#002c78]/10 bg-white/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
				<a
					href="/"
					className="flex items-center gap-2"
					aria-label="eInstruktor, naslovnica"
				>
					<BrandMark />
					<Wordmark />
				</a>

				<nav
					className="hidden items-center gap-8 md:flex"
					aria-label="Glavna navigacija"
				>
					{NAV.map((n) => (
						<a
							key={n.label}
							href={n.href}
							aria-current={n.active ? "page" : undefined}
							className="group relative text-sm font-medium"
							style={{ color: n.active ? "#00aef3" : "#002c78" }}
						>
							{n.label}
							<span
								className={cn(
									"absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-[#00aef3] transition-transform duration-300 ease-out",
									n.active
										? "scale-x-100"
										: "scale-x-0 group-hover:scale-x-100",
								)}
							/>
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<Button
						type="button"
						onClick={signInWithGoogle}
						variant="outline"
						className="hidden h-9 gap-2 rounded-full border-[#0a63b0] bg-transparent px-4 text-[#0a63b0] hover:bg-[#0a63b0]/5 hover:text-[#0a63b0] md:inline-flex"
					>
						<GoogleIcon className="h-4 w-4" />
						Prijava
					</Button>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full border-[#002c78]/20 bg-transparent text-[#002c78] md:hidden"
								aria-label="Otvori izbornik"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72 bg-white">
							<SheetTitle className="px-5 pt-5 text-[#002c78]">
								<span className="text-[#00aef3]">e</span>Instruktor
							</SheetTitle>
							<nav
								className="mt-6 flex flex-col px-3"
								aria-label="Mobilna navigacija"
							>
								{NAV.map((n) => (
									<SheetClose asChild key={n.label}>
										<a
											href={n.href}
											className="rounded-lg px-3 py-3 text-base font-medium text-[#002c78]/80 transition-colors hover:bg-[#eaf3fd] hover:text-[#002c78]"
										>
											{n.label}
										</a>
									</SheetClose>
								))}
							</nav>
							<div className="mt-4 px-5">
								<SheetClose asChild>
									<Button
										type="button"
										onClick={signInWithGoogle}
										className="w-full gap-2 rounded-full bg-[#002c78] text-white hover:bg-[#002c78]"
									>
										<GoogleIcon className="h-4 w-4" />
										Prijava Googleom
									</Button>
								</SheetClose>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
