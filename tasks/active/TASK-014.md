## [TASK-014] Blog article template with rich media support
Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-013

### Goal
Create a complete, reusable blog article HTML template (`blog/_template.html`) with support for optional vertical/horizontal videos, images, and audio players. Add all necessary article typography and media styles to `styles.css`.

### Context
The owner will copy this template for each new blog post. The template must be self-contained (all CSS is in the shared `styles.css`), use semantic HTML, and include clearly marked placeholder blocks that the owner can fill in or delete. Media blocks are OPTIONAL — the owner includes only what's needed per article.

### Requirements

**Create `blog/_template.html`:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- EDIT: Replace with your article title -->
    <title>Article Title — InnerFire Blog</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
    <!-- EDIT: Replace with your article description -->
    <meta name="description" content="Article description here." />
    <meta property="og:title" content="Article Title — InnerFire Blog" />
    <meta property="og:description" content="Article description here." />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="../og-image.png" />
    <meta property="og:url" content="https://innerfire.app/blog/SLUG" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Article Title — InnerFire Blog" />
    <meta name="twitter:description" content="Article description here." />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <a href="../index.html" class="header-logo">InnerFire</a>
        <nav class="header-nav">
          <a href="../blog.html">Blog</a>
          <a href="../index.html#signup" class="btn-header">Get Early Access</a>
        </nav>
      </div>
    </header>

    <!-- Reading progress bar -->
    <div class="reading-progress" id="reading-progress"></div>

    <article class="article">
      <div class="container article-container">

        <!-- Article header -->
        <header class="article-header">
          <span class="article-category"><!-- EDIT: e.g. Breathing --></span>
          <h1><!-- EDIT: Article Title --></h1>
          <div class="article-meta">
            <time datetime="2026-01-01"><!-- EDIT: Jan 1, 2026 --></time>
            <span class="article-read-time"><!-- EDIT: 5 min read --></span>
          </div>
        </header>

        <!-- Article body -->
        <div class="article-body">

          <p><!-- EDIT: Your article text here. Use standard HTML: p, h2, h3, strong, em, a, blockquote, ul, ol --></p>

          <!-- ═══ OPTIONAL MEDIA BLOCKS — delete what you don't need ═══ -->

          <!-- Horizontal video (16:9) -->
          <figure class="media-block media-video-h">
            <video controls preload="metadata" poster="">
              <source src="" type="video/mp4" />
            </video>
            <figcaption><!-- EDIT: Video caption --></figcaption>
          </figure>

          <!-- Vertical video (9:16) -->
          <figure class="media-block media-video-v">
            <video controls preload="metadata" poster="">
              <source src="" type="video/mp4" />
            </video>
            <figcaption><!-- EDIT: Video caption --></figcaption>
          </figure>

          <!-- Image -->
          <figure class="media-block media-image">
            <img src="" alt="" loading="lazy" />
            <figcaption><!-- EDIT: Image caption --></figcaption>
          </figure>

          <!-- Audio -->
          <figure class="media-block media-audio">
            <div class="audio-wrapper">
              <p class="audio-title"><!-- EDIT: Audio title --></p>
              <audio controls preload="metadata">
                <source src="" type="audio/mpeg" />
              </audio>
            </div>
            <figcaption><!-- EDIT: Audio caption --></figcaption>
          </figure>

          <!-- ═══ END OPTIONAL MEDIA BLOCKS ═══ -->

          <p><!-- EDIT: Continue article text --></p>

        </div>
      </div>
    </article>

    <!-- Author card -->
    <section class="article-author">
      <div class="container article-container">
        <div class="author-card">
          <div class="photo-placeholder author-card-photo"></div>
          <div class="author-card-text">
            <p class="author-card-name">Maryan Kushnir</p>
            <p class="author-card-bio">Creator of InnerFire. Building tools that help you feel your breath working.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Back to blog -->
    <nav class="article-nav">
      <div class="container article-container">
        <a href="../blog.html" class="back-link">&larr; All articles</a>
      </div>
    </nav>

    <footer>
      <div class="container">
        <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
      </div>
    </footer>

    <script>
    // Reading progress bar
    window.addEventListener('scroll', function() {
      var bar = document.getElementById('reading-progress');
      var article = document.querySelector('.article');
      if (!bar || !article) return;
      var rect = article.getBoundingClientRect();
      var total = article.scrollHeight - window.innerHeight;
      var scrolled = -rect.top;
      var pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      bar.style.width = pct + '%';
    });
    </script>
  </body>
