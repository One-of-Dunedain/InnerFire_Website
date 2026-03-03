# TASK-038: Mobile app card layout overhaul

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: TASK-035 (DONE), TASK-037 (DONE)

## Problem
The current mobile app card header layout is broken on 375px screens. The flex layout puts icon, name, rating, platforms, "Freemium", App Store/Google Play links, badge, and toggle ALL into one flex row that wraps chaotically. Result: fragmented layout, no visual hierarchy, wasted space.

See screenshot reference: cards look like a jumbled vertical list of disconnected elements — not a clean, scannable card.

## Goal
Redesign the mobile (<768px) app card to feel like a clean, modern, scannable list. Collapsed cards show ONLY what the user needs to decide "should I read more?": icon, name, rating, price hint, badge. Everything else goes in the expanded body.

## Design spec

### Collapsed card (mobile):
```
┌─────────────────────────────────────────┐
│                                         │
│  [icon 44px]  Breathwrk          [▼]   │
│               ★ 4.76 · ~$9/mo          │
│               ┌─────────────────────┐   │
│               │ Best anxiety proto. │   │
│               └─────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

- 3 rows total: name+toggle, rating+price, badge
- Clean, compact, scannable
- NO platforms, NO store links, NO "Freemium" text in collapsed state
- Whole header area is tappable to expand

### Expanded card (mobile):
```
┌─────────────────────────────────────────┐
│                                         │
│  [icon 44px]  Breathwrk          [▲]   │
│               ★ 4.76 · ~$9/mo          │
│               ┌─────────────────────┐   │
│               │ Best anxiety proto. │   │
│               └─────────────────────┘   │
│                                         │
│  iOS / Android · App Store · Google Play│
│                                         │
│  [description paragraph]                │
│                                         │
│  What you actually pay                  │
│  · Monthly: $9/mo                       │
│  · Yearly: ...                          │
│  · Free tier: ...                       │
│  · Trial: ...                           │
│                                         │
│  PROS              CONS                 │
│  + ...             - ...                │
│                                         │
│  "Positive UGC quote..." — source       │
│  "Negative UGC quote..." — source       │
│                                         │
│  Verdict: ...                           │
│                                         │
│  Next: Headspace →                      │
└─────────────────────────────────────────┘
```

### Desktop (>768px): NO changes — keep current layout exactly as-is.

## CSS changes to `styles.css`

### 1. Mobile card container — reduce padding
```css
@media (max-width: 768px) {
  .app-card {
    padding: 16px;
    margin-bottom: 16px;
  }
}
```

### 2. Mobile header — grid layout for clean rows
Replace current `@media (max-width: 768px) .app-card-header` block:

```css
@media (max-width: 768px) {
  .app-card-header {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    grid-template-rows: auto auto auto;
    gap: 0 12px;
    align-items: center;
    margin-bottom: 0;  /* body has own spacing when expanded */
  }

  /* Icon: row 1, col 1, spans all rows */
  .app-card-header .app-card-link,
  .app-card-header .app-card-icon {
    grid-row: 1 / 3;
    grid-column: 1;
  }
  .app-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
  .app-card-link {
    border-radius: 10px;
    width: 44px;
    height: 44px;
  }

  /* Info: row 1-2, col 2 */
  .app-card-info {
    grid-column: 2;
    grid-row: 1 / 3;
    min-width: 0; /* prevent overflow */
  }

  /* App name — smaller on mobile */
  .app-card-name {
    font-size: 1.05rem;
    line-height: 1.3;
    margin-bottom: 2px;
  }

  /* Meta — single line, compact */
  .app-card-meta {
    gap: 6px;
    font-size: 0.8rem;
    flex-wrap: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* HIDE platforms, pricing model text, store links in header on mobile */
  .app-card-meta > span:not(.app-card-rating):not(.billing-badge) {
    display: none;
  }
  .app-card-meta .app-store-links {
    display: none;
  }

  /* Show rating + billing badge only */
  .app-card-meta .app-card-rating {
    display: inline;
  }
  .app-card-meta .billing-badge {
    display: inline-block;
  }

  /* Toggle: row 1, col 3 */
  .app-card-toggle {
    grid-column: 3;
    grid-row: 1;
    align-self: center;
  }

  /* Badge: row 3, col 2-3, below info */
  .app-card-badge {
    grid-column: 2 / 4;
    grid-row: 3;
    justify-self: start;
    margin: 4px 0 0 0;
    font-size: 0.7rem;
    padding: 1px 8px;
  }
}
```

### 3. Add a "platforms row" inside `.app-card-body` on mobile
Currently, platforms and store links are hidden from the header on mobile. They need to appear at the top of the expanded body.

**HTML change required:** Move platforms + store links into a repeating element OR use CSS to show them only in body context.

**Simplest approach:** Add a `<div class="app-card-platforms-mobile">` inside each `.app-card-body` that duplicates the platform + store link info. Show only on mobile.

```html
<!-- Add as first child of .app-card-body -->
<div class="app-card-platforms-mobile">
  <span>iOS / Android</span>
  <span class="app-store-links">
    <a href="..." target="_blank" rel="noopener">App Store</a>
    <a href="..." target="_blank" rel="noopener">Google Play</a>
  </span>
</div>
```

CSS:
```css
.app-card-platforms-mobile {
  display: none;
}
@media (max-width: 768px) {
  .app-card-platforms-mobile {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    font-size: 0.82rem;
    color: var(--muted);
    padding: 12px 0 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    margin-bottom: 12px;
  }
  .app-card-platforms-mobile .app-store-links {
    display: inline-flex;
    gap: 8px;
  }
  .app-card-platforms-mobile .app-store-links a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem;
  }
}
```

### 4. Body spacing on mobile
```css
@media (max-width: 768px) {
  .app-card-body {
    padding-top: 4px;
  }
  /* Pricing block — tighter on mobile */
  .app-card-pricing {
    padding: 12px;
    margin: 12px 0;
  }
  .app-card-pricing ul {
    font-size: 0.85rem;
  }
  /* UGC quotes — tighter */
  .ugc-quote {
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  /* Verdict — smaller */
  .app-card-verdict {
    font-size: 0.88rem;
    padding-top: 12px;
  }
  /* Pros/cons grid stays 1fr on mobile (already set) */
}
```

### 5. Price hint in collapsed header
To show a short price hint next to the rating (like "★ 4.76 · ~$9/mo"), add a `data-price-hint` attribute to each `.app-card` that the JS reads and injects as a span into `.app-card-meta` on mobile.

JS (in inline script):
```js
function initMobilePriceHints() {
  if (window.innerWidth > 768) return;

  document.querySelectorAll('.app-card').forEach(function(card) {
    var priceHint = card.getAttribute('data-price-hint');
    if (!priceHint) return;

    var meta = card.querySelector('.app-card-meta');
    if (!meta) return;

    // Check if already injected
    if (meta.querySelector('.price-hint')) return;

    var span = document.createElement('span');
    span.className = 'price-hint';
    span.textContent = '· ' + priceHint;
    meta.appendChild(span);
  });
}
```

CSS:
```css
.price-hint {
  color: var(--muted);
  font-size: 0.8rem;
}
@media (min-width: 769px) {
  .price-hint { display: none; }
}
```

**Add `data-price-hint` to each `.app-card` div:**
```html
<div class="app-card" data-price-hint="~$9/mo">
```

Use the shortest meaningful price hint from the pricing data:
- Subscription: "~$X/mo" (use monthly price)
- One-time: "$X once"
- Free: "Free"
- Freemium: "Free / $X/mo" (only if it fits ~12 chars)

## HTML changes to `blog/best-breathwork-apps.html`

For EACH of the 16 app cards:

1. Add `data-price-hint="..."` attribute to `.app-card` div
2. Add `<div class="app-card-platforms-mobile">` as first child of `.app-card-body` with:
   - Platforms span (copy from `.app-card-meta`)
   - Store links (copy from `.app-card-meta`)

**Price hints for all apps** (from pricing research):

| App | data-price-hint |
|-----|----------------|
| Breathwrk | ~$9/mo |
| Headspace | ~$13/mo |
| Wim Hof | ~$6/mo |
| Calm | ~$15/mo |
| Insight Timer | ~$10/mo |
| iBreathe | $3.99 once |
| Oak | Free |
| Prana Breath | ~$15/yr |
| Box Breathe | $1.99 once |
| Othership | ~$18/mo |
| InnerFire | Free beta |
| Breathly | Free |
| Stoa | Free / $70/yr |
| Breathe+ | ~$10/mo |
| Open | ~$15/mo |
| Breathing Zone | Free? |
| Breath Ball | Unverified |

## Files to modify

| File | Changes |
|------|---------|
| `styles.css` | Replace mobile app-card-header styles with grid layout, add platforms-mobile, price-hint, mobile body spacing |
| `blog/best-breathwork-apps.html` | Add data-price-hint to all 16 cards, add .app-card-platforms-mobile divs, add initMobilePriceHints() call |

## Do NOT
- Change desktop layout (>768px) — it works fine
- Change card content (text, pricing blocks, UGC, etc.)
- Modify Schema.org or meta tags
- Change the existing JS functions (ToC highlight, back-to-top, etc.)
- Remove any existing functionality from TASK-033 or TASK-037

## Acceptance Criteria
- [ ] Mobile (375px): Collapsed card shows ONLY icon (44px), name, rating, price hint, badge, and toggle
- [ ] Mobile: NO platforms, store links, or "Freemium" text visible in collapsed header
- [ ] Mobile: Tapping header expands card smoothly
- [ ] Mobile: Expanded card shows platforms + store links at the top of body
- [ ] Mobile: Card padding is 16px (not 32px)
- [ ] Mobile: Cards are spaced 16px apart (not 32px)
- [ ] Mobile: Price hint ("· ~$9/mo") appears next to rating in collapsed state
- [ ] Mobile: Badge appears on its own row below the rating, small and clean
- [ ] Desktop (1920px): ZERO visual changes — layout identical to before
- [ ] All 16 cards have data-price-hint attributes
- [ ] All 16 cards have .app-card-platforms-mobile divs with correct links
- [ ] Toggle button works: collapsed → expanded → collapsed
- [ ] Anchor links still auto-expand cards on mobile
- [ ] No layout shifts, no overflow, no horizontal scroll on any card

## Verification
1. Open on iPhone/375px simulator — cards should look like clean list items
2. Collapsed: only icon, name, ★ rating · price, badge visible
3. Tap to expand — full content appears with platforms at top
4. Scroll through all 16 cards — consistent, no broken layouts
5. Open on desktop 1920px — NOTHING changed
6. Click ToC link on mobile — auto-expands target card
7. Check console for JS errors

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
