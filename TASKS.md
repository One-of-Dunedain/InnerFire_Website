# Task Queue

Active task index only. Full task specifications are stored in `tasks/active/`.
Completed and superseded tasks are archived in `archive/tasks/`.
Last updated: 2026-03-01

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
Status: TODO
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
Status: TODO
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-036.md
Goal: Research exact pricing (monthly/yearly/lifetime), free tier feature split, trial mechanics (length, auto-renew, CC upfront), paywall behavior, dark patterns, cancel ease for all 11 apps. Output to docs/research/breathwork-apps-pricing.md.
