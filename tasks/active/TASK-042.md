# TASK-042: New article — Build a Breathing Habit

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Context

Replace `blog/reset-in-3-minutes.html` with a new article about building a sustainable breathing habit. The article must be engaging, science-backed, and include interactive visual elements (habit formation curve + 21-day tracker). The old article was thin content — this replacement must be genuinely useful.

**This task creates 2 new files and modifies 1 existing file.** Budget exception justified: new article page + thumbnail SVG + CSS for interactive elements.

## File Operations

| Action | File |
|--------|------|
| CREATE | `blog/build-breathing-habit.html` |
| CREATE | `blog/images/build-breathing-habit.svg` |
| MODIFY | `styles.css` — add CSS for `.habit-curve-svg` and `.breath-map` components |
| _(deletion of old files handled in TASK-043)_ | |

## Article Metadata

| Field | Value |
|-------|-------|
| Slug | `build-breathing-habit` |
| Title | `How to Build a Daily Breathing Habit That Actually Sticks` |
| Excerpt | `Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic.` |
| Category | `Habits` |
| Date | `2026-03-04` |
| ReadTime | `8 min` |
| Thumbnail | `./blog/images/build-breathing-habit.svg` |

## HTML Structure

Follow `blog/_template.html` exactly. Include ALL elements (same requirements as TASK-041):

1. Full `<head>` with GA4/Clarity (commented), theme-color, preconnect, author, og:locale, canonical, twitter:card
2. Reading progress bar
3. Article header + body
4. CTA section with first_name + email
5. Author card
6. Back link nav
7. Full footer with social links
8. Inline script: reading progress + share + FAQ accordion

### Head meta tags (exact)

```html
<meta charset="UTF-8" />
<!-- GA4 and Clarity commented blocks (copy from index.html) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#0a0d12" />
<link rel="preconnect" href="https://app.kit.com" crossorigin />
<meta name="author" content="Marian Kushnir" />
<title>How to Build a Daily Breathing Habit That Actually Sticks - InnerFire Blog</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
<meta name="description" content="Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic." />
<meta property="og:title" content="How to Build a Daily Breathing Habit That Actually Sticks - InnerFire Blog" />
<meta property="og:description" content="Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic." />
<meta property="og:type" content="article" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="../blog/images/build-breathing-habit.svg" />
<meta property="og:url" content="https://innerfire.app/blog/build-breathing-habit" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="How to Build a Daily Breathing Habit - InnerFire Blog" />
<meta name="twitter:description" content="Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic." />
<link rel="stylesheet" href="../styles.css" />
<link rel="canonical" href="https://innerfire.app/blog/build-breathing-habit.html" />
```

### Schema.org JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build a Daily Breathing Habit That Actually Sticks",
  "description": "Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic.",
  "datePublished": "2026-03-04",
  "author": {
    "@type": "Person",
    "name": "Marian Kushnir",
    "url": "https://www.linkedin.com/in/kushnir-maryan/"
  },
  "publisher": { "@type": "Organization", "name": "InnerFire" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://innerfire.app/blog/build-breathing-habit" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to build a breathing habit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Research by Phillippa Lally at University College London found that the average time to form an automatic habit is 66 days. The first 7 days (initiation phase) are the most critical. After 21-30 days of consistent practice, the behavior starts to feel natural." }
    },
    {
      "@type": "Question",
      "name": "What is the best time of day for breathing exercises?",
      "acceptedAnswer": { "@type": "Answer", "text": "There is no universally best time. The most effective approach is to anchor your breathing practice to an existing daily behavior — such as after putting your phone on charge at night, after sitting down at your desk, or after parking your car. The anchor behavior becomes your automatic trigger." }
    },
    {
      "@type": "Question",
      "name": "How many minutes of breathing exercises should I do per day?",
      "acceptedAnswer": { "@type": "Answer", "text": "Start with 1-2 minutes for the first week. The goal during initiation is consistency, not duration. Gradually extend to 3-5 minutes by week three. Research shows that even 5 minutes of structured breathing produces measurable physiological benefits." }
    },
    {
      "@type": "Question",
      "name": "What if I miss a day of breathing exercises?",
      "acceptedAnswer": { "@type": "Answer", "text": "Missing one day does not reset your progress. Research shows that occasional misses have no measurable impact on long-term habit formation. The critical rule is: never miss twice in a row. One miss is noise. Two consecutive misses is the start of a new pattern." }
    }
  ]
}
</script>
```

## Article Content

### Article Header

```html
<header class="article-header">
  <span class="article-category">Habits</span>
  <h1>How to Build a Daily Breathing Habit That Actually Sticks</h1>
  <div class="article-meta">
    <time datetime="2026-03-04">Mar 4, 2026</time>
    <span class="article-read-time">8 min read</span>
  </div>
  <div class="article-share">
    <button class="share-btn" id="article-share-btn" type="button" aria-label="Share this article">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      <span>Share</span>
    </button>
  </div>
