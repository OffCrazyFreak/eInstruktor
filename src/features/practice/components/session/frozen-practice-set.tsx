import { useState } from "react";
import course from "@/content/voditelj-brodice";
import EmptySet from "@/features/practice/components/session/empty-set";
import PracticeSet from "@/features/practice/components/session/practice-set";
import { PRACTICE_MODE_INFO } from "@/features/practice/constants/practice-modes";
import {
	practiceLevel,
	selectPracticeQuestions,
} from "@/features/practice/utils/practice-pool";
import type { IPracticeSearch } from "@/features/practice/utils/practice-search";
import { toStudyDay } from "@/lib/dates/study-day";
import useProgress from "@/lib/progress/use-progress";

interface IFrozenPracticeSetProps {
	search: IPracticeSearch;
	title: string;
	onAgain: () => void;
}

// The questions are picked once per set, so answering a wrong question right does not pull it out mid-set.
export default function FrozenPracticeSet({
	search,
	title,
	onAgain,
}: IFrozenPracticeSetProps) {
	const { progress, level } = useProgress();

	const [questions] = useState(() =>
		selectPracticeQuestions(
			course,
			{ ...search, level: practiceLevel(level, search.level) },
			{ progress, today: toStudyDay(new Date()) },
			Math.floor(Math.random() * 2 ** 32),
		),
	);

	if (questions.length === 0) {
		return (
			<EmptySet title={title} message={PRACTICE_MODE_INFO[search.mode].empty} />
		);
	}

	return (
		<PracticeSet
			title={title}
			questions={questions}
			deferFeedback={search.feedback === "end"}
			onAgain={onAgain}
		/>
	);
}
