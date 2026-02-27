# TASK-027: Glassmorphism button system (site-wide consistency)

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-023, TASK-026

## Goal
Apply a consistent glassmorphism (frosted glass) effect to ALL interactive buttons across the entire website. Buttons must feel like translucent glass panels floating over the dark background — with `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle luminous borders. The result must be visually cohesive, highly readable, and feel premium.

## Context
The site currently has 5 distinct button styles with inconsistent visual language:
- `.btn-primary` — solid orange, dark text (CTA buttons)
- `.btn-header` — transparent with orange border (header nav)
- `.card-share` — dark opaque circle (carousel share)
- `.blog-card-share` — dark opaque circle (blog card share)
- `.share-btn` — subtle pill with barely-visible background (article share)

The owner wants ALL buttons unified under a glassmorphism design language inspired by a Telegram-style frosted glass pause button. The key visual signature: translucent background + blur + thin luminous border + soft glow on hover.

## Design System — Two Tiers

### Tier 1: Primary CTA (warm glass)
For: `.btn-primary`, `.btn-header`
- Warm accent-tinted frosted glass
- Semi-transparent accent background + backdrop blur
- White/light text (high contrast on dark bg)
- Thin luminous border (accent-tinted)
- Hover: brighter glow, slightly more opaque

### Tier 2: Secondary/Utility (dark glass)
For: `.card-share`, `.blog-card-share`, `.share-btn`
- Dark frosted glass (like Telegram's pause button)
- Semi-transparent dark background + backdrop blur
- Light muted icons/text
- Thin white/muted border
- Hover: warm accent tint bleeds through

## Requirements

### 1. CSS changes in `styles.css`

**A) `.btn-primary` — Warm glass CTA**

Replace the current `.btn-primary` block (lines ~134-149) with:
```css
.btn-primary {
  display: inline-block;
  background: rgba(255, 138, 61, 0.18);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 32px;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 138, 61, 0.35);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.1s;
}
.btn-primary:hover {
  background: rgba(255, 138, 61, 0.3);
  border-color: rgba(255, 138, 61, 0.55);
  box-shadow: 0 0 20px rgba(255, 138, 61, 0.15);
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
```

**Design rationale:**
- `rgba(255, 138, 61, 0.18)` = accent orange at 18% opacity — warm tint visible against dark bg, but translucent enough for blur to show through
- `backdrop-filter: blur(16px)` = the core glass effect, content behind button is softly blurred
- `border: 1px solid rgba(255, 138, 61, 0.35)` = luminous accent border, defines the glass edge
- Hover: opacity increases to 0.3, border brightens to 0.55, soft outer glow via `box-shadow`
- Text changed from `#000` to `#fff` — critical for readability on semi-transparent dark background

**B) `.btn-header` — Glass nav button**

Replace the current `.btn-header` block (lines ~92-131) with:
```css
.btn-header {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  border: 1px solid rgba(255, 138, 61, 0.3);
  background: rgba(255, 138, 61, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 6px 16px;
  border-radius: var(--radius);
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, color 0.2s;
}

.btn-header::after {
  content: "iOS only";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 209, 102, 0.3);
  background: rgba(255, 209, 102, 0.12);
  color: var(--accent2);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.1;
  white-space: nowrap;
}

.btn-header:hover {
  background: rgba(255, 138, 61, 0.22);
  border-color: rgba(255, 138, 61, 0.5);
  box-shadow: 0 0 16px rgba(255, 138, 61, 0.1);
}

.btn-header:hover::after {
  border-color: rgba(255, 209, 102, 0.5);
  background: rgba(255, 209, 102, 0.2);
}
```

**Design rationale:**
- Lighter glass than `.btn-primary` (10% vs 18%) — subtler, doesn't compete with hero
- `blur(12px)` — slightly less blur than primary (header is thin, less area to blur)
- Hover: warm glow intensifies, stays glass — does NOT flip to solid orange (old behavior)
- `::after` badge keeps its gold accent but with glass-matching reduced opacity borders
- Removed the old hover behavior that turned the entire button solid orange with black text — that was jarring and breaks the glass aesthetic

**C) `.card-share` — Dark glass circle (carousel)**

Replace the current `.card-share` block (lines ~459-477) with:
```css
.card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.1s;
  z-index: 2;
}
.card-share:hover {
  background: rgba(255, 138, 61, 0.2);
  border-color: rgba(255, 138, 61, 0.35);
  box-shadow: 0 0 12px rgba(255, 138, 61, 0.12);
  transform: scale(1.1);
}
.card-share:active { transform: scale(0.95); }
```

**Design rationale:**
- `rgba(0, 0, 0, 0.35)` = dark glass, reduced from 0.5 — more translucent so blur is visible
- This is the Telegram-style dark glass circle the owner referenced
- Hover: warm accent bleeds through the glass (consistent with primary CTA glow)
- Maintains `z-index: 2` for carousel card stacking

**D) `.blog-card-share` — Dark glass circle (blog cards)**

Replace the current `.blog-card-share` block (lines ~931-955) with:
```css
.blog-card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.1s, opacity 0.2s;
  opacity: 0;
}
.blog-card:hover .blog-card-share { opacity: 1; }
.blog-card-share:hover {
  background: rgba(255, 138, 61, 0.2);
  border-color: rgba(255, 138, 61, 0.35);
  box-shadow: 0 0 12px rgba(255, 138, 61, 0.12);
  transform: scale(1.1);
}
.blog-card-share:focus-visible {
  opacity: 1;
  outline: 2px solid rgba(255, 138, 61, 0.55);
  outline-offset: 2px;
}
```

