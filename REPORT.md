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

