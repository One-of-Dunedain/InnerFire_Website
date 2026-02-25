# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting target: GitHub Pages
- Email provider target: ConvertKit

## Status
- Iteration completed with 3 tasks: TASK-002, TASK-005, TASK-010.
- Completed set now: TASK-001, TASK-002, TASK-005, TASK-010.
- Remaining high-impact UI/content tasks: TASK-006, TASK-007, TASK-008, TASK-009, TASK-011, TASK-012.
- TASK-004 remains blocked pending ConvertKit embed code from owner.

## Decisions
- Picked only unblocked, deterministic tasks for high-confidence delivery in one iteration.
- Limited code edits to required surfaces only:
  - TASK-002: `<head>` in `index.html` + `blog.html`
  - TASK-010: `.social-links` block only in `index.html`
  - TASK-005: verbatim file copy from `content/user-rules.md` to `CLAUDE.md`
- Updated required orchestration files after execution: `TASKS.md`, `REPORT.md`, `PROJECT_STATE.md`.

## Files
- `index.html`
  - Added favicon link tag.
  - Replaced footer social links with TikTok placeholder + X + Discord (`target="_blank" rel="noopener"`).
- `blog.html`
  - Added favicon link tag.
- `CLAUDE.md`
  - Created as exact copy of `content/user-rules.md`.
- `TASKS.md`
  - Set statuses to DONE for TASK-002, TASK-005, TASK-010.
- `REPORT.md`
  - Appended report blocks for TASK-002, TASK-005, TASK-010 in required format.
- `PROJECT_STATE.md`
  - Updated current status, completed tasks list, and not-done list.

## Commands
- `Get-Content TASKS.md -Encoding UTF8`
- `Get-Content PROJECT_STATE.md -Encoding UTF8`
- `Get-Content REPORTING_FORMAT.md -Encoding UTF8`
- `Get-Content index.html -Encoding UTF8`
- `Get-Content blog.html -Encoding UTF8`
- `Copy-Item content/user-rules.md CLAUDE.md -Force`
- `Select-String -Path index.html,blog.html -Pattern '<link rel="icon"'`
- `Select-String -Path index.html -Pattern 'Instagram|YouTube' | Measure-Object`
- `Select-String -Path index.html -Pattern 'TikTok URL: replace # when provided|https://x.com/kushnir_marian_|https://discord.gg/PRuveBJH'`
- `Compare-Object (Get-Content CLAUDE.md) (Get-Content content/user-rules.md)`

## Verification/QA Status
- Verification run: YES
- Result: PASSED
- Evidence:
  - Favicon tags present in both files at line 7.
  - `OLD_SOCIAL_MATCHES=0` confirms Instagram/YouTube removed.
  - TikTok/X/Discord links and required attributes verified in `index.html` lines 141–144.
  - `CLAUDE_DIFF=NONE` confirms exact copy.

## Next steps
1. Execute TASK-006 (sticky header) and TASK-007 (hero height) in the next UI iteration.
2. Execute TASK-008 + TASK-009 together to align narrative flow and trust section.
3. Execute TASK-011 and TASK-012 after the content structure stabilizes.
4. Wait for owner input to unblock TASK-004 (ConvertKit embed code) and TikTok URL finalization.
