# TASK-029: Listicle article template + CSS components

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Goal
Create a reusable HTML template and CSS components for listicle/comparison blog articles. This template will be used for the "Best Breathwork Apps" article (TASK-030) and future comparison posts.

## Context
The existing `blog/_template.html` is designed for narrative articles. Listicle articles need additional components: quick picks table, app review cards, comparison table, FAQ accordion, and table of contents. These require new CSS classes added to `styles.css` and a new template file.

## Files to modify/create

| File | Action |
|------|--------|
| `styles.css` | ADD new CSS classes for listicle components (append after existing blog styles, before media queries) |
| `blog/_listicle-template.html` | CREATE new template file based on `_template.html` structure |

## Requirements

### 1. CSS components to add in `styles.css`

Add these new style blocks AFTER the existing blog article styles (after the `.article-cta-form` block, around line ~1244) and BEFORE the `@media (max-width: 480px)` blog responsive block.

**A) Table of Contents**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — Table of Contents
   ═══════════════════════════════════════════════════ */
.article-toc {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
  padding: 24px 28px;
  margin-bottom: 40px;
}
.article-toc-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 12px;
}
.article-toc ol {
  list-style: none;
  counter-reset: toc;
  padding: 0;
}
.article-toc li {
  counter-increment: toc;
  margin-bottom: 8px;
}
.article-toc li::before {
  content: counter(toc) ".";
  color: var(--accent);
  font-weight: 700;
  margin-right: 8px;
  font-size: 0.9rem;
}
.article-toc a {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.article-toc a:hover {
  color: var(--accent);
}
```

**B) Quick Picks summary table**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — Quick Picks
   ═══════════════════════════════════════════════════ */
.quick-picks {
  margin-bottom: 48px;
}
.quick-picks h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 16px;
}
.quick-picks-table {
  width: 100%;
  border-collapse: collapse;
}
.quick-picks-table th,
.quick-picks-table td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.95rem;
}
.quick-picks-table th {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.quick-picks-table td:first-child {
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
}
.quick-picks-table td a {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.quick-picks-table td a:hover {
  color: var(--accent);
}
```

**C) App review card**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — App Review Card
   ═══════════════════════════════════════════════════ */
