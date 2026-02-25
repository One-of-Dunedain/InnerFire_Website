# Project State

## Last updated: 2026-02-25
## Current status: Core task queue complete (0 active TODO tasks)

---

## What exists

### Website (static HTML/CSS/JS, no build step)
- `index.html` - landing page (hero, carousel, why-it-works, about, signup, footer)
- `blog.html` - dynamic blog index page (JSON manifest-driven card grid + newsletter CTA)
- `styles.css` - dark theme, responsive breakpoints, glass header, blog index + article styles
- `script.js` - smooth scroll, share buttons, wick progress
- `content/` - product/docs assets
- `blog/posts.json` - blog post manifest (currently populated with demo posts)

### Implemented capabilities (TASK-001-018, all DONE)
- SEO/OG/Twitter meta tags
- Flame emoji favicon on all pages
- Kit email form (Email + First Name)
- Sticky glass header with nav
- Fire animation hero (glow + embers)
- Breathing environments carousel with share buttons
- "Why it actually works" section (3 benefit cards)
- About the Author section (Ukraine origin story)
- Social links: TikTok (placeholder) + X + Discord
- Burning wick signup progress indicator
- CLAUDE.md auto-loading rules
- Blog manifest system and responsive blog card grid (TASK-013)
- Reusable article template with rich media and reading-progress bar (TASK-014)
- Blog share controls on article pages and blog cards with clipboard fallback (TASK-015)
- Blog newsletter and inline article CTA forms connected to Kit endpoint (TASK-016)
- SEO foundation: canonical links, JSON-LD, robots.txt, and sitemap.xml (TASK-017)
- GA4 + Microsoft Clarity placeholders added to all pages (inactive by default, TASK-018)

### What is NOT done yet
- Real GA4 and Clarity IDs are not configured yet (placeholders are present but commented out)
- TikTok URL still placeholder `#`
- Live Kit submission still needs owner-side validation
- `og-image.png` does not exist yet
- Author photos are placeholders

---

## Product goal
Collect 300 emails from potential beta testers.
Traffic source: short video content (TikTok, X, Discord).
Conversion path: video -> landing page -> email signup -> TestFlight invite.

---

## Page narrative architecture (Orchestrator decision)
HOOK -> SHOW -> EXPLAIN -> TRUST -> CONVERT

1. Hero - confirm product concept immediately
2. Carousel - show breathing environments
3. Why it works - explain mechanism
4. About the Author - add trust
5. CTA + progress wick - conversion + urgency
6. Footer - social destinations

---

## Blog architecture (Orchestrator decision - TASK-013+)
Static blog with JSON manifest. No build step.

- Each post = standalone HTML file in `blog/`
- `blog/posts.json` manifest lists published posts
- `blog.html` fetches manifest and renders article card grid
- Owner workflow: copy template -> fill content -> add to manifest -> push
- Media support: optional vertical/horizontal video, images, audio
- Newsletter CTA on blog index + after each article
- Share buttons (native share + clipboard fallback)
- Reading progress bar on article pages

---

## Active tasks
- none

## Completed tasks
Archived in `archive/tasks/TASKS_ARCHIVE_2026-02-25.md`
- TASK-001 through TASK-013 (DONE)
- TASK-014 (DONE)
- TASK-015 (DONE)
- TASK-016 (DONE)
- TASK-017 (DONE)
- TASK-018 (DONE)
- TASK-003 SUPERSEDED by TASK-010

## Archive system
- `TASKS.md` - active tasks only
- `REPORT.md` - current reports only
- `archive/tasks/` - completed task definitions
- `archive/reports/` - historical execution reports

## Known issues
- Python installation state may vary by terminal session

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
- Analytics: GA4 + Microsoft Clarity placeholders integrated (IDs pending)
