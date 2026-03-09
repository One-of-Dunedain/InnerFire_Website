# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing-page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting target: Cloudflare Pages
- Email provider: Kit (ConvertKit forms + webhook target)
- Analytics: GA4 + Microsoft Clarity behind consent (`consent.js`)
- Counter backend target: Cloudflare Worker + KV

## Current Status (2026-03-09)

### PRODUCTION INCIDENT: Google Safe Browsing "Deceptive pages"
- Site deployed at `innerfire-app.com` (NOT `innerfire.app` — domain changed)
- Chrome blocks all pages with danger warning
- Root cause: 30+ canonical/og:url/JSON-LD references still point to old `innerfire.app` domain + reward-for-email signup copy
- Fix: TASK-061 (domain identity + trust signals remediation)
- After fix: redeploy → Google Search Console "Request Review" → wait 1-3 days

### Task summary
| Task | Status | Notes |
|---|---|---|
| TASK-055 | DONE | og-image.png created |
| TASK-056 | DONE | Pre-deploy cleanup (Worker URL disabled, TikTok links removed from main pages) |
| TASK-058 | DONE | Signup copy rewrite (TestFlight + Discord) — **NOTE: copy needs re-revision in TASK-061 for trust reasons** |
| TASK-059 | TODO | Vagus article readability (ToC + SVG illustrations) — **deprioritized, TASK-061 first** |
| TASK-060 | TODO | Habit article ToC — **deprioritized, TASK-061 first** |
| TASK-061 | TODO | **CRITICAL** Safe Browsing remediation — domain swap + trust copy + footer cleanup |

### Production domain
- **Current:** `innerfire-app.com` (Cloudflare Pages)
- **Old (DO NOT USE):** `innerfire.app`
- **Media:** `media.innerfire-app.com` (R2)

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
7. Completed TASK-053:
   - Added 3 carousel background videos in `index.html`.
   - Added 1 controlled video embed in `blog/build-breathing-habit.html`.
   - Added `.card-bg-video` styles and viewport-based autoplay/pause logic in `script.js`.
   - Normalized provided assets into `assets/videos/demo-1.mp4`, `demo-2.mp4`, `demo-3.mp4`.

## Files Changed In This Cycle
- `_headers`
- `workers/waitlist-counter.js` (new, currently untracked)
- `script.js`
- `index.html`
- `styles.css`
- `blog/build-breathing-habit.html`
- `assets/videos/demo-1.mp4`
- `assets/videos/demo-2.mp4`
- `assets/videos/demo-3.mp4`
- `TASKS.md`
- `REPORT.md`
- `docs/ai/bugfix-log.md`
- `docs/ai/handoff.md`
- `tasks/active/TASK-053.md`
- (from pushed hardening commit) `blog.html`, `blog/best-breathwork-apps.html`, `blog/build-breathing-habit.html`, `blog/vagus-nerve-breathing.html`, `privacy.html`, `sitemap.xml`

## Commits Already Pushed
- `9d4fe59` - `feat(security): add Cloudflare headers and CSP policy`
- `91669b1` - `feat(analytics): complete TASK-048 GA4+Clarity setup and verification`
- `add0ce5` - `fix(security): remove inline handlers and harden external links`
- `756c1aa` - `feat(waitlist): add worker scaffold and sync task docs`

## Working Tree Snapshot (not fully committed)
- Modified: `TASKS.md`, `REPORT.md`, `index.html`, `script.js`, `styles.css`, `blog/build-breathing-habit.html`, `tasks/active/TASK-053.md`, `docs/ai/handoff.md`
- Untracked (relevant): `assets/videos/demo-1.mp4`, `assets/videos/demo-2.mp4`, `assets/videos/demo-3.mp4`

## Verification And Diagnostics

### Commands run
- `curl https://innerfire.app` (content mismatch validation)
- `git diff -- index.html`
- `git diff -- script.js`
- `Get-Content _headers`
- `Get-Content workers/waitlist-counter.js`
- `rg -n "card-bg-video|demo-1.mp4|demo-2.mp4|demo-3.mp4" index.html`
- `rg -n "media-video-v|demo-2.mp4" blog/build-breathing-habit.html`
- `node --check script.js`

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
1. **TASK-061** (CRITICAL): Execute Safe Browsing remediation — domain swap + trust copy + footer cleanup
2. Redeploy to Cloudflare Pages after TASK-061 verified
3. Submit Google Search Console "Request Review" with remediation summary
4. While waiting for Google (1-3 days): execute TASK-059, TASK-060
5. After Google clears: TASK-050 production QA

## In-Session Fixes (2026-03-05, video UX hotfix)
- Reverted mobile carousel sizing change that shrank homepage demo cards; restored larger card width on `max-width: 480px`.
- Updated fullscreen flow so first tap requests fullscreen immediately, then upgrades source to full-quality in background (instead of swapping source first).
- Added fallback for Safari/iOS fullscreen API path when `requestFullscreen` rejects.
- Unified `vagus-nerve-breathing` video block with `build-breathing-habit` container/hint pattern (`media-video-card` + `video-card` + `video-card-hint`).
- Files touched in this hotfix cycle: `styles.css`, `script.js`, `blog/vagus-nerve-breathing.html`.
