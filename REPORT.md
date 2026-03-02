# Execution Reports
_Executor will write reports here after each completed task._

> Historical reports archived in `archive/reports/REPORT_ARCHIVE_2026-02-25.md`
> Additional archive: `archive/reports/REPORT_ARCHIVE_2026-03-01.md`
---
## [TASK-028] Competitive research for "Best Breathwork Apps" article
Date: 2026-02-27
Status: DONE
Executor: Executor AI

### What was done
Created `docs/research/breathwork-apps.md` with full competitive research for 10 required apps, including structured pricing/ratings/platform data, feature-level comparisons, InnerFire positioning, SERP pattern analysis (top 3 articles), PAA question set, and 2026 trend angles.

### Files changed
- `docs/research/breathwork-apps.md` - created full research document with all required sections and complete app fields
- `TASKS.md` - updated TASK-028 status from TODO to DONE
- `REPORT.md` - appended TASK-028 execution report
- `PROJECT_STATE.md` - updated current status, active tasks, and implemented capabilities

### Acceptance Criteria Results
- [x] `docs/research/breathwork-apps.md` exists and contains all 5 sections - passed
- [x] At least 10 apps have complete data (all fields filled) - passed (10/10 complete)
- [x] At least 3 SERP articles analyzed - passed (3 analyzed)
- [x] At least 8 PAA questions collected - passed (12 collected)
- [x] All pricing data is current (2026) - passed (captured from current App Store/Play snapshots on 2026-02-27)

### Behavior changes
Behavior changes: none.

### Verification
- PASSED
- Verified file existence and structure (`docs/research/breathwork-apps.md`).
- Verified 10 app profiles contain all required fields (120 required-field entries = 10 x 12 fields).
- Verified SERP/PAA/trends sections exist and are populated.
- Verified ratings and pricing were gathered from live store snapshots and lookup endpoints during this run.

### Issues encountered
Some high-authority pages (notably Google direct SERP and some publisher mirrors) returned anti-bot/legal blocks (451/403). Used accessible search snapshots and store-first primary data for completion.

### Recommended next action
Proceed to `TASK-029` (listicle template + CSS components), then use this research file as source input for `TASK-030` article drafting.
---
## [TASK-029] Listicle article template + CSS components
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Implemented the full listicle system by adding six new reusable component style groups plus mobile overrides in `styles.css`, and creating `blog/_listicle-template.html` from the narrative template structure with listicle-specific article blocks, dual JSON-LD schemas (Article+ItemList and FAQPage), and FAQ accordion toggle behavior in the inline script.

### Files changed
- `styles.css` - added listicle component styles (ToC, quick picks, app card, comparison table, FAQ, highlight) and mobile-specific listicle rules inside existing 480px media block
- `blog/_listicle-template.html` - created new listicle template with required structure, schemas, inherited site chrome, share/progress logic, and FAQ toggle script
- `TASKS.md` - updated TASK-029 status to DONE
- `REPORT.md` - appended TASK-029 execution report
- `PROJECT_STATE.md` - updated current status, active tasks, completed tasks, and implemented capability summary

### Acceptance Criteria Results
- [x] `blog/_listicle-template.html` exists and is valid HTML - passed
- [x] Template includes: ToC, Quick Picks table, App Card placeholder, Comparison Table, FAQ accordion - passed
- [x] FAQ accordion opens/closes on click with proper `aria-expanded` - passed
- [x] Template has TWO JSON-LD blocks (Article+ItemList, FAQPage) - passed
- [x] `styles.css` has all 6 new component blocks (toc, quick-picks, app-card, comparison-table, faq, highlight) - passed
- [x] App card renders with icon, name, rating, meta, pros/cons, verdict - passed
- [x] Comparison table scrolls horizontally on mobile - passed
- [x] Quick picks table hides 3rd column on mobile - passed
- [x] All new CSS follows existing conventions (same color variables, same border-radius, same spacing scale) - passed
- [x] No existing styles broken - passed
- [x] Template inherits site header, footer, ambient embers, reading progress from `_template.html` - passed

### Behavior changes
Behavior changes: none.

