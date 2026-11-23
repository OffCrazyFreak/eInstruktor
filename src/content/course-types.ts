import type {
	IArea,
	ILesson,
	IQuestion,
	IStudyCard,
	Level,
} from "@/content/types";

/** The licence category a learner prepares for; content tagged "common" belongs to both. */
export type ExamLevel = Exclude<Level, "common">;

/** One pool of questions scored as a whole (category A). */
export interface IOverallExamFormat {
	questions: number;
	minutes: number;
	passPercent: number;
	perSubject: false;
}

/** A fixed number of questions per exam subject, each subject passed on its own (category B). */
export interface IPerSubjectExamFormat {
	questionsPerSubject: number;
	minutes: number;
	passPerSubject: number;
}

export type IExamFormat = IOverallExamFormat | IPerSubjectExamFormat;

export interface ICourse {
	slug: string;
	title: string;
	areas: IArea[];
	/** Lecture 0 first, then each area's lessons in area order. */
	lessons: ILesson[];
	questions: IQuestion[];
	studyCards: IStudyCard[];
	examFormats: {
		A: IOverallExamFormat;
		B: IPerSubjectExamFormat;
	};
}
