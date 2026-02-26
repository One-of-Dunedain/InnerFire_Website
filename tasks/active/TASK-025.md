# TASK-025: SEO deep improvements (2026 standards)

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-021

## Goal
Bring the website's SEO to modern 2026 standards. This task addresses gaps identified by the Orchestrator's analysis of the current implementation.

## Context
The site already has: canonical URLs, JSON-LD (WebSite + Article), robots.txt, sitemap.xml, OG/Twitter meta tags, semantic HTML. This task fills the remaining gaps.

## Orchestrator SEO analysis — current gaps

1. **No `<meta name="theme-color">`** — mobile browsers use this for toolbar tinting
2. **No `preconnect` hints** — Kit form and potential GA4/Clarity need DNS prefetch
3. **Blog description meta is generic** — "A breathing app..." doesn't describe the blog
4. **No `og:locale`** — missing locale for social sharing
5. **No `<meta name="author">`** — missing on all pages
6. **Missing `<meta name="robots">`** — explicitly allow indexing
7. **Heading hierarchy issues** — blog.html has `<p class="eyebrow">` before `<h1>`, which is fine, but the blog grid cards use `<h3>` without a preceding `<h2>` in the grid section
8. **Sitemap doesn't include blog article template path guidance** — comment should explain how to add posts
9. **Image alt text strategy** — placeholder images lack meaningful alt text
10. **Missing `lang` attribute on blog template** — verify it's present

## Requirements

### 1. Add `<meta name="theme-color">` to all pages

In `<head>` of `index.html`, `blog.html`, `blog/_template.html`, add after viewport meta:
```html
<meta name="theme-color" content="#0a0d12" />
```

### 2. Add `preconnect` hints to all pages

In `<head>`, add after theme-color:
```html
<link rel="preconnect" href="https://app.kit.com" crossorigin />
```

### 3. Fix blog.html meta description

**In `blog.html`**, change:
```html
<meta name="description" content="A breathing app where your breath drives fire visuals, sound, and haptics in real time." />
```
To:
```html
<meta name="description" content="Articles about breathing, stress relief, and the science behind InnerFire - a breath-driven multisensory app." />
```

Also update OG description to match:
```html
<meta property="og:description" content="Articles about breathing, stress relief, and the science behind InnerFire - a breath-driven multisensory app." />
```

### 4. Add `og:locale` to all pages

In `<head>` of all 3 pages, add after `og:type`:
```html
<meta property="og:locale" content="en_US" />
```

### 5. Add `<meta name="author">` to all pages

In `<head>` of all 3 pages:
```html
<meta name="author" content="Maryan Kushnir" />
```

### 6. Add heading to blog grid section

**In `blog.html`**, add a visually hidden `<h2>` before the blog grid for proper heading hierarchy:
```html
<section class="blog-grid-section">
  <div class="container blog-container">
    <h2 class="sr-only">Articles</h2>
    <div id="blog-grid" class="blog-grid">
```

**In `styles.css`**, add screen-reader-only utility:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 7. Update sitemap.xml with blog post guidance

**In `sitemap.xml`**, expand the comment:
```xml
  <!-- Blog posts: add a <url> block for each published article, e.g.:
  <url>
    <loc>https://innerfire.app/blog/my-article-slug.html</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  -->
```

### 8. Improve placeholder alt texts

**In `index.html`** about section, update the placeholder comment:
```html
<!-- Replace with real photo: <img src="./author.jpg" alt="Maryan Kushnir, creator of InnerFire, from Ukraine" /> -->
```

**In `blog/_template.html`** author card, update:
```html
<!-- Replace with real photo: <img src="../author.jpg" alt="Maryan Kushnir, creator of InnerFire" /> -->
```

## Do NOT touch
- `script.js`
- HTML content/text (except meta tags and alt attributes)
- Layout or visual design
- CSS except the `.sr-only` utility addition

## Acceptance Criteria
- [ ] `<meta name="theme-color" content="#0a0d12">` on all 3 pages
- [ ] `<link rel="preconnect" href="https://app.kit.com">` on all 3 pages
- [ ] Blog meta description is specific to blog content
- [ ] `og:locale` present on all 3 pages
- [ ] `<meta name="author">` on all 3 pages
- [ ] Blog grid has proper heading hierarchy (hidden `<h2>`)
- [ ] `.sr-only` class added to `styles.css`
- [ ] Sitemap has expanded blog post guidance comment
- [ ] Placeholder alt texts are descriptive
- [ ] No broken HTML or duplicate meta tags

## Verification
- View source of each page — verify all new meta tags are present
- Run Lighthouse SEO audit on index.html — score should be 90+
- Check heading hierarchy in DevTools (Accessibility tree) — no skipped levels
- Validate HTML with W3C validator — no new errors

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