**Design rationale:**
- Identical glass treatment to `.card-share` (same Tier 2 dark glass)
- Keeps `opacity: 0` → reveal on hover (existing behavior from TASK-026)
- Smaller size (32px vs 36px) preserved for blog card proportions

**E) `.share-btn` — Glass pill (article share)**

Replace the current `.share-btn` block (lines ~1068-1085) with:
```css
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, color 0.2s;
}
.share-btn:hover {
  background: rgba(255, 138, 61, 0.12);
  border-color: rgba(255, 138, 61, 0.3);
  box-shadow: 0 0 14px rgba(255, 138, 61, 0.1);
  color: var(--accent);
}
```

**Design rationale:**
- Lightest glass in the system — near-transparent with blur creating the frost effect
- Pill shape preserved (`border-radius: 20px`)
- Hover: warm accent glow (same language as all other buttons)
- This was already closest to glass style; adding `backdrop-filter` makes it properly frosted

**F) Hero-specific `.btn-primary` override**

The existing `.hero .btn-primary { min-width: 220px; }` rule (line ~359) stays unchanged. No additional hero overrides needed.

**G) Mobile overrides**

In the `@media (max-width: 480px)` block, the existing rules stay:
```css
.hero .btn-primary { min-width: 0; margin-top: 6px; }
.btn-primary { width: 100%; text-align: center; }
.btn-header { padding: 6px 12px; }
.btn-header::after { content: "iOS"; padding: 2px 6px; font-size: 0.62rem; }
```
These are layout-only and don't conflict with the glass styling.

In the same `@media (max-width: 480px)` block, the existing `.blog-card-share { opacity: 0.7; }` stays (always-visible on mobile).

**H) Reduced motion**

No changes needed for reduced motion — glassmorphism is a static visual effect (blur + transparency), not an animation. The existing `@media (prefers-reduced-motion: reduce)` rules are unaffected.

### 2. Consistency checklist for Executor

After making changes, verify ALL buttons share these consistent properties:
- `backdrop-filter: blur()` + `-webkit-backdrop-filter: blur()` (12-16px)
- Semi-transparent `background` (rgba values, NOT solid colors)
- `border: 1px solid rgba(...)` (thin luminous border)
- Hover adds `box-shadow: 0 0 Xpx rgba(255, 138, 61, ...)` (warm outer glow)
- Transition durations: `0.25s` for background/border/box-shadow
- No solid background on any button state (including hover)

### 3. Files to modify

**Only `styles.css`** — this is a pure CSS visual change. No HTML or JS modifications.

## Do NOT touch
- HTML files (no structural changes)
- `script.js` (no behavior changes)
- Hero section CSS (`.hero`, `.embers`, `.ember` classes)
- Ambient embers CSS (`.ambient-embers`, `.ambient-ember`)
- Form input styles (`.email-input`)
- Layout/sizing of any button (padding, width, border-radius preserved)
- The `.carousel-card:has(.card-share:hover)` rule (keeps carousel card from transforming on share hover)

## Behavior changes
- `.btn-primary` text changes from `#000` (black) to `#fff` (white) — necessary because background is no longer solid orange
- `.btn-primary:hover` no longer changes to solid `var(--accent2)` — instead, glass becomes more opaque with warm glow
- `.btn-header:hover` no longer flips to solid orange bg with black text — stays glass with brighter glow
- `.btn-header:hover::after` badge no longer turns white — stays gold with brighter border

## Acceptance Criteria
- [ ] All 5 button types have `backdrop-filter: blur()` applied
- [ ] All 5 button types have semi-transparent backgrounds (no solid colors)
- [ ] All 5 button types have thin luminous borders
- [ ] All hover states produce a warm accent glow (`box-shadow`)
- [ ] `.btn-primary` text is white and readable against the glass background
- [ ] `.btn-header` "iOS only" badge still visible and styled
- [ ] `.card-share` and `.blog-card-share` are dark glass circles (Telegram-style)
- [ ] `.share-btn` is a glass pill with proper blur
- [ ] Hover states feel consistent across all button types (warm glow language)
- [ ] No layout shifts — all button dimensions/spacing preserved
- [ ] Mobile: buttons render correctly at 375px width
- [ ] `backdrop-filter` has `-webkit-` prefix for Safari compatibility
- [ ] No solid backgrounds on ANY button in ANY state
- [ ] Performance: no jank on mobile (blur is GPU-accelerated)

## Verification
- Open index.html — hero "Take a look" button should be warm frosted glass with white text
- Hover over "Take a look" — glass becomes brighter, subtle outer glow appears
- Header "Get Early Access" button — subtle warm glass, "iOS only" badge visible
- Hover header button — glass brightens, does NOT flip to solid orange
- Scroll to carousel — share circles on cards should be dark frosted glass
- Hover a share circle — warm accent bleeds through
- Open blog.html — blog card share buttons should be dark glass circles
- Open any article — "Share" pill button should be frosted glass
- Hover article share — warm glow appears
- Resize to 375px — all glass buttons render correctly, no overflow
- Test on Safari/iOS — `-webkit-backdrop-filter` ensures glass effect works

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
