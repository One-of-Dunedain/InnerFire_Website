# TASK-061 — Safe Browsing Remediation: Domain Identity + Trust Signals

Status: TODO
Priority: CRITICAL (production blocker — site blocked by Chrome)
Owner: Executor AI
Depends on: none
Incident brief: docs/ai/ORCHESTRATOR_SAFE_BROWSING_INCIDENT_2026-03-09.md

## Problem

Google Safe Browsing classifies `innerfire-app.com` as "Deceptive pages".
Chrome shows a full-page danger warning. The site is effectively offline.

Root cause: combination of trust anti-patterns, not malware.

## Root Cause Analysis

| # | Factor | Severity | Detail |
|---|--------|----------|--------|
| 1 | Domain identity mismatch | CRITICAL | 30+ production references to old domain `innerfire.app` in canonical, og:url, JSON-LD, sitemap, robots — while site is live on `innerfire-app.com`. Google interprets this as impersonation/spoofing |
| 2 | Domain parking history | HIGH | Domain was on Dynadot parking recently. Google may have flagged during that phase |
| 3 | Reward-for-email copy | MEDIUM | "Leave your email → get TestFlight invite + Discord access" is a classic phishing pattern on a new/untrusted domain |
| 4 | Broken placeholder links | LOW | 5 TikTok `href="#"` links in article footers signal unfinished/suspicious site |

## Scope

This task covers ALL trust-signal fixes needed before submitting a Google reconsideration request.
Four phases, executed in order. All phases in ONE deployment.

---

## Phase 1: Domain Identity Fix

**Goal:** Replace every public-facing `innerfire.app` reference with `innerfire-app.com`.

### Rules
- Replace domain `innerfire.app` → `innerfire-app.com` in ALL production files listed below
- Replace email `marian@innerfire.app` → `marian@innerfire-app.com`
- Replace text "innerfire.app" (when referring to the website) → "innerfire-app.com"
- Do NOT touch files in `tasks/`, `docs/`, `archive/`, `REPORT.md`, `PROJECT_DEBT.md` — those are internal docs, not deployed
- Do NOT touch `_headers` or `styles.css` or `script.js` — no domain references there

### File Operations — Phase 1

| # | File | Action | What to replace |
|---|------|--------|-----------------|
| 1 | `index.html` | MODIFY | og:url, canonical, JSON-LD `url` — all `innerfire.app` → `innerfire-app.com` |
| 2 | `blog.html` | MODIFY | og:url, canonical — `innerfire.app` → `innerfire-app.com` |
| 3 | `privacy.html` | MODIFY | canonical, body text "innerfire.app", all `marian@innerfire.app` → `marian@innerfire-app.com` (5 occurrences) |
| 4 | `blog/best-breathwork-apps.html` | MODIFY | og:url, canonical, JSON-LD `@id` |
| 5 | `blog/build-breathing-habit.html` | MODIFY | og:url, canonical, JSON-LD `mainEntityOfPage` `@id` |
| 6 | `blog/vagus-nerve-breathing.html` | MODIFY | og:url, canonical, JSON-LD `mainEntityOfPage` `@id` |
| 7 | `blog/_template.html` | MODIFY | og:url, canonical, JSON-LD `@id` |
| 8 | `blog/_listicle-template.html` | MODIFY | og:url, canonical, JSON-LD `@id` |
| 9 | `robots.txt` | MODIFY | Sitemap URL |
| 10 | `sitemap.xml` | MODIFY | All `<loc>` URLs (5 entries) |
| 11 | `llms.txt` | MODIFY | All URLs (4 entries) |
| 12 | `workers/waitlist-counter.js` | MODIFY | CORS `allowOrigin` — `innerfire.app` → `innerfire-app.com` |

### Verification — Phase 1
```bash
# Must return ZERO results in production files (exclude tasks/, docs/, archive/, REPORT.md, PROJECT_DEBT.md)
grep -r "innerfire\.app" --include="*.html" --include="*.txt" --include="*.xml" --include="*.js" \
  --exclude-dir=tasks --exclude-dir=docs --exclude-dir=archive \
  --exclude=REPORT.md --exclude=PROJECT_DEBT.md .
```

---

## Phase 2: Trust Copy Fix

**Goal:** Remove reward-for-email language that triggers phishing classification.

### Current copy (REPLACE THIS):

**Pattern A** — found in `index.html` line 206, `blog.html` line 83, and article CTA blocks:
```html
Leave your email for Apple TestFlight invite and tester Discord access.
```

**Pattern B** — found in `blog.html` line 98, article CTA blocks:
```html
No spam. Just a TestFlight invite + Discord link when I'm ready.
```

### New copy (USE THIS):

**Pattern A replacement:**
```html
Join the waitlist — we'll let you know when InnerFire is ready to test on iOS.
```

**Pattern B replacement:**
```html
No spam. One email when the beta opens.
```

### File Operations — Phase 2

| # | File | Lines (approx) | Changes |
|---|------|-----------------|---------|
| 1 | `index.html` | ~206 | Replace Pattern A in `.signup-sub` |
| 2 | `blog.html` | ~83, ~98 | Replace Pattern A in `.blog-newsletter-sub`, Pattern B in `.form-note` |
| 3 | `blog/best-breathwork-apps.html` | ~1418, ~1432 | Replace Pattern A in `.article-cta-sub`, Pattern B in `.form-note` |
| 4 | `blog/build-breathing-habit.html` | ~351, ~366 | Replace Pattern A in `.article-cta-sub`, Pattern B in `.form-note` |
| 5 | `blog/vagus-nerve-breathing.html` | ~310, ~325 | Replace Pattern A in `.article-cta-sub`, Pattern B in `.form-note` |
| 6 | `blog/_template.html` | CTA section | Replace Pattern B in `.form-note` (already says "Just a beta invite" — verify and keep if safe) |
| 7 | `blog/_listicle-template.html` | CTA section | Replace Pattern B in `.form-note` (already says "Just a beta invite" — verify and keep if safe) |

