// Content schema for e-instruktor course data. Copied into the repo as src/content/types.ts by the content-model PR.

export type Level = "A" | "B" | "common";

/** The five official exam subjects of category B (Dodatak 7). Category A has one subject, "osnove-plovidbe" (Dodatak 6). */
export type ExamSubjectId =
	| "pomorska-plovidba"
	| "motoristika"
	| "pomorstvo-propisi-meteorologija"
	| "manevriranje-sigurnost-prva-pomoc"
	| "radiotelefonija";

export type AreaSlug =
	| "karte-navigacija"
	| "plovne-oznake"
	| "svjetla-znakovi"
	| "izbjegavanje-sudara"
	| "meteorologija"
	| "motoristika"
	| "vhf-radio"
	| "sigurnost-prva-pomoc"
	| "pomorstvo-manevriranje"
	| "propisi";

export type ContentSource = "original" | "qa-doc";

/** Interactive visuals rendered by the learn feature; props are visual-specific and validated there. */
export type VisualId =
	| "iala-buoy-explorer"
	| "cardinal-quadrant"
	| "ship-lights-viewer"
	| "day-shapes"
	| "sound-signal-player"
	| "collision-situations"
	| "compass-course-calculator"
	| "light-characteristic-reader"
	| "vhf-radio-call"
	| "phonetic-alphabet"
	| "adriatic-winds"
	| "beaufort-scale"
	| "four-stroke-engine"
	| "navigation-areas-map"
	| "knot-steps";

export interface IArea {
	slug: AreaSlug;
	title: string;
	/** One short sentence for cards. */
	summary: string;
	subject: ExamSubjectId;
	order: number;
	/** lucide-react icon name, e.g. "Map", "Anchor", "Wind". */
	icon: string;
}

export type LessonBlock =
	| { type: "text"; level: Level; markdown: string }
	| { type: "remember"; level: Level; title?: string; items: string[] }
	| { type: "warning"; level: Level; markdown: string }
	| { type: "example"; level: Level; title?: string; markdown: string }
	| { type: "visual"; level: Level; visual: VisualId; caption?: string; props?: Record<string, string | number | boolean | string[]> }
	| { type: "table"; level: Level; caption?: string; columns: string[]; rows: string[][] }
	/** "Stara skripta kaže X, danas vrijedi Y" notes for known source conflicts. */
	| { type: "source-note"; level: Level; markdown: string }
	| { type: "check"; level: Level; questionId: string };

export interface ILesson {
	slug: string;
	area: AreaSlug;
	order: number;
	title: string;
	summary: string;
	level: Level;
	minutes: number;
	blocks: LessonBlock[];
	/** Short cheat-sheet bullets shown on the area's "brzi pregled" page. */
	cheatSheet: string[];
	source: ContentSource;
}

export type QuestionType = "single" | "multi" | "true-false";

export interface IAnswerOption {
	id: string;
	text: string;
	correct: boolean;
}

export interface IQuestion {
	/** Stable id, `<area>-<nnn>`, e.g. "plovne-oznake-012". */
	id: string;
	area: AreaSlug;
	lesson?: string;
	level: Level;
	type: QuestionType;
	prompt: string;
	/** Optional visual shown with the question. */
	media?: { visual: VisualId; props?: Record<string, string | number | boolean | string[]> };
	options: IAnswerOption[];
	/** Why the right answer is right, 1 to 3 sentences, shown after answering. */
	explanation: string;
	/** e.g. "COLREG pravilo 15", "Pravilnik o brodicama i jahtama, Dodatak 7". */
	ruleRef?: string;
	difficulty: 1 | 2 | 3;
	source: ContentSource;
}

/** Imported verbatim from the owner's Q&A document: open questions with a model answer, used as flashcards ("usmeni ispit" practice). */
export interface IStudyCard {
	id: string;
	area: AreaSlug;
	level: Level;
	prompt: string;
	answer: string;
	/** Present when the old wording conflicts with current rules. */
	correction?: string;
	ref: string;
	source: "qa-doc";
}
