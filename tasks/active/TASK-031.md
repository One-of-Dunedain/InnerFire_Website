# TASK-031: UGC research + trust signals for breathwork apps article

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: TASK-030 (article must exist)

## Goal
Research real user sentiment for every app in the article. Collect genuine user quotes, billing complaints, scam reports, and community reputation. Output a research document that will be used to add trust signals and UGC to the article.

## Why this matters
The article currently reads like an AI-generated corporate comparison. An indie developer's blog gains trust through HONESTY and TRANSPARENCY — especially about uncomfortable truths (billing traps, scam-like behavior, broken promises). This research transforms the article from "SEO content" into "the review I wish existed when I was choosing."

## Output file
Create `docs/research/breathwork-apps-ugc.md`

## What to research

### 1. For EACH app in the article (all 10 + InnerFire):

**A) App Store review highlights (iOS App Store + Google Play):**
- Find the most helpful/popular POSITIVE review (1 quote, include username if visible, date, star rating)
- Find the most helpful/popular NEGATIVE review (1 quote, same format)
- Note any recurring THEMES in negative reviews (e.g. "crashes after update", "can't cancel subscription", "content locked behind paywall")

**B) Reddit / community sentiment:**
Search these subreddits: r/breathwork, r/meditation, r/anxiety, r/Biohackers, r/getdisciplined
- For each app: find 1-2 real Reddit comments/threads that mention the app
- Note the URL of the thread
- Summarize the sentiment (positive/negative/mixed)
- If an app has NO Reddit presence, note that too (it's a signal)

**C) Billing / subscription complaints:**
For each app, specifically research:
- Are there complaints about unexpected charges after free trial?
- Is cancellation easy or confusing?
- Have there been any class action lawsuits or FTC complaints?
- Are there "dark patterns" in the subscription flow? (e.g. annual plan auto-selected, hard-to-find cancel button)
- Rate each app's billing transparency: GREEN (clean), YELLOW (some complaints), RED (pattern of billing issues)

Format for billing:
```markdown
### [App Name] — Billing Transparency
- Rating: GREEN / YELLOW / RED
- Trial trap reports: [Yes/No — details]
- Cancellation ease: [Easy / Moderate / Difficult — details]
- Notable complaints: [quotes or summary]
- Source: [URL]
```

**D) Trustpilot / BBB / review site mentions:**
Check Trustpilot, BBB (Better Business Bureau), and SiteJabber for the parent company of each major app (especially Calm Inc, Headspace Health, etc.)
- Note the Trustpilot rating if exists
- Note any BBB complaints if exists
- Flag anything alarming

### 2. General breathwork app industry issues

Research and document:
- Common complaints across ALL breathwork/meditation apps (subscription fatigue, content quality, etc.)
- Any recent news about privacy concerns with meditation apps (mic access, data selling)
- The "meditation app graveyard" — apps that were popular but shut down or degraded

### 3. InnerFire positioning
Since InnerFire is in beta:
- Note that it has NO billing history (pro: no subscription traps yet)
- Note that it has NO user reviews yet (con: unproven)
- Be honest about this in the research document

## Output format

Structure the document as:

```markdown
# UGC & Trust Research: Breathwork Apps

## Research date: [date]
## Sources checked: App Store, Google Play, Reddit, Trustpilot, BBB

---

### [App Name]

#### User quotes
- **Best positive review:** "[quote]" — [username], [star rating], [source + date]
- **Best negative review:** "[quote]" — [username], [star rating], [source + date]
- **Recurring negative themes:** [list]

#### Reddit sentiment
- Thread: [URL] — [summary]
- Thread: [URL] — [summary]
- Overall Reddit sentiment: [Positive / Mixed / Negative / No presence]

#### Billing transparency
- Rating: [GREEN / YELLOW / RED]
- [details]

#### Trustpilot / BBB
- [details or "No presence"]

---
[repeat for each app]
```

## Do NOT
- Write or modify any HTML/CSS/JS
- Make up fake user quotes (only use real ones with sources)
- Editorialize — just report facts. The Orchestrator decides how to present them
- Modify the article itself

## Acceptance Criteria
- [ ] All 10 apps + InnerFire have complete research entries
- [ ] Each app has at least 1 real positive and 1 real negative user quote with source
- [ ] Each app has a billing transparency rating (GREEN/YELLOW/RED) with justification
- [ ] Reddit sentiment checked for all apps
- [ ] At least 5 apps have Reddit thread URLs
- [ ] Industry issues section completed
- [ ] All quotes are real (verifiable via source links)
- [ ] No fabricated reviews or ratings

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
