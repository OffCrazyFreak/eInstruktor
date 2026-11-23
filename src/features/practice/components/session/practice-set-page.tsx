import course from "@/content/voditelj-brodice";
import { SUBJECT_LABELS } from "@/content/voditelj-brodice/subjects";
import FrozenPracticeSet from "@/features/practice/components/session/frozen-practice-set";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";
import { PRACTICE_MODE_INFO } from "@/features/practice/constants/practice-modes";
import type { IPracticeSearch } from "@/features/practice/utils/practice-search";
import { getArea, getLesson } from "@/lib/content/course-selectors";
import useProgress from "@/lib/progress/use-progress";

interface IPracticeSetPageProps {
	search: IPracticeSearch;
	onAgain: () => void;
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
	onAgain,
}: IPracticeSetPageProps) {
	const { ready } = useProgress();
	const title = setTitle(search);

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

	return <FrozenPracticeSet search={search} title={title} onAgain={onAgain} />;
}
