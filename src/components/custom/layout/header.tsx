import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import GoogleIcon from "@/components/custom/icons/google-icon";
import BrandMark from "@/components/custom/layout/brand-mark";
import Wordmark from "@/components/custom/layout/wordmark";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import signInWithGoogle from "@/lib/auth/sign-in-with-google";

// Real routes instead of landing anchors, so the links work on the legal pages and the gallery too.
const NAV = [
	{ label: "Lekcije", to: "/ucenje" },
	{ label: "Vježba", to: "/vjezba" },
	{ label: "Ispit", to: "/ispit" },
] as const;

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#002c78]/10 bg-white/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
				<Link
					to="/"
					className="flex items-center gap-2"
					aria-label="eInstruktor, naslovnica"
				>
					<BrandMark />
					<Wordmark />
				</Link>

				<nav
					className="hidden items-center gap-8 md:flex"
					aria-label="Glavna navigacija"
				>
					{NAV.map((n) => (
						<Link
							key={n.label}
							to={n.to}
							className="group relative text-sm font-medium text-[#002c78] data-[status=active]:text-[#00aef3]"
						>
							{n.label}
							<span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#00aef3] transition-transform duration-300 ease-out group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
						</Link>
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
										<Link
											to={n.to}
											className="rounded-lg px-3 py-3 text-base font-medium text-[#002c78]/80 transition-colors hover:bg-[#eaf3fd] hover:text-[#002c78]"
										>
											{n.label}
										</Link>
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
