# Practice and oral cards

Practice lives under `/vjezba` in `src/features/practice/`. It reads questions and study cards from `src/content` through `src/lib/content`, and writes answers and grades to the local progress store ([PROGRESS.md](./PROGRESS.md)).

## Routes

| Path | Screen |
| --- | --- |
| `/vjezba` | Hub: "Brza serija, 10 pitanja", one card per mode with its live count, and the oral exam card |
| `/vjezba/serija` | One practice set (immersive); everything about the set is in the search params |
| `/vjezba/usmeno` | Oral card decks: all cards and one deck per exam subject, with card, due and unknown counts |
| `/vjezba/usmeno/$deck` | One deck of cards (immersive); `$deck` is `sve` or an exam subject id, anything else is a 404 |

All four are `noindex`.

## Set search params

`practiceSearchSchema` in `utils/practice-search.ts` validates them with zod; an unknown value falls back instead of failing, so an old or hand-edited link still opens a set.

- `mode`: `podrucje`, `mjesovito` (default), `pogresni`, `slabo`, `oznaceno`, `ponavljanje`.
- `area`, `lesson`, `subject`: narrow the pool to one area, one lesson (its questions first, then the rest of its area) or one exam subject.
- `length`: `10` (default), `20` or `sve`.
- `level`: `A` narrows a B learner to common and A questions. An A learner always gets common and A, whatever the link says.
- `feedback`: `instant` (default) or `end` for "Odgovori na kraju serije".

The area and subject lists are written out in `practice-search.ts`, because route validation runs in the main bundle and importing the course there would ship every question with it. A test keeps them equal to the course.

## Modes

`utils/practice-pool.ts` builds every set from one pool: the questions of the level (and area, lesson or subject), without the Lekcija 0 questions unless that lesson is picked, as in the mock exam.

- Po područjima and Sve mješovito: the whole pool, shuffled.
- Pogrešni odgovori: `wrongQuestionIds` in `src/lib/progress/practice/`. A question enters when an answer is wrong and leaves after right answers in two later sessions; a right answer in the same session as the mistake does not count, because it comes straight after the explanation. Exam answers count too.
- Slaba područja: every question of the areas `weakGroups` returns (under 70 percent of the recent first attempts, with at least 5 answers, three areas at most).
- Označena pitanja: flagged questions, newest first.
- Za ponoviti danas: `dueIds` over the question Leitner boxes (box 1 every day, box 2 after 2 days, box 3 after 6).

The questions are picked once when the set opens, so answering a mistake right does not pull it out of the running set.

## Running a set

`utils/practice-session.ts` is the reducer: select, "Provjeri", then "Dalje". With `feedback=end` "Provjeri" becomes "Dalje" and moves straight on, and the result waits for the end. Each answer is recorded at once with `recordAnswer` as mode `practice` and one session id per set, so it moves the Leitner box, counts towards the study day and feeds readiness. The flag in the top bar and the "Označi za kasnije" button after checking both use `toggleFlag`.

The end screen shows the score, the split by area (`utils/session-summary.ts`), "Pogledaj pogreške" (each wrong question shown answered, with its explanation), "Još 10" (the same mode again with 10 new questions) and `LoginNudgeSlot` from `src/components/custom/login-nudge/`, which renders nothing until the account work fills it.

## Oral cards

The 41 imported study cards are grouped by the exam subject of their area; an A learner sees only common and A cards. A deck puts new and due cards first. The front shows the question, the subject and the level; "Prikaži odgovor" (or a tap on the card) shows the model answer exactly as imported, with the `correction` note under it when there is one. "Znao sam" and "Nisam znao" call `gradeCard`, which moves the card through the three Leitner boxes in `cardBoxes`. The missed cards repeat round after round until none are left ("Sve znaš za sada"). `utils/flashcard-session.ts` is the reducer. Card grades do not count towards the study day.

## Links into practice

- The lesson end card's "Vježbaj ovu temu" opens 10 questions on the lesson, topped up from its area.
- "Vježbaj najslabije" on the readiness card opens 10 mixed questions from the weakest exam subject (all A questions for category A).
- A weak area row on Početna opens 10 questions from that area.
