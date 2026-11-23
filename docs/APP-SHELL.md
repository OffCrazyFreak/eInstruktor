# App shell and lessons

The app screens live under the pathless `_app` layout route; the landing, the legal pages and the visual gallery live under the pathless `_site` layout with the site header and footer.

## Layout

- `src/routes/_app.tsx` renders `AppLayout` from `src/components/custom/app-shell/`: a sticky top bar (logo, level chip, account button), the page, and five tabs (Početna, Učenje, Vježba, Ispit, Napredak). Below `lg` the tabs are a bottom bar with the safe-area inset; from `lg` they are a left rail.
- A route that needs the whole screen sets `staticData: { immersive: true }` (typed in `src/router.tsx`). The layout then hides the top bar and the bottom tabs, and the rail starts at the top. The lesson reader uses it for its own top bar and its fixed bottom action.
- The level chip opens `LevelSheet`, a bottom sheet with the A and B choice and an optional exam date. The same sheet opens from the first-visit card and from the exam-date chip on Početna.
- The account button starts Google sign-in until the account menu lands.
- Every tap target in the shell, the reader and the sheets is at least 44 px. Sheets close with a round "Zatvori" button; the level sheet also keeps its "Gotovo" button.
- The layout mounts the sonner `Toaster`, used for the progress write-error toast.

## Routes

| Path | Screen | Search |
| --- | --- | --- |
| `/pocetna` | Home: "Nastavi" card, today's goal and the last seven days, readiness per subject, weak areas, exam-date chip; a first visit shows "Kreni od Lekcije 0" instead | noindex |
| `/ucenje` | Lekcija 0 first, then every area with its lesson progress | indexed |
| `/ucenje/$area` | The area's lessons with done and in-progress marks, and "Brzi pregled" (every lesson's cheat sheet) | indexed |
| `/ucenje/$area/$lesson` | The lesson reader; Lekcija 0 is `/ucenje/propisi/kako-do-dozvole` | indexed |
| `/vjezba` and below | Practice and oral cards, see [PRACTICE.md](./PRACTICE.md) | noindex |
| `/ispit`, `/ispit/$sessionId`, `/ispit/rezultat/$sessionId`, `/ispit/povijest` | The mock exam: start, running exam (immersive), result with review, history; see [EXAM.md](./EXAM.md) | noindex |
| `/napredak` | "Uskoro" placeholder until its feature lands | noindex |

Unknown areas and lessons, or a lesson under the wrong area, return a 404 from the loader. Under `_app` it renders `AppNotFoundPage` inside the shell (never immersive) with a link to `/ucenje`; under `_site` it renders the site `NotFoundPage`. Loaders return only the title and summary for the head, so the lesson body is not sent twice in the page payload.

## Lesson reader

- `src/features/learn/components/reader/` renders the top bar (back, title, level chip, a reading bar), every block, the end card (next lesson, "Vježbaj ovu temu", "Brzi pregled područja") and the fixed "Označi kao gotovo i nastavi" bar. Marking a lesson done goes on to the next lesson in course order; a finished lesson offers "Vrati u nepročitano".
- Blocks come from `getVisibleBlocks(lesson, "B")`. B-only blocks carry a "Za kategoriju B" badge: open for B learners, folded into a one-line summary (`<details>`) for A learners. A whole B lesson is not badged block by block, and an A learner who opens one sees a short note.
- Text, warning, example and source-note blocks go through `SafeMarkdown` (`src/components/custom/markdown/`), which reads paragraphs, line breaks, lists, bold, italics and http, mailto or site links, and never renders HTML.
- Check blocks use the shared question component inline. An answer is recorded as a `check` attempt with one session id per lesson visit, made by `randomId()` (`src/lib/random-id.ts`, which falls back when `crypto.randomUUID` is missing).
- Callouts are `role="note"` with their label, and a wide table scrolls in a focusable region named by its caption.

## Question component

`src/components/custom/question/question-view.tsx` is the one question view for learn, practice and exam. The caller owns the selection, the check button and what an answer records. The exam passes `revealed={false}` while it runs, which is its no-feedback mode, and `revealed` in the review.

- Single and true-false questions are a `radiogroup` of native radios named by the prompt, so arrow keys work; multi questions are checkboxes in a fieldset. Rows are at least 56 px high and show focus.
- With `revealed`, every option shows whether it was right (icon and text, never colour alone), and the feedback panel shows "Točno" or "Netočno", the explanation, the rule and a "Pročitaj lekciju" link. Focus moves to the panel and a polite live region announces it, but only when the answer is revealed after mount; a question shown already answered leaves focus alone.
- Question media renders through `VisualFrame` with `hideAnswer` until the answer is revealed, keyed on the question id.
- `grade-answer.ts` has the pure grading used by every mode.

## SSR and hydration

Progress lives in localStorage, so the server and the first client render show the empty state (`ready` is false). Početna shows a skeleton until then; lists show empty meters. See [PROGRESS.md](./PROGRESS.md).
