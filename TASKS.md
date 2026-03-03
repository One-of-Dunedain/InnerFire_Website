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
Status: TODO
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

## [TASK-034] Research 10 additional breathwork apps (Wave 2 expansion)
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-034.md
Goal: Research 10 new apps (Breathly, Stoa, Breathe+, Kardia, Open, BreathingZone, Exhale, Mesmerize, Breethe, Soma Breath) with full data + UGC quotes + billing ratings. Append to docs/research/breathwork-apps.md.

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
Depends on: TASK-031 (DONE), TASK-036 (DONE), TASK-034 (partial)
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
Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-041 (DONE), TASK-042 (DONE)
Spec: tasks/active/TASK-043.md
Goal: Update posts.json with new slugs. Delete old article files (why-exhale-works.html, reset-in-3-minutes.html, post-02.svg, post-03.svg). Fix breathing-under-noise.html consistency (add CTA, Schema.org, canonical, full footer, missing meta tags).