### Rules — Phase 2
- Do NOT change button text "Get Early Access" — that's fine
- Do NOT change form `action` URLs or form structure
- Do NOT remove the signup sections — just rewrite the descriptive text
- Templates (`_template.html`, `_listicle-template.html`): check current copy first. If it already says "Just a beta invite." without TestFlight/Discord, leave it

---

## Phase 3: Footer Cleanup

**Goal:** Remove broken TikTok placeholder links from all footers.

### What to remove
Every `<a href="#" ...>TikTok</a>` link element in footer social sections.

### File Operations — Phase 3

| # | File | Action |
|---|------|--------|
| 1 | `blog/best-breathwork-apps.html` | Remove TikTok `<a>` from footer |
| 2 | `blog/build-breathing-habit.html` | Remove TikTok `<a>` from footer |
| 3 | `blog/vagus-nerve-breathing.html` | Remove TikTok `<a>` from footer |
| 4 | `blog/_template.html` | Remove TikTok `<a>` from footer |
| 5 | `blog/_listicle-template.html` | Remove TikTok `<a>` from footer |

### Rules — Phase 3
- Remove ONLY the TikTok `<a>` element, not the surrounding `<div>` or other social links
- Do NOT remove Discord, X (Twitter), or any other working social links
- Do NOT add new social links

---

## Phase 4: Verification Checklist

After all changes, run these checks:

```bash
# 1. No old domain in production files
grep -r "innerfire\.app" --include="*.html" --include="*.txt" --include="*.xml" --include="*.js" \
  --exclude-dir=tasks --exclude-dir=docs --exclude-dir=archive \
  --exclude=REPORT.md --exclude=PROJECT_DEBT.md .
# Expected: zero results

# 2. New domain present in key locations
grep -c "innerfire-app\.com" index.html blog.html sitemap.xml robots.txt
# Expected: counts > 0 for each file

# 3. No reward language remaining
grep -r "TestFlight invite" --include="*.html" .
grep -r "Discord access" --include="*.html" .
grep -r "Discord link" --include="*.html" .
# Expected: zero results for all three

# 4. No TikTok placeholder links
grep -r 'href="#".*TikTok' --include="*.html" .
# Expected: zero results

# 5. HTML validity spot-check (no broken tags from edits)
# Open index.html, blog.html, one article in browser — check no visual breakage
```

---

## Files Modified (complete list)

| File | Phase |
|------|-------|
| `index.html` | 1, 2 |
| `blog.html` | 1, 2 |
| `privacy.html` | 1 |
| `blog/best-breathwork-apps.html` | 1, 2, 3 |
| `blog/build-breathing-habit.html` | 1, 2, 3 |
| `blog/vagus-nerve-breathing.html` | 1, 2, 3 |
| `blog/_template.html` | 1, 2, 3 |
| `blog/_listicle-template.html` | 1, 2, 3 |
| `robots.txt` | 1 |
| `sitemap.xml` | 1 |
| `llms.txt` | 1 |
| `workers/waitlist-counter.js` | 1 |

**Total: 12 files.** Justified: domain swap is mechanical find-replace across all files with old domain references. Leaving ANY file unfixed defeats the purpose.

---

## What NOT to Do

- Do NOT modify `styles.css`, `script.js`, `consent.js` — no domain references, no trust issues
- Do NOT modify `_headers` — security headers are fine
- Do NOT remove signup forms or CTA sections — only rewrite descriptive text
- Do NOT modify task/doc files — they are not deployed
- Do NOT add new features, pages, or scripts
- Do NOT change form IDs, data-uid, or Kit integration
- Do NOT remove Discord link from footer — it's a real, working community link

---

## Recovery (context compaction)

If you lose context mid-task, re-read this spec and check:
1. Which phase you're on (check git diff for what's already changed)
2. Run Phase 4 verification to see what's still missing
3. Continue from the first failing check

---

## Acceptance Criteria

- [ ] Phase 1: Zero `innerfire.app` references in production files (verification command returns 0)
- [ ] Phase 1: `innerfire-app.com` present in canonical, og:url, JSON-LD for all pages
- [ ] Phase 1: `sitemap.xml` and `robots.txt` use `innerfire-app.com`
- [ ] Phase 1: `privacy.html` email addresses use `@innerfire-app.com`
- [ ] Phase 1: Worker CORS uses `innerfire-app.com`
- [ ] Phase 2: No "TestFlight invite" or "Discord access/link" in signup copy
- [ ] Phase 2: New copy is factual, no reward-for-email pattern
- [ ] Phase 3: No TikTok `href="#"` placeholder links remain
- [ ] Phase 4: All verification commands pass
- [ ] Phase 4: Visual spot-check — no broken layout from edits

---

## After Executor Completes (Orchestrator / Human steps)

1. Review diff, deploy to Cloudflare Pages
2. Verify live site has correct domain in view-source
3. Go to Google Search Console → Security Issues → "Request Review"
4. In review request, describe: "Migrated all metadata to correct production domain, removed misleading signup copy, cleaned placeholder links"
5. Wait 1–3 days for Google re-review
6. Monitor Safe Browsing status
