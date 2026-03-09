# Orchestrator Brief: Safe Browsing / "Deceptive Pages" Incident

Date: 2026-03-09
Prepared by: Executor 1
Repo: `InnerFire_Website`
Current git HEAD at time of brief: `ee9944e`

## Why this brief exists

The landing page is deployed and reachable, but Google/Chrome is classifying the site as unsafe.
This is now the highest-value production issue because it blocks normal access to public pages.

The user asked for a rollback first. No tracked rollback was needed: the worktree was already clean at the last commit, with only untracked local/temp files present.

## Problem statement

The deployed domain `https://innerfire-app.com` is showing Google Safe Browsing / Chrome warnings.

Observed symptom:

- Chrome warning page: `Dangerous site`
- Search Console -> `Security issues`
- Google reports:
  - `1 issue detected`
  - issue type: `Deceptive pages`
  - `Sample URLs: N/A`

Affected URLs explicitly observed by the user:

- `https://innerfire-app.com/blog.html`
- `https://innerfire-app.com/privacy.html`

This means the problem is not a single broken page path. Google is classifying at least part of the site/domain as deceptive, but Search Console is not exposing a precise sample URL.

## What was already completed successfully

Deployment/infrastructure status is mostly healthy:

- Cloudflare Pages project is active
- custom domains are active:
  - `innerfire-app.com`
  - `www.innerfire-app.com`
- Cloudflare zone for `innerfire-app.com` is active
- R2 bucket for video delivery is active
- custom media domain is active:
  - `media.innerfire-app.com`
- media delivery works in browser after R2 setup

This matters because the current blocker is no longer "site is not deployed." The blocker is site trust / Safe Browsing classification.

## High-confidence conclusions

### 1. This is not primarily a deployment failure

Pages deploy succeeded.
Cloudflare DNS/SSL/R2 are functioning.

The problem is reputational / policy / trust-classification at the Google Safe Browsing layer.

### 2. Search Console is not giving enough precision by itself

Current Search Console output does not identify:

- exact URL
- exact DOM block
- exact script
- exact pattern Google considered deceptive

So this requires a weighted remediation pass, not a single point fix.

### 3. The issue likely comes from a combination of trust signals, not one obvious exploit

No confirmed malware indicator was surfaced.
This currently looks more like a "deceptive / misleading / suspicious presentation" classification than a classic hacked-site incident.

## Strong candidate causes found during repo review

These are the most actionable technical trust problems found before the user interrupted the previous turn.

### A. Old production domain references still exist in public files

Multiple live public files still reference the old domain `innerfire.app` instead of `innerfire-app.com`.

This was found in:

- `index.html`
- `blog.html`
- `privacy.html`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `blog/vagus-nerve-breathing.html`
- `blog/build-breathing-habit.html`
- `blog/best-breathwork-apps.html`
- `blog/_template.html`
- `blog/_listicle-template.html`
- `workers/waitlist-counter.js`

Examples:

- canonical URLs
- `og:url`
- JSON-LD `url` and `mainEntityOfPage`
- privacy-policy copy
- email addresses like `marian@innerfire.app`
- sitemap / robots references
- worker CORS allow-origin still pointed at old domain

Why this matters:

- mixed identity across domains is a direct trust anti-pattern
- search/review systems may interpret inconsistent canonical/origin/contact data as deceptive or low-trust

### B. Signup copy may be over-promising and looks risky from a trust-policy perspective

Current public copy was found such as:

- `Leave your email for Apple TestFlight invite and tester Discord access.`
- `No spam. Just a TestFlight invite + Discord link when I'm ready.`

Why this is a problem:

- it promises a specific reward/access flow
- public UI does not clearly explain the fulfillment mechanics
- the form posts to Kit/ConvertKit
- the visible trust disclosure is weak relative to the promise

This is a plausible "deceptive" trigger even if intent is honest.

### C. Public footer/social structure still contains risky or low-trust elements

Found in public files:

- direct Discord invite links in footers
- some template/footer remnants with placeholder or weak social links
- at least one `TikTok` placeholder link was still present in article/template files during review

Why this matters:

- direct Discord invite + signup incentive copy + new domain + recent parking history is a bad trust combination
- placeholder links and unfinished public-facing footers can amplify low-trust signals

### D. Domain history / parking transition is a credible external factor

The domain was newly purchased and was previously on Dynadot parking before Cloudflare Pages went live.

This is important because:

- Google may have crawled the domain in a parked/intermediate state
- the site changed identity quickly after first indexing
- Safe Browsing can lag behind real deployment state

This may not be the full cause, but it is likely part of the story.

## What should NOT be assumed

Do not assume:

- that this is a classic malware infection
- that Cloudflare Pages itself is the root cause
- that a single URL rewrite will fix it
- that Search Console will eventually fix itself without remediation

## Recommended task breakdown for Orchestrator

This should be split into focused tasks, not one giant "fix the warning" task.

### Suggested TASK A: Domain identity consistency remediation

Scope:

- replace all remaining `innerfire.app` references in live public files
- align canonical, Open Graph, JSON-LD, sitemap, robots, privacy contact data, and worker CORS with `innerfire-app.com`

Acceptance:

- no old public production domain references remain in live site files

### Suggested TASK B: Trust copy / conversion-flow remediation

Scope:

- rewrite signup copy to remove reward-style language that can read as misleading
- add explicit processor and beta-invite wording where needed
- ensure form messaging is accurate and modest

Acceptance:

- no public copy implies guaranteed access/reward in a way that exceeds the actual workflow

### Suggested TASK C: Footer/social cleanup for public trust

Scope:

- remove placeholder/unfinished social links
- remove or reconsider direct Discord invite links from global public footer
- standardize footer links across landing/blog/privacy/articles

Acceptance:

- no placeholder social links
- no obviously suspicious public footer patterns

### Suggested TASK D: Live-site trust review before reconsideration request

Scope:

- verify no unexpected redirects
- verify forms post only to intended endpoints
- verify no mixed-domain metadata remains
- verify privacy/legal/contact pages match production domain

Acceptance:

- short checklist completed against live production site

### Suggested TASK E: Search Console reconsideration support

Scope:

- prepare exact remediation summary for Google
- user submits `Request Review` after technical cleanup

Acceptance:

- Google review request references concrete completed remediation steps

## Practical note for the next executor

The issue is not "unknown."
There is enough evidence to proceed with a serious cleanup pass even without sample URLs from Google.

The safest next move is:

1. clean live public trust signals
2. redeploy
3. verify live pages manually
4. only then submit Search Console review

## Useful current context

- current production domain: `innerfire-app.com`
- Pages project name: `innerfire`
- R2 media domain: `media.innerfire-app.com`
- Search Console property is now connected and showing the security issue

## Handoff summary

If you assign follow-up tasks, treat this as a production trust/remediation incident with SEO/security overlap.
The key theme is public-site consistency and credibility, not just infrastructure.
