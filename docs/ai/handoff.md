# Handoff

## Goal
Collect 300 emails from potential beta testers via static landing page flows.

## Stack
- Static site: HTML/CSS/JS (no build step)
- Hosting: **Cloudflare Pages** (decision confirmed 2026-03-04)
- Email provider: Kit (ConvertKit)
- Analytics: GA4 + Microsoft Clarity (behind consent)

## Status

### Completed tasks
TASK-001 through TASK-012, TASK-024 (SUPERSEDED), TASK-030 through TASK-043.

### Current batch (TODO)
| Task | Description | Status | Blocker |
|------|-------------|--------|---------|
| TASK-044 | Privacy Policy page | TODO | — |
| TASK-045 | Cookie consent + analytics | TODO | TASK-044 |
| TASK-046 | Form audit | TODO | TASK-043, 044, 045 |
| TASK-047 | Anti-spam (honeypot) | TODO | TASK-046 |
| TASK-048 | GA4 + Clarity real IDs | TODO | TASK-045 + user creates accounts |
| TASK-049 | Waitlist counter (CF Workers) | TODO | TASK-045, 046 + user CF account |
| TASK-050 | Production QA | TODO | all above |

### Key notes
- **TASK-043** marked DONE — old files deleted, posts.json updated, breathing-under-noise.html removed entirely (was never completed as article)
- **TASK-024** superseded by TASK-045
- All forms across 7 pages are already consistent (verified by audit agent)

## Decisions
- **Hosting: Cloudflare Pages** — decided 2026-03-04. This unlocks Cloudflare Workers for TASK-049 waitlist counter.
- Keep header minimal and shared across pages.
- Use fixed translucent header with blur to match dark visual identity.
- Keep implementation static and dependency-free (except Workers for counter).
- Anti-spam: honeypot + time-based check only (no CAPTCHA, no external deps).
- Analytics: GA4 + Clarity behind GDPR consent banner, Google Consent Mode v2, defaults denied.

## Files changed in latest session (2026-03-04)
- Created task specs: `tasks/active/TASK-046.md` through `TASK-050.md`
- Updated `TASKS.md` — added 5 new tasks, marked TASK-043 as DONE
- Updated `docs/ai/handoff.md` — this file

## Open risks / notes
- **User action needed for TASK-048:** Create GA4 property + Clarity project, provide real IDs
- **User action needed for TASK-049:** Cloudflare account setup, KV namespace, Kit webhook config
- First live Kit submission flow still needs owner validation in Kit dashboard
- TikTok URL still placeholder until provided

## Next steps
1. Execute TASK-044 (Privacy Policy page) — first TODO in queue
2. Execute TASK-045 (Cookie consent + analytics)
3. Execute TASK-046 (Form audit)
4. Execute TASK-047 (Anti-spam)
5. User creates GA4 + Clarity accounts → TASK-048
6. User sets up Cloudflare Pages + Workers → TASK-049
7. TASK-050 (Production QA) — final gate before launch
