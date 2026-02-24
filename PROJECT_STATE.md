# Project State

## Last updated: 2026-02-24
## Current status: Landing page built — SEO metadata added, pending integrations and polish

---

## What exists

### Website (static HTML/CSS/JS, no build step)
- `index.html` — landing page with 5 sections:
  - Hero: animated fire glow + floating ember particles
  - Demo: horizontal carousel of 5 vertical (9:16) video placeholders
  - Who It's For: 3 benefit cards
  - Email Signup: ConvertKit placeholder (disabled form)
  - Footer: social links (placeholder), blog link
- `styles.css` — dark theme, mobile-first responsive (3 breakpoints)
- `script.js` — smooth anchor scroll only
- `blog.html` — blog shell ("coming soon")
- `content/` — product overview and user-rules docs (not shown on site)

### What is NOT done yet
- ConvertKit form is disconnected — emails cannot be collected
- Social links are `href="#"` — not pointing to real profiles
- No favicon
- No CLAUDE.md (AI rules not auto-loaded)
- No dev server script (developer must run python manually)
- Blog has no articles

---

## Product goal
Collect 300 emails from potential beta testers.
Traffic source: short video content (TikTok, Instagram, YouTube Shorts).
Conversion path: video → landing page → email signup → TestFlight invite.

---

## Completed tasks
- [TASK-001] Add OG meta tags and page SEO

## Active task
- none

## Known issues
- none

## Stack
- Pure HTML/CSS/JS, no dependencies, no build step
- Hosted: GitHub Pages (intended)
- Email service: ConvertKit (not yet connected)
