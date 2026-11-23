# Local progress

Anonymous progress is stored in the browser under `PROGRESS_STORAGE_KEY` (`src/lib/progress/storage-key.ts`). It is the single source the account sync will merge from.

## Shape

`src/lib/progress/progress-schema.ts` defines the state with zod. Every field falls back on its own, so one damaged field never wipes the rest:

- `targetLevel` (`A`, `B` or null before the learner picks; screens show B until then) and `examDate` (a `YYYY-MM-DD` day).
- `attempts`: client uuid, question id, correct, selected option ids, mode (`practice`, `exam`, `check`), session id and time. Append only.
- `lessonsDone` (slug to time), `lastLesson` (slug, time, share read), `flagged`.
- `questionBoxes` and `cardBoxes`: three-box Leitner state per question and per oral card.
- `examSessions`, `studyDays` (Zagreb calendar days that counted) and `dismissedNudges`.

Change the shape only together with a new version suffix on the key and a migration.

## Store and hook

- `createProgressStore(getStorage)` keeps the state in memory, writes every change to storage and follows changes from other tabs. Blocked storage keeps working in memory for the visit.
- `ProgressProvider` (used by the app layout) puts a store in context; tests pass their own.
- `useProgress()` returns `{ progress, ready, level, update }` through `useSyncExternalStore`. The server and the hydration render get the empty state with `ready` false, so the markup never mismatches; show progress-dependent UI only when `ready`.
- `progress-actions.ts` has the pure updates: `recordAnswer`, `markLessonDone`, `markLessonUnread`, `openLesson`, `setLessonPercent`, `toggleFlag`, `setTargetLevel`, `setExamDate`. Call them as `update((current) => recordAnswer(current, answer))`.

## Derived values

All pure and unit tested next to the code:

- `accuracy.ts`: `firstAttempts` (the first answer per question in each session), `coverage` (share of questions answered at least once), `recentAccuracy` (the last 20 first attempts) and `weakGroups` (under 70 percent with at least 5 answers, weakest first, three at most).
- `readiness.ts`: per subject "Premalo podataka" under 10 answers, "Spreman" at 85 percent recent accuracy and 80 percent coverage, "Na dobrom putu" from 70 percent, else "Za početak". The overall label is the weakest subject, because the exam is passed per subject. The thresholds are the owner's approved starting values, to be tuned with real data; the UI says "Procjena, ne jamstvo".
- `streak.ts`: study days among the last seven and the current run, where one missed day a week is skipped over and today stays open until the learner studies.
- `daily-goal.ts`: a day counts with 5 answers or one finished lesson; `recordAnswer` and `markLessonDone` add the day to `studyDays` once it counts.
- `leitner.ts`: a wrong answer goes to box 1, a right one moves up a box; box 1 is due every day, box 2 after 2 days, box 3 after 6. Exam answers do not move boxes.

`src/lib/content/question-groups.ts` builds the groups these functions take: one group for A, the five exam subjects for B, and one per area, all without the Lekcija 0 questions.