</header>
```

### Body Text

**Intro (no heading):**

You downloaded a breathing app. You used it twice. Now it sits on your phone collecting notifications you ignore.

This is not a willpower problem. It is a habit design problem.

---

**H2: Why Breathing Exercises Are Hard to Stick To**

Breathing apps face a unique challenge that workout apps, language apps, and diet apps do not: the reward is invisible.

After a gym session, your muscles feel different. After a language lesson, you learned a new word. After a breathing session... you feel slightly calmer. Maybe. It is subtle, and subtlety does not build habits.

Habits require a clear reward signal. Without one, your brain files the behavior under "optional" — and optional behaviors are the first to be dropped when life gets busy.

---

**H2: How Habits Actually Form**

The modern understanding of habit formation comes from research in behavioral psychology and neuroscience. The most useful model breaks a habit into four stages:

**1. Cue** — a trigger that tells your brain to initiate the behavior. It can be a time (7:00 AM), a location (your bed), an emotional state (feeling anxious), or a preceding action (finishing dinner).

**2. Craving** — the motivation behind the behavior. Not the behavior itself, but the change in state it produces. You do not crave the breathing exercise — you crave the calm that follows.

**3. Response** — the actual behavior. The breathing session.

**4. Reward** — the outcome that satisfies the craving and teaches your brain to repeat the loop.

If any of these four stages is weak, the habit fails. Most breathing habits fail at stages 1 and 4 — no clear cue, and no obvious reward.

_Use `<p>` for each numbered stage. `<strong>` for the number + label. Follow the same inline formatting as other articles._

_Add reference:_ `<a href="https://jamesclear.com/habit-loop" target="_blank" rel="noreferrer">James Clear, Atomic Habits — The Habit Loop</a>`

---

**H2: The Three Phases of Habit Formation**

Research by Phillippa Lally at University College London found that habit formation follows a predictable curve with three phases:

**INSERT THE HABIT FORMATION CURVE HERE** (see Interactive Element #1 below)

**Phase 1: Initiation (Days 1-7)**

You are making a conscious decision every time. It requires effort and deliberate planning. This is the phase where most people quit — not because the habit is hard, but because it is not automatic yet.

**Phase 2: Learning (Days 8-30)**

The behavior starts to feel familiar. You still need the cue, but the resistance decreases. Some days you do it without thinking about it. Other days you still have to force yourself.

**Phase 3: Stability (Days 30-66+)**

The habit becomes automatic. You do it without deliberating. Missing it feels wrong. Lally's research found that the average time to reach this phase is 66 days — not the commonly cited 21 days.

The key insight: the first 7 days are the hardest, and they determine everything. If you survive the initiation phase, the odds of long-term success increase dramatically.

_Use `<h3>` for each phase heading. Add reference:_ `<a href="https://pubmed.ncbi.nlm.nih.gov/20192526/" target="_blank" rel="noreferrer">Lally et al. (2010), European Journal of Social Psychology</a>`

---

**H2: Five Rules for Making Breathing Stick**

### H3: Rule 1 — Anchor to an Existing Behavior

Do not schedule breathing exercises at a specific time. Instead, attach them to something you already do every day.

**The formula:** After I [existing behavior], I will breathe for 2 minutes.

Examples:
- After I put my phone on the charger at night, I breathe for 2 minutes
- After I sit down at my desk in the morning, I breathe for 2 minutes
- After I park my car, I breathe for 2 minutes before going inside

The existing behavior becomes your cue. You do not need to remember — the habit triggers automatically.

_Add reference:_ `<a href="https://tinyhabits.com/" target="_blank" rel="noreferrer">B.J. Fogg, Tiny Habits</a>`

### H3: Rule 2 — Start Absurdly Small

Your goal for the first week is not a 10-minute breathing session. It is not even 5 minutes. It is 1 minute.

One minute is too small to fail. You cannot claim you do not have time for one minute. The point is not the duration — it is the consistency. You are training the neural pathway, not your lungs.

After the first week, extend to 2 minutes. After two weeks, 3 minutes. By week four, 5 minutes will feel natural — because the habit infrastructure is already in place.

### H3: Rule 3 — Make the Reward Visible

Your brain needs to see that the behavior produced a positive outcome. The problem with breathing is that the reward (reduced cortisol, improved HRV, calmer nervous system) is physiologically real but perceptually invisible.

Solutions:
- **Track your streak.** A simple calendar with X marks works. The visual chain of completed days becomes its own reward — you do not want to break the streak.
- **Notice the before/after.** Before starting, rate your stress 1-10. After finishing, rate again. The difference is your visible reward.
- **Use sensory feedback.** Apps like InnerFire provide real-time visual and haptic feedback that makes the exhale feel tangible. When you can see and feel your breath doing something, the reward is immediate.

### H3: Rule 4 — Remove Friction

Every additional step between your cue and your breathing session is a chance to quit.

- Keep the app on your home screen, not buried in a folder
- Use a widget if available
- Have headphones nearby if you breathe with audio
- Do not change clothes, move to a special room, or set up a meditation space. Breathe where you are

The ideal breathing habit has zero setup time. Cue happens, open app, breathe, done.

### H3: Rule 5 — Plan for Failure

You will miss days. Research shows this does not reset your progress — as long as you do not miss two consecutive days.

The "never miss twice" rule is more important than a perfect streak. If you miss Monday, do it Tuesday no matter what. One miss is statistical noise. Two misses is the beginning of a new habit: not breathing.

---

**H2: Your 21-Day Breath Map**

Here is a practical tracker for your first three weeks. Each day represents one breathing session of 2 minutes or more.

**INSERT THE 21-DAY BREATH MAP HERE** (see Interactive Element #2 below)

**Week 1 — Initiation:** Focus only on doing it. Duration does not matter. 1-2 minutes is fine. The goal is 7 consecutive cue-response loops.

**Week 2 — Building:** Start extending duration to 3-4 minutes. Pay attention to the before/after stress difference. This is when the reward signal starts to form.

**Week 3 — Momentum:** You should notice that some days you reach for the app without consciously deciding to. This is the habit taking root. Extend to 5 minutes if comfortable.

After 21 days, you are past the hardest part. Continue to day 66 for full automaticity.

---

**H2: Common Failure Points**

**"I forgot."** — Your cue is too weak. Pick a stronger anchor behavior that happens every single day.

**"I don't have time."** — Your target duration is too long. Reduce to 1 minute. You have 1 minute.

**"I don't feel anything."** — You are expecting too much too soon. Track your HRV over 2 weeks with a smartwatch. The change is happening even if you cannot feel it yet.

**"I did it for a week and stopped."** — You likely tried to do too much. The initiation phase is fragile. Go back to 1 minute and rebuild.

**"It feels boring."** — Your response needs more sensory engagement. Try breathing with music, with an app like InnerFire, or in a different location. Boredom is a signal that your brain is not getting enough reward.

_Use `<p>` for each failure point. `<strong>` for the quoted complaint._

---

**H2: The Bottom Line**

Building a breathing habit is not about discipline. It is about design.

Pick a cue. Start small. Make the reward visible. Remove friction. Never miss twice.

Your nervous system does not care about your motivation. It responds to repetition.

---

**H2: Frequently Asked Questions**

Implement as collapsible FAQ accordion (same as TASK-041):

```html
<section class="faq-section" id="faq">
  <h2>Frequently Asked Questions</h2>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">How long does it take to build a breathing habit?</button>
    <div class="faq-answer" role="region">
      <div class="faq-answer-inner">
        <p>Research by Phillippa Lally at University College London found that the average time to form an automatic habit is 66 days. However, the first 7 days are the most critical — if you can maintain consistency through the initiation phase, your chances of long-term success increase significantly. By day 21-30, the behavior starts to feel natural.</p>
      </div>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">What is the best time of day for breathing exercises?</button>
    <div class="faq-answer" role="region">
      <div class="faq-answer-inner">
        <p>There is no universally best time. The most effective approach is to anchor your breathing practice to an existing daily behavior — such as after putting your phone on charge at night, after sitting down at your desk, or after parking your car. The anchor becomes your automatic trigger, removing the need to remember or schedule.</p>
      </div>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">How many minutes of breathing exercises should I do per day?</button>
    <div class="faq-answer" role="region">
      <div class="faq-answer-inner">
        <p>Start with 1-2 minutes for the first week. The goal during initiation is consistency, not duration. Gradually extend to 3-5 minutes by week three. Research from Stanford shows that even 5 minutes of structured breathing produces measurable physiological benefits, including reduced cortisol and improved heart rate variability.</p>
      </div>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">What if I miss a day of breathing exercises?</button>
    <div class="faq-answer" role="region">
      <div class="faq-answer-inner">
        <p>Missing one day does not reset your progress. Lally's research shows occasional misses have no measurable impact on long-term habit formation. The critical rule is: never miss twice in a row. If you miss Monday, do it Tuesday no matter what. One miss is noise. Two consecutive misses is the start of a new pattern.</p>
      </div>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">Why do most people quit breathing exercises?</button>
    <div class="faq-answer" role="region">
      <div class="faq-answer-inner">
        <p>The most common reasons are: no clear trigger (cue), the reward feels invisible (unlike exercise or learning where progress is obvious), and starting with too much duration. The solution is to anchor to an existing behavior, start at 1 minute, and use tools that make the experience more tangible — like streak tracking or sensory feedback apps.</p>
      </div>
    </div>
  </div>
