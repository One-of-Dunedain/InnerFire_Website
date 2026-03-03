# TASK-040: Blog index — compact mobile layout

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Problem
On mobile (375px), the blog index page shows 4 article cards in a vertical grid. Each card has a large 16:9 thumbnail (~190px tall) + body content (~170px tall) = ~360px per card. With 4 articles, users must scroll through 2+ full screens just to see all available content.

The user cannot quickly understand "what articles exist and what they're about" — the thumbnails consume most of the viewport, pushing useful content (titles, categories) below the fold.

## Goal
Redesign the blog index mobile layout so ALL articles are visible within 1-2 screens. Users should be able to scan titles, categories, and dates at a glance, then tap the article they want.

Desktop layout stays unchanged.

## Design spec

### Mobile (<480px): Featured + compact list

The **newest article** (first in sorted array) gets a hero-style card. All remaining articles use a **compact horizontal layout**.

```
MOBILE (375px):
┌──────────────────────────────────┐
│  [16:9 thumb - latest article]   │
│  ┌────────────────────────────┐  │
│  │ INNERFIRE BLOG             │  │
│  │ Why Exhale Controls State  │  │
│  │ The mechanism behind calm  │  │
│  └────────────────────────────┘  │
│  SCIENCE                         │
│  Why Exhale Controls State       │
│  Mar 7, 2026 · 7 min            │
└──────────────────────────────────┘

┌──[72px]──┬───────────────────────┐
│          │ FOCUS                  │
│  thumb   │ 3-Minute Reset Proto. │
│  square  │ Mar 4 · 5 min         │
└──────────┴───────────────────────┘

┌──[72px]──┬───────────────────────┐
│          │ BREATHING              │
│  thumb   │ Breathing Under Noise  │
│  square  │ Mar 1 · 6 min         │
└──────────┴───────────────────────┘

┌──[72px]──┬───────────────────────┐
│          │ COMPARISON             │
│  thumb   │ Best Breathwork Apps   │
│  square  │ Feb 27 · 12 min       │
└──────────┴───────────────────────┘
```

**Height estimate:**
- Featured card: ~360px (same as current)
- 3 compact cards: ~80px each = ~240px
- Total content: ~600px — fits in ONE screen below header

### Tablet (481-768px): 2-column grid with smaller thumbnails

Keep current 2-column grid (already responsive at this breakpoint) but reduce thumbnail aspect ratio:

```css
@media (min-width: 481px) and (max-width: 768px) {
  .blog-card-thumb {
    aspect-ratio: 2 / 1;  /* was 16/9, now shorter */
  }
}
```

### Desktop (>768px): NO changes

Keep current full-card layout with 16:9 thumbnails.

## Implementation

### Option A: CSS-only (preferred — simpler, no JS changes)

Use CSS to restyle `.blog-card` on mobile. The first card keeps full layout; subsequent cards become horizontal.

```css
@media (max-width: 480px) {
  /* Blog grid — single column, tighter gap */
  .blog-grid {
    gap: 12px;
  }

  /* All cards after the first: compact horizontal layout */
  .blog-card:not(:first-child) {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0;
  }

  /* Compact card: square thumbnail */
  .blog-card:not(:first-child) .blog-card-thumb {
    aspect-ratio: 1 / 1;
    border-radius: var(--radius) 0 0 var(--radius);
    height: 100%;
  }

  /* Compact card: tighter body */
  .blog-card:not(:first-child) .blog-card-body {
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Compact card: hide excerpt */
  .blog-card:not(:first-child) .blog-card-excerpt {
    display: none;
  }

  /* Compact card: smaller title */
  .blog-card:not(:first-child) .blog-card-title {
    font-size: 0.95rem;
    margin-bottom: 4px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }

  /* Compact card: smaller category */
  .blog-card:not(:first-child) .blog-card-category {
    font-size: 0.68rem;
    margin-bottom: 4px;
  }

  /* Compact card: meta stays visible, smaller */
  .blog-card:not(:first-child) .blog-card-meta {
    font-size: 0.74rem;
  }

  /* Compact card: hide share button */
  .blog-card:not(:first-child) .blog-card-share {
    display: none;
  }

  /* Featured (first) card: keep full layout but tighten */
  .blog-card:first-child .blog-card-body {
    padding: 14px 16px;
  }
  .blog-card:first-child .blog-card-excerpt {
    -webkit-line-clamp: 2;
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  /* Page header — less padding on mobile */
  .page-header {
    padding: 90px 0 32px;
  }
  .page-header h1 {
    margin-bottom: 8px;
  }
  .page-header p {
    font-size: 0.95rem;
  }

  /* Blog grid section — less bottom padding */
  .blog-grid-section {
    padding: 0 0 40px;
  }
}
```

### Border radius fix for compact cards

The compact card needs proper border-radius so the thumbnail corner matches the card corner:

```css
@media (max-width: 480px) {
  .blog-card:not(:first-child) {
    border-radius: var(--radius);
    overflow: hidden;
  }
}
```

### Newsletter section on mobile — tighter

```css
@media (max-width: 480px) {
  .blog-newsletter {
    padding: 40px 0;
  }
  .blog-newsletter h2 {
    font-size: 1.2rem;
  }
  .blog-newsletter-sub {
    font-size: 0.88rem;
    margin-bottom: 20px;
  }
}
```

## Files to modify

| File | Changes |
|------|---------|
| `styles.css` | Add `@media (max-width: 480px)` block for `.blog-card:not(:first-child)` compact layout, page-header tightening, newsletter tightening, tablet thumb aspect ratio |

**Note:** NO changes to `blog.html` or its inline JS needed. The JS renders cards as `.blog-card` elements — CSS handles the layout switch via `:not(:first-child)` selector.

## Do NOT
- Change desktop layout (>768px) or tablet 2-column grid
- Modify `blog.html` HTML or inline script
- Change `posts.json` structure
- Modify any article pages
- Remove hover effects on desktop
- Change thumbnail image sources or sizes

## Acceptance Criteria
- [ ] Mobile (375px): first card = full layout with 16:9 thumbnail
- [ ] Mobile (375px): cards 2-4 = compact horizontal with 72px square thumb, no excerpt
- [ ] Mobile: all 4 articles visible within 1-2 screens (before newsletter)
- [ ] Mobile: category, title, date/readTime visible on all compact cards
- [ ] Mobile: page header padding reduced (90px top, 32px bottom)
- [ ] Mobile: newsletter section padding reduced (40px)
- [ ] Tablet (481-768px): 2-column grid with 2:1 thumb aspect ratio
- [ ] Desktop (>768px): ZERO visual changes
- [ ] Cards still link to correct articles
- [ ] Share button visible on hover for featured card (desktop)
- [ ] No broken border-radius on compact cards
- [ ] No layout shift on page load

## Verification
1. Open blog.html on 375px — see featured card + 3 compact cards on first screen
2. Compact cards show: square thumb, category, title, date + readTime
3. Tap compact card — navigates to correct article
4. Open on 768px — 2-column grid with shorter thumbnails
5. Open on 1920px — full cards with 16:9 thumbnails, no changes
6. JS renders correctly (posts load from posts.json)
7. No console errors

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
