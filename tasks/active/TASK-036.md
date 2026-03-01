# TASK-036: Pricing & monetization deep-dive for all breathwork apps

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Goal
Research the EXACT pricing structure, free/paid feature split, trial mechanics, and monetization model for every app in the article (current 10 + InnerFire). This data will be used to build detailed pricing columns in the comparison table and add "What you actually pay" transparency blocks to each app card.

Readers deserve to know EXACTLY what they get for free, when the paywall hits, and how much it costs — before they download. This is the #1 thing missing from most comparison articles and a huge trust signal for our indie blog.

## Output file
Create `docs/research/breathwork-apps-pricing.md`

## What to research

### For EACH app (all 10 + InnerFire), collect:

```markdown
### [App Name]

#### Subscription tiers
- **Monthly:** $X.XX/month
- **Yearly:** $X.XX/year (= $X.XX/month effective)
- **Lifetime / one-time:** $X.XX (if available)
- **Family plan:** $X.XX (if available)
- **Student discount:** Yes/No — details

#### Free tier (what you actually get without paying)
- [ ] Feature 1: Yes/No
- [ ] Feature 2: Yes/No
- [ ] Number of free sessions/techniques: X
- [ ] Are free sessions time-limited or content-limited?
- [ ] Can you use the core breathing timer for free?
- [ ] Are stats/tracking free?
- [ ] Is Apple Watch / widget support free?
- Summary in one sentence: "Free tier gives you [X], paywall starts at [Y]."

#### Trial details
- **Has free trial:** Yes/No
- **Trial length:** X days
- **Auto-renews after trial:** Yes/No
- **Payment method required upfront:** Yes/No (do they ask for credit card before trial?)
- **How to cancel:** [describe the cancellation path — e.g., "Settings > Subscriptions in iOS", or "must email support", or "cancel in-app"]
- **What happens after cancel:** Do you keep access until period ends or lose immediately?

#### Paywall behavior (UX observations)
- When does the app first show the paywall? (e.g., "after 3rd session", "immediately on launch", "when you tap a locked feature")
- Is the paywall aggressive? (full-screen overlay, multiple dismissals needed, guilt-trip copy?)
- Are "locked" features clearly labeled before you tap them?
- Does the app default-select the most expensive plan?
- Any dark patterns observed? (pre-checked annual plan, hidden auto-renewal, confusing "continue" buttons)

#### Price history / changes
- Has the price changed recently? (e.g., "was $9.99/mo, now $14.99/mo as of 2025")
- Any notable pricing controversy? (e.g., "raised prices 50% with no warning")
```

### Summary comparison table data

After researching all apps, compile a summary table:

```markdown
## Pricing Comparison Summary

| App | Monthly | Yearly | Yearly/mo | One-time | Free tier quality | Trial days | CC upfront | Cancel ease |
|-----|---------|--------|-----------|----------|-------------------|------------|------------|-------------|
| ... | ...     | ...    | ...       | ...      | Good/Limited/Minimal | ...     | Yes/No     | Easy/Hard   |
```

Where:
- **Free tier quality:** "Good" (can use daily without paying), "Limited" (useful but restricted), "Minimal" (barely functional), "None" (no free tier)
- **Cancel ease:** "Easy" (standard iOS/Android subscription), "Moderate" (need to find hidden setting), "Hard" (must email/chat support)

## Research method
- Check each app's App Store / Google Play listing for pricing
- Download or check the app's website for detailed plan comparison pages
- Check Reddit/forums for reports about actual pricing experience vs advertised
- Cross-reference with any pricing archive sites if app has changed prices

## Do NOT
- Modify any HTML/CSS/JS files
- Write article content
- Make editorial judgments (just facts)
- Guess prices — if you can't verify, mark as "Unverified — [best estimate from source X]"

## Acceptance Criteria
- [ ] All 11 apps (10 + InnerFire) have complete pricing entries
- [ ] Monthly AND yearly prices listed for all subscription apps
- [ ] Effective monthly cost calculated for yearly plans
- [ ] Free tier breakdown with specific feature availability for each app
- [ ] Trial details: length, auto-renew, CC required — for all apps that offer trials
- [ ] Paywall behavior described for each app
- [ ] Cancel ease rated for each app
- [ ] Summary comparison table compiled with all apps
- [ ] All prices verified from official sources (App Store / website), not guessed
- [ ] Any dark patterns or pricing controversies noted

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
