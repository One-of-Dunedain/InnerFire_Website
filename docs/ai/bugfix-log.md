# Bugfix Log

## 2026-03-05
- Removed inline `onclick` handler from dynamic blog share button rendering in `blog.html`; replaced with delegated click listener in script block.
- Added `rel="noopener noreferrer"` to external links that used `target="_blank"` with only `noreferrer` in:
  - `privacy.html`
  - `blog/vagus-nerve-breathing.html`
  - `blog/build-breathing-habit.html`
- Aligned article canonical URL in `blog/best-breathwork-apps.html` to `.html` path for consistency.
- Added all published blog article URLs to `sitemap.xml` with `lastmod`.