</section>
```

## Interactive Element #1: Habit Formation Curve

Insert as inline SVG inside a `<figure>` block, immediately after the paragraph "Research by Phillippa Lally...":

```html
<figure class="media-block media-image">
  <svg class="habit-curve-svg" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Habit formation curve showing effort decreasing over time through three phases: Initiation, Learning, and Stability">
    <!-- Y axis -->
    <line x1="60" y1="20" x2="60" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <!-- X axis -->
    <line x1="60" y1="170" x2="570" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <!-- Y label -->
    <text x="18" y="100" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="11" text-anchor="middle" transform="rotate(-90 18 100)">Effort required</text>
    <!-- X label -->
    <text x="315" y="210" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="11" text-anchor="middle">Time</text>
    <!-- Phase dividers -->
    <line x1="200" y1="20" x2="200" y2="170" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="390" y1="20" x2="390" y2="170" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 4"/>
    <!-- Effort curve (high effort → low effort) -->
    <path d="M80 35 Q130 38 170 60 Q230 100 300 130 Q380 150 560 158" stroke="#ff8a3d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <!-- Area under curve (subtle fill) -->
    <path d="M80 35 Q130 38 170 60 Q230 100 300 130 Q380 150 560 158 L560 170 L80 170 Z" fill="url(#curveFill)" opacity="0.15"/>
    <defs>
      <linearGradient id="curveFill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ff8a3d"/>
        <stop offset="50%" stop-color="#ffd166"/>
        <stop offset="100%" stop-color="#44aa55"/>
      </linearGradient>
    </defs>
    <!-- Phase labels -->
    <text x="130" y="192" fill="#ff8a3d" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Initiation</text>
    <text x="130" y="203" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="9" text-anchor="middle">Days 1-7</text>
    <text x="295" y="192" fill="#ffd166" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Learning</text>
    <text x="295" y="203" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="9" text-anchor="middle">Days 8-30</text>
    <text x="475" y="192" fill="#44aa55" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Stability</text>
    <text x="475" y="203" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="9" text-anchor="middle">Day 30+</text>
  </svg>
  <figcaption>Habit formation curve — effort drops dramatically after the initiation phase.</figcaption>
