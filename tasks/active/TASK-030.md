# TASK-030: Write "Best Breathwork Apps" article + AI optimization + llms.txt

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-028 (research data), TASK-029 (listicle template)

## Goal
Create the complete "Best Breathwork Apps (2026)" article using the listicle template and research data. Fill in all content, Schema.org structured data, and create `llms.txt` for AI discoverability. Update `blog/posts.json` to include the article.

## Context
- Research data: `docs/research/breathwork-apps.md` (from TASK-028)
- Template: `blog/_listicle-template.html` (from TASK-029)
- SEO scheme: `BLOG_ARTICLE_TASK.md` (primary keywords, H2 mapping, placement rules)
- This is InnerFire's first article and primary SEO play for driving beta signups

## Files to create/modify

| File | Action |
|------|--------|
| `blog/best-breathwork-apps.html` | CREATE — copy from `blog/_listicle-template.html`, fill all content |
| `blog/posts.json` | MODIFY — add article entry at the top of the array |
| `llms.txt` | CREATE — AI discoverability file at site root |

**Note:** Creating the article HTML is inherently a large file (~400-600 lines) since it contains full article content for 10+ apps. This exceeds the normal 60-line budget but is justified: it's a new standalone content file, not a modification of existing code.

## Requirements

### 1. Article content (`blog/best-breathwork-apps.html`)

Copy `blog/_listicle-template.html` and fill in all content following these rules:

**A) SEO meta (head section):**

```
Title: Best Breathwork Apps (2026): Top Breathing Apps for Anxiety, Sleep & Stress - InnerFire Blog
Description: Comparing the 10+ best breathwork and breathing apps for 2026. Detailed reviews, pricing, pros/cons, and which app is best for anxiety, sleep, or real-time feedback.
Canonical: https://innerfire.app/blog/best-breathwork-apps
OG Image: ../og-image.png
```

**B) Content structure — follow this exact H2 order:**

1. **Quick Answer box** (2-3 sentences answering "what are the best breathwork apps?")
2. **Table of Contents**
3. **Intro** (100-150 words, naturally include: "best breathwork apps", "best breathing apps", mention anxiety/sleep/free)
4. **Quick Picks table** (6-8 rows: Best overall, Best for anxiety, Best for sleep, Best free, Best interactive/feedback, Best minimalist, Best for beginners, Best alternative to Calm/Headspace)
5. **H2: "Best Breathing Apps for Anxiety"** — review 2-3 apps strong for anxiety
6. **H2: "Best Breathing Apps for Sleep"** — review 2-3 apps strong for sleep
7. **H2: "Best Free Breathing Apps"** — review 2-3 free/freemium options
8. **H2: "Best Interactive Breathing Apps (Real-Time Feedback)"** — InnerFire + any competitors with feedback. This is where InnerFire gets its spotlight
9. **H2: "If You Hate Timers: Alternatives to Counting"** — apps without voice counting/rigid timers
10. **H2: "Alternatives to Calm and Headspace"** — for searchers comparing to big names
11. **H2: "Head-to-Head Comparison"** — full comparison table with ALL apps
12. **H2: "Frequently Asked Questions"** — FAQ accordion with Schema.org
13. **Article CTA** (existing from template — InnerFire beta signup)

**C) App review cards — writing guidelines:**

Each app gets a card with:
- App icon (use placeholder path `../assets/images/apps/[app-slug].png` — actual icons to be added later)
- Name, rating (from research), platforms, price
- "Best for" badge
- Description: 2-3 sentences. **First sentence MUST be a snippet-worthy verdict** (AI extracts this)
- Pros (3 items), Cons (2 items)
- Verdict: one sentence summary

**Writing style:**
- Conversational but authoritative (like Wirecutter or The Verge)
- Honest about weaknesses — builds trust
- No marketing fluff
- Include specific details (pricing, technique names, features)
- Naturally include keywords from the SEO scheme's "must include 12" list

**D) InnerFire positioning:**

- Place InnerFire in the "Best Interactive Breathing Apps" section
- Be transparent: "InnerFire (currently in beta)" — honesty builds trust
- Highlight unique angle: ONLY app that uses real-time microphone feedback for breath
- Don't claim it's "#1 overall" — claim it's the best for the "interactive/feedback" niche
- In comparison table, use `class="highlight-row"` for InnerFire's row
- Pros: real-time feedback, no counting/timers, visual + haptic + sound response
- Cons: iOS only, currently in beta, limited breathing techniques

**E) FAQ section:**

Include 6-8 questions from:
1. PAA questions found in TASK-028 research
2. These mandatory questions from the SEO scheme:
   - "Do breathing apps really work?"
   - "What are the best free breathing apps?"
   - "Is there a breathing app without counting?"
   - "What's the best breathing app for sleep?"
   - "What is the best breathing app for anxiety?"
   - "Is there a breathing app that responds to your actual breath?"

Answers: 2-4 sentences each. Direct, factual, citing app names where relevant. AI will extract these answers verbatim.

**F) Schema.org structured data:**

Fill in BOTH JSON-LD blocks from the template:

**Article + ItemList:** Include all reviewed apps as `ListItem` → `SoftwareApplication` with:
- `name`, `applicationCategory: "HealthApplication"`, `operatingSystem`
- `aggregateRating` (from research data)
- `offers` with price

**FAQPage:** Include all FAQ questions and answers.

Use REAL data from the TASK-028 research document. Do not make up ratings or prices.

### 2. Blog manifest update (`blog/posts.json`)

Add the article as the FIRST entry in the JSON array:

