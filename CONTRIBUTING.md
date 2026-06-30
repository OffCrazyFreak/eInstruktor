# Contributing to e-instruktor

Contributions are welcome - bug reports, feature ideas, documentation, designs,
or code. These guidelines keep the process smooth for everyone.

## License & CLA (please read first)

- The project is licensed under the
  [PolyForm Noncommercial License 1.0.0](./LICENSE) - noncommercial use only.
- By opening a pull request you agree to the
  [Contributor License Agreement (CLA)](./CLA.md). In short: you keep copyright to
  your work, but you grant the Owner the right to use and relicense your
  contribution, **including commercially**. This is what lets the project stay
  free for noncommercial use while the Owner retains the right to monetize.
- Commercial use by anyone other than the Owner requires a separate
  [commercial license](./COMMERCIAL_LICENSE.md).

## Reporting bugs & suggesting ideas

- Search existing issues first to avoid duplicates.
- Open a new issue with:
  - a clear title and description of the problem or idea;
  - steps to reproduce (for bugs) and expected vs actual behavior;
  - environment details (OS, Node/pnpm version, browser) when relevant;
  - screenshots or logs when helpful.
- Use labels if available (bug, enhancement, question, docs).
- Propose larger features in an issue first so we can align before you build.

## Contributing code (pull requests)

1. Fork the repo and create a feature branch from `main`:
   - e.g. `feat/lights-quiz` or `fix/readiness-meter-rounding`.
2. Follow the project conventions in [AGENTS.md](./AGENTS.md). Highlights:
   - **pnpm** for package management (`pnpm add` / `pnpm remove`, never edit
     `package.json` by hand).
   - **Biome** for lint/format - run `pnpm check` (or `pnpm lint` / `pnpm format`).
   - **TypeScript** - no `any`; run `pnpm exec tsc --noEmit` and make sure it is
     clean before opening a PR.
   - Prefer `function foo() {}` declarations over arrow consts (except small
     inline functions); import React APIs as `import { useState } from 'react'`.
   - Feature-based structure: feature code in feature folders, shared/generic code
     in `src/lib`, `src/utils`, etc. Reuse existing functions/components before
     writing new ones.
3. Before opening a PR, verify locally:
   - `pnpm exec tsc --noEmit` (types clean)
   - `pnpm check` (Biome lint/format)
   - `pnpm build` (app builds)
   - `pnpm test` (if you touched tested code)
4. Write concise, descriptive commit messages. The project uses this format:

   ```text
   type(scope): Short summary in imperative mood

   Changes:
   - Specific change 1
   - Specific change 2

   Brief explanation of why the change was needed.
   ```

5. Open a PR against `main` with:
   - a summary of the changes and why they were made;
   - screenshots or short recordings for UI changes;
   - links to related issues.

## Pull request checklist

- [ ] `pnpm exec tsc --noEmit` passes (no type errors).
- [ ] Biome lint/format applied (`pnpm check`).
- [ ] App builds (`pnpm build`) and relevant tests pass.
- [ ] No secrets or sensitive data included; env vars added to both `.env` and
      `.env.example`.
- [ ] You agree to the [CLA](./CLA.md).
- [ ] CodeRabbit review addressed (see below).

## Review process

Every pull request is automatically reviewed by [CodeRabbit](https://coderabbit.ai).
Before requesting a human review:

1. Address every CodeRabbit comment: either fix it, or reply explaining why it is
   not relevant.
2. Once all CodeRabbit comments are resolved or answered, request a review.

**Pull requests that do not follow this (CodeRabbit feedback left unaddressed) will
be ignored and closed.**

A maintainer will then review, may request changes, and merges when ready. Please
be responsive to review comments; small follow-ups are common.

## Non-code contributions

Translations, UI/UX suggestions, content corrections, icons, and designs are all
welcome - open an issue or PR just like for code.

## Code of Conduct

Be respectful and constructive. All participants are expected to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md).

Thank you for helping improve e-instruktor!
