# Mock exam

The real exam is oral and has no official question count, so the mock exam is the app's own simulation (formats in [CONTENT.md](./CONTENT.md), reasons in the exam facts research, section 4). Every screen says so: "Stvarni ispit je usmeni i nema službenog broja pitanja. Ovo je naša simulacija."

## Routes

| Path | Screen |
| --- | --- |
| `/ispit` | Start: category (the learner's level is preselected, so A learners get the A format), timer (Standardno, Produlji at double time, Bez vremena), the rules, the simulation note, the hint "Preporučeno kad ti točnost u vježbi prijeđe 80 %" with the current accuracy, and a card to continue a running exam |
| `/ispit/$sessionId` | The running exam, immersive. `?pitanje=N` keeps the open question across reloads. A finished session redirects to its result |
| `/ispit/rezultat/$sessionId` | Result: the verdict, one card per subject with n/8 and "Zadovoljio" or "Nije zadovoljio" (icon and text), "Pregledaj pogreške", "Vježbaj slabe predmete" (links to `/vjezba` until practice modes take a search), "Novi ispit", "Povijest ispita". `?pregled=pogreske` or `?pregled=sva` shows every question with the chosen and the right answer and the explanation |
| `/ispit/povijest` | Finished exams newest first with date, time, level, verdict and per-subject scores, and a bar row of the last ten results |

All four are `noindex`.

## Running an exam

- Questions come from `questionsForExam(course, level, seed)` with a random 32-bit seed. The session stores the seed and the question ids in order, so a finished exam can be shown again exactly; `examBlocks` (`src/features/exam/utils/exam-blocks.ts`) groups the ids into one block per subject and skips ids no longer in the content.
- The question view is the shared one with `revealed={false}`, so nothing shows right or wrong until the result.
- Navigation is free: "Prethodno", "Sljedeće", and the "Pregled" sheet with numbered cells per subject (filled answered, dashed unanswered, a flag for flagged, a ring on the open one). Flags belong to the exam session, not to the practice "Označena" list.
- Handing in always goes through an in-page alert dialog that counts unanswered and flagged questions; native `confirm()` is never used.

## Timer

- The session stores `endsAt`, an absolute end time (`null` without a limit). `useExamClock` reads the wall clock every second and on `visibilitychange`, so a reload, a background tab or a locked phone never stretches the time.
- At zero it hands the exam in once, with `finishedAt` set to the end time; an exam opened after its end is handed in at once. The result then says "Vrijeme je isteklo, ispit se predao sam."
- The clock is a `role="timer"` with no per-second announcements; a polite live region says "Još 10 minuta", 5 and 1. Under five minutes it turns sun coloured.
- The 45 and 20 minutes are not official, so per WCAG 2.2.1 the learner can switch the limit off or double it before starting.

## Scoring

`scoreExam` (`src/features/exam/utils/score-exam.ts`):

- B: a subject is "Zadovoljio" with at least `passPerSubject` (6) of 8; the exam is "Položio" only when all five pass.
- A: one subject, passed at `passPercent` (70) percent, computed in integers so 14 of 20 passes and 13 does not.
- Unanswered questions count as wrong and are not recorded as attempts.

## Storage

The exam lives in the local progress store (see [PROGRESS.md](./PROGRESS.md)):

- `exam-session-actions.ts`: `startExamSession` (one running exam at a time, the newest 100 sessions kept), `setExamAnswer`, `toggleExamFlag`, `discardExamSession`, `finishExamSession`. A finished session never changes again.
- Finishing saves `finishedAt`, `score`, `passed` and `perSubject`, and records each answered question as an attempt with mode `exam` and the session id, so readiness and coverage include exam answers. Exam answers do not move Leitner boxes.
- `exam-session-selectors.ts`: the running exam, finished exams newest first, answered and flagged checks, and `endedByClock`.

The fields match `exam_session` and `question_attempt.exam_session_id` in the database ([DATABASE.md](./DATABASE.md)) for the later sync.