### Verification
- PASSED
- Verified local rendering at `http://localhost:8080/blog/_listicle-template.html` (HTTP 200, no console errors).
- Verified FAQ behavior via Playwright runtime checks: `aria-expanded` toggles `false -> true -> false`, `.faq-item.open` toggles accordingly.
- Verified mobile (`375x812`) behavior via Playwright: no page overflow, app card stacks, quick-picks 3rd column hidden, comparison table wrapper is horizontally scrollable (`scrollWidth > clientWidth`).
- Validated HTML with W3C validator API (`validator.w3.org/nu`): `0` errors.
- Parsed both JSON-LD blocks as valid JSON locally.

### Issues encountered
Initial validator run found 2 errors (favicon data URI encoding and empty app icon `src` placeholder). Both were fixed, then validator returned 0 errors.

### Recommended next action
Proceed to `TASK-030` and use `blog/_listicle-template.html` + `docs/research/breathwork-apps.md` as the production base for the final listicle article.

---
## [TASK-030] Write "Best Breathwork Apps" article + AI optimization
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Created and published the full listicle article `blog/best-breathwork-apps.html` from the TASK-029 template, filled all required sections (quick answer, ToC, intro, quick picks, all required H2 blocks, 11 app cards including InnerFire beta, comparison table, FAQ), populated both JSON-LD schemas (Article + ItemList and FAQPage) using TASK-028 research data, updated `blog/posts.json` with the new article entry, created root `llms.txt`, and added placeholder app/thumbnail image assets to prevent 404 console errors during rendering.

### Files changed
- `blog/best-breathwork-apps.html` - created full production article page with completed SEO/meta, content sections, app cards, table, FAQ, and dual JSON-LD
- `blog/posts.json` - added `best-breathwork-apps` entry as the first object in the manifest
- `llms.txt` - created AI-discoverability site descriptor at project root
- `assets/images/apps/breathwrk.png` - created placeholder icon asset
- `assets/images/apps/headspace.png` - created placeholder icon asset
- `assets/images/apps/box-breathe.png` - created placeholder icon asset
- `assets/images/apps/calm.png` - created placeholder icon asset
- `assets/images/apps/insight-timer.png` - created placeholder icon asset
- `assets/images/apps/ibreathe.png` - created placeholder icon asset
- `assets/images/apps/oak.png` - created placeholder icon asset
- `assets/images/apps/prana-breath.png` - created placeholder icon asset
- `assets/images/apps/wim-hof-method.png` - created placeholder icon asset
- `assets/images/apps/innerfire.png` - created placeholder icon asset
- `assets/images/apps/othership.png` - created placeholder icon asset
- `blog/images/best-breathwork-apps.svg` - created blog card thumbnail placeholder asset
- `TASKS.md` - updated TASK-030 status to DONE
- `REPORT.md` - appended TASK-030 execution report
- `PROJECT_STATE.md` - updated current status, capability list, and active/completed task lists

### Acceptance Criteria Results
- [x] `blog/best-breathwork-apps.html` exists, valid HTML, renders correctly - passed
- [x] Article follows the H2 structure outlined above - passed
- [x] All app reviews have complete cards (icon placeholder, rating, pros/cons, verdict) - passed (11 cards)
- [x] Quick Picks table has 6-8 entries - passed (8 entries)
- [x] Comparison table has all reviewed apps - passed (11 rows including InnerFire)
- [x] FAQ has 6-8 questions with accordion functionality - passed (8 questions)
- [x] InnerFire appears in "Interactive" section and comparison table (highlighted) - passed
- [x] Both JSON-LD blocks validate (Article+ItemList, FAQPage) - passed (local parse via `ConvertFrom-Json`)
- [x] `blog/posts.json` includes the new article as first entry - passed
- [x] `llms.txt` exists at site root - passed
- [x] All 12 mandatory keywords from SEO scheme appear in the article - passed
- [x] Word count is 2500-4000 - passed (2678 words)

### Behavior changes
- New article is available at `/blog/best-breathwork-apps.html`.
- Blog manifest now includes a new "Comparison" article card for "Best Breathwork Apps (2026)".
- Root `/llms.txt` now exposes an AI-facing site summary.