.app-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
  padding: 32px;
  margin-bottom: 32px;
}
.app-card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.app-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}
.app-card-info {
  flex: 1;
}
.app-card-name {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.app-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--muted);
  font-size: 0.85rem;
}
.app-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 138, 61, 0.3);
  background: rgba(255, 138, 61, 0.08);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-left: auto;
}
.app-card-description {
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 20px;
}
.app-card-rating {
  color: var(--accent2);
  font-weight: 600;
}
.app-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.app-card-pros,
.app-card-cons {
  padding: 0;
  list-style: none;
}
.app-card-pros-title,
.app-card-cons-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}
.app-card-pros-title { color: #4ade80; }
.app-card-cons-title { color: #f87171; }
.app-card-pros li,
.app-card-cons li {
  position: relative;
  padding-left: 16px;
  font-size: 0.9rem;
  color: var(--text);
  margin-bottom: 4px;
  line-height: 1.5;
}
.app-card-pros li::before {
  content: "+";
  position: absolute;
  left: 0;
  color: #4ade80;
  font-weight: 700;
}
.app-card-cons li::before {
  content: "-";
  position: absolute;
  left: 0;
  color: #f87171;
  font-weight: 700;
}
.app-card-verdict {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.95rem;
  line-height: 1.6;
}
.app-card-verdict strong {
  color: var(--accent);
}
```

**D) Comparison table**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — Comparison Table
   ═══════════════════════════════════════════════════ */
.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: 48px;
  -webkit-overflow-scrolling: touch;
}
.comparison-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.comparison-table th,
.comparison-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  vertical-align: top;
}
.comparison-table th {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  position: sticky;
  top: 0;
  background: var(--bg);
}
.comparison-table td:first-child {
  font-weight: 600;
  white-space: nowrap;
}
.comparison-table tr:hover {
  background: rgba(255, 255, 255, 0.02);
}
.comparison-table .highlight-row {
  background: rgba(255, 138, 61, 0.04);
  border-left: 2px solid var(--accent);
}
.comparison-table .highlight-row:hover {
  background: rgba(255, 138, 61, 0.07);
}
```

**E) FAQ accordion**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — FAQ Accordion
   ═══════════════════════════════════════════════════ */
.faq-section {
  margin-bottom: 48px;
}
.faq-section h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;
}
.faq-question:hover {
  color: var(--accent);
}
.faq-question::after {
  content: "+";
  font-size: 1.2rem;
  color: var(--muted);
  flex-shrink: 0;
  margin-left: 16px;
  transition: transform 0.2s;
}
.faq-item.open .faq-question::after {
  content: "-";
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-item.open .faq-answer {
  max-height: 500px;
}
.faq-answer-inner {
  padding: 0 0 16px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.7;
}
```

**F) Listicle-specific highlight box**

```css
/* ═══════════════════════════════════════════════════
   LISTICLE — Highlight / Callout Box
   ═══════════════════════════════════════════════════ */
.listicle-highlight {
  background: rgba(255, 138, 61, 0.04);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 20px 24px;
  margin-bottom: 32px;
  font-size: 0.95rem;
  line-height: 1.7;
}
.listicle-highlight strong {
  color: var(--accent);
}
```

**G) Mobile responsive additions**

Add to the EXISTING `@media (max-width: 480px)` blog section:

```css
  /* Listicle mobile */
  .app-card { padding: 20px; }
  .app-card-header { flex-direction: column; }
  .app-card-icon { width: 48px; height: 48px; }
  .app-card-badge { margin-left: 0; }
  .app-card-grid { grid-template-columns: 1fr; }
  .quick-picks-table th:nth-child(3),
  .quick-picks-table td:nth-child(3) { display: none; }
  .comparison-table { font-size: 0.82rem; }
  .comparison-table th, .comparison-table td { padding: 10px 8px; }
```

### 2. Template file `blog/_listicle-template.html`

Create a new file based on the existing `blog/_template.html` structure, with these modifications:

**Head section:**
- Same meta tags, GA/Clarity placeholders, author, theme-color
- Add `<meta name="article:section" content="Comparison" />`
- Change JSON-LD to include `ItemList` and `FAQPage` schemas (see Schema section below)

**Body structure** (replace the `<article>` content):

```html
<article class="article" itemscope itemtype="https://schema.org/Article">
  <div class="container article-container">
    <!-- Article header -->
    <header class="article-header">
      <span class="article-category"><!-- EDIT: e.g. Comparison --></span>
      <h1 itemprop="headline"><!-- EDIT: Article Title --></h1>
      <div class="article-meta">
        <time datetime="2026-01-01" itemprop="datePublished"><!-- EDIT: date --></time>
        <span class="article-read-time"><!-- EDIT: X min read --></span>
        <span>Last updated: <!-- EDIT: date --></span>
      </div>
      <div class="article-share">
        <button class="share-btn" id="article-share-btn" type="button" aria-label="Share this article">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          <span>Share</span>
        </button>
      </div>
    </header>

    <div class="article-body">
      <!-- Quick answer / TL;DR for AI extraction -->
      <div class="listicle-highlight">
        <strong>Quick answer:</strong> <!-- EDIT: 2-3 sentence direct answer to the article's main question. AI assistants will extract this. -->
      </div>

      <!-- Table of contents -->
      <nav class="article-toc" aria-label="Table of contents">
        <p class="article-toc-title">In this article</p>
        <ol>
          <li><a href="#quick-picks">Quick picks</a></li>
          <!-- EDIT: Add section links -->
          <li><a href="#faq">FAQ</a></li>
        </ol>
      </nav>

      <!-- Intro text -->
      <p><!-- EDIT: Introduction (100-150 words, include primary + secondary keywords naturally) --></p>

      <!-- Quick picks table -->
      <section class="quick-picks" id="quick-picks">
        <h2>Quick Picks</h2>
        <div class="comparison-table-wrapper">
          <table class="quick-picks-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>App</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <!-- EDIT: Add rows -->
              <tr>
                <td><!-- e.g. Best overall --></td>
                <td><a href="#app-slug"><!-- App name --></a></td>
                <td><!-- e.g. Free / $12.99/mo --></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- App review cards -->
      <!-- EDIT: Repeat this block for each app -->
      <section id="app-slug">
        <div class="app-card">
          <div class="app-card-header">
            <img class="app-card-icon" src="" alt="App Name icon" loading="lazy" />
            <div class="app-card-info">
              <h3 class="app-card-name"><!-- App Name --></h3>
              <div class="app-card-meta">
                <span class="app-card-rating">★ <!-- X.X --></span>
                <span><!-- iOS / Android --></span>
                <span><!-- Free / $X.XX/mo --></span>
              </div>
            </div>
            <span class="app-card-badge"><!-- e.g. Best for Anxiety --></span>
          </div>
          <p class="app-card-description">
            <!-- 2-3 sentence review. Make the FIRST sentence a snippet-worthy verdict. -->
          </p>
          <div class="app-card-grid">
            <div>
              <p class="app-card-pros-title">Pros</p>
              <ul class="app-card-pros">
                <li><!-- Pro 1 --></li>
                <li><!-- Pro 2 --></li>
                <li><!-- Pro 3 --></li>
              </ul>
            </div>
            <div>
              <p class="app-card-cons-title">Cons</p>
              <ul class="app-card-cons">
                <li><!-- Con 1 --></li>
                <li><!-- Con 2 --></li>
              </ul>
            </div>
          </div>
          <div class="app-card-verdict">
            <strong>Verdict:</strong> <!-- One sentence summary — AI will extract this -->
          </div>
        </div>
      </section>

      <!-- Comparison table -->
      <section>
        <h2>Head-to-Head Comparison</h2>
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>App</th>
                <th>Price</th>
                <th>Platforms</th>
                <th>Real-time Feedback</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <!-- EDIT: Add rows. Use class="highlight-row" for InnerFire -->
              <tr>
                <td><!-- App name --></td>
                <td><!-- Price --></td>
                <td><!-- iOS/Android --></td>
                <td><!-- Yes/No --></td>
                <td><!-- Best for --></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- FAQ section -->
      <section class="faq-section" id="faq">
        <h2>Frequently Asked Questions</h2>
        <!-- EDIT: Repeat this block for each FAQ -->
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <!-- Question text -->
          </button>
          <div class="faq-answer" role="region">
            <div class="faq-answer-inner">
              <p><!-- Answer text. Keep concise — 2-4 sentences. AI extracts these. --></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</article>
```

**Keep from existing template** (copy exactly):
- Site header (logo + nav)
- Ambient embers div
- Reading progress bar
- Article CTA section
- Author card section
- Back to blog nav
- Footer with social links
- Inline `<script>` for reading progress + share button

**Add FAQ toggle script** — append to the existing inline `<script>` block:

```js
// FAQ accordion toggle
document.querySelectorAll('.faq-question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item = this.parentElement;
    var isOpen = item.classList.contains('open');
    // Close all other items
    document.querySelectorAll('.faq-item.open').forEach(function(el) {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
});
```

### 3. Schema.org structured data (in template `<head>`)

Replace the existing single JSON-LD block with TWO blocks:

**Block 1 — Article + ItemList:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<!-- EDIT: title -->",
  "description": "<!-- EDIT: description -->",
  "datePublished": "<!-- EDIT -->",
  "dateModified": "<!-- EDIT -->",
  "author": {
    "@type": "Person",
    "name": "Marian Kushnir",
    "url": "https://www.linkedin.com/in/kushnir-maryan/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InnerFire"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://innerfire.app/blog/SLUG"
  },
  "about": {
    "@type": "ItemList",
    "name": "<!-- EDIT: e.g. Best Breathwork Apps -->",
    "numberOfItems": 0,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": "<!-- EDIT -->",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "<!-- EDIT: iOS, Android -->",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "<!-- EDIT -->",
            "bestRating": "5",
            "ratingCount": "<!-- EDIT -->"
          },
          "offers": {
            "@type": "Offer",
            "price": "<!-- EDIT: 0 for free -->",
            "priceCurrency": "USD"
          }
        }
      }
    ]
  }
}
</script>
```

**Block 2 — FAQPage:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "<!-- EDIT: question -->",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<!-- EDIT: answer -->"
      }
    }
  ]
}
</script>
```

## Do NOT touch
- `blog/_template.html` (existing narrative template — preserve as-is)
- `blog.html` (blog index page)
- `blog/posts.json`
- `script.js` (global scripts)
- `index.html`
- Existing CSS rules (only ADD new rules)

## Behavior changes: none
This task only adds new CSS classes and creates a new template file. No existing behavior is modified.

## Acceptance Criteria
- [ ] `blog/_listicle-template.html` exists and is valid HTML
- [ ] Template includes: ToC, Quick Picks table, App Card placeholder, Comparison Table, FAQ accordion
- [ ] FAQ accordion opens/closes on click with proper `aria-expanded`
- [ ] Template has TWO JSON-LD blocks (Article+ItemList, FAQPage)
- [ ] `styles.css` has all 6 new component blocks (toc, quick-picks, app-card, comparison-table, faq, highlight)
- [ ] App card renders with icon, name, rating, meta, pros/cons, verdict
- [ ] Comparison table scrolls horizontally on mobile
- [ ] Quick picks table hides 3rd column on mobile
- [ ] All new CSS follows existing conventions (same color variables, same border-radius, same spacing scale)
- [ ] No existing styles broken
- [ ] Template inherits site header, footer, ambient embers, reading progress from `_template.html`

## Verification
- Open `blog/_listicle-template.html` in browser — page renders without errors
- All components visible with placeholder content
- FAQ accordion: clicking opens/closes items
- Resize to 375px: app cards stack, table scrolls, no overflow
- Validate HTML at https://validator.w3.org/ (no errors)
- Check JSON-LD at https://search.google.com/structured-data/testing-tool (valid schemas)

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
