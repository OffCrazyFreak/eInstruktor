import course from "@/content/voditelj-brodice";

export const KNOWN_QUESTION_IDS: ReadonlySet<string> = new Set(
	course.questions.map((question) => question.id),
);

export const KNOWN_LESSON_SLUGS: ReadonlySet<string> = new Set(
	course.lessons.map((lesson) => lesson.slug),
);