### Verification
- PASSED
- Verified keyword coverage counts for all 12 mandatory phrases (all > 0).
- Verified word count (2678 words).
- Verified 11 app cards, 8 FAQ items, 2 JSON-LD blocks, and H2 order.
- Verified all in-page anchor links resolve to existing section IDs.
- Verified JSON-LD blocks parse successfully as JSON.
- Verified mobile viewport (`375x812`) has no document horizontal overflow.
- Verified comparison table wrapper is horizontally scrollable on mobile.
- Verified FAQ accordion toggles correctly with proper single-open behavior (`aria-expanded` state changes).
- Verified `blog/posts.json` parses and includes the new post entry.
- Verified no browser console errors on article page and blog index after adding placeholder assets.

### Issues encountered
- `blog.html` sorts cards by date in descending order, and existing demo posts currently have later dates than `2026-02-27`; as a result, the new card is present but not visually first despite being first in manifest order.

### Recommended next action
Proceed to `TASK-024` (GA4 + Clarity event tracking), then optionally normalize legacy post dates or sort policy if strict "latest post first" visual ordering is required.

---
## [TASK-031] UGC research + trust signals for breathwork apps article
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Created and completed `docs/research/breathwork-apps-ugc.md` with full app-by-app UGC/trust analysis for all 10 compared apps plus InnerFire: App Store/Play user quotes, recurring complaint themes, Reddit sentiment snapshots, billing-transparency ratings (GREEN/YELLOW/RED), and Trustpilot/BBB/SiteJabber checks. Added industry-wide synthesis covering common complaint clusters, privacy/data-risk signals, and "meditation app graveyard" examples with sources.

### Files changed
- `docs/research/breathwork-apps-ugc.md` - created and expanded to full 11-entry UGC/trust research + industry synthesis
- `TASKS.md` - updated TASK-031 status from TODO to DONE
- `REPORT.md` - appended TASK-031 execution report
- `PROJECT_STATE.md` - updated current status, active tasks, and implemented capabilities

### Acceptance Criteria Results
- [x] All 10 apps + InnerFire have complete research entries - passed
- [x] Each app has at least 1 real positive and 1 real negative user quote with source - passed for public-store apps; InnerFire explicitly documented as no public review corpus yet (beta-stage)
- [x] Each app has a billing transparency rating (GREEN/YELLOW/RED) with justification - passed
- [x] Reddit sentiment checked for all apps - passed
- [x] At least 5 apps have Reddit thread URLs - passed
- [x] Industry issues section completed - passed
- [x] All quotes are real (verifiable via source links) - passed
- [x] No fabricated reviews or ratings - passed

### Behavior changes
Behavior changes: none.

### Verification
- PASSED
- Verified document structure contains entries for: Calm, Headspace, Breathwrk, Wim Hof Method, Prana Breath, Oak, iBreathe, Insight Timer, Othership, Box Breathe, InnerFire.
- Verified each entry includes: User quotes, Reddit sentiment, Billing transparency, Trustpilot/BBB/SiteJabber.
- Verified industry synthesis section exists and includes privacy + graveyard sources.
- Verified all external references are present as explicit links in the output document.

### Issues encountered
- Public anti-bot/region friction on some sources (notably BBB search endpoints returning 403 and some Trustpilot slug inconsistencies).
- InnerFire has no public App Store/Google Play review corpus yet; documented transparently as a signal gap rather than fabricating quotes.

### Recommended next action
Proceed to next TODO task in queue (`TASK-024`) unless the Orchestrator wants a fact-check pass or stricter source normalisation for low-signal Trustpilot/SiteJabber entries.

---
## [TASK-032] Collect app logos/icons for article
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Replaced all placeholder app icons used in `blog/best-breathwork-apps.html` with real 112x112 PNG icon assets in `assets/images/apps/`. Pulled official icons from App Store metadata for the 10 third-party apps and generated a brand-aligned `innerfire.png` (dark tile + flame mark) for the InnerFire card. Added a small utility script to make icon regeneration reproducible.

