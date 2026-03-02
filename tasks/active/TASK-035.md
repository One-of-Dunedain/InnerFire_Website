# TASK-035: Rewrite article content — human tone, UGC, pricing, Wave 2 apps

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: TASK-031 (UGC — DONE), TASK-036 (pricing — DONE), TASK-034 (Wave 2 — partial, 6 of 10 apps)

## Goal
Rewrite the entire `blog/best-breathwork-apps.html` article content to feel like an honest indie developer sharing real findings — NOT an SEO content farm. Integrate UGC quotes, detailed pricing, and add 6 new Wave 2 apps.

The article must read like: "I tested these apps so you don't have to. Here's what I actually found."

## Voice & tone guide

### DO
- Write like a real person talking to a friend: "Calm works well for sleep, but be ready — the subscription is $70/year and they'll ask for your credit card before the trial even starts."
- Use first person sparingly: "I noticed...", "In my testing..."
- Be honest about downsides: "The Wim Hof app is great for what it does, but $5.99/month for essentially one breathing technique feels steep."
- Include specific numbers: "$14.99/month", "7-day trial", "3 free sessions"
- Let the data speak — quote real users
- Use natural transitions between sections

### DO NOT
- Keyword-stuff: NO "best breathwork apps" repeated in every paragraph
- Use filler phrases: NO "In today's fast-paced world", "Whether you're a beginner or advanced", "Let's dive in"
- Use superlatives without evidence: NO "the absolute best", "game-changing", "revolutionary"
- Sound promotional for any app (including InnerFire — be equally honest)
- Use AI-obvious patterns: NO "Here's the thing:", "That said,", "At the end of the day"
- Write walls of praise — every app gets honest pros AND cons

### SEO approach (moderate)
- Title tag and H1 can include "Best Breathwork Apps" — that's fine
- Use natural variations: "breathing apps", "breath training apps", "breathwork tools"
- Do NOT force keywords into every H2/H3 or paragraph opener
- Let headers be descriptive: "Apps That Actually Help With Anxiety" not "Best Breathing Apps for Anxiety Relief in 2026"
- Schema.org stays — it's machine-readable, not user-facing

## Data sources (read these files first)

1. `docs/research/breathwork-apps-ugc.md` — user quotes, billing ratings, Reddit sentiment
2. `docs/research/breathwork-apps-pricing.md` — exact pricing, free tier breakdown, trial details, paywall behavior
3. `docs/research/breathwork-apps.md` — competitive data, features, Wave 2 app data (under "Wave 2 Apps" heading)

## What to change

### 1. Intro paragraph (lines ~429-431)
Rewrite. Current version is keyword-stuffed. New version should:
- Explain what the article actually covers in 2-3 sentences
- Mention that pricing and real user feedback are included
- Set honest tone immediately
- Example direction: "I compared [X] breathing apps across pricing, user reviews, and daily usability. Each app below includes what you actually get for free, what the subscription costs, and what real users say — good and bad."

### 2. Quick Picks table (lines ~433-488)
Update with:
- Add "Monthly price" column (exact numbers from pricing research)
- Add "Free tier" column (Good / Limited / Minimal)
- Update any prices that differ from research data
- Add rows for 6 Wave 2 apps in appropriate categories
- Add new categories if Wave 2 apps warrant them (check research suggestions)

### 3. Each existing app card (10 apps)
For EACH of the 10 current apps, update the card to include:

**a) Pricing block** — add after the `.app-card-description`:
```html
<div class="app-card-pricing">
  <p class="app-card-pricing-title">What you actually pay</p>
  <ul>
    <li><strong>Monthly:</strong> $X.XX/month</li>
    <li><strong>Yearly:</strong> $X.XX/year ($X.XX/month effective)</li>
    <li><strong>Free tier:</strong> [1-2 sentence summary of what's actually free]</li>
    <li><strong>Trial:</strong> [X days, auto-renews: yes/no, credit card upfront: yes/no]</li>
  </ul>
</div>
```
Get ALL pricing data from `docs/research/breathwork-apps-pricing.md`. If a price is marked "Unverified", include it with "(unverified)" note.

**b) User quotes** — add after the pros/cons grid:
```html
<div class="app-card-ugc">
  <blockquote class="ugc-quote ugc-positive">
    <p>"[positive quote from real user]"</p>
    <cite>— [source, e.g. "App Store review, 2025"]</cite>
  </blockquote>
  <blockquote class="ugc-quote ugc-negative">
    <p>"[negative quote from real user]"</p>
    <cite>— [source]</cite>
  </blockquote>
</div>
```
Get ALL quotes from `docs/research/breathwork-apps-ugc.md`. Pick the most specific, useful quotes (not generic "great app!" praise).

**c) Billing transparency badge** — add to `.app-card-meta`:
```html
<span class="billing-badge billing-green">Billing: Transparent</span>
<!-- or billing-yellow / billing-red with appropriate text -->
```
Use ratings from UGC research: GREEN = "Billing: Transparent", YELLOW = "Billing: Watch out", RED = "Billing: Complaints reported"

**d) Rewrite description text** — make each app description:
- 2-3 sentences max
- Honest, specific, not promotional
- Mention the most important thing a user should know FIRST
- Example: "Calm is the biggest name in the space, and its sleep content is genuinely strong. The catch: you need the $70/year subscription to access most of it, and the free tier is basically a demo."

**e) Rewrite verdict** — make it a real recommendation with a caveat:
- Example: "Good pick if you want a polished all-in-one sleep + stress app and don't mind the price. Skip if you just need breathing exercises — you're paying for a lot of content you might not use."

