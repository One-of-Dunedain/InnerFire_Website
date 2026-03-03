# Project State

## Last updated: 2026-03-04
## Current status: TASK-047 completed; 3 active tasks remaining (TASK-048, TASK-049, TASK-050)

---

## What exists

### Website (static HTML/CSS/JS, no build step)
- `index.html` - landing page (hero, carousel, why-it-works, about, signup, footer)
- `blog.html` - dynamic blog index page (JSON manifest-driven card grid + newsletter CTA)
- `styles.css` - dark theme, responsive breakpoints, glass header, blog index + article styles
- `script.js` - smooth scroll, share buttons, wick progress
- `content/` - product/docs assets
- `blog/posts.json` - blog post manifest (includes published listicle card for "Best Breathwork Apps (2026)")

### Implemented capabilities (TASK-001-023 + TASK-025 through TASK-042 complete)
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
- Site-wide copy cleanup: removed em-dash artifacts, fixed grammar, shifted signup/newsletter voice to "I" (TASK-019)
- Hero overhaul: 16 embers, stronger glow pulse, gradient emphasis line, and "Take a look" CTA to carousel (TASK-020)
- About section rewrite: "From Ukraine, with a purpose" content refresh + highlighted closing statement block (TASK-021)
- Why-it-works interaction: blur-to-reveal benefit descriptions with keyboard + aria support and reduced-motion fallback (TASK-022)
- Site-wide ambient ember layer: 8 fixed glowing particles behind content (excluding hero), with body isolation stacking, reduced-motion hide, and transparent signup/newsletter backgrounds (TASK-023)
- SEO deep improvements: theme-color, preconnect, og:locale, author meta, blog heading hierarchy fix, and sitemap/blog alt-text guidance updates (TASK-025)
- Blog UX/UI audit + fixes: mobile-visible share controls, enhanced empty state CTA, full social-link footers on blog pages, and manifest fetch cache-hardening for fresh post state (TASK-026)
- Site-wide magnifying-lens button system: all 5 button types use transparent lens styling (`background: transparent`, `backdrop-filter: brightness()`), with warm luminous borders and JS-driven ambient ember magnification (`scale: 2`) on overlap (TASK-027)
- Competitive research foundation for listicle production: 10 app profiles with pricing/ratings/features, InnerFire positioning, top-3 SERP analysis, PAA set, and 2026 trend angles in `docs/research/breathwork-apps.md` (TASK-028)
- Listicle publishing system: reusable `blog/_listicle-template.html` with ToC, quick picks, app cards, comparison table, FAQ accordion, dual JSON-LD schemas, and dedicated responsive component styles in `styles.css` (TASK-029)
- Production listicle article published at `blog/best-breathwork-apps.html` with full app reviews, quick picks, comparison table, FAQ accordion, JSON-LD (Article + ItemList + FAQPage), root `llms.txt`, and blog manifest update (TASK-030)
- UGC/trust-signal research corpus created in `docs/research/breathwork-apps-ugc.md` with sourced user quotes, billing transparency ratings, Reddit sentiment, Trustpilot/BBB/SiteJabber checks, plus privacy/graveyard industry synthesis (TASK-031)
- Official app icon pack for listicle cards: replaced placeholder assets with real 112x112 PNG icons for all 11 compared apps in `assets/images/apps/`, including brand-aligned `innerfire.png` fallback; verified all article card icons render without broken placeholders (TASK-032)
- Long-form article navigation upgrades for `blog/best-breathwork-apps.html`: desktop sticky ToC sidebar with active section highlighting, floating back-to-top control, mobile comparison table "Scroll →" hint with first-scroll dismissal, and section rhythm separators for major groups (TASK-033)
- Deep article rewrite for `blog/best-breathwork-apps.html`: human-tone copy refresh, 16 full app cards with pricing+UGC+billing badges, 6 integrated Wave 2 apps, expanded quick picks, concise FAQ refresh, and 16-row pricing/billing comparison matrix (TASK-035)
- Pricing/monetization research corpus created for all 11 article apps in `docs/research/breathwork-apps-pricing.md`: subscription tiers, effective yearly monthly cost, free-tier split, trial and cancel flow notes, paywall/dark-pattern signals, and final comparison table (TASK-036)
- Mobile listicle UX polish for `blog/best-breathwork-apps.html`: app-count badge, quick filter chips, mobile collapsible app cards, auto-generated "Next app" links, smooth anchor scrolling with mobile auto-expand, and hash-load card auto-expand for deep links (TASK-037)
- Mobile app-card layout overhaul for `blog/best-breathwork-apps.html`: grid-based compact mobile headers (icon/name/rating+price hint/badge/toggle), hidden noisy meta in collapsed state, expanded-body platforms/store row, and 16-card `data-price-hint` system with mobile-only rendering (TASK-038)
- Article UX/UI consistency polish for `blog/best-breathwork-apps.html`: First Name + Email on both Kit forms, InnerFire signup moved after verdict with warm in-card styling, desktop two-column form grids, tighter mobile spacing at 480px, and tiny-screen Quick Picks responsiveness (TASK-039)
- Blog index compact mobile layout for `blog.html`: first card remains featured 16:9, remaining cards convert to 72px horizontal compact rows with hidden excerpts, reduced mobile header/newsletter spacing, and tablet 2:1 thumbnail ratio while preserving desktop layout (TASK-040)
- New science article published at `blog/vagus-nerve-breathing.html` with full template compliance (meta/canonical/schema), vertical video placeholder, FAQ accordion + FAQPage schema, 4 PubMed references, complete CTA/author/footer/navigation structure, and dedicated thumbnail `blog/images/vagus-nerve-breathing.svg` (TASK-041)
- New science-backed habit article created at `blog/build-breathing-habit.html` with full template compliance (meta/canonical/schema), interactive habit-curve SVG, responsive 21-day breath map component, FAQ accordion behavior, and dedicated thumbnail asset `blog/images/build-breathing-habit.svg` (TASK-042)
- Privacy policy page added at `privacy.html` with noindex, cookie disclosures, third-party services table, GDPR/CCPA rights, and footer legal links (`Privacy` + `Cookie Settings`) added across landing/blog/article pages (TASK-044)
- Cookie consent system added via `consent.js` with Google Consent Mode v2 defaults, consent banner + Cookie Settings reset flow, conditional GA4/Clarity loading, and custom analytics events (`form_submit`, `form_error`, `scroll_depth`, `share_click`, `cta_click`) wired across landing/blog/article pages (TASK-045)
- Anti-spam baseline deployed across all Kit forms: honeypot field (`website_url`) on every form + client-side 2-second minimum submit gate in `script.js`, with blocking on filled honeypot or too-fast submit (TASK-047)

