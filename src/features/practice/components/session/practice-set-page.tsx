import { useState } from "react";
import course from "@/content/voditelj-brodice";
import { SUBJECT_LABELS } from "@/content/voditelj-brodice/subjects";
import FrozenPracticeSet from "@/features/practice/components/session/frozen-practice-set";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import { PRACTICE_MODE_INFO } from "@/features/practice/constants/practice-modes";
import {
	againExclusions,
	type IPracticeExclusions,
} from "@/features/practice/utils/practice-pool";
import type { IPracticeSearch } from "@/features/practice/utils/practice-search";
import type { ISessionAnswer } from "@/features/practice/utils/practice-session";
import { getArea, getLesson } from "@/lib/content/course-selectors";
import useProgress from "@/lib/progress/use-progress";

interface IPracticeSetPageProps {
	search: IPracticeSearch;
	/** Switches the URL to a 10-question set for "Još 10". */
	onLengthTen: () => void;
}

function setTitle(search: IPracticeSearch): string {
	const lesson = search.lesson ? getLesson(course, search.lesson) : undefined;
	const area = search.area ? getArea(course, search.area) : undefined;

	if (lesson) {
		return lesson.title;
	}

	if (area) {
		return area.title;
	}

	if (search.subject) {
		return SUBJECT_LABELS[search.subject];
	}

	return PRACTICE_MODE_INFO[search.mode].title;
}

/** Waits for the stored progress, because wrong, weak, flagged and due sets are built from it. */
export default function PracticeSetPage({
	search,
	onLengthTen,
}: IPracticeSetPageProps) {
	const { ready } = useProgress();
	const [run, setRun] = useState(0);
	const [exclusions, setExclusions] = useState<IPracticeExclusions>({});
	const title = setTitle(search);

	function handleAgain(answers: ISessionAnswer[]) {
		setExclusions(againExclusions(search.mode, answers));
		setRun((current) => current + 1);
		onLengthTen();
	}

	if (!ready) {
		return (
			<SessionTopBar
				title={title}
				closeTo="/vjezba"
				closeLabel="Zatvori seriju"
				position={null}
			/>
		);
	}

	return (
		<FrozenPracticeSet
			key={`${run}:${JSON.stringify(search)}`}
			search={search}
			title={title}
			exclusions={exclusions}
			onAgain={handleAgain}
		/>
	);
}
