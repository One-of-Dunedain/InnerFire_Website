# Tasks Archive - 2026-02-27

Archived from `TASKS.md` to keep active index focused on pending work.
Only completed (`Status: DONE`) tasks were archived in this batch.

---

## [TASK-019] Site-wide text cleanup (em-dashes, grammar, voice)
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: archive/tasks/TASK-019.md
Goal: Remove all em-dash characters from user-visible text. Fix "a App" grammar. Change "we" to "I" in signup copy.

---

## [TASK-020] Hero section visual overhaul
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: archive/tasks/TASK-020.md
Goal: More embers (16), stronger glow, breathing-synced ember speed, gradient tagline styling, "Take a look" button linking to carousel.

---

## [TASK-021] About section rewrite + UI refresh
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: archive/tasks/TASK-021.md
Goal: Rename to "From Ukraine, with a purpose", replace body text with owner-provided copy, add highlight styling.

---

## [TASK-022] "Why it actually works" blur reveal interaction
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-019
Spec: archive/tasks/TASK-022.md
Goal: Blur benefit descriptions until click/tap reveals them. Accessible, with reduced-motion fallback.

---

## [TASK-023] Ambient embers for entire site (except hero)
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-020
Spec: archive/tasks/TASK-023.md
Goal: 8 glowing pulsating embers, position:fixed behind content (z-index:-1 + body isolation:isolate). Rise slowly, pulse with light, drift horizontally, fade at top. Visible everywhere except hero (hero's solid bg covers them). Remove solid bg from .signup/.blog-newsletter.

---

## [TASK-025] SEO deep improvements (2026 standards)
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-021
Spec: archive/tasks/TASK-025.md
Goal: Add theme-color, preconnect, og:locale, meta author, fix heading hierarchy, improve alt texts, expand sitemap guidance.

---

## [TASK-026] Blog UX/UI audit + fixes
Status: DONE
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-023
Spec: archive/tasks/TASK-026.md
Goal: Fix mobile share button visibility, add social links to blog footers, improve empty state, audit and fix UX issues.

---

## [TASK-027] Magnifying lens button system (site-wide)
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-023, TASK-026
Spec: archive/tasks/TASK-027.md
Goal: Transform all 5 button types into transparent magnifying lenses. No fill, backdrop-filter: brightness(), thin luminous borders. Ambient embers physically enlarge (scale: 2) when floating behind buttons via JS requestAnimationFrame loop. CSS + JS change.
