# Content

Course content is typed data in `src/content/`, so adding a topic needs no new UI code and no database change.

## Files

- `types.ts`: the content schema (`IArea`, `ILesson` with its blocks, `IQuestion`, `IStudyCard`, `Level`, `VisualId`). Biome formatting is switched off for this file in `biome.json`, because it is kept byte-identical to the shared schema it was copied from.
- `course-types.ts`: `ICourse` (with `introLessonSlug`, the lesson shown on its own), the two mock exam formats and `ExamLevel` (`A` or `B`).
- `voditelj-brodice/`: the first course. `index.ts` exports one `ICourse` built from `areas/<slug>/{area,lessons,questions}.ts`, `lecture-0.ts` (lesson `kako-do-dozvole`, always first) and `study-cards.ts` (the owner's question and answer document, imported as written, with `correction` where the old wording is wrong).

Every lesson, block and question has a `level` (`A`, `B` or `common`) and a `source` (`original` or `qa-doc`), so imported material can be found and removed later.

## Mock exam format

The real exam is oral and has no official question count, so the app runs its own simulation, set in `examFormats` of the course:

- A: 20 questions from `common` and `A` content, 20 minutes, pass at 70 percent.
- B: 8 questions from each of the five exam subjects, 45 minutes, a subject passes with 6 of 8.

## Invariants

`voditelj-brodice/content.test.ts` runs in `pnpm check` and fails when content breaks a rule: duplicate ids or slugs, a `check` block pointing at a missing question, a single or true-false question without exactly one correct option, a multi question with fewer than two, a true-false question whose options are not exactly `t` and `f`, a question whose `lesson` does not exist, a `check` block whose question is not visible at the block's level (a `common` block needs a `common` question), an unknown visual, a long dash (en, em, minus sign or horizontal bar), an area that teaches a level it has no questions for, or too few questions to build either mock exam.

## Reading content

`src/lib/content/` has pure functions over an `ICourse`:

- `getArea`, `subjectOfArea`, `getLesson`, `getLessonsByArea(course, area, level?)` and `getQuestions(course, { area, lesson, level, ids })`. A level filter keeps `common` content plus the chosen level. With `ids`, questions come back in that order. `getLessonsByArea` leaves out lecture 0.
- `getVisibleBlocks(lesson, level)`: level A keeps `common` and `A` blocks; level B keeps every block, and `isBOnly` marks the B ones. The lesson reader always asks for B, so an A learner still gets the B blocks, folded (see [APP-SHELL.md](./APP-SHELL.md)). The A filter is for screens that must leave B content out entirely.
- `courseLessonOrder`, `nextLesson` and `firstUnreadLesson` in `lesson-order.ts`: Lekcija 0 first, then each area's lessons for the level in area order.
- `subjectGroups` and `areaGroups` in `question-groups.ts`: question ids per exam subject (one group for A) and per area, for readiness and weak areas. Subject names are in `voditelj-brodice/subjects.ts`.
- `questionsForExam(course, level, seed)` builds a mock exam from everything except the lecture 0 questions. The same seed always gives the same questions in the same order, and `exam_session` stores the seed and the question ids.
