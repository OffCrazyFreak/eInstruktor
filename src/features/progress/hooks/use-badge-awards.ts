import { useEffect, useState } from "react";
import course from "@/content/voditelj-brodice";
import {
	type BadgeId,
	newlyEarnedBadges,
} from "@/features/progress/constants/badges";
import { awardBadges } from "@/lib/progress/progress-actions";
import useProgress from "@/lib/progress/use-progress";

/** Stores badges the learner has reached and returns the ones earned on this visit, for the celebration. */
export default function useBadgeAwards() {
	const { progress, ready, level, update } = useProgress();
	const [fresh, setFresh] = useState<BadgeId[]>([]);

	useEffect(() => {
		if (!ready) {
			return;
		}

		const earned = newlyEarnedBadges({ progress, course, level });

		if (earned.length === 0) {
			return;
		}

		update((current) => awardBadges(current, earned, Date.now()));
		setFresh((shown) => [...shown, ...earned]);
	}, [ready, progress, level, update]);

	return { fresh, dismiss: () => setFresh([]) };
}
