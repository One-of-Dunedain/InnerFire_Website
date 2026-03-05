# Task Queue

Active task index only. Full task specifications are stored in `tasks/active/`.
Completed and superseded tasks are archived in `archive/tasks/`.
Last updated: 2026-03-03

Archived blocks:
- `archive/tasks/TASKS_ARCHIVE_2026-02-25.md`
- `archive/tasks/TASKS_ARCHIVE_2026-02-27.md`
- `archive/tasks/TASKS_ARCHIVE_2026-03-01.md`

## Execution Contract
1. Find the first section with `Status: TODO`.
2. Open the Spec file and execute from that file as source of truth.
3. After completion: set status to `DONE` here, append report in `REPORT.md`, update `PROJECT_STATE.md`.

---

## [TASK-024] GA4 + Clarity with custom event tracking
Status: SUPERSEDED by TASK-045
Priority: Medium
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-024.md
Goal: Add conversion event tracking (form submits, share clicks, CTA clicks) to script.js. GA4/Clarity snippets stay commented.

---

## [TASK-030] Write "Best Breathwork Apps" article + AI optimization
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-028, TASK-029
Spec: tasks/active/TASK-030.md
Goal: Create blog/best-breathwork-apps.html with full content, Schema.org (ItemList + FAQPage), update posts.json, create llms.txt for AI discoverability.

---

## [TASK-031] UGC research + trust signals for breathwork apps article
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: TASK-030
Spec: tasks/active/TASK-031.md
Goal: Research real user reviews, billing complaints, scam reports, Reddit sentiment for all 10 apps. Collect verifiable quotes with sources. Rate billing transparency (GREEN/YELLOW/RED). Output to docs/research/breathwork-apps-ugc.md.

---

## [TASK-032] Collect app logos/icons for article
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-032.md
Goal: Download official app icons (112x112 PNG) for all 11 apps. Save to assets/images/apps/. Fix broken icon placeholders in article.

---

## [TASK-033] Article UX/UI improvements for long-form navigation
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-030
Spec: tasks/active/TASK-033.md
Goal: Add sticky ToC (desktop), back-to-top button, comparison table scroll hint (mobile), section visual separators. CSS + inline JS in article page.

---

---

## [TASK-036] Pricing & monetization deep-dive for all breathwork apps
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-036.md
Goal: Research exact pricing (monthly/yearly/lifetime), free tier feature split, trial mechanics (length, auto-renew, CC upfront), paywall behavior, dark patterns, cancel ease for all 11 apps. Output to docs/research/breathwork-apps-pricing.md.

---

## [TASK-035] Rewrite article content - human tone, UGC, pricing, Wave 2 apps
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: TASK-031 (DONE), TASK-036 (DONE)
Spec: tasks/active/TASK-035.md
Goal: Rewrite all article text to honest human tone. Add pricing blocks, UGC quotes, billing badges to each app card. Add 6 Wave 2 apps. Update comparison table, Schema.org, meta. No keyword stuffing.

---

## [TASK-037] Mobile UX polish for long listicle article (16+ apps)
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-035
Spec: tasks/active/TASK-037.md
Goal: Add collapsible app cards on mobile, quick filter chips, "Next app" links, smooth anchor + auto-expand, app count badge. Make 16+ app article feel fast and navigable on mobile.

---

## [TASK-038] Mobile app card layout overhaul
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: TASK-035 (DONE), TASK-037 (DONE)
Spec: tasks/active/TASK-038.md
Goal: Redesign mobile (<768px) app card layout. Grid-based header with icon/name/rating/price-hint/badge only. Hide platforms + store links from collapsed state, show in expanded body. Reduce padding. Add price hints via data attributes. Zero desktop changes.

---

## [TASK-039] Article UX/UI polish - forms, spacing, consistency fixes
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: TASK-038 (DONE)
Spec: tasks/active/TASK-039.md
Goal: Add first_name field to both signup forms (matching index.html Kit.com pattern). Redesign InnerFire card signup box (move after verdict, warm accent styling). Tighten mobile spacing at 480px breakpoint. Fix reading progress bar, section separators, Quick Picks responsive.

---

## [TASK-040] Blog index - compact mobile layout
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-040.md
Goal: Redesign blog index mobile layout so all articles fit in 1-2 screens. Featured (newest) card keeps full 16:9 thumb, remaining cards become compact horizontal rows (72px square thumb, title + category + date, no excerpt). CSS-only, no JS changes. Desktop unchanged.

---

## [TASK-041] New article — Vagus Nerve Breathing
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-041.md
Goal: Create new article replacing why-exhale-works.html. Topic: vagus nerve, breathing mechanics, multisensory approach. Full scientific references (PubMed). Vertical video placeholder. FAQ section with structured data. Complete template compliance (CTA, Schema.org, canonical, full footer).