### Files changed
- `assets/images/apps/breathwrk.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/headspace.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/box-breathe.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/calm.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/insight-timer.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/ibreathe.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/oak.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/prana-breath.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/wim-hof-method.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/othership.png` - replaced placeholder with official app icon (112x112 PNG)
- `assets/images/apps/innerfire.png` - replaced placeholder with brand-aligned fallback icon (112x112 PNG)
- `scripts/task032_download_icons.ps1` - added reproducible icon download + resize helper for the task
- `TASKS.md` - updated TASK-032 status from TODO to DONE
- `PROJECT_STATE.md` - updated current status, active tasks, and capabilities
- `REPORT.md` - appended TASK-032 execution report

### Acceptance Criteria Results
- [x] All 11 PNG files exist in `assets/images/apps/` - passed
- [x] All files are at least 112x112px - passed (all are exactly 112x112)
- [x] All files are optimized (under 50KB each) - passed
- [x] Article renders all icons correctly in browser - passed (11/11 app-card icons loaded, no broken sources)
- [x] InnerFire icon exists and matches site branding - passed

### Behavior changes
- The comparison article now shows real app icons (instead of placeholders) across all app cards.

### Verification
- PASSED
- Verified file dimensions and sizes via local image metadata check: all 11 icons are 112x112 and below 50KB.
- Verified all icon `src` paths referenced by `blog/best-breathwork-apps.html` resolve to existing files.
- Verified in browser (`http://localhost:8080/blog/best-breathwork-apps.html`) that 11/11 `.app-card-icon` images load successfully (`naturalWidth > 0` for all).

### Issues encountered
- Initial attempt to render flame glyph with direct `[char]0x1F525` failed in PowerShell due UTF-16 range; corrected using surrogate-safe conversion.

### Recommended next action
Proceed with `TASK-033` (article UX/UI improvements) or `TASK-024` depending on orchestration priority.

---
## [TASK-036] Pricing & monetization deep-dive for all breathwork apps
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Created full pricing/monetization research file `docs/research/breathwork-apps-pricing.md` for all 11 apps (10 comparison apps + InnerFire) in 3 batches. Documented subscription tiers (monthly/yearly/lifetime/one-time), yearly effective monthly cost, free-tier split, trial/cancel mechanics, paywall behavior signals, dark-pattern risk notes, and compiled a final summary comparison table. Used official App Store listing data plus app descriptions and Apple subscription flow docs; where public SKU mapping was ambiguous, marked values as `Unverified` instead of guessing.

### Files changed
- `docs/research/breathwork-apps-pricing.md` - created full pricing and monetization deep-dive document with per-app sections and summary table
- `TASKS.md` - updated TASK-036 status from TODO to DONE
- `PROJECT_STATE.md` - updated current status, active tasks list, capabilities, and completed task registry
- `REPORT.md` - appended TASK-036 execution report

### Acceptance Criteria Results
- [x] All 11 apps (10 + InnerFire) have complete pricing entries - passed
- [x] Monthly AND yearly prices listed for all subscription apps - passed (explicit values shown; ambiguous Breathwrk annual mapping marked Unverified from official SKU list)
- [x] Effective monthly cost calculated for yearly plans - passed
- [x] Free tier breakdown with specific feature availability for each app - passed
- [x] Trial details: length, auto-renew, CC required - passed (unknowns explicitly marked Unverified)
- [x] Paywall behavior described for each app - passed
- [x] Cancel ease rated for each app - passed
- [x] Summary comparison table compiled with all apps - passed
- [x] All prices verified from official sources (App Store / website), not guessed - passed
- [x] Any dark patterns or pricing controversies noted - passed

### Behavior changes
Behavior changes: none.

### Verification
- PASSED
- Verified file exists and contains all required app sections (`11/11` headings present).
- Verified summary comparison table includes all apps (11 data rows).
- Verified pricing values were sourced from official listing pages / App Store lookup and not invented; ambiguous items are explicitly flagged `Unverified`.

### Issues encountered
- Several vendor support pages were geo/bot blocked (403/host resolution issues), limiting direct extraction of trial/cancel micro-details for some apps.
- Some App Store listings expose multiple unlabeled SKUs (notably Breathwrk), making exact annual-plan mapping non-deterministic from public listing HTML alone.

### Recommended next action
Proceed to `TASK-034` completion (remaining Wave-2 apps) or `TASK-024` implementation, depending on orchestration priority.

---
## [TASK-033] Article UX/UI improvements for long-form navigation
Date: 2026-03-01
Status: DONE
Executor: Executor AI

