# TASK-043: Blog cleanup — update posts.json, delete old files, fix consistency

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-041 (DONE), TASK-042 (DONE)

## Context

After TASK-041 and TASK-042 created the new articles, this task:
1. Updates `posts.json` to replace old slugs with new ones
2. Deletes old article files and thumbnails
3. Fixes `breathing-under-noise.html` to match the template standard (add missing CTA, Schema.org, meta tags, full footer)

**This task modifies 2 files and deletes 4 files.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `blog/posts.json` — replace old entries with new slugs |
| MODIFY | `blog/breathing-under-noise.html` — add missing template elements |
| DELETE | `blog/why-exhale-works.html` |
| DELETE | `blog/reset-in-3-minutes.html` |
| DELETE | `blog/images/post-02.svg` _(was reset-in-3-minutes thumbnail)_ |
| DELETE | `blog/images/post-03.svg` _(was why-exhale-works thumbnail)_ |

## Change 1: Update posts.json

Replace the full contents of `blog/posts.json` with:

```json
[
  {
    "slug": "best-breathwork-apps",
    "title": "Best Breathwork Apps (2026)",
    "excerpt": "Comparing the top breathing and breathwork apps for anxiety, sleep, and stress. Detailed reviews with pricing, pros & cons.",
    "date": "2026-02-27",
    "readTime": "12 min",
    "category": "Comparison",
    "thumbnail": "./blog/images/best-breathwork-apps.svg"
  },
  {
    "slug": "vagus-nerve-breathing",
    "title": "Vagus Nerve Breathing: Why Exhaling Actually Calms You Down",
    "excerpt": "How the longest nerve in your body connects breath to brain — and why extending your exhale is the fastest way to reduce anxiety.",
    "date": "2026-03-07",
    "readTime": "9 min",
    "category": "Science",
    "thumbnail": "./blog/images/vagus-nerve-breathing.svg"
  },
  {
    "slug": "build-breathing-habit",
    "title": "How to Build a Daily Breathing Habit That Actually Sticks",
    "excerpt": "Why most people quit breathing exercises after 3 days — and the science-backed approach to making breathwork automatic.",
    "date": "2026-03-04",
    "readTime": "8 min",
    "category": "Habits",
    "thumbnail": "./blog/images/build-breathing-habit.svg"
  },
  {
    "slug": "breathing-under-noise",
    "title": "Breathing Under Noise",
    "excerpt": "A practical guide for stabilizing breath when your environment is loud and unpredictable.",
    "date": "2026-03-01",
    "readTime": "6 min",
    "category": "Breathing",
    "thumbnail": "./blog/images/post-01.svg"
  }
]
```

**Sorted by date descending** — vagus nerve article (Mar 7) will be the featured card on mobile (TASK-040 compact layout).

## Change 2: Fix breathing-under-noise.html consistency

The existing `breathing-under-noise.html` is missing several template elements that the new articles (TASK-041, TASK-042) include. Add the following to make all articles consistent:

### 2a. Add missing `<head>` tags

Add these BEFORE the `<link rel="stylesheet">` line:

```html
<!-- GA4 commented block -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->

<!-- Clarity commented block -->
<!--
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","XXXXXXXXXX");
</script>
-->
```

Add these meta tags if missing (check existing and only add what's absent):

```html
<meta name="theme-color" content="#0a0d12" />
<link rel="preconnect" href="https://app.kit.com" crossorigin />
<meta name="author" content="Marian Kushnir" />
<meta property="og:locale" content="en_US" />
<link rel="canonical" href="https://innerfire.app/blog/breathing-under-noise.html" />
```

### 2b. Add Schema.org JSON-LD

Add to `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Breathing Under Noise",
  "description": "A practical guide for stabilizing breath when your environment is loud and unpredictable.",
  "datePublished": "2026-03-01",
  "author": {
    "@type": "Person",
    "name": "Marian Kushnir",
    "url": "https://www.linkedin.com/in/kushnir-maryan/"
  },
  "publisher": { "@type": "Organization", "name": "InnerFire" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://innerfire.app/blog/breathing-under-noise" }
}
</script>
```

### 2c. Add CTA section

Add AFTER `</article>` and BEFORE `<section class="article-author">`:

```html
<section class="article-cta">
  <div class="container article-container">
    <div class="article-cta-card">
      <h3>Feel your breath working</h3>
      <p>InnerFire turns your exhale into fire, sound, and vibration. Be one of 300 early testers.</p>
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

### 2d. Update footer to full version

Replace the simplified footer:
```html
<footer>
  <div class="container">
    <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
  </div>
</footer>
```

With the full footer:
```html
<footer>
  <div class="container">
    <p class="footer-follow">Follow the build:</p>
    <div class="social-links">
      <a href="#" class="social-link" target="_blank" rel="noopener">TikTok</a>
      <a href="https://x.com/kushnir_marian_" class="social-link" target="_blank" rel="noopener">X</a>
      <a href="https://discord.gg/PRuveBJH" class="social-link" target="_blank" rel="noopener">Discord</a>
    </div>
    <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
  </div>
</footer>
```

## Change 3: Delete old files

Delete these 4 files:
- `blog/why-exhale-works.html`
- `blog/reset-in-3-minutes.html`
- `blog/images/post-02.svg`
- `blog/images/post-03.svg`

**Verify before deleting:** confirm that no other file references these paths (search for `why-exhale-works`, `reset-in-3-minutes`, `post-02.svg`, `post-03.svg` across the codebase). The only references should be in `posts.json` (which we're updating) and in the files themselves.

## Do NOT

- Modify `blog/best-breathwork-apps.html` (it has its own structure from TASK-035+)
- Modify `blog/vagus-nerve-breathing.html` or `blog/build-breathing-habit.html` (just created in TASK-041/042)
- Change `styles.css`
- Modify `index.html` or `blog.html`
- Change any article body content in `breathing-under-noise.html`

## Acceptance Criteria

- [ ] `posts.json` has 4 entries with correct slugs: best-breathwork-apps, vagus-nerve-breathing, build-breathing-habit, breathing-under-noise
- [ ] `posts.json` entries are sorted by date descending
- [ ] `why-exhale-works.html` deleted
- [ ] `reset-in-3-minutes.html` deleted
- [ ] `blog/images/post-02.svg` deleted
- [ ] `blog/images/post-03.svg` deleted
- [ ] `breathing-under-noise.html` has Schema.org Article JSON-LD
- [ ] `breathing-under-noise.html` has CTA section with first_name + email
- [ ] `breathing-under-noise.html` has canonical URL
- [ ] `breathing-under-noise.html` has full footer with social links
- [ ] `breathing-under-noise.html` has theme-color, author, og:locale meta tags
- [ ] Blog index (blog.html) renders 4 cards correctly with new slugs
- [ ] Blog index mobile (375px): featured card = vagus nerve article (newest)
- [ ] Clicking each card navigates to correct article
- [ ] No 404s — all thumbnail paths resolve
- [ ] No references to old slugs remain in codebase

## Verification

1. Open `blog.html` — 4 cards render, vagus nerve is featured (first)
2. Click each card — correct article opens
3. Mobile 375px — compact layout works (TASK-040), featured = vagus nerve
4. Open `breathing-under-noise.html` — CTA form visible, Schema.org in source, footer has social links
5. Search codebase for "why-exhale-works" and "reset-in-3-minutes" — zero results
6. No console errors on any page

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
