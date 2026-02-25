# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting target: GitHub Pages
- Email provider: Kit (ConvertKit)

## Status
- TASK-004 implemented with owner-provided Kit form endpoint using custom branded UI.
- Completed set now: TASK-001, TASK-002, TASK-004, TASK-005, TASK-010.
- Remaining major UI/content tasks: TASK-006, TASK-007, TASK-008, TASK-009, TASK-011, TASK-012.
- `PROJECT_DEBT.md` added to track all pending integrations/purchases (including Kit email-domain setup).

## Decisions
- Owner requested brand-consistent integration: only Email + First Name fields from Kit backend, all visual UI remains site-native.
- Implemented direct HTML form POST to Kit endpoint (no Kit template styles injected).
- Updated orchestration files after iteration: `TASKS.md`, `REPORT.md`, `PROJECT_STATE.md`.

## Files
- `index.html`
  - Removed disabled signup placeholder and ConvertKit instruction comment block.
  - Added live custom form:
    - `action="https://app.kit.com/forms/9132207/subscriptions"`
    - `name="email_address"`
    - `name="fields[first_name]"`
- `TASKS.md`
  - Set TASK-004 status to DONE.
- `REPORT.md`
  - Appended TASK-004 report block in required format.
- `PROJECT_STATE.md`
  - Updated current status, completed tasks, and blocked/not-done sections.
- `PROJECT_DEBT.md`
  - Added centralized debt register for pending connections, purchases, and launch prerequisites.

## Commands
- `Get-Content index.html -Encoding UTF8`
- `Select-String -Path index.html -Pattern 'action="https://app.kit.com/forms/9132207/subscriptions"|name="email_address"|name="fields\[first_name\]"|disabled|PASTE YOUR CONVERTKIT FORM CODE HERE|form-placeholder'`
- `Get-Content TASKS.md -Encoding UTF8`
- `Get-Content PROJECT_STATE.md -Encoding UTF8`
- `Get-Content REPORT.md -Encoding UTF8`
- `git diff -- index.html`

## Verification/QA Status
- Verification run: YES (source-level)
- Result: PASSED for implementation checks
- Evidence:
  - Live Kit form action is present.
  - Required Kit field names are present.
  - Disabled placeholder inputs and instruction comment are removed.
- External verification pending owner:
  - Submit test email and confirm subscriber appears in Kit dashboard.

## Next steps
1. Owner performs one live submission test from page and confirms it appears in Kit dashboard.
2. Execute TASK-006 + TASK-007 (header + hero spacing).
3. Execute TASK-008 + TASK-009 (copy rewrite + about section).
4. Execute TASK-011 + TASK-012 after content structure is stable.
5. Replace TikTok placeholder URL when owner provides final link.
