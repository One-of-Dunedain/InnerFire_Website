# TASK-037: Mobile UX polish for long listicle article (16+ apps)

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-035 (article rewrite — must complete first so we work on final content)

## Goal
The article is growing from 10 to 16+ apps. On mobile, scrolling through 16 app cards is overwhelming. Add smart navigation and progressive disclosure so readers can find what they need fast — without scrolling through 20 screens of content.

TASK-033 already added: sticky ToC (desktop), back-to-top button, comparison table scroll hint, section separators. This task adds mobile-specific enhancements.

## Requirements

### 1. Collapsible app cards on mobile

On mobile (<768px), app cards should be collapsed by default — show only the header (icon + name + rating + badge). User taps to expand the full card.

HTML changes — add a toggle button to each `.app-card`:
```html
<div class="app-card" data-expanded="false">
  <div class="app-card-header">
    <!-- existing header content -->
    <button class="app-card-toggle" aria-label="Expand details" type="button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
  </div>
  <div class="app-card-body">
    <!-- everything after the header: description, pricing, pros/cons, UGC, verdict -->
  </div>
</div>
```

CSS:
```css
@media (max-width: 768px) {
  .app-card[data-expanded="false"] .app-card-body {
    display: none;
  }
  .app-card-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    color: var(--text);
    cursor: pointer;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: auto;
  }
  .app-card[data-expanded="true"] .app-card-toggle {
    transform: rotate(180deg);
  }
}

/* Desktop: always expanded, hide toggle */
@media (min-width: 769px) {
  .app-card-toggle { display: none; }
  .app-card-body { display: block !important; }
}
```

JS (inline script):
```js
function initCardCollapse() {
  if (window.innerWidth > 768) return;

  document.querySelectorAll('.app-card').forEach(function(card) {
    card.setAttribute('data-expanded', 'false');

    var toggle = card.querySelector('.app-card-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = card.getAttribute('data-expanded') === 'true';
      card.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
      toggle.setAttribute('aria-label', isExpanded ? 'Expand details' : 'Collapse details');
    });
  });

  // If user arrived via anchor link (#app-calm), auto-expand that card
  var hash = window.location.hash;
  if (hash) {
    var target = document.querySelector(hash);
    if (target) {
      var card = target.querySelector('.app-card') || target.closest('.app-card');
      if (card) card.setAttribute('data-expanded', 'true');
    }
  }
}
```

### 2. Quick filter chips (mobile)

Add horizontal scrollable filter chips at the top of the article (below ToC) so mobile users can jump to categories without scrolling through the full ToC.

HTML (add after `.article-toc`):
```html
<div class="filter-chips" aria-label="Quick filters">
  <a href="#anxiety-apps" class="filter-chip">Anxiety</a>
  <a href="#sleep-apps" class="filter-chip">Sleep</a>
  <a href="#free-apps" class="filter-chip">Free</a>
  <a href="#interactive-apps" class="filter-chip">Interactive</a>
  <a href="#timer-alternatives" class="filter-chip">Timers</a>
  <a href="#calm-headspace-alternatives" class="filter-chip">Alternatives</a>
  <a href="#comparison-table" class="filter-chip">Compare all</a>
</div>
```

CSS:
```css
.filter-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 12px 0;
  margin: 0 0 24px 0;
}
.filter-chips::-webkit-scrollbar { display: none; }

.filter-chip {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.2s, background 0.2s;
}
.filter-chip:hover,
.filter-chip:active {
  border-color: rgba(255, 138, 61, 0.3);
  background: rgba(255, 138, 61, 0.06);
}

/* Hide on desktop where sticky ToC serves the same purpose */
@media (min-width: 1100px) {
  .filter-chips { display: none; }
}
```

### 3. "Next app" mini-navigator (mobile)

When a card is expanded on mobile, show a small "Next: [App Name] →" link at the bottom of the card to help sequential reading.