</figure>
```

CSS for the SVG (add to `styles.css`):

```css
/* Habit curve chart */
.habit-curve-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  margin: 0 auto;
}
```

## Interactive Element #2: 21-Day Breath Map

Insert after "Here is a practical tracker..." paragraph:

```html
<div class="breath-map" role="img" aria-label="21-day breathing habit tracker divided into three weeks: Initiation, Building, and Momentum">
  <div class="breath-map-week">
    <span class="breath-map-label">Week 1 <span class="breath-map-phase">Initiation</span></span>
    <div class="breath-map-days">
      <span class="breath-map-day" aria-label="Day 1"></span>
      <span class="breath-map-day" aria-label="Day 2"></span>
      <span class="breath-map-day" aria-label="Day 3"></span>
      <span class="breath-map-day" aria-label="Day 4"></span>
      <span class="breath-map-day" aria-label="Day 5"></span>
      <span class="breath-map-day" aria-label="Day 6"></span>
      <span class="breath-map-day" aria-label="Day 7"></span>
    </div>
  </div>
  <div class="breath-map-week">
    <span class="breath-map-label">Week 2 <span class="breath-map-phase">Building</span></span>
    <div class="breath-map-days">
      <span class="breath-map-day" aria-label="Day 8"></span>
      <span class="breath-map-day" aria-label="Day 9"></span>
      <span class="breath-map-day" aria-label="Day 10"></span>
      <span class="breath-map-day" aria-label="Day 11"></span>
      <span class="breath-map-day" aria-label="Day 12"></span>
      <span class="breath-map-day" aria-label="Day 13"></span>
      <span class="breath-map-day" aria-label="Day 14"></span>
    </div>
  </div>
  <div class="breath-map-week">
    <span class="breath-map-label">Week 3 <span class="breath-map-phase">Momentum</span></span>
    <div class="breath-map-days">
      <span class="breath-map-day" aria-label="Day 15"></span>
      <span class="breath-map-day" aria-label="Day 16"></span>
      <span class="breath-map-day" aria-label="Day 17"></span>
      <span class="breath-map-day" aria-label="Day 18"></span>
      <span class="breath-map-day" aria-label="Day 19"></span>
      <span class="breath-map-day" aria-label="Day 20"></span>
      <span class="breath-map-day" aria-label="Day 21"></span>
    </div>
  </div>
