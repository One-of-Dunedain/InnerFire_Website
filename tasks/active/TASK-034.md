# TASK-034: Research 10 additional breathwork apps for article expansion

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none

## Goal
Research 10 additional breathwork/breathing apps not currently in the article to expand coverage from ~10 to ~20 apps. This makes the article the most comprehensive breathwork app comparison online — a strong authority signal for both SEO and AI citation.

## Output file
Append to existing `docs/research/breathwork-apps.md` under a new heading: `## Wave 2 Apps (Expansion Research)`

## Apps to research

Research these apps. If any are discontinued, note it and suggest a replacement. If you discover important apps not on this list during research, add them.

**Target list (10 apps):**
1. **Breathly** — open-source breathing app
2. **Stoa** — stoic philosophy + breathing
3. **Breathe+ (by Dynamic App Design)** — simple iOS timer
4. **Kardia** — deep breathing by Wendy
5. **Open** — breathwork + meditation platform
6. **BreathingZone** — therapeutic breathing
7. **Exhale (by Exhale Inc.)** — BIPOC-focused wellness
8. **Mesmerize** — visual breathing app
9. **Breethe** — mindfulness + breathing
10. **Soma Breath** — rhythmic breathing music

**For each app, collect the SAME fields as TASK-028:**
```markdown
### [App Name]
- **Developer:** [company/person]
- **Platforms:** iOS / Android / Web / Apple Watch
- **Pricing:** Free tier: [yes/no, what's included]. Premium: [$X/month or $X/year]
- **App Store rating:** [X.X / 5] ([X]K+ reviews) — Apple App Store
- **Google Play rating:** [X.X / 5] ([X]K+ reviews) — if available
- **Key features (3-5 bullets):**
  - Feature 1
  - ...
- **Best for:** [one-line]
- **Unique differentiator:** [one sentence]
- **Weaknesses (1-2):** [honest]
- **Breathing techniques offered:** [list]
- **Has real-time feedback:** Yes/No
- **Free or requires subscription:** [Free / Freemium / Paid only]
- **Still actively maintained:** [Yes / No — check last update date]
```

**ALSO for each app (from TASK-031 methodology):**
```markdown
#### User quote
- **Positive:** "[quote]" — [source]
- **Negative:** "[quote]" — [source]

#### Billing transparency
- Rating: GREEN / YELLOW / RED
- [details]

#### Reddit presence
- [URL or "No Reddit presence found"]
```

## Additional research

### Categorization suggestions
After researching all 10 apps, suggest which article SECTION each app should go into:
- Best for anxiety
- Best for sleep
- Best free
- Best interactive/feedback
- Timer alternatives
- Calm/Headspace alternatives
- **NEW sections to add** (if the new apps warrant it — e.g., "Best for Apple Watch", "Best for advanced practitioners", "Best visual/immersive", "Best open-source")

### Quality filter
If any app is:
- Abandoned (no update in >12 months)
- Has <100 reviews
- Has <4.0 rating
- Is essentially a clone/white-label of another

...still document it, but flag it as "May not warrant inclusion" with reasoning.

## Do NOT
- Modify any HTML/CSS/JS files
- Write article content
- Make editorial decisions (just present data — Orchestrator decides inclusion)

## Acceptance Criteria
- [ ] At least 10 new apps researched with complete data
- [ ] Each has all standard fields filled (name, platforms, pricing, rating, features)
- [ ] Each has at least 1 user quote (positive + negative)
- [ ] Each has billing transparency rating
- [ ] Categorization suggestions provided
- [ ] Quality flags noted where applicable
- [ ] "Still actively maintained" checked for all apps
- [ ] Output appended to `docs/research/breathwork-apps.md` under "Wave 2" heading

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
