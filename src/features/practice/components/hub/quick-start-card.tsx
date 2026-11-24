import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IQuickStartCardProps {
	dueCount: number;
}

export default function QuickStartCard({ dueCount }: IQuickStartCardProps) {
	return (
		<section
			aria-labelledby="quick-start-title"
			className="relative overflow-hidden rounded-[1.6rem] bg-brand p-5 text-[#eaf3ff] sm:p-7 dark:ring-1 dark:ring-white/15"
		>
			<p className="flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.2em] text-[#ffb43c]">
				<Zap className="size-4" aria-hidden="true" />
				BRZI POČETAK
			</p>
			<h2
				id="quick-start-title"
				className="mt-2 font-serif text-2xl leading-tight text-white sm:text-[1.7rem]"
			>
				Brza serija, 10 pitanja
			</h2>
			<p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[#eaf3ff]/80">
				Izmiješana pitanja iz svih područja, s objašnjenjem nakon svakog
				odgovora.
				{dueCount > 0 && ` Danas te čeka i ${dueCount} za ponoviti.`}
			</p>

			<Button
				asChild
				className="mt-5 h-12 rounded-full bg-[#00aef3] px-6 text-[1rem] font-semibold text-[#002c78] hover:bg-[#4cc2ff]"
			>
				<Link to="/vjezba/serija" search={{ mode: "mjesovito", length: 10 }}>
					Kreni
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</Button>
		</section>
	);
}
