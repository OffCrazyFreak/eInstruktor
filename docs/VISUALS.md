# Interactive visuals

Lessons and questions show interactive visuals by id: a `visual` lesson block or a question's `media` names a `VisualId` from `src/content/types.ts` and passes free-form `props`.

## Where things live

- `src/components/custom/visuals/visual-frame.tsx` renders one visual: card, caption, a loading placeholder and an error fallback, so a broken visual never blanks the lesson.
- `src/components/custom/visuals/visual-registry.ts` maps every `VisualId` to a lazy component. Each visual's main file exports `fromVisualProps`, which turns the content props into typed props and drops unknown keys and values.
- `src/components/custom/visuals/<visual-id>/` holds one visual: the main component `<visual-id>.tsx`, its subcomponents and its data.
- `src/components/custom/visuals/shared/` holds what several visuals use: the prop readers, the palette, option buttons, quiz choices, the light code parser and timeline, buoy drawings and small sea icons.

## Adding a prop or a visual

1. Read the new prop in the visual's `fromVisualProps` with the readers in `shared/visual-props.ts` (`readOption`, `readNumber`, `readBoolean`, `readOptionList`, `readStringList`).
2. For a new visual, add its id to `VisualId` in the content types, create its folder, and add one `lazyVisual` line to the registry. TypeScript fails until the registry has every id.
3. Add the prop combination to `src/features/visual-gallery/constants/gallery-variants.ts`.

## QA gallery

`/vizuali` (not indexed) renders every visual with every prop combination the content uses. `/vizuali?v=<visual-id>` shows one visual, and `&i=<n>` one of its variants, which is handy for screenshots.

## Conventions

- Mobile first at 375 px, SVG drawings, Motion for animation. Animations start on their own unless the reader asked for reduced motion; then they wait for the play button.
- Sound (the signal player) uses the Web Audio API through one shared context in `shared/audio-context.ts`, created on the first tap. On iPhone the silent switch mutes it.
- Questions reuse visuals as media. Render question media with `<VisualFrame hideAnswer>` until the learner answers: every visual then leaves out the names, labels, worked results and built-in quizzes that would give the answer away, and shows only the drawing. Drop `hideAnswer` after answering to show the full visual.
- Visuals read their props once, as starting state. `VisualFrame` remounts the visual (and resets its error fallback) when the visual id or props change; when two questions can share the same props, render it with `key={question.id}` so each question starts fresh.
- Pure logic has unit tests next to it: light code parsing and sequences, cardinal quadrants, ship light sectors, collision rules, course math, Beaufort data, sound patterns, spelling, winds, engine cycles and navigation areas.