CSS:
```css
@media (max-width: 768px) {
  .app-card-next {
    display: block;
    margin-top: 12px;
    padding: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    font-size: 0.82rem;
    color: var(--muted);
    text-decoration: none;
  }
  .app-card-next:hover {
    color: var(--accent);
  }
}
@media (min-width: 769px) {
  .app-card-next { display: none; }
}
```

JS — auto-generate "Next" links:
```js
function initNextAppLinks() {
  if (window.innerWidth > 768) return;

  var cards = document.querySelectorAll('.app-card');
  cards.forEach(function(card, i) {
    if (i >= cards.length - 1) return;

    var nextCard = cards[i + 1];
    var nextName = nextCard.querySelector('.app-card-name');
    if (!nextName) return;

    var nextSection = nextCard.closest('section[id]');
    if (!nextSection) return;

    var link = document.createElement('a');
    link.className = 'app-card-next';
    link.href = '#' + nextSection.id;
    link.textContent = 'Next: ' + nextName.textContent + ' →';

    var body = card.querySelector('.app-card-body');
    if (body) body.appendChild(link);
  });
}
```

### 4. Smooth anchor scroll with card auto-expand

When user clicks any link (ToC, filter chip, Quick Picks, comparison table) that targets an app card, auto-expand that card on mobile and scroll smoothly.

JS:
```js
function initSmoothAnchorExpand() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var targetId = link.getAttribute('href').substring(1);
    var target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    // Auto-expand card on mobile
    if (window.innerWidth <= 768) {
      var card = target.querySelector('.app-card') || target.closest('.app-card');
      if (card) card.setAttribute('data-expanded', 'true');
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
```

### 5. App count badge in article header

Show total app count prominently so readers know the scope immediately.

Add to article header area:
```html
<span class="app-count-badge">16 apps compared</span>
```

CSS:
```css
.app-count-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  background: rgba(255, 138, 61, 0.08);
  border: 1px solid rgba(255, 138, 61, 0.15);
  margin-top: 8px;
}
```

## Files to modify

| File | Changes |
|------|---------|
| `blog/best-breathwork-apps.html` | Add toggle buttons to app cards, wrap card body content in `.app-card-body` divs, add filter chips HTML, add app-count badge, add JS for collapse/expand/filters/next-app |
| `styles.css` | Add collapsible card styles, filter chips, next-app links, app-count badge |

## Do NOT
- Change app card content (text, pricing, UGC — that's TASK-035's job)
- Modify desktop layout (keep it working as-is)
- Remove or break existing TASK-033 features (sticky ToC, back-to-top, scroll hint)
- Add npm dependencies or build steps
- Modify `script.js` (global) — all JS goes in article's inline `<script>` block

## Acceptance Criteria
- [ ] Mobile (<768px): App cards collapsed by default, showing only header
- [ ] Tap on card header or toggle button expands the full card
- [ ] Desktop (>768px): All cards fully expanded, toggle buttons hidden
- [ ] Filter chips visible on mobile/tablet, scrollable horizontally
- [ ] Filter chips hidden on desktop (>1100px) where sticky ToC exists
- [ ] Clicking filter chip smooth-scrolls to section and auto-expands card
- [ ] "Next: [App Name]" link at bottom of each expanded card (mobile)
- [ ] Anchor links from ToC/Quick Picks auto-expand target card on mobile
- [ ] App count badge visible in article header
- [ ] No layout shifts or broken styles on desktop
- [ ] Back-to-top button still works correctly
- [ ] Sticky ToC still works on desktop
- [ ] Hash in URL (#app-calm) auto-expands correct card on page load

## Verification
1. Open on desktop (1920px) — all cards expanded, no filter chips, sticky ToC works
2. Open on mobile (375px) — cards collapsed, filter chips visible, toggle works
3. Tap "Anxiety" filter chip — smooth scroll to section, first card auto-expands
4. Tap card header — card expands/collapses
5. Scroll to bottom of expanded card — "Next: [App Name]" link visible
6. Click "Next" link — scrolls to next app, auto-expands
7. Click Quick Picks link — scrolls to target app, auto-expands
8. Open URL with #app-calm — that card auto-expanded on load
9. Back-to-top button still appears and works
10. No console errors

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
