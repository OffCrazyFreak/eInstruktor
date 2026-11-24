import { Link } from "@tanstack/react-router";
import { Cloud, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import LevelForm from "@/components/custom/app-shell/level-form";
import { Button } from "@/components/ui/button";
import DeleteAccountDialog from "@/features/account/components/delete-account-dialog";
import useDeleteAccount from "@/features/account/hooks/use-delete-account";
import type { IViewer } from "@/lib/auth/auth-status-context";
import useSignOut from "@/lib/auth/use-sign-out";

interface IAccountPageProps {
	viewer: IViewer;
}

function section(title: string, children: ReactNode) {
	const id = `account-${title.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<section
			aria-labelledby={id}
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id={id} className="font-serif text-xl">
				{title}
			</h2>
			{children}
		</section>
	);
}

export default function AccountPage({ viewer }: IAccountPageProps) {
	const signOut = useSignOut();
	const deletion = useDeleteAccount();

	return (
		<main className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:pt-10">
			<h1 className="font-serif text-3xl leading-tight">Račun</h1>

			<div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
				<div className="space-y-4">
					<section
						aria-label="Prijavljeni račun"
						className="rounded-[1.4rem] bg-[#002c78] p-5 text-[#eaf3ff] sm:p-6 dark:ring-1 dark:ring-white/15"
					>
						<div className="flex items-center gap-4">
							<span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white/15 font-serif text-2xl text-white">
								{viewer.image ? (
									<img
										src={viewer.image}
										alt=""
										referrerPolicy="no-referrer"
										className="size-full object-cover"
									/>
								) : (
									viewer.name.trim().charAt(0).toUpperCase()
								)}
							</span>
							<span className="min-w-0">
								<span className="block truncate text-[1.1rem] font-semibold text-white">
									{viewer.name}
								</span>
								<span className="block truncate text-[0.9rem] text-[#eaf3ff]/80">
									{viewer.email}
								</span>
							</span>
						</div>

						<p className="mt-5 flex gap-2.5 border-t border-white/15 pt-4 text-[0.95rem] leading-relaxed">
							<Cloud
								className="mt-0.5 size-5 shrink-0 text-[#00aef3]"
								aria-hidden="true"
							/>
							Prijavljen si Googleom. Napredak se sprema na tvoj račun i vidiš
							ga na svakom uređaju na kojem se prijaviš.
						</p>
					</section>

					{section(
						"Odjava",
						<>
							<p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
								Napredak ostaje na računu i u ovom pregledniku.
							</p>
							<Button
								type="button"
								variant="outline"
								onClick={() => signOut()}
								className="mt-4 h-12 w-full rounded-full text-[0.98rem] font-semibold sm:w-auto sm:px-6"
							>
								<LogOut className="size-4" aria-hidden="true" />
								Odjavi se
							</Button>
						</>,
					)}
				</div>

				<div className="space-y-4">
					{section(
						"Priprema",
						<>
							<p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
								Kategorija i datum ispita spremaju se na račun.
							</p>
							<LevelForm className="mt-4" />
						</>,
					)}

					{section(
						"Brisanje računa",
						<>
							<p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
								Brisanje uklanja vezu s Googleom i tvoje osobne podatke. Što
								točno brišemo piše u{" "}
								<Link
									to="/privatnost"
									className="font-medium text-[#0a63b0] underline underline-offset-2 dark:text-[#4cc2ff]"
								>
									pravilima privatnosti
								</Link>
								.
							</p>
							<div className="mt-4">
								<DeleteAccountDialog
									pending={deletion.pending}
									failed={deletion.failed}
									onConfirm={deletion.confirm}
								/>
							</div>
						</>,
					)}
				</div>
			</div>
		</main>
	);
}