### 4. Add 6 Wave 2 app cards
Add new app card sections for these 6 apps (data in `docs/research/breathwork-apps.md` under "Wave 2"):
1. **Breathly** — open-source breathing
2. **Stoa** — stoic + breathing
3. **Breathe+** — simple iOS timer
4. **Open** — breathwork + meditation
5. **Breathing Zone** — therapeutic breathing
6. **Breath Ball** — visual breathing (replaced Kardia)

For each, create a full app card with:
- All the same elements as existing cards (header, icon placeholder, description, pros/cons, pricing, UGC, verdict)
- Icon: use `../assets/images/apps/[app-slug].png` — if icon doesn't exist, use a placeholder `<div class="app-card-icon-placeholder">[First Letter]</div>`
- Place in appropriate article section based on categorization from research

### 5. Comparison table (lines ~958-1071)
Major update:
- Add columns: "Monthly", "Yearly", "Free tier quality", "Trial days", "Billing rating"
- Add rows for 6 Wave 2 apps
- Remove "Real-time feedback" column (only InnerFire has it — not useful for comparison)
- Add "Real-time feedback" as a note in InnerFire's row instead
- Sort by: category grouping, then alphabetical within category
- All pricing from `docs/research/breathwork-apps-pricing.md`

### 6. Section intros (the text before app cards in each category)
Rewrite all section intro paragraphs:
- Remove keyword-stuffing (e.g., current: "The strongest **breathing apps for anxiety** share two traits..." — too SEO)
- Write naturally: "These apps are built around getting calm fast. They minimize setup time and focus on simple exhale-lengthening patterns."
- Keep them to 1-2 sentences max — readers want to get to the apps

### 7. FAQ section
- Keep existing 8 questions (they're good for Schema.org)
- Rewrite answers to be more concise and specific
- Add pricing context where relevant: "Is Calm worth the money?" → mention actual price in the answer
- Answers should be 2-3 sentences, not paragraphs

### 8. Schema.org JSON-LD updates
- Update `numberOfItems` from 10 to 16
- Add 6 new `ListItem` entries for Wave 2 apps
- Update any prices that differ from research
- Keep FAQPage schema unchanged (unless answers changed significantly)
- Update `dateModified` to today's date

### 9. ToC update
Add new entries to the Table of Contents if new sections are added for Wave 2 apps. If Wave 2 apps fit into existing categories, no ToC change needed.

### 10. Meta description
Rewrite: "We compared [X] breathwork apps with real pricing, user reviews, and free tier breakdowns. Find the right breathing app for anxiety, sleep, or daily practice."

## CSS additions needed

Add these styles to `styles.css` (or the article's inline `<style>` if small):

```css
/* Pricing block inside app card */
.app-card-pricing {
  margin: 16px 0;
  padding: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.app-card-pricing-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.app-card-pricing ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.92rem;
}
.app-card-pricing li {
  padding: 4px 0;
  color: var(--text-secondary, #b0b0b0);
}

/* UGC quotes */
.app-card-ugc {
  margin: 16px 0;
  display: grid;
  gap: 12px;
}
.ugc-quote {
  padding: 12px 16px;
  border-radius: 8px;
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  border-left: 3px solid;
}
.ugc-positive {
  border-left-color: #44aa55;
  background: rgba(68, 170, 85, 0.06);
}
.ugc-negative {
  border-left-color: #cc5544;
  background: rgba(204, 85, 68, 0.06);
}
.ugc-quote cite {
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  font-style: normal;
  color: var(--muted);
}

/* Billing badges */
.billing-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.billing-green { background: rgba(68, 170, 85, 0.15); color: #6fc97a; }
.billing-yellow { background: rgba(230, 180, 50, 0.15); color: #e6b432; }
.billing-red { background: rgba(204, 85, 68, 0.15); color: #e06655; }

/* Icon placeholder for apps without downloaded icons */
.app-card-icon-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(255, 138, 61, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}
```

## Files to modify

| File | Changes |
|------|---------|
| `blog/best-breathwork-apps.html` | Rewrite ALL article text, add pricing blocks, add UGC quotes, add 6 new app cards, update comparison table, update Schema.org, update meta |
| `styles.css` | Add pricing block, UGC quote, billing badge, icon placeholder styles |

## Do NOT
- Change the HTML structure of existing components (`.app-card`, `.faq-item`, etc.) — only add new elements inside them
- Remove or modify the inline `<script>` block (ToC highlight, back-to-top, etc.)
- Change the article layout, header, footer, or navigation
- Remove any existing Schema.org — only update/extend
- Make InnerFire sound better than it is — be equally honest about all apps
- Guess prices — use ONLY data from research files. If unverified, mark "(unverified)"
- Add dependencies or build steps

## Acceptance Criteria
- [ ] ALL text content rewritten in human, honest tone (no keyword stuffing, no AI filler)
- [ ] Each of 10 existing app cards has: pricing block, UGC quotes (positive + negative), billing badge, rewritten description + verdict
- [ ] 6 Wave 2 app cards added with complete content (same structure as existing cards)
- [ ] Comparison table updated: 16 apps, pricing columns, billing rating column
- [ ] Quick Picks table updated with pricing column and new apps
- [ ] Schema.org updated: 16 items, correct prices, updated dateModified
- [ ] Section intros rewritten (short, natural, no keyword spam)
- [ ] FAQ answers rewritten (concise, include pricing where relevant)
- [ ] Meta description updated
- [ ] CSS for new components added to styles.css
- [ ] All pricing data matches research files (no guessing)
- [ ] InnerFire treated honestly — not promoted over others
- [ ] No broken links or missing assets
- [ ] Inline script block unchanged

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
- Update PROJECT_STATE.md