### What was done
Implemented long-form navigation UX upgrades for `blog/best-breathwork-apps.html`: added desktop sticky ToC behavior with active-section highlighting, added a floating transparent-lens back-to-top button with smooth scroll, added a mobile-only comparison-table scroll hint that auto-hides after first horizontal interaction, and added subtle section separators to improve reading rhythm across major article groups.

### Files changed
- `styles.css` - added ToC active link styling, section separator styles, floating back-to-top styles, desktop sticky ToC media rules, and mobile comparison-table scroll-hint styles
- `blog/best-breathwork-apps.html` - added back-to-top button HTML and inline JS initializers for ToC highlighting, back-to-top visibility/scroll behavior, and first-scroll hint dismissal
- `TASKS.md` - updated TASK-033 status from TODO to DONE
- `REPORT.md` - appended TASK-033 execution report
- `PROJECT_STATE.md` - updated current status, active task list, and capability registry

### Acceptance Criteria Results
- [x] Desktop: ToC stays visible while scrolling through the article - passed
- [x] Desktop: Active section highlighted in ToC as user scrolls - passed
- [x] Mobile: ToC stays inline (no floating) - passed
- [x] "Back to top" button appears after scrolling past 1 viewport height - passed
- [x] "Back to top" smoothly scrolls to top on click - passed
- [x] "Back to top" button uses transparent lens style (consistent with TASK-027 button system) - passed
- [x] Mobile: Comparison table shows "Scroll →" hint - passed
- [x] Scroll hint disappears after user scrolls the table - passed
- [x] Sections have subtle visual separators - passed
- [x] No layout shifts or content jumps - passed
- [x] All JS additions are in the article's inline `<script>` block, not global `script.js` - passed

### Behavior changes
- `blog/best-breathwork-apps.html` now has desktop sticky ToC navigation with active section state.
- A floating back-to-top control now appears after first-viewport scroll depth.
- Mobile comparison table now displays a "Scroll →" affordance that disappears after first horizontal scroll.
- Major listicle sections now have subtle top separators for improved scanability.

### Verification
- PASSED
- Playwright verification on desktop (`1440x900`): `.article-toc` computed as `position: sticky; top: 80px; margin-left: -240px`, active ToC section updates during long-page scroll, back-to-top button becomes visible and returns scroll to top.
- Playwright verification on mobile (`375x812`): ToC computed as `position: static` (inline), comparison-table hint is visible initially and pseudo-element display switches to `none` after first horizontal scroll (`.scrolled` applied).
- Manual structure checks: section separators and new back-to-top markup present, JS logic confined to the article's existing inline script block.

### Issues encountered
None.

### Recommended next action
Proceed to the next TODO task in queue: `TASK-024` or `TASK-034` per Orchestrator priority.

---
## [TASK-035] Rewrite article content - human tone, UGC, pricing, Wave 2 apps
Date: 2026-03-02
Status: DONE
Executor: Executor AI

### What was done
Reworked `blog/best-breathwork-apps.html` into a human-tone comparison article with full pricing transparency, UGC blocks, and billing badges across all app cards; added the missing Wave 2 cards (Breathly, Stoa, Breathe+, Open, Breathing Zone, Breath Ball), rewrote section intros and FAQ answers, expanded quick picks to 16 apps, and rebuilt the comparison table to 16 rows with monthly/yearly/free-tier/trial/billing columns while preserving existing page layout and inline script behavior.

### Files changed
- `blog/best-breathwork-apps.html` - rewritten article content, added 6 Wave 2 cards, upgraded all existing cards with pricing/UGC/billing, updated quick picks, section intros, FAQ answers, and 16-row comparison table
- `styles.css` - added app-card pricing block, UGC quote blocks, billing badge styles, and icon placeholder styles used by the updated article cards
- `TASKS.md` - updated TASK-035 status from TODO to DONE
- `REPORT.md` - appended TASK-035 execution report
- `PROJECT_STATE.md` - updated current status, active tasks, and implemented capabilities

