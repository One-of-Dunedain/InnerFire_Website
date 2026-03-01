# TASK-033: Article UX/UI improvements for long-form navigation

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-030

## Goal
Improve reading experience for the breathwork apps article (and future listicle articles). The article is already long (10 apps) and will grow to 20+. Readers need better navigation tools to find what they want quickly and not feel overwhelmed.

## Context
Problems with current UX:
1. ToC is static at top — once you scroll past it, you lose navigation
2. No "Back to top" button — reader is trapped at bottom
3. 10 app cards in sequence = wall of text, no visual breathing room
4. Comparison table has no scroll hint on mobile (users don't know it's scrollable)
5. No way to jump between apps quickly mid-article
6. Reading progress bar exists but doesn't interact with ToC

## Requirements

### 1. Sticky Table of Contents sidebar (desktop) / collapsible (mobile)

**Desktop (>768px):**

Add a floating ToC that stays visible as the reader scrolls. Position it on the left side, outside the main article container.

CSS approach:
```css
@media (min-width: 1100px) {
  .article-container {
    position: relative;
  }
  .article-toc {
    position: sticky;
    top: 80px; /* below header */
    float: left;
    width: 200px;
    margin-left: -240px; /* push outside the article container */
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    font-size: 0.85rem;
  }
  .article-toc a {
    font-size: 0.82rem;
  }
}
```

The ToC should highlight the currently visible section as the user scrolls (active state). Add JS IntersectionObserver:
```js
// Highlight active ToC link based on scroll position
function initTocHighlight() {
  var tocLinks = document.querySelectorAll('.article-toc a');
  var sections = [];

  tocLinks.forEach(function(link) {
    var id = link.getAttribute('href').substring(1);
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section, link: link });
  });

  if (!sections.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        tocLinks.forEach(function(l) { l.classList.remove('toc-active'); });
        var match = sections.find(function(s) { return s.id === entry.target.id; });
        if (match) match.link.classList.add('toc-active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(function(s) { observer.observe(s.el); });
}
```

CSS for active state:
```css
.article-toc a.toc-active {
  color: var(--accent);
  font-weight: 600;
}
```

**Mobile (<1100px):**

ToC stays in its current inline position (top of article). No floating behavior on small screens — it would take too much space.

### 2. "Back to top" floating button

Add a floating button that appears after scrolling past the first screen:

HTML (add before `</body>`):
```html
<button class="back-to-top" id="back-to-top" aria-label="Back to top" type="button">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>
```

CSS:
```css
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  backdrop-filter: brightness(1.4);
  -webkit-backdrop-filter: brightness(1.4);
  border: 1px solid rgba(255, 138, 61, 0.3);
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s, border-color 0.25s, box-shadow 0.25s;
  z-index: 100;
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
.back-to-top:hover {
  border-color: rgba(255, 138, 61, 0.55);
  box-shadow: 0 0 16px rgba(255, 138, 61, 0.12);
}
```

JS:
```js
// Back to top button
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
```

### 3. Comparison table scroll hint (mobile)

On mobile, the comparison table is horizontally scrollable but there's no visual indicator. Add a subtle hint:

CSS:
```css
@media (max-width: 768px) {
  .comparison-table-wrapper {
    position: relative;
  }
  .comparison-table-wrapper::after {
    content: "Scroll \2192";
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.72rem;
    color: var(--muted);
    opacity: 0.6;
    pointer-events: none;
  }
  /* Hide hint once user has scrolled */
  .comparison-table-wrapper.scrolled::after {
    display: none;
  }
}
```

JS (detect first scroll):
```js
document.querySelectorAll('.comparison-table-wrapper').forEach(function(wrapper) {
  wrapper.addEventListener('scroll', function() {
    this.classList.add('scrolled');
  }, { once: true, passive: true });
});
```

### 4. App card visual separators

Add subtle visual breathing room between app card sections. Add a small category label above groups of cards.

CSS:
```css
/* Section intro before card groups — add top border for visual separation */
#anxiety-apps, #sleep-apps, #free-apps, #interactive-apps,
#timer-alternatives, #calm-headspace-alternatives, #comparison-table, #faq {
  padding-top: 48px;
  margin-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
```

## Files to modify

| File | Changes |
|------|---------|
| `styles.css` | Add sticky ToC, back-to-top, scroll hint, section separator styles |
| `blog/best-breathwork-apps.html` | Add back-to-top HTML + JS for ToC highlight, back-to-top, scroll hint |

## Do NOT touch
- App card content (text, ratings, pros/cons)
- FAQ content
- Schema.org JSON-LD
- Blog index (`blog.html`)
- Main landing page (`index.html`)
- `script.js` (global scripts) — JS changes go in the article's inline `<script>` block

## Behavior changes
- ToC becomes sticky on desktop (>1100px) with active section highlighting
- New "Back to top" button appears after scrolling past first viewport
- Comparison table shows "Scroll →" hint on mobile (disappears after first scroll)
- Sections have subtle top borders for visual rhythm

## Acceptance Criteria
- [ ] Desktop: ToC stays visible while scrolling through the article
- [ ] Desktop: Active section highlighted in ToC as user scrolls
- [ ] Mobile: ToC stays inline (no floating)
- [ ] "Back to top" button appears after scrolling past 1 viewport height
- [ ] "Back to top" smoothly scrolls to top on click
- [ ] "Back to top" button uses transparent lens style (consistent with TASK-027 button system)
- [ ] Mobile: Comparison table shows "Scroll →" hint
- [ ] Scroll hint disappears after user scrolls the table
- [ ] Sections have subtle visual separators
- [ ] No layout shifts or content jumps
- [ ] All JS additions are in the article's inline `<script>` block, not global `script.js`

## Verification
1. Open article at 1920px width — ToC should float on left side, stay fixed while scrolling
2. Scroll through sections — ToC links should highlight the current section
3. Scroll to bottom — "Back to top" button visible in bottom-right
4. Click it — smooth scroll to top
5. Resize to 375px — ToC is inline, no floating
6. On mobile: comparison table shows "Scroll →" hint
7. Scroll the table — hint disappears
8. Check that section borders add visual rhythm without being distracting

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
