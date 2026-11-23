import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IComingSoonPageProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

/** Holds a tab's place until its feature lands, and points the learner back to the lessons. */
export default function ComingSoonPage({
	icon: Icon,
	title,
	description,
}: IComingSoonPageProps) {
	return (
		<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 pb-8 sm:px-6 lg:pt-16">
			<span className="grid size-14 place-items-center rounded-2xl bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
				<Icon className="size-7" aria-hidden="true" />
			</span>

			<p className="mt-6 font-mono text-[0.74rem] tracking-[0.2em] text-[#0a63b0] dark:text-[#4cc2ff]">
				USKORO
			</p>
			<h1 className="mt-2 font-serif text-3xl leading-tight">{title}</h1>
			<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
				{description}
			</p>

			<Button
				asChild
				className="mt-8 h-12 rounded-full px-6 text-[1rem] font-semibold"
			>
				<Link to="/ucenje">
					Za sada uči lekcije
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</Button>
		</main>
	);
}
