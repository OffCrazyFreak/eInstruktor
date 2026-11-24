import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppNotFoundPage() {
	return (
		<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 pb-8 sm:px-6 lg:pt-16">
			<span className="grid size-14 place-items-center rounded-2xl bg-tint text-ocean dark:bg-accent dark:text-[#4cc2ff]">
				<Compass className="size-7" aria-hidden="true" />
			</span>

			<p className="mt-6 font-mono text-[0.74rem] tracking-[0.2em] text-ocean dark:text-[#4cc2ff]">
				404
			</p>
			<h1 className="mt-2 font-serif text-3xl leading-tight">
				Ova stranica ne postoji
			</h1>
			<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
				Možda je lekcija premještena ili je adresa krivo upisana. Sve lekcije su
				na jednom mjestu.
			</p>

			<Button
				asChild
				className="mt-8 h-12 rounded-full px-6 text-[1rem] font-semibold"
			>
				<Link to="/ucenje">Idi na lekcije</Link>
			</Button>
		</main>
	);
}