</div>
```

CSS for the breath map (add to `styles.css`):

```css
/* 21-Day Breath Map */
.breath-map {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius);
  margin: 24px 0;
}
.breath-map-week {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.breath-map-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}
.breath-map-phase {
  font-weight: 400;
  color: var(--muted);
  margin-left: 6px;
  font-size: 0.8rem;
}
.breath-map-days {
  display: flex;
  gap: 8px;
}
.breath-map-day {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 138, 61, 0.25);
  background: rgba(255, 138, 61, 0.04);
  flex-shrink: 0;
}
@media (max-width: 480px) {
  .breath-map {
    padding: 16px;
    gap: 12px;
  }
  .breath-map-days {
    gap: 6px;
  }
  .breath-map-day {
    width: 28px;
    height: 28px;
  }
}
@media (max-width: 350px) {
  .breath-map-day {
    width: 24px;
    height: 24px;
    border-width: 1.5px;
  }
  .breath-map-days {
    gap: 4px;
  }
}
```

## CTA Section

Same as TASK-041 — place AFTER the article, BEFORE the author card:

```html
<section class="article-cta">
  <div class="container article-container">
    <div class="article-cta-card">
      <h3>Start your breathing habit with InnerFire</h3>
      <p>Multisensory feedback makes each session feel tangible. Be one of 300 early testers.</p>
      <form
        action="https://app.kit.com/forms/9132207/subscriptions"
        method="post"
        class="article-cta-form"
        data-sv-form="9132207"
        data-uid="b081b4720d"
      >
        <input type="text" name="fields[first_name]" placeholder="First Name" class="email-input" required />
        <input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
        <button class="btn-primary" type="submit">Get Early Access</button>
      </form>
      <p class="form-note">No spam. Just a beta invite.</p>
    </div>
  </div>
