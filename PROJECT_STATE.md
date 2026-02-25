# Project State

## Last updated: 2026-02-25
## Current status: Task queue updated — major landing page overhaul planned

---

## What exists

### Website (static HTML/CSS/JS, no build step)
- `index.html` — landing page with 5 sections:
  - Hero: animated fire glow + floating ember particles
  - Demo: horizontal carousel of 5 vertical (9:16) video placeholders
  - Who It's For: 3 benefit cards (to be rewritten in TASK-008)
  - Email Signup: ConvertKit placeholder (disabled form)
  - Footer: social links (placeholder), blog link
- `styles.css` — dark theme, mobile-first responsive (3 breakpoints)
- `script.js` — smooth anchor scroll only
- `blog.html` — blog shell ("coming soon")
- `content/` — product overview and user-rules docs (not shown on site)
- OG/Twitter meta tags added (TASK-001 DONE)

### What is NOT done yet
- No site header/navigation (TASK-006)
- Hero has too much whitespace (TASK-007)
- Page copy is generic, needs rewrite with real messaging pillars (TASK-008)
- No About the Author section (TASK-009)
- Social links wrong: currently Instagram/YouTube, should be TikTok/X/Discord (TASK-010)
- No carousel share buttons (TASK-011)
- No signup progress indicator (TASK-012)
- No favicon (TASK-002)
- ConvertKit form not connected (TASK-004 — BLOCKED, waiting for embed code)
- No CLAUDE.md (TASK-005)

---

## Product goal
Collect 300 emails from potential beta testers.
Traffic source: short video content (TikTok, X, Discord).
Conversion path: video → landing page → email signup → TestFlight invite.

---

## Page narrative architecture (Orchestrator decision)
Visitor arrives from a 15-30s TikTok/Reel with high curiosity, low attention span.
Page flow: HOOK → SHOW → EXPLAIN → TRUST → CONVERT

1. **Hero** — confirm ("this is the thing from the video")
2. **Carousel** — show more breathing environments
3. **Why it works** — explain grounding mechanism (vagus nerve, doomscrolling, multisensory)
4. **About the Author** — trust (Ukraine, war, personal origin story)
5. **CTA + progress wick** — convert with urgency and social proof
6. **Footer** — nav, TikTok/X/Discord, blog link

---

## Completed tasks
- [TASK-001] Add OG meta tags and page SEO

## Active task
- none

## Superseded tasks
- [TASK-003] Old social links task — replaced by TASK-010

## Blocked tasks
- [TASK-004] ConvertKit — waiting for owner to provide embed code

## Known issues
- Python not properly installed on dev machine (winget install ran but may need terminal restart)

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
- Email service: ConvertKit (not yet connected)