---

## [TASK-042] New article — Build a Breathing Habit
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-042.md
Goal: Create new article replacing reset-in-3-minutes.html. Topic: habit formation science, 5 rules for making breathing stick. Interactive visuals: habit formation curve (inline SVG) + 21-day breath map (CSS grid). FAQ section. Complete template compliance.

---

## [TASK-043] Blog cleanup — posts.json, delete old files, fix consistency
Status: DONE (partial — old files deleted, posts.json updated; breathing-under-noise.html removed entirely)
Priority: High
Owner: Executor AI
Depends on: TASK-041 (DONE), TASK-042 (DONE)
Spec: tasks/active/TASK-043.md
Goal: Update posts.json with new slugs. Delete old article files (why-exhale-works.html, reset-in-3-minutes.html, post-02.svg, post-03.svg). Fix breathing-under-noise.html consistency (add CTA, Schema.org, canonical, full footer, missing meta tags).

---

## [TASK-044] Privacy Policy + Cookie Policy page
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-044.md
Goal: Create privacy.html with full privacy policy (GDPR, CCPA, CalOPPA compliant). Covers: Kit email collection, GA4/Clarity analytics, cookie disclosures, user rights, third-party services. Add "Privacy" + "Cookie Settings" links to footer on ALL pages.

---

## [TASK-045] Cookie consent + GA4 + Clarity + event tracking
Status: DONE
Priority: Critical
Owner: Executor AI
Depends on: TASK-044 (DONE)
Supersedes: TASK-024
Spec: tasks/active/TASK-045.md
Goal: Create consent.js with cookie consent banner (GDPR compliant), Google Consent Mode v2, conditional GA4 + Clarity loading, custom event tracking (form_submit, scroll_depth, share_click, cta_click). Remove commented analytics blocks from all pages. No analytics without user consent.

---

## [TASK-046] Form audit — verify all signup forms match Kit pattern
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-043 (DONE), TASK-044 (DONE), TASK-045 (DONE)
Spec: tasks/active/TASK-046.md
Goal: Audit all Kit signup forms across all pages for field consistency (first_name + email), correct form IDs, preconnect headers, templates. Fix any drift.

---

## [TASK-047] Anti-spam — honeypot + client-side validation for all forms
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-046 (DONE)
Spec: tasks/active/TASK-047.md
Goal: Add honeypot field (invisible, off-screen) + time-based submission check (< 2s = blocked) to all Kit forms. JS handler in script.js. No CAPTCHA, no external deps.

---

## [TASK-048] GA4 + Clarity setup — replace placeholders, verify end-to-end
Status: DONE
Priority: High
Owner: Executor AI + User
Depends on: TASK-045 (DONE)
Spec: tasks/active/TASK-048.md
Goal: Replace placeholder IDs in consent.js with real GA4 Measurement ID + Clarity Project ID. Configure GA4 conversions for custom events. Verify full analytics pipeline: consent → load → events → dashboards.

---

## [TASK-049] Waitlist counter — Cloudflare Workers + KV serverless endpoint
Status: TODO
Priority: High
Owner: Executor AI + User
Depends on: TASK-045 (DONE), TASK-046 (DONE)
Spec: tasks/active/TASK-049.md
Goal: Real-time "X / 300" waitlist counter on landing page. Cloudflare Worker API with KV storage. Kit webhook increments counter on new subscriber. Frontend fetch + display with graceful fallback.

---

## [TASK-050] Production QA — full site checklist before launch
Status: TODO
Priority: Critical
Owner: Executor AI + User
Depends on: TASK-045 (DONE), TASK-046 (DONE), TASK-047 (DONE), TASK-048 (DONE), TASK-049 (DONE)
Spec: tasks/active/TASK-050.md
Goal: Comprehensive QA at 5 breakpoints (375/428/768/1440/1920px). All pages: visual, forms, consent flow, analytics, SEO, accessibility, Lighthouse scores (≥90), security, cross-browser. Zero Critical/High issues before launch.

---

## [TASK-051] Security Headers — Cloudflare Pages `_headers` file
Status: TODO
Priority: High
Owner: Executor AI
Depends on: none (parallel-safe)
Spec: tasks/active/TASK-051.md
Goal: Create `_headers` file with X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP. Configure HSTS via Cloudflare dashboard.

---

## [TASK-052] Content Security Policy (CSP)
Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-045 (DONE), TASK-049, TASK-051
Spec: tasks/active/TASK-052.md
Goal: Add CSP header to `_headers` with precise allowlist for Kit, GA4, Clarity, Google Fonts, Worker API. Start in Report-Only mode, verify zero violations, switch to enforcing.

