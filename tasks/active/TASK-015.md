## [TASK-015] Blog sharing buttons + social meta
Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-013, TASK-014

### Goal
Add share buttons to blog article pages and blog index cards so any article can be easily shared to all modern social platforms.

### Context
The carousel already uses `navigator.share` + clipboard fallback (see `script.js`). The blog sharing should follow the same pattern. On mobile, the native share sheet covers all platforms (TikTok, WhatsApp, Telegram, X, etc.). On desktop, the clipboard fallback copies the article URL + title. Blog index cards should also have a small share button.

### Requirements

**In `blog/_template.html` — add a share bar after `.article-meta` inside `.article-header`:**
```html
<div class="article-share">
  <button class="share-btn" id="article-share-btn" type="button" aria-label="Share this article">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
    <span>Share</span>
  </button>
</div>
```

**In the `<script>` at bottom of `blog/_template.html`, add after the reading progress code:**
```js
// Share button
document.getElementById('article-share-btn').addEventListener('click', async function() {
  var title = document.querySelector('.article-header h1').textContent;
  var url = window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: title, url: url }); } catch(e) {}
    return;
  }
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      var t = document.createElement('textarea');
      t.value = url;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    this.style.background = 'rgba(68,170,85,0.4)';
    var btn = this;
    setTimeout(function() { btn.style.background = ''; }, 1500);
  } catch(e) {}
});
```

**In `blog.html` — update the card HTML template in the JS to include a share button inside `.blog-card-thumb`:**
Add to each rendered card, inside the `.blog-card-thumb` div:
```html
<button class="blog-card-share" type="button" aria-label="Share" data-title="TITLE" data-url="./blog/SLUG.html" onclick="event.preventDefault();event.stopPropagation();shareArticle(this)">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
</button>
```

**Add `shareArticle` function in the `<script>` block in `blog.html`:**
```js
async function shareArticle(btn) {
  var title = btn.dataset.title;
  var url = new URL(btn.dataset.url, window.location.href).href;
  if (navigator.share) {
    try { await navigator.share({ title: title, url: url }); } catch(e) {}
    return;
  }
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      var t = document.createElement('textarea');
      t.value = url;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    btn.style.background = 'rgba(68,170,85,0.4)';
    setTimeout(function() { btn.style.background = ''; }, 1500);
  } catch(e) {}
}
```

**Add CSS to `styles.css`:**
```css
/* Article share button */
.article-share {
  margin-top: 20px;
}
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.share-btn:hover {
  background: rgba(255,138,61,0.15);
  color: var(--accent);
}

/* Blog card share button */
.blog-card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--text);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, opacity 0.2s;
  opacity: 0;
  z-index: 2;
}
.blog-card:hover .blog-card-share { opacity: 1; }
.blog-card-share:hover { background: rgba(255,138,61,0.3); transform: scale(1.1); }
```

### Do NOT touch
- `index.html`
- `script.js`
- Any existing carousel share logic
- Footer HTML

### Acceptance Criteria
- [ ] Article page has a "Share" button below the title/meta area
- [ ] On mobile: share button opens native share sheet
- [ ] On desktop: share button copies article URL to clipboard with green feedback
- [ ] Blog index cards show a share icon on hover (top-right of thumbnail)
- [ ] Card share button does not navigate to the article (prevents default)
- [ ] Share uses the same clipboard fallback pattern as the carousel (supports older browsers)

### Verification
- Open `blog/_template.html` — share button is visible below title
- Click share on desktop — check clipboard contains the URL
- Open `blog.html` with a test post — hover over card, share icon appears
- Click card share — does not navigate, copies link

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---