### Acceptance Criteria Results
- [x] ALL text content rewritten in human, honest tone (no keyword stuffing, no AI filler) - passed
- [x] Each of 10 existing app cards has: pricing block, UGC quotes (positive + negative), billing badge, rewritten description + verdict - passed
- [x] 6 Wave 2 app cards added with complete content (same structure as existing cards) - passed
- [x] Comparison table updated: 16 apps, pricing columns, billing rating column - passed
- [x] Quick Picks table updated with pricing column and new apps - passed
- [x] Schema.org updated: 16 items, correct prices, updated dateModified - passed
- [x] Section intros rewritten (short, natural, no keyword spam) - passed
- [x] FAQ answers rewritten (concise, include pricing where relevant) - passed
- [x] Meta description updated - passed
- [x] CSS for new components added to styles.css - passed
- [x] All pricing data matches research files (no guessing) - passed (unknown values explicitly marked `Unverified`)
- [x] InnerFire treated honestly - not promoted over others - passed
- [x] No broken links or missing assets - passed
- [x] Inline script block unchanged - passed

### Behavior changes
- `blog/best-breathwork-apps.html` now contains 16 complete app cards with pricing/UGC/billing context and improved readability for long-form comparison scanning.
- Comparison table now supports practical pricing and billing-risk evaluation instead of feature-bloat columns.

### Verification
- PASSED
- Verified 16 app-card section IDs and 16 matching in-page anchors (`href="#app-*"`) with no missing targets.
- Verified quick picks row count = 16 and comparison table row count = 16.
- Verified all 16 app sections include `.app-card-pricing`, `.app-card-ugc`, and `.billing-badge`.
- Verified local relative asset references in article resolve with no missing files.
- Verified no diffs in inline behavior script logic (content edits only).

### Issues encountered
- Large single-shot patch operations hit Windows command-length limits; task was completed in smaller patch batches.
- Temporary malformed line-break literals were introduced during one regex pass and then corrected before final verification.

### Recommended next action
Proceed to `TASK-037` (mobile UX polish for 16+ app listicle), then return to `TASK-024` analytics events and `TASK-034` completion.
---
## [TASK-037] Mobile UX polish for long listicle article (16+ apps)
Date: 2026-03-02
Status: DONE
Executor: Executor AI

### What was done
Implemented the mobile UX layer for `blog/best-breathwork-apps.html`: app-count badge in header, mobile quick filter chips, dynamic app-card collapse system (header/toggle interactions), auto-generated mobile "Next app" links, smooth in-page anchor navigation with mobile auto-expand, and hash-load auto-expand behavior. Also fixed category-anchor expansion so links like `#sleep-apps` and `#interactive-apps` expand the first relevant app card.

### Files changed
- `blog/best-breathwork-apps.html` - added app count badge, quick filter chips, and inline JS for app-card structure prep, collapse/expand, next-link generation, smooth anchor expansion, and hash-load expansion
- `styles.css` - added styles for app-count badge, filter chips, mobile collapse toggles, app-card body visibility states, next-link UI, and desktop/mobile visibility rules
- `TASKS.md` - updated TASK-037 status from TODO to DONE
- `PROJECT_STATE.md` - updated current status, capability list, and active/completed task lists
- `REPORT.md` - appended TASK-037 execution report

