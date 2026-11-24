import BadgeMedal from "@/features/progress/components/badge-medal";
import { BADGES, type BadgeId } from "@/features/progress/constants/badges";

interface IBadgesSectionProps {
	earned: Record<string, number>;
	fresh: readonly BadgeId[];
}

export default function BadgesSection({ earned, fresh }: IBadgesSectionProps) {
	const count = BADGES.filter((badge) => earned[badge.id] !== undefined).length;

	return (
		<section aria-labelledby="badges-title">
			<div className="flex items-baseline justify-between gap-3">
				<h2 id="badges-title" className="font-serif text-xl">
					Značke
				</h2>
				<span className="text-[0.85rem] text-muted-foreground">
					{count} od {BADGES.length}
				</span>
			</div>
			<p className="mt-1 text-[0.9rem] text-muted-foreground">
				Svaka značka znači nešto što znaš ili si napravio.
			</p>

			<ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
				{BADGES.map((badge) => (
					<BadgeMedal
						key={badge.id}
						badge={badge}
						earnedAt={earned[badge.id]}
						fresh={fresh.includes(badge.id)}
					/>
				))}
			</ul>
		</section>
	);
}
