import { cn } from "@/lib/utils";

interface IReadinessExplainerProps {
	className?: string;
}

/** The "Kako računamo?" fold shared by every readiness view, so the rule reads the same everywhere. */
export default function ReadinessExplainer({
	className,
}: IReadinessExplainerProps) {
	return (
		<details className={cn("text-[0.88rem]", className)}>
			<summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-ocean dark:text-[#4cc2ff]">
				Kako računamo?
			</summary>
			<p className="leading-relaxed text-muted-foreground">
				Za svaki predmet gledamo tvojih zadnjih 20 prvih odgovora i koliko si
				pitanja već vidio. Spreman si s barem 85 % točnih i 80 % viđenih
				pitanja, a ispit se polaže po predmetima, pa ukupna procjena prati
				najslabiji.
			</p>
		</details>
	);
}
