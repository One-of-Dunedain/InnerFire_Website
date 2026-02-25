## [TASK-013] Blog index page — manifest system + article grid
Status: TODO
Priority: High
Owner: Executor AI

### Goal
Transform `blog.html` from a "coming soon" shell into a dynamic blog index that reads posts from a JSON manifest and renders them as a responsive card grid. Create the manifest file and directory structure.

### Context
The site is pure static HTML/CSS/JS with no build step. The owner needs an easy way to manage blog content. The chosen approach: each blog post is a standalone HTML file inside `blog/`. A `blog/posts.json` manifest lists all published posts. `blog.html` fetches this manifest via `fetch()` and renders article cards dynamically. When no posts exist yet, a friendly empty state is shown.

Owner workflow to add a new post:
1. Copy `blog/_template.html` → `blog/my-article-slug.html`
2. Fill in content
3. Add entry to `blog/posts.json`
4. Commit & push

### Requirements

**Create directory `blog/` in project root.**

**Create `blog/posts.json`:**
```json
[]
```
(Empty array — no posts yet. Articles will be added later.)

**Manifest entry format (for reference — add as a comment in blog.html JS):**
```json
{
  "slug": "my-first-post",
  "title": "Article Title Here",
  "excerpt": "A short 1-2 sentence summary of the article.",
  "date": "2026-03-01",
  "readTime": "5 min",
  "category": "Breathing",
  "thumbnail": "./blog/images/my-first-post.jpg"
}
```

**Redesign `blog.html` — replace the `<section class="blog-empty">` block with a new blog grid section:**

Replace everything between `</section>` (after page-header) and `<footer>` with:
```html
<!-- BLOG GRID -->
<section class="blog-grid-section">
  <div class="container blog-container">
    <div id="blog-grid" class="blog-grid">
      <!-- JS renders article cards here -->
    </div>
    <div id="blog-empty" class="blog-empty" style="display:none;">
      <p>Articles are coming soon. Stay tuned.</p>
      <a href="./index.html" class="back-link">&larr; Back to home</a>
    </div>
  </div>
</section>
```

**Add JS before `</body>` in `blog.html` (inline `<script>`):**
```html
<script>
(async function loadBlogPosts() {
  var grid = document.getElementById('blog-grid');
  var empty = document.getElementById('blog-empty');
  try {
    var res = await fetch('./blog/posts.json');
    var posts = await res.json();
    if (!posts.length) { empty.style.display = ''; grid.style.display = 'none'; return; }
    posts.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    grid.innerHTML = posts.map(function(p) { return ''
      + '<a href="./blog/' + p.slug + '.html" class="blog-card">'
      +   '<div class="blog-card-thumb" style="background-image:url(\'' + (p.thumbnail || '') + '\')">'
      +     (!p.thumbnail ? '<div class="blog-card-thumb-placeholder"></div>' : '')
      +   '</div>'
      +   '<div class="blog-card-body">'
      +     '<span class="blog-card-category">' + (p.category || '') + '</span>'
      +     '<h3 class="blog-card-title">' + p.title + '</h3>'
      +     '<p class="blog-card-excerpt">' + p.excerpt + '</p>'
      +     '<div class="blog-card-meta">'
      +       '<time>' + new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '</time>'
      +       '<span>' + (p.readTime || '') + '</span>'
      +     '</div>'
      +   '</div>'
      + '</a>';
    }).join('');
  } catch (e) {
    empty.style.display = '';
    grid.style.display = 'none';
  }
})();
</script>
```

**Add CSS to `styles.css` — Blog grid styles (add after the existing `.back-link:hover` rule, before the `/* Reduce motion */` block):**
```css
/* ═══════════════════════════════════════════════════
   BLOG — Index Grid
   ═══════════════════════════════════════════════════ */
.blog-container {
  max-width: 760px;
}
.blog-grid-section {
  padding: 0 0 80px;
}
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.blog-card {
  display: block;
  text-decoration: none;
  color: var(--text);
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 0.2s, border-color 0.2s;
}
.blog-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}
.blog-card-thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  position: relative;
}
.blog-card-thumb-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,138,61,0.08), rgba(255,209,102,0.05));
}
.blog-card-body {
  padding: 20px;
}
.blog-card-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 8px;
}
.blog-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
}
.blog-card-excerpt {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted);
}
```

**Add to the tablet media query `@media (min-width: 481px) and (max-width: 768px)`:**
```css
.blog-grid { grid-template-columns: repeat(2, 1fr); }
```

**Add to the desktop media query `@media (min-width: 769px)`:**
```css
.blog-grid { grid-template-columns: repeat(2, 1fr); }
```

**Fix `.page-header` padding bug — remove the duplicate `padding-top: 60px` line that overrides the `120px` in the shorthand:**
Change:
```css
.page-header {
  padding: 120px 0 60px;
  padding-top: 60px;
  text-align: center;
}
```
To:
```css
.page-header {
  padding: 120px 0 60px;
  text-align: center;
}
```

### Do NOT touch
- `index.html`
- `script.js`
- Any CSS outside the new blog grid rules and the `.page-header` fix
- Footer HTML in `blog.html` (keep as-is)

### Acceptance Criteria
- [ ] `blog/` directory exists
- [ ] `blog/posts.json` exists and contains `[]`
- [ ] `blog.html` fetches `posts.json` and shows empty state when array is empty
- [ ] Empty state shows "Articles are coming soon" message and back link
- [ ] When a test entry is added to `posts.json`, the corresponding card renders in the grid
- [ ] Cards show thumbnail area, category tag, title, excerpt, date, and read time
- [ ] Grid is 1 column on mobile, 2 columns on tablet+
- [ ] Cards have hover effect (lift + accent border)
- [ ] `.page-header` has proper top padding (120px) so content is not hidden behind fixed header
- [ ] Blog page still has the same sticky header and footer

### Verification
- Open `blog.html` — shows empty state with "coming soon" message
- Add a test entry to `posts.json` (any slug, title, excerpt, date) — refresh — card appears
- Resize to 375px — single column, card fits
- Resize to 768px+ — two columns
- Verify header is not overlapping page content

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---