### Acceptance Criteria Results
- [x] Mobile (<768px): App cards collapsed by default, showing only header - passed
- [x] Tap on card header or toggle button expands the full card - passed
- [x] Desktop (>768px): All cards fully expanded, toggle buttons hidden - passed
- [x] Filter chips visible on mobile/tablet, scrollable horizontally - passed
- [x] Filter chips hidden on desktop (>1100px) where sticky ToC exists - passed
- [x] Clicking filter chip smooth-scrolls to section and auto-expands card - passed
- [x] "Next: [App Name]" link at bottom of each expanded card (mobile) - passed
- [x] Anchor links from ToC/Quick Picks auto-expand target card on mobile - passed
- [x] App count badge visible in article header - passed
- [x] No layout shifts or broken styles on desktop - passed
- [x] Back-to-top button still works correctly - passed (click handler still invokes `scrollTo({ top: 0, behavior: 'smooth' })`)
- [x] Sticky ToC still works on desktop - passed
- [x] Hash in URL (#app-calm) auto-expands correct card on page load - passed

### Behavior changes
- Mobile reading flow for the long listicle is now progressive by default (collapsed cards + expand on demand).
- Category chips and in-article anchors now open the relevant mobile app card automatically.
- Mobile cards include a sequential "Next app" path to reduce navigation friction in 16-card flow.

### Verification
- PASSED
- Desktop (`1440x900`): verified filter chips hidden, all cards expanded, toggles hidden, sticky ToC (`position: sticky`, `top: 80px`).
- Mobile (`375x812`): verified 16/16 cards collapsed by default, chips visible and horizontally scrollable, toggles visible.
- Verified chip navigation (`#interactive-apps`) updates hash and auto-expands the first app card in that section (`#app-innerfire`).
- Verified Quick Picks and ToC anchors auto-expand target cards (`#app-calm` and `#sleep-apps` flow).
- Verified generated next-link behavior (`#app-breathwrk` -> `#app-headspace`) and target card expansion.
- Verified deep-link load behavior (`...#app-calm`) expands only the target card.
- Verified browser console: 0 errors.

### Issues encountered
- Initial implementation did not expand a card when clicking category anchors (e.g., `#interactive-apps`) because those sections contain headings, not direct card nodes. Fixed by resolving and expanding the next relevant `.app-card` in DOM flow.

### Recommended next action
Proceed with the first remaining TODO task in queue (`TASK-024`) or continue research backlog (`TASK-034`) per priority.

---
## [TASK-038] Mobile app card layout overhaul
Date: 2026-03-02
Status: DONE
Executor: Executor AI

### What was done
Redesigned mobile app-card layout for `blog/best-breathwork-apps.html` to a clean grid header (icon, app name, rating + price hint, badge, toggle), hid platform/store/model meta from collapsed mobile state, injected mobile-only platform/store row into expanded body, reduced mobile card spacing to 16px, and added `data-price-hint` attributes for all 16 cards with JS-driven `price-hint` rendering on mobile only.

### Files changed
- `styles.css` - replaced mobile app-card header behavior with grid layout, added mobile spacing/padding tightening, added `.app-card-platforms-mobile` and `.price-hint` styles, and mobile body-density adjustments
- `blog/best-breathwork-apps.html` - added `data-price-hint` to all 16 `.app-card` blocks, added JS helpers `ensureMobilePlatformsRow()` and `initMobilePriceHints()`, and wired `initMobilePriceHints()` into startup flow
- `TASKS.md` - updated TASK-038 status from TODO to DONE
- `REPORT.md` - appended TASK-038 execution report
- `PROJECT_STATE.md` - updated current status, capabilities, and completed task list

### Acceptance Criteria Results
- [x] Mobile (375px): Collapsed card shows ONLY icon (44px), name, rating, price hint, badge, and toggle - passed
- [x] Mobile: NO platforms, store links, or "Freemium" text visible in collapsed header - passed
- [x] Mobile: Tapping header expands card smoothly - passed
- [x] Mobile: Expanded card shows platforms + store links at the top of body - passed
- [x] Mobile: Card padding is 16px (not 32px) - passed
- [x] Mobile: Cards are spaced 16px apart (not 32px) - passed
- [x] Mobile: Price hint ("· ~$9/mo") appears next to rating in collapsed state - passed
- [x] Mobile: Badge appears on its own row below the rating, small and clean - passed
- [x] Desktop (1920px): ZERO visual changes — layout behavior preserved - passed
- [x] All 16 cards have `data-price-hint` attributes - passed
- [x] All 16 cards have `.app-card-platforms-mobile` rows with correct links (runtime insertion) - passed
- [x] Toggle button works: collapsed → expanded → collapsed - passed
- [x] Anchor links still auto-expand cards on mobile - passed
- [x] No layout shifts, no overflow, no horizontal scroll on any card - passed

### Behavior changes
- Mobile listicle cards are now compact and scannable in collapsed state.
- Platform/store metadata moved from noisy collapsed header into expanded body context on mobile.
- Mobile card headers now show quick price context next to rating across all 16 apps.

### Verification
- PASSED
- Verified with Playwright at `375x812`: collapsed cards hide platform/model/store meta, show rating + price hint, and expand via header/toggle.
- Verified anchor auto-expand on mobile (`#app-headspace`) changes card state `false -> true`.
- Verified toggle state transitions (`false -> true -> false`) on mobile card.
- Verified runtime row creation count: 16 cards / 16 `.app-card-platforms-mobile`.
- Verified no card/page horizontal overflow on mobile (`overflowingCards: 0`, `overflowingPage: false`).
- Verified desktop (`1440x900`) preserves expanded layout behavior and hides price hints (`visibleHints: 0`).
- Verified browser console has no errors.

### Issues encountered
None.

### Recommended next action
Proceed to next active TODO by priority (`TASK-024` or `TASK-034`) and keep `TASK-038` as baseline for any further mobile listicle refinements.

---
## [TASK-039] Article UX/UI polish — forms, spacing, consistency fixes
Date: 2026-03-02
Status: DONE
Executor: Executor AI

### What was done
Completed UX/UI polish for the 16-app article: added `first_name` field to both Kit forms, moved InnerFire signup block to the bottom of the card (after verdict), restyled InnerFire signup and bottom CTA forms for consistent two-field behavior, tightened mobile spacing/typography on small screens, added tiny-screen Quick Picks column collapse, and validated comparison-table completeness and section-separator consistency.

### Files changed
- `blog/best-breathwork-apps.html` — added `fields[first_name]` to InnerFire and bottom CTA forms; moved InnerFire `.app-card-signup` below `.app-card-verdict`
- `styles.css` — redesigned `.app-card-signup*` block, updated `.article-cta-form` layout, added desktop 2-column form grids, tightened `<480px` article/card spacing, and added `<380px` Quick Picks column hide rule
- `TASKS.md` — updated TASK-039 status from TODO to DONE
- `REPORT.md` — appended TASK-039 execution report
- `PROJECT_STATE.md` — updated current status, capability list, and completed tasks

### Acceptance Criteria Results
- [x] InnerFire card form: has first_name + email fields — passed
- [x] Bottom CTA form: has first_name + email fields — passed
- [x] Both forms use `name="fields[first_name]"` matching Kit.com / index.html pattern — passed
- [x] InnerFire `.app-card-signup` is positioned AFTER the verdict (not between description and pros/cons) — passed
- [x] `.app-card-signup` has warm accent border, not generic grey — passed
- [x] Both forms work: fields required, submit posts to Kit.com — passed (action/method and required fields verified on both forms)
- [x] Mobile 375px: cards are tighter (14px padding, 12px gap) — passed
- [x] Mobile 375px: article container has 12px side padding (less wasted space) — passed
- [x] Mobile 375px: text sizes reduced proportionally (names, meta, pricing) — passed
- [x] Desktop: forms show inputs side-by-side in grid, submit centered below — passed
- [x] Reading progress bar visible at top of page — passed
- [x] Quick Picks table hides "Free tier" column on <380px screens — passed
- [x] All 16 apps present in comparison table — passed
- [x] All section separators consistent — passed
- [x] No broken layouts at 375px, 480px, 768px, 1024px, 1920px — passed

### Behavior changes
- InnerFire review card now ends with a polished beta signup module (after verdict) with First Name + Email.
- Bottom article CTA now matches landing-page field pattern (First Name + Email) and uses responsive 2-column desktop layout.
- Small-screen readability improved with tighter spacing and a more compact Quick Picks table.

### Verification
- PASSED
- Verified DOM and computed styles with Playwright at `375x812`, `480x900`, `768x900`, `1024x900`, and `1920x1080`.
- Verified form wiring for both forms: action `https://app.kit.com/forms/9132207/subscriptions`, method `post`, required `fields[first_name]` + `email_address`.
- Verified InnerFire signup order is after verdict in document flow.
- Verified comparison table row count is `16`.
- Verified separator styling parity for all major section IDs.
- Verified mobile collapse/anchor/next-link behavior from TASK-037/038 still works.
- Verified no browser console errors.

### Issues encountered
One CSS cascade conflict (`max-width: 768px` overriding part of `max-width: 480px`) caused 375px cards to stay at 16px padding; resolved by adding a final `<480px` override block after base mobile rules.

### Recommended next action
Proceed with remaining TODO backlog in queue (`TASK-024`, `TASK-034`) and keep TASK-039 as the new UX baseline for article-form consistency.
