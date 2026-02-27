# Task Queue

Active task index only. Full task specifications are stored in tasks/active/.
Completed and superseded tasks are archived in archive/tasks/.
Last updated: 2026-02-27

## Execution Contract
1. Find the first section with Status: TODO.
2. Open the Spec file and execute from that file as source of truth.
3. After completion: set status to DONE here, append report in REPORT.md, update PROJECT_STATE.md.

---

## [TASK-019] Site-wide text cleanup (em-dashes, grammar, voice)
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-019.md
Goal: Remove all em-dash characters from user-visible text. Fix "a App" grammar. Change "we" to "I" in signup copy.

---

## [TASK-020] Hero section visual overhaul
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: tasks/active/TASK-020.md
Goal: More embers (16), stronger glow, breathing-synced ember speed, gradient tagline styling, "Take a look" button linking to carousel.

---

## [TASK-021] About section rewrite + UI refresh
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: tasks/active/TASK-021.md
Goal: Rename to "From Ukraine, with a purpose", replace body text with owner-provided copy, add highlight styling.

---

## [TASK-022] "Why it actually works" blur reveal interaction
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: tasks/active/TASK-022.md
Goal: Blur benefit descriptions until click/tap reveals them. Accessible, with reduced-motion fallback.

---

## [TASK-023] Ambient embers for entire site (except hero)
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-020
Spec: tasks/active/TASK-023.md
Goal: 8 glowing pulsating embers, position:fixed behind content (z-index:-1 + body isolation:isolate). Rise slowly, pulse with light, drift horizontally, fade at top. Visible everywhere except hero (hero's solid bg covers them). Remove solid bg from .signup/.blog-newsletter.

---

## [TASK-024] GA4 + Clarity with custom event tracking
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-024.md
Goal: Add conversion event tracking (form submits, share clicks, CTA clicks) to script.js. GA4/Clarity snippets stay commented.

---

## [TASK-025] SEO deep improvements (2026 standards)
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-021
Spec: tasks/active/TASK-025.md
Goal: Add theme-color, preconnect, og:locale, meta author, fix heading hierarchy, improve alt texts, expand sitemap guidance.

---

## [TASK-026] Blog UX/UI audit + fixes
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-023
Spec: tasks/active/TASK-026.md
Goal: Fix mobile share button visibility, add social links to blog footers, improve empty state, audit and fix UX issues.

---

## [TASK-027] Glassmorphism button system (site-wide consistency)
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-023, TASK-026
Spec: tasks/active/TASK-027.md
Goal: Apply consistent glassmorphism (frosted glass) effect to ALL 5 button types. backdrop-filter blur + semi-transparent bg + luminous borders + warm hover glow. Two tiers: warm glass (CTA) and dark glass (share/utility). CSS-only change.
