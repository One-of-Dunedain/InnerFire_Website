# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing-page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting target: Cloudflare Pages
- Email provider: Kit (ConvertKit forms + webhook target)
- Analytics: GA4 + Microsoft Clarity behind consent (`consent.js`)
- Counter backend target: Cloudflare Worker + KV

## Current Status (2026-03-05)

### Task summary
| Task | Status | Notes |
|---|---|---|
| TASK-048 | DONE | Real GA4/Clarity IDs configured and verified in consent-gated flow |
| TASK-049 | IN PROGRESS | Code complete locally; waiting on Worker deploy, real URL, and Kit webhook |
| TASK-050 | BLOCKED | Production QA blocked until `innerfire.app` points to this repo deployment |
| TASK-051 | DONE | `_headers` security baseline added |
| TASK-052 | DONE (partial dependency) | Enforcing CSP added; Worker host still missing from `connect-src` until TASK-049 deploy |
| TASK-053 | BLOCKED | Waiting for video files in `assets/videos/` |

### Latest owner decision
- Deployment is intentionally postponed for now. Continue with code/docs prep only.

## What Was Done In This Cycle
1. Completed TASK-051 in code scope:
   - Added `_headers` with security headers and `X-Robots-Tag: noindex` for `privacy.html`.
2. Completed TASK-052 in repo scope:
   - Added enforcing CSP to `_headers` with allowlists for self/Kit/GA4/Clarity and script hashes.
3. Implemented TASK-049 code scope:
   - Created `workers/waitlist-counter.js` (GET count + POST webhook increment with secret check).
   - Updated `script.js` to fetch waitlist count from Worker URL placeholder and update wick progress.
   - Updated `index.html` counter markup to `#waitlist-count`.
4. Applied UI hotfix requested by owner:
   - Exact numeric counter text in signup section was hidden visually (`sr-only`), leaving progress bar as primary indicator.
5. Ran QA diagnostics for TASK-050 and documented blocker:
   - `innerfire.app` currently serves a different site (not this repository output), so production QA cannot be finalized.
6. Applied post-QA hardening fixes and pushed:
   - Commit `add0ce5` removes inline handler, hardens external links, normalizes canonical, updates sitemap.
   - Logged under `docs/ai/bugfix-log.md`.

## Files Changed In This Cycle
- `_headers`
- `workers/waitlist-counter.js` (new, currently untracked)
- `script.js`
- `index.html`
- `TASKS.md`
- `REPORT.md`
- `docs/ai/bugfix-log.md`
- `docs/ai/handoff.md`
- (from pushed hardening commit) `blog.html`, `blog/best-breathwork-apps.html`, `blog/build-breathing-habit.html`, `blog/vagus-nerve-breathing.html`, `privacy.html`, `sitemap.xml`

## Commits Already Pushed
- `9d4fe59` - `feat(security): add Cloudflare headers and CSP policy`
- `91669b1` - `feat(analytics): complete TASK-048 GA4+Clarity setup and verification`
- `add0ce5` - `fix(security): remove inline handlers and harden external links`

## Working Tree Snapshot (not fully committed)
- Modified: `TASKS.md`, `index.html`, `script.js`, `REPORT.md`, `docs/ai/handoff.md`
- Untracked (relevant): `workers/waitlist-counter.js`

## Verification And Diagnostics

### Commands run
- `curl https://innerfire.app` (content mismatch validation)
- `git diff -- index.html`
- `git diff -- script.js`
- `Get-Content _headers`
- `Get-Content workers/waitlist-counter.js`

### Findings
- Domain mismatch confirmed: current `innerfire.app` response does not match this static site.
- Waitlist API URL is still placeholder in `script.js`:
  - `https://innerfire-waitlist.<your-subdomain>.workers.dev/api/waitlist-count`
- CSP currently cannot include final Worker host until actual Worker URL is known.

## Required User Actions (when ready)
1. Cloudflare Pages:
   - Make sure `innerfire.app` points to this repository deployment.
2. Cloudflare Worker setup for TASK-049:
   - Create KV namespace `WAITLIST`.
   - Set secret `WEBHOOK_SECRET`.
   - Deploy Worker and provide final Worker URL.
3. Kit:
   - Configure webhook to Worker endpoint `/api/waitlist-webhook?secret=...`.
4. Cloudflare security:
   - Enable HSTS in dashboard (SSL/TLS -> Edge Certificates).

## Open Risks / Blockers
- Launch blocker: production domain is not serving this project.
- Waitlist counter cannot work in production until real Worker URL replaces placeholder.
- Full TASK-050 QA (including Lighthouse and cross-browser) is pending deployment switch.

## Next Steps
1. Keep deployment paused as requested.
2. When owner is ready, perform Cloudflare Pages domain switch.
3. Deploy Worker + KV and share Worker URL.
4. Patch `script.js` placeholder URL and append Worker host into CSP `connect-src`.
5. Re-run full TASK-050 production QA checklist and close launch blockers.
