# Project State

## Last updated: 2026-02-25
## Current status: Header/navigation and hero spacing updates completed; ready for copy/story iteration

---

## What exists

### Website (static HTML/CSS/JS, no build step)
- `index.html` - landing page with hero, carousel, benefits section, signup section, and footer
- `blog.html` - blog shell page with shared top header
- `styles.css` - dark theme styles, responsive breakpoints, fixed glass header styles
- `script.js` - smooth anchor scrolling
- `content/` - product/docs assets not rendered directly on site

### Implemented capabilities
- SEO/OG/Twitter meta tags added (TASK-001 DONE)
- Flame favicon added to both pages (TASK-002 DONE)
- Kit-connected custom signup form (Email + First Name) in `index.html` (TASK-004 DONE)
- `CLAUDE.md` added from `content/user-rules.md` (TASK-005 DONE)
- Shared sticky header added on `index.html` and `blog.html` (TASK-006 DONE)
- Hero whitespace reduced for tighter first-screen layout (TASK-007 DONE)
- Footer social links updated to TikTok placeholder + X + Discord (TASK-010 DONE)

### What is NOT done yet
- Landing page copy rewrite and section text restructuring (TASK-008)
- About the Author section (TASK-009)
- Carousel share buttons (TASK-011)
- Signup wick/progress indicator (TASK-012)
- TikTok URL still placeholder `#` (owner has not provided final URL)
- Live Kit submission and confirmation-email flow still needs owner-side validation

---

## Product goal
Collect 300 emails from potential beta testers.
Traffic source: short video content (TikTok, X, Discord).
Conversion path: video -> landing page -> email signup -> TestFlight invite.

---

## Page narrative architecture (Orchestrator decision)
Visitor arrives from short social video with high curiosity and low attention span.
Page flow: HOOK -> SHOW -> EXPLAIN -> TRUST -> CONVERT

1. Hero - confirm product concept immediately
2. Carousel - show breathing environments
3. Why it works - explain mechanism
4. About the Author - add trust
5. CTA + progress wick - conversion + urgency
6. Footer - social destinations

---

## Completed tasks
- [TASK-001] Add OG meta tags and page SEO
- [TASK-002] Add favicon
- [TASK-004] Connect ConvertKit email form
- [TASK-005] Create CLAUDE.md for AI auto-loading rules
- [TASK-006] Add sticky header navigation
- [TASK-007] Reduce hero whitespace and tighten layout
- [TASK-010] Replace social links - remove Instagram/YouTube, add TikTok/X/Discord

## Active task
- none

## Superseded tasks
- [TASK-003] Old social links task - replaced by TASK-010

## Blocked tasks
- none

## Known issues
- Python installation state may vary by terminal session on the local machine

## Author info (for tasks)
- Name: Maryan Kushnir
- LinkedIn: https://www.linkedin.com/in/kushnir-maryan/
- Discord: https://discord.gg/PRuveBJH
- X: https://x.com/kushnir_marian_
- TikTok: URL not yet provided
- Location: Ukraine

## Stack
- Pure HTML/CSS/JS, no dependencies, no build step
- Hosted: GitHub Pages (intended)
- Email service: Kit (HTML form POST endpoint)
