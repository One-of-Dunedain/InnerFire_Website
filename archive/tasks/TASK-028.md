# TASK-028: Competitive research for "Best Breathwork Apps" article

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Goal
Collect structured competitive data on the top breathwork/breathing apps for a comparison listicle article. Output a research document that the article writer can use directly.

## Output file
Create `docs/research/breathwork-apps.md` (create `docs/research/` directory if it doesn't exist).

## What to research

### 1. Top breathing/breathwork apps (10-12 apps)

Research each of these apps. If any are discontinued or irrelevant, skip and note why. If you discover important apps not on this list, add them.

**Must-include apps:**
1. Calm
2. Headspace
3. Breathwrk
4. Wim Hof Method
5. Prana Breath
6. Oak - Meditation & Breathing
7. iBreathe
8. Insight Timer (breathing features specifically)
9. Othership
10. Box Breathe (or Breathe+ or similar popular simple timer)

**For each app, collect ALL of these fields:**

```markdown
### [App Name]
- **Developer:** [company/person]
- **Platforms:** iOS / Android / Web / Apple Watch
- **Pricing:** Free tier: [yes/no, what's included]. Premium: [$X/month or $X/year]
- **App Store rating:** [X.X / 5] ([X]K+ reviews) — use Apple App Store
- **Google Play rating:** [X.X / 5] ([X]K+ reviews) — if available
- **Key features (3-5 bullets):**
  - Feature 1
  - Feature 2
  - ...
- **Best for:** [one-line, e.g. "Beginners who want guided sessions"]
- **Unique differentiator:** [one sentence — what makes this app stand out]
- **Weaknesses (1-2):** [honest, for the comparison]
- **Breathing techniques offered:** [e.g. Box breathing, 4-7-8, Wim Hof, custom]
- **Has real-time feedback:** Yes/No [does the app respond to actual breathing?]
- **Free or requires subscription:** [Free / Freemium / Paid only]
```

### 2. InnerFire positioning data

Collect/confirm these facts about InnerFire (check the main `index.html` for current messaging):
- What makes InnerFire unique vs every app above (the real-time microphone feedback angle)
- Which competitors come closest to InnerFire's approach
- What InnerFire does that NO competitor does

Format as a short "Competitive advantage" section.

### 3. SERP analysis

Search for "best breathwork apps" and "best breathing apps" and document:
- **Top 3 ranking articles:** URL, title, word count estimate, number of apps reviewed, format (cards? table? prose?)
- **Common patterns:** What do top articles include? (table of contents? quick picks? comparison table? pros/cons?)
- **Gaps:** What do top articles miss that we could cover? (e.g. interactive/biofeedback angle, no-counting alternatives)

### 4. People Also Ask (PAA) questions

Collect the PAA questions that appear for these searches:
- "best breathwork apps"
- "best breathing apps"
- "breathing apps for anxiety"
- "breathing apps for sleep"

List ALL unique questions found (typically 8-15). These become our FAQ section.

### 5. Trending angles (2026)

Note any 2026-specific trends in breathwork apps:
- AI-powered features
- Apple Watch / wearable integration
- Biofeedback / sensor-based
- Social/community features
- Gamification

## Output format

The document should be structured EXACTLY as above with clear markdown headers. The article writer will copy data directly from this document into the article.

## Do NOT
- Write the article itself
- Create opinions or rankings (that's the Orchestrator's job)
- Modify any existing files
- Touch HTML/CSS/JS

## Verification
- `docs/research/breathwork-apps.md` exists and contains all 5 sections
- At least 10 apps have complete data (all fields filled)
- At least 3 SERP articles analyzed
- At least 8 PAA questions collected
- All pricing data is current (2026)

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