</html>
```

**Add CSS to `styles.css` — Article styles. Add after the new Blog Index Grid block (from TASK-013), before the responsive media queries:**
```css
/* ═══════════════════════════════════════════════════
   BLOG — Article Page
   ═══════════════════════════════════════════════════ */
.article-container {
  max-width: 680px;
}

/* Reading progress bar */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  z-index: 101;
  transition: width 0.1s linear;
}

/* Article header */
.article-header {
  padding: 120px 0 40px;
  text-align: center;
}
.article-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 16px;
}
.article-header h1 {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 20px;
}
.article-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--muted);
}

/* Article body typography */
.article-body {
  padding-bottom: 60px;
}
.article-body p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 24px;
}
.article-body h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 48px 0 16px;
}
.article-body h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 32px 0 12px;
}
.article-body a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.article-body a:hover { color: var(--accent2); }
.article-body blockquote {
  border-left: 3px solid var(--accent);
  padding: 16px 20px;
  margin: 24px 0;
  background: var(--surface);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--muted);
  font-style: italic;
}
.article-body ul, .article-body ol {
  margin: 16px 0 24px 20px;
  color: var(--text);
}
.article-body li {
  margin-bottom: 8px;
  line-height: 1.7;
}
.article-body strong { color: var(--text); }

/* Media blocks */
.media-block {
  margin: 32px 0;
}
.media-block figcaption {
  font-size: 0.8rem;
  color: var(--muted);
  text-align: center;
  margin-top: 10px;
}

/* Horizontal video (16:9) */
.media-video-h video {
  width: 100%;
  border-radius: var(--radius);
  background: var(--surface);
}

/* Vertical video (9:16) — centered, capped width */
.media-video-v {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.media-video-v video {
  width: 100%;
  max-width: 320px;
  border-radius: var(--radius);
  background: var(--surface);
}

/* Image */
.media-image img {
  width: 100%;
  border-radius: var(--radius);
  display: block;
}

/* Audio */
.audio-wrapper {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.06);
}
.audio-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
}
.audio-wrapper audio {
  width: 100%;
}

/* Author card (bottom of article) */
.article-author {
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.author-card {
  display: flex;
  gap: 20px;
  align-items: center;
}
.author-card-photo {
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
}
.author-card-name {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 4px;
}
.author-card-bio {
  font-size: 0.85rem;
  color: var(--muted);
}

/* Article nav */
.article-nav {
  padding: 0 0 60px;
}
```

**Add to the mobile `@media (max-width: 480px)` block:**
```css
.article-header { padding: 100px 0 30px; }
.media-video-v video { max-width: 100%; }
```

### Do NOT touch
- `index.html`
- `script.js`
- `blog.html` (TASK-013 handles it)
- Any existing CSS rules (only ADD new rules)

### Acceptance Criteria
- [ ] `blog/_template.html` exists with all required sections
- [ ] Template has clearly marked `<!-- EDIT: -->` placeholders for the owner
- [ ] All optional media blocks (horizontal video, vertical video, image, audio) are present and clearly marked as deletable
- [ ] Template uses relative paths (`../styles.css`, `../index.html`) correctly
- [ ] Template has per-article OG meta tag placeholders
- [ ] Reading progress bar shows at the top and tracks scroll position
- [ ] Article body typography supports p, h2, h3, a, blockquote, ul, ol, strong, em
- [ ] Vertical video is centered and max 320px wide on desktop, full width on mobile
- [ ] Horizontal video is full content width
- [ ] Audio player has a styled wrapper
- [ ] Author card shows at the bottom with photo placeholder, name, and bio
- [ ] "All articles" back link navigates to `../blog.html`
- [ ] Sticky header works correctly with `../` relative paths

### Verification
- Open `blog/_template.html` directly in browser — all sections render
- Scroll — reading progress bar fills
- Check all media blocks are visible (empty state is fine)
- Resize to 375px — article is readable, vertical video goes full width
- Click "Blog" in header — navigates to blog index

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---
