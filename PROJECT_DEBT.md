# Project Debt

This document tracks everything that still must be connected, configured, or purchased for the website to operate at production quality.

Update this file after each iteration when new debt appears or existing debt is closed.

## Open Debt Items

## [PD-001] Buy primary domain
Type: Buy
Priority: Critical
Status: TODO
Owner: Project Owner
Details: Purchase a production domain (e.g. `innerfire.app`) for brand trust, email sending, and final landing URL.

## [PD-002] Configure domain on hosting
Type: Connect
Priority: High
Status: TODO
Owner: Project Owner + Executor AI
Details: Point purchased domain to production hosting (GitHub Pages or chosen platform), configure DNS records, and verify HTTPS.

## [PD-003] Create branded sender mailbox
Type: Buy/Connect
Priority: Critical
Status: TODO
Owner: Project Owner
Details: Create mailbox on owned domain (e.g. `hello@innerfire.app`) for Kit sender identity. Avoid Gmail sender for production deliverability.

## [PD-004] Verify sending domain in Kit (SPF/DKIM/DMARC)
Type: Connect
Priority: Critical
Status: TODO
Owner: Project Owner
Details: In Kit Email settings, connect sending domain and add required DNS records so confirmation and campaign emails deliver reliably.

## [PD-005] Finalize Kit form behavior
Type: Connect
Priority: High
Status: In progress
Owner: Project Owner + Executor AI
Details: Form submission is connected on-site. Still need live validation in Kit dashboard and final decision for double opt-in behavior.

## [PD-006] Validate first live Kit subscriber flow
Type: Connect
Priority: High
Status: TODO
Owner: Project Owner
Details: Submit real test lead on production-like URL, confirm subscriber appears in Kit, and confirm expected email delivery path.

## [PD-007] Provide final TikTok URL
Type: Content/Connect
Priority: Medium
Status: TODO
Owner: Project Owner
Details: Footer currently uses placeholder `#` for TikTok. Replace with final public profile URL.

## [PD-008] Add production OG image asset
Type: Asset
Priority: Medium
Status: TODO
Owner: Project Owner + Designer
Details: `og:image` currently points to placeholder path `./og-image.png`. Prepare final image and add file to repository.

## [PD-009] Add author profile photo asset
Type: Asset
Priority: Medium
Status: TODO
Owner: Project Owner
Details: About section task uses placeholder image until a final author photo is provided.

## [PD-010] Activate analytics (GA4 + Clarity)
Type: Connect
Priority: Medium
Status: IN PROGRESS
Owner: Project Owner
Details: Decision made: GA4 + Microsoft Clarity. TASK-018 adds commented-out placeholder scripts to all pages. Owner needs to: (1) create GA4 property and get Measurement ID, (2) create Clarity project and get Project ID, (3) uncomment scripts and replace placeholder IDs. Define conversion event for signup in GA4.

## [PD-011] Define legal pages
Type: Content/Compliance
Priority: Medium
Status: TODO
Owner: Project Owner
Details: Prepare Privacy Policy and Terms links before scaling paid/organic traffic.

## [PD-012] Operational email checklist before launch
Type: Process
Priority: High
Status: TODO
Owner: Project Owner
Details: Confirm sender domain, unsubscribe/footer compliance, inbox placement smoke test, and abuse/spam handling path.

## [PD-013] Connect signup wick to real Kit subscriber count
Type: Connect/Automation
Priority: High
Status: TODO
Owner: Project Owner + Executor AI
Details: Replace manual `const current = 0` in `script.js` with real count from Kit (API/Zapier/Make/serverless endpoint), cache safely, and keep UI fallback if API is unavailable.

## Done Debt Items

None yet.
