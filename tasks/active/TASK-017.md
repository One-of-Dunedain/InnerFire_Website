## [TASK-017] Site-wide SEO enhancements
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-014

### Goal
Add structured data (JSON-LD), `sitemap.xml`, `robots.txt`, and canonical URLs to improve search engine optimization across the entire site.

### Context
The owner needs the site to be SEO-optimized for organic discovery. The site currently has basic OG/Twitter meta tags (from TASK-001) but lacks structured data, a sitemap, and robots.txt. The blog article template needs Article schema markup.

### Requirements

**Create `robots.txt` in project root:**
```
User-agent: *
Allow: /

Sitemap: https://innerfire.app/sitemap.xml
```

**Create `sitemap.xml` in project root:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://innerfire.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://innerfire.app/blog.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add new blog post URLs here as they are published -->
</urlset>
```

**In `index.html` — add canonical URL and JSON-LD in `<head>`, before `</head>`:**
```html
<link rel="canonical" href="https://innerfire.app/" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "InnerFire",
  "url": "https://innerfire.app",
  "description": "A breathing app where your breath drives fire visuals, sound, and haptics in real time.",
  "author": {
    "@type": "Person",
    "name": "Maryan Kushnir",
    "url": "https://www.linkedin.com/in/kushnir-maryan/"
  }
}
</script>
```

**In `blog.html` — add canonical URL in `<head>`, before `</head>`:**
```html
<link rel="canonical" href="https://innerfire.app/blog.html" />
```

**In `blog/_template.html` — add JSON-LD Article schema in `<head>`, before `</head>`:**
```html
<!-- EDIT: Update JSON-LD values for each article -->
<link rel="canonical" href="https://innerfire.app/blog/SLUG" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description here.",
  "datePublished": "2026-01-01",
  "author": {
    "@type": "Person",
    "name": "Maryan Kushnir",
    "url": "https://www.linkedin.com/in/kushnir-maryan/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InnerFire"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://innerfire.app/blog/SLUG"
  }
}
</script>
```

### Do NOT touch
- `styles.css`
- `script.js`
- Any existing HTML content/sections (only add to `<head>`)
- Footer HTML

### Acceptance Criteria
- [ ] `robots.txt` exists in project root and allows all crawlers
- [ ] `sitemap.xml` exists with entries for index and blog pages
- [ ] `index.html` has `<link rel="canonical">` and WebSite JSON-LD
- [ ] `blog.html` has `<link rel="canonical">`
- [ ] `blog/_template.html` has Article JSON-LD with editable placeholders
- [ ] JSON-LD is valid (no syntax errors)
- [ ] Canonical URLs use `https://innerfire.app` base

### Verification
- Open `robots.txt` in browser — shows allow rules and sitemap link
- Open `sitemap.xml` in browser — valid XML with 2 URL entries
- Open `index.html` — view source, verify JSON-LD in head
- Open `blog/_template.html` — view source, verify Article JSON-LD in head

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---