```json
{
  "slug": "best-breathwork-apps",
  "title": "Best Breathwork Apps (2026)",
  "excerpt": "Comparing the top breathing and breathwork apps for anxiety, sleep, and stress. Detailed reviews with pricing, pros & cons.",
  "date": "2026-02-27",
  "readTime": "12 min",
  "category": "Comparison",
  "thumbnail": "./blog/images/best-breathwork-apps.svg"
}
```

**Note:** The thumbnail SVG doesn't need to exist yet — it will be created separately. Use the placeholder path.

### 3. AI discoverability: `llms.txt`

Create `llms.txt` in the site root (same level as `index.html`). This file follows the emerging `llms.txt` convention — a plaintext file that AI crawlers (Perplexity, ChatGPT Browse, Claude, etc.) read to understand site content.

```
# InnerFire

> InnerFire is a breath-regulation iOS app that uses real-time microphone feedback to create interactive breathing environments. Your exhale controls fire, sound, and vibration.

## About
- Type: Mobile iOS application (currently in beta)
- Category: Health & Wellness, Breathwork, Meditation
- Unique feature: Real-time breath detection via device microphone — no wearables needed
- Creator: Marian Kushnir
- Website: https://innerfire.app

## Key pages
- Homepage: https://innerfire.app — Product overview and beta signup
- Blog: https://innerfire.app/blog — Articles about breathing, focus, and wellness
- Best Breathwork Apps: https://innerfire.app/blog/best-breathwork-apps — Comparison of top breathing apps (2026)

## What makes InnerFire different
InnerFire is the only breathwork app that responds to your actual breathing in real-time using the device microphone. Instead of following a timer or counting, you see and feel your breath through visual fire effects, adaptive sound, and haptic feedback. The app detects exhale intensity and duration, creating a biofeedback loop that makes breathing exercises intuitive rather than mechanical.

## Contact
- X/Twitter: https://x.com/kushnir_marian_
- Discord: https://discord.gg/PRuveBJH
- LinkedIn: https://www.linkedin.com/in/kushnir-maryan/
```

### 4. Content quality checklist

Before considering the article done, verify:

**SEO (from BLOG_ARTICLE_TASK.md):**
- [ ] Title tag includes: "Best Breathwork Apps" + "(2026)" + secondary intent
- [ ] H1 is clean: "Best Breathwork Apps (2026)"
- [ ] First 150 words include: "best breathwork apps", "best breathing apps", anxiety/sleep mention
- [ ] Each H2 contains a strong secondary keyword
- [ ] All 12 "must include" keywords appear naturally in the article (check list in BLOG_ARTICLE_TASK.md section 6)
- [ ] FAQ questions match PAA-style phrasing
- [ ] No keyword stuffing — every keyword use reads naturally

**AI optimization:**
- [ ] Quick Answer box exists (first thing after header)
- [ ] Each app has a snippet-worthy first sentence in its description
- [ ] Comparison table uses semantic `<table>` with `<th>` headers
- [ ] FAQ answers are concise (2-4 sentences), factual, directly answering the question
- [ ] JSON-LD `ItemList` has all apps with real rating data
- [ ] JSON-LD `FAQPage` has all FAQ Q&As
- [ ] `llms.txt` exists at root and describes InnerFire accurately

**Content quality:**
- [ ] All app data matches TASK-028 research (ratings, prices, features)
- [ ] InnerFire is positioned honestly (beta, iOS only, unique feedback angle)
- [ ] Pros/cons are genuine, not cherry-picked to make InnerFire look best
- [ ] Article reads naturally — conversational, not like an SEO article
- [ ] Word count: 2500-4000 words (standard for comparison listicles)

## Do NOT touch
- `blog/_template.html` (narrative template)
- `blog/_listicle-template.html` (keep the template clean for reuse)
- `styles.css` (all styles should already exist from TASK-029)
- `script.js`
- `index.html`
- `blog.html`

## Behavior changes
- New article page accessible at `/blog/best-breathwork-apps.html`
- Blog index (`blog.html`) will show the new article card via `posts.json` update
- `llms.txt` accessible at site root — new AI-facing file

## Acceptance Criteria
- [ ] `blog/best-breathwork-apps.html` exists, valid HTML, renders correctly
- [ ] Article follows the H2 structure outlined above
- [ ] All app reviews have complete cards (icon placeholder, rating, pros/cons, verdict)
- [ ] Quick Picks table has 6-8 entries
- [ ] Comparison table has all reviewed apps
- [ ] FAQ has 6-8 questions with accordion functionality
- [ ] InnerFire appears in "Interactive" section and comparison table (highlighted)
- [ ] Both JSON-LD blocks validate (Article+ItemList, FAQPage)
- [ ] `blog/posts.json` includes the new article as first entry
- [ ] `llms.txt` exists at site root
- [ ] All 12 mandatory keywords from SEO scheme appear in the article
- [ ] Word count is 2500-4000

## Verification
1. Open `blog/best-breathwork-apps.html` — page renders with all components
2. Quick Picks table is visible and links work (anchor to app sections)
3. Each app card shows: icon placeholder, name, rating, platforms, price, pros/cons, verdict
4. Comparison table scrolls horizontally on mobile
5. FAQ accordion: clicking opens/closes items
6. InnerFire row in comparison table has accent highlight
7. Open `blog.html` — new article appears as first card
8. Check JSON-LD at https://search.google.com/structured-data/testing-tool — both schemas valid
9. Open `/llms.txt` in browser — content loads as plaintext
10. Resize to 375px — all content readable, no overflow
11. Search (Ctrl+F) for all 12 mandatory keywords — all present

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