</section>
```

## SVG Thumbnail

Create `blog/images/build-breathing-habit.svg` (1200x675):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121018"/>
      <stop offset="60%" stop-color="#1a1422"/>
      <stop offset="100%" stop-color="#201a2a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#ffd166" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffd166" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <text x="600" y="220" text-anchor="middle" fill="#ffd166" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6" opacity="0.85">INNERFIRE BLOG</text>
  <text x="600" y="340" text-anchor="middle" fill="#e8edf7" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="800">Build a Breathing Habit</text>
  <text x="600" y="420" text-anchor="middle" fill="#95a3bf" font-family="Inter, Arial, sans-serif" font-size="34">A science-backed guide to making breathwork stick</text>
</svg>
```

## Do NOT

- Modify any existing files other than `styles.css` (article file deletions handled in TASK-043)
- Add the new CSS anywhere except at the end of `styles.css` (before the final closing comment, or after all existing rules)
- Use emojis in article body
- Use exclamation marks in article body
- Make the breath map interactive with JS (it is a static visual reference)
- Add JavaScript for the breath map or habit curve — they are pure CSS/SVG

## Acceptance Criteria

- [ ] `blog/build-breathing-habit.html` exists and renders correctly
- [ ] `blog/images/build-breathing-habit.svg` exists (1200x675)
- [ ] All `<head>` meta tags present (canonical, og, twitter, author, theme-color)
- [ ] Schema.org Article + FAQPage JSON-LD in head
- [ ] Reading progress bar works on scroll
- [ ] Share button works
- [ ] FAQ accordion expands/collapses
- [ ] Habit formation curve SVG renders correctly at all widths (responsive via viewBox)
- [ ] 21-Day Breath Map renders 3 rows of 7 circles, responsive down to 350px
- [ ] CTA form has first_name + email fields, submits to Kit.com
- [ ] Author card present
- [ ] Full footer with social links
- [ ] CSS added to `styles.css` for `.habit-curve-svg`, `.breath-map`, `.breath-map-*`
- [ ] No console errors
- [ ] Article body tone: calm, practical, no hype
- [ ] External links use `target="_blank" rel="noreferrer"`
- [ ] Reference links are real, verifiable URLs

## Verification

1. Open `blog/build-breathing-habit.html` at 375px, 768px, 1920px
2. Habit curve SVG scales proportionally
3. 21-day tracker circles fit screen at 350px (no overflow)
4. FAQ accordion works
5. CTA form submits
6. Share button works
7. Reading progress bar fills on scroll
8. No console errors

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
