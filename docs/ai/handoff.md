# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting target: GitHub Pages
- Email provider: Kit (ConvertKit)

## Status
- Completed set now: TASK-001, TASK-002, TASK-004, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009, TASK-010, TASK-011, TASK-012.
- `TASK-009` About section is implemented and then refined per UI feedback (non-clickable label + larger centered shelter placeholder).
- `TASK-011` carousel share interaction is implemented and verified.
- `TASK-012` signup wick progress indicator is implemented and verified.
- Remaining major task: none in current queue.
- `PROJECT_DEBT.md` exists for pending integrations/purchases (including Kit email-domain setup).

## Decisions
- Keep header minimal and shared across pages (`index.html`, `blog.html`) to improve cross-page navigation.
- Use fixed translucent header with blur to match dark visual identity.
- Tighten hero viewport occupancy to expose next section earlier.
- Keep layout unchanged during copy rewrite; only replace text and rename section class `.for-who` -> `.why-it-works`.
- Add trust narrative as a dedicated About section between why-it-works and signup.
- Keep `Linkedin` as plain text label (no outbound link) in About section.
- Place shelter-image placeholder under About text, centered and visually prominent.
- Add share buttons to all environment cards with mobile native share + desktop clipboard fallback.
- Add burning wick progress UI above signup form, with manual `current` value in `script.js`.
- Keep implementation static and dependency-free.

## Files changed in latest iteration
- `index.html`
  - Added `.progress-wick` block above signup form.
- `styles.css`
  - Added wick styles and flame animation (`.progress-wick`, `.wick-*`, `@keyframes flicker`).
- `script.js`
  - Added wick initializer IIFE with manual `current` and `goal` values.
- `TASKS.md`
  - Marked `TASK-012` as `DONE`.
- `REPORT.md`
  - Appended execution report block for `TASK-012`.
- `PROJECT_STATE.md`
  - Updated current state and completed tasks list.

## Commands run
- `Get-Content TASKS.md`
- `Get-Content PROJECT_STATE.md`
- `Get-Content REPORTING_FORMAT.md`
- `git status --short`
- `Select-String` checks for wick markup/styles/script hooks
- `Invoke-WebRequest http://localhost:8080`
- temporary script toggle for verification:
  - `const current = 0` -> `const current = 150` -> back to `const current = 0`
- Playwright checks:
  - snapshot validation of wick in signup section
  - baseline validation (`0 / 300`, empty fill, flame animation)
  - `current=150` validation (display `150`, fill 50%)
  - mobile width validation (`375x812`, no overflow)

## Verification/QA Status
- Verification run: YES
- Result: PASSED
- Evidence:
  - Signup shows wick labels `0 / 300` + `early testers`.
  - Track starts at 0% with flame at the start and active `flicker` animation.
  - With `current=150`, UI shows 50% progress and `150 / 300`.
  - On `375px` viewport, wick remains within layout width with no horizontal overflow.

## Open risks / notes
- First live Kit submission flow still needs owner validation in Kit dashboard and inbox.
- TikTok URL still placeholder until provided.

## Next steps
1. Replace TikTok placeholder when URL is available.
2. Validate Kit double opt-in/send settings end-to-end with a production sender domain.
3. Start new orchestrator queue items from `PROJECT_DEBT.md` priorities.