### What is NOT done yet
- Real GA4 and Clarity IDs are not configured yet (placeholders remain in `consent.js`)
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
- [TASK-048] GA4 + Clarity setup - replace placeholders, verify end-to-end (TODO)
- [TASK-049] Waitlist counter - Cloudflare Workers + KV serverless endpoint (TODO)
- [TASK-050] Production QA - full site checklist before launch (TODO)

## Completed tasks
Archived in `archive/tasks/TASKS_ARCHIVE_2026-02-25.md`
- TASK-001 through TASK-013 (DONE)
- TASK-014 (DONE)
- TASK-015 (DONE)
- TASK-016 (DONE)
- TASK-017 (DONE)
- TASK-018 (DONE)
- TASK-019 (DONE)
- TASK-020 (DONE)
- TASK-021 (DONE)
- TASK-022 (DONE)
- TASK-023 (DONE)
- TASK-025 (DONE)
- TASK-026 (DONE)
- TASK-027 (DONE)
- TASK-028 (DONE)
- TASK-029 (DONE)
- TASK-030 (DONE)
- TASK-031 (DONE)
- TASK-032 (DONE)
- TASK-033 (DONE)
- TASK-035 (DONE)
- TASK-036 (DONE)
- TASK-037 (DONE)
- TASK-038 (DONE)
- TASK-039 (DONE)
- TASK-040 (DONE)
- TASK-041 (DONE)
- TASK-042 (DONE)
- TASK-043 (DONE partial)
- TASK-044 (DONE)
- TASK-045 (DONE)
- TASK-046 (DONE)
- TASK-047 (DONE)
- TASK-034 (REMOVED as non-current by owner decision; spec moved to archive/tasks/TASK-034.md)
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
- Hosted: Cloudflare Pages (target)
- Email service: Kit (HTML form POST endpoint)
- Analytics: consent-gated GA4 + Clarity via `consent.js` (real IDs pending)



