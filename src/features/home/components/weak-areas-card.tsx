import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import AreaIcon from "@/components/custom/content/area-icon";
import type { IArea } from "@/content/types";

export interface IWeakArea {
	area: IArea;
	accuracy: number;
	answered: number;
}

interface IWeakAreasCardProps {
	areas: IWeakArea[];
}

export default function WeakAreasCard({ areas }: IWeakAreasCardProps) {
	return (
		<section
			aria-labelledby="weak-areas-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id="weak-areas-title" className="font-serif text-xl">
				Slaba područja
			</h2>

			{areas.length === 0 ? (
				<p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
					Ovdje se pojave područja ispod 70 % točnih, kad u njima odgovoriš na
					barem 5 pitanja. Za sada nema nijednog.
				</p>
			) : (
				<ul className="mt-3 space-y-2">
					{areas.map(({ area, accuracy, answered }) => (
						<li key={area.slug}>
							<Link
								to="/ucenje/$area"
								params={{ area: area.slug }}
								className="flex min-h-14 items-center gap-3 rounded-xl border border-border px-3 py-2 text-foreground outline-none hover:border-[#0a63b0]/40 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60"
							>
								<AreaIcon
									name={area.icon}
									className="size-5 shrink-0 text-[#0a63b0] dark:text-[#4cc2ff]"
								/>
								<span className="min-w-0 flex-1">
									<span className="block text-[0.95rem] font-semibold leading-snug">
										{area.title}
									</span>
									<span className="text-[0.8rem] text-muted-foreground">
										{Math.round(accuracy * 100)} % točnih od {answered} odgovora
									</span>
								</span>
								<ArrowRight
									className="size-4 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
