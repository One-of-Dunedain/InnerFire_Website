# TASK-027: Magnifying lens button system (site-wide)

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-023, TASK-026

## Goal
Transform ALL buttons across the website into "magnifying lens" elements. Buttons must be **completely transparent** (no fill) with only a thin luminous border — like the edge of a glass lens. When ambient embers float behind a button, the embers must **physically enlarge** (scale up), creating a real magnifying glass effect. Text on buttons must remain perfectly readable.

## Context
The site has ambient embers (`position: fixed`, `z-index: -1`) floating across all pages. The owner wants buttons to feel like transparent lenses through which these particles appear magnified — no colored fill, no frosted blur, just clear glass that magnifies.

### Current button types (5 total)
- `.btn-primary` — CTA (hero, signup, blog empty state, article CTA)
- `.btn-header` — header nav ("Get Early Access" + iOS badge)
- `.card-share` — carousel share circles
- `.blog-card-share` — blog card share circles
- `.share-btn` — article share pill

### Architecture overview
Two systems work together:
1. **CSS**: buttons become transparent lenses with `backdrop-filter: brightness()` to subtly brighten content behind them (the "clearer glass" zone)
2. **JS**: detects when ambient embers overlap button areas and applies a `scale` CSS property, causing embers to physically enlarge when "under the lens"

### Key technical insight: CSS `scale` property vs `transform: scale()`
Ambient embers already use `transform` in their `@keyframes ambientFloat` animation (translateX + scale). The individual CSS `scale` property (separate from `transform`) **composes on top** of the `transform` property. This means we can add `scale: 2` to an ember without breaking its animation — the ember grows while still floating and pulsing normally.

Browser support for individual `scale` property: Chrome 104+, Firefox 72+, Safari 14.1+ — excellent for 2026.

## Requirements

### 1. CSS changes in `styles.css`

**A) `.btn-primary` — Transparent lens CTA**

Replace the current `.btn-primary` block with:
```css
.btn-primary {
  display: inline-block;
  background: transparent;
  backdrop-filter: brightness(1.4);
  -webkit-backdrop-filter: brightness(1.4);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 32px;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 138, 61, 0.3);
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.1s;
}
.btn-primary:hover {
  border-color: rgba(255, 138, 61, 0.55);
  box-shadow: 0 0 20px rgba(255, 138, 61, 0.12), inset 0 0 12px rgba(255, 138, 61, 0.06);
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
```

**Design rationale:**
- `background: transparent` — completely clear lens, zero fill
- `backdrop-filter: brightness(1.4)` — content behind the button (dark bg, embers) appears ~40% brighter. The dark `#0a0d12` background becomes slightly lighter inside the lens zone. When an ember passes behind, its glow is amplified — reinforcing the magnification illusion even without the JS scale effect
- `border: 1px solid rgba(255, 138, 61, 0.3)` — thin warm lens edge, just enough to define the button boundary
- `text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6)` — safety net for text readability. White text on the dark bg is already high-contrast, but when an ember passes behind (especially when magnified), the shadow ensures the text always stays crisp
- Hover: border brightens + subtle outer glow + faint inset glow (light refracting inside the lens). No background change — stays transparent
- No `backdrop-filter: blur()` — blur was removed intentionally. A magnifying glass doesn't blur, it sharpens/brightens. The brightness filter is the correct optical metaphor

**B) `.btn-header` — Transparent lens nav button**

Replace the current `.btn-header` block (including `::after`, `:hover`, `:hover::after`) with:
```css
.btn-header {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  border: 1px solid rgba(255, 138, 61, 0.25);
  background: transparent;
  backdrop-filter: brightness(1.3);
  -webkit-backdrop-filter: brightness(1.3);
  padding: 6px 16px;
  border-radius: var(--radius);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.btn-header::after {
  content: "iOS only";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 209, 102, 0.3);
  background: rgba(255, 209, 102, 0.1);
  color: var(--accent2);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.1;
  white-space: nowrap;
  text-shadow: none;
}

.btn-header:hover {
  border-color: rgba(255, 138, 61, 0.45);
  box-shadow: 0 0 16px rgba(255, 138, 61, 0.1), inset 0 0 10px rgba(255, 138, 61, 0.04);
}

.btn-header:hover::after {
  border-color: rgba(255, 209, 102, 0.5);
  background: rgba(255, 209, 102, 0.18);
}
```

**Design rationale:**
- `brightness(1.3)` — slightly less than primary (header is smaller, subtler)
- Badge `::after` keeps its tiny gold accent with glass-matching opacity. `text-shadow: none` on badge prevents doubling of shadow from parent
- Header sits over `.site-header` which has `background: rgba(10,13,18,0.85)` with blur — the brightness filter compounds nicely with the header backdrop

**C) `.card-share` — Transparent lens circle (carousel)**

Replace the current `.card-share` block with:
```css
.card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  backdrop-filter: brightness(1.5);
  -webkit-backdrop-filter: brightness(1.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.1s;
  z-index: 2;
}
.card-share:hover {
  border-color: rgba(255, 138, 61, 0.4);
  box-shadow: 0 0 14px rgba(255, 138, 61, 0.12), inset 0 0 8px rgba(255, 138, 61, 0.06);
  transform: scale(1.1);
}
.card-share:active { transform: scale(0.95); }
```

**Design rationale:**
- `brightness(1.5)` — slightly higher than CTA buttons. Share circles sit over carousel card backgrounds (which have colored gradients), so higher brightness makes the lens zone more visually distinct
- Fully transparent background — the card gradient shows through
- White/muted border defines the circular lens edge
- Hover: warm accent border + glow, consistent with all other buttons

**D) `.blog-card-share` — Transparent lens circle (blog cards)**

Replace the current `.blog-card-share` block with:
```css
.blog-card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  backdrop-filter: brightness(1.5);
  -webkit-backdrop-filter: brightness(1.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.1s, opacity 0.2s;
  opacity: 0;
  z-index: 2;
}
.blog-card:hover .blog-card-share { opacity: 1; }
.blog-card-share:hover {
  border-color: rgba(255, 138, 61, 0.4);
  box-shadow: 0 0 14px rgba(255, 138, 61, 0.12), inset 0 0 8px rgba(255, 138, 61, 0.06);
  transform: scale(1.1);
}
.blog-card-share:focus-visible {
  opacity: 1;
  outline: 2px solid rgba(255, 138, 61, 0.55);
  outline-offset: 2px;
}
```

**Design rationale:**
- Identical lens treatment to `.card-share` (same Tier 2)
- Preserves `opacity: 0` → reveal on hover (TASK-026 behavior)
- Smaller size (32px vs 36px) for blog card proportions

**E) `.share-btn` — Transparent lens pill (article share)**

Replace the current `.share-btn` block with:
```css
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  backdrop-filter: brightness(1.3);
  -webkit-backdrop-filter: brightness(1.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  transition: border-color 0.25s, box-shadow 0.25s, color 0.2s;
}
.share-btn:hover {
  border-color: rgba(255, 138, 61, 0.35);
  box-shadow: 0 0 14px rgba(255, 138, 61, 0.1), inset 0 0 8px rgba(255, 138, 61, 0.04);
  color: var(--accent);
}
```

**Design rationale:**
- Lightest brightness boost (1.3) — article share buttons are small and subtle
- Pill shape preserved
- `text-shadow` for readability safety

**F) Ambient ember magnification styles**

Add this new block AFTER the existing `.ambient-ember:nth-child(8)` block and BEFORE the `@keyframes ambientFloat` block:

```css
/* Lens magnification — embers scale up when passing under buttons */
.ambient-ember {
  scale: 1;
  transition: scale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
}
.ambient-ember.magnified {
  scale: 2;
  filter: brightness(1.4);
}
```

**Design rationale:**
- `scale: 1` (base) → `scale: 2` (magnified) — ember doubles in size when under a button lens. A 5px ember becomes 10px, a 4px ember becomes 8px. This is clearly visible magnification without being overpowering
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot easing. The ember grows, slightly overshoots, then settles — mimics a real lens focusing. The overshoot is subtle (1.56) not bouncy
- `filter: brightness(1.4)` — magnified embers also glow brighter, simulating a lens concentrating light. This makes the ember more vivid when magnified
- `transition: ... 0.4s` — smooth 400ms transition in both directions. Fast enough to feel responsive, slow enough to be elegant
- Uses `scale` CSS property (NOT `transform: scale()`) — this composes with the `transform` in the `@keyframes ambientFloat` animation without overriding it. The ember continues to float, drift, and pulse normally while also being magnified

**IMPORTANT:** The `scale` and `transition` properties must be added to the EXISTING `.ambient-ember` rule (line ~167). Do NOT create a duplicate `.ambient-ember` rule — add these two new declarations to the existing rule block. The `.magnified` class is a NEW rule block added right after.

Actually, to be safe and avoid specificity issues, add the `scale` and `transition` to the existing rule:

Change the existing `.ambient-ember` rule from:
```css
.ambient-ember {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,160,60,0.9) 0%,
    rgba(255,120,40,0.4) 40%,
    transparent 70%
  );
  animation: ambientFloat var(--af-dur) linear infinite;
}
```

To:
```css
.ambient-ember {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,160,60,0.9) 0%,
    rgba(255,120,40,0.4) 40%,
    transparent 70%
  );
  animation: ambientFloat var(--af-dur) linear infinite;
  scale: 1;
  transition: scale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
}
```

Then add a new rule AFTER the `.ambient-ember:nth-child(8)` block:
```css
.ambient-ember.magnified {
  scale: 2;
  filter: brightness(1.4);
}
```

**G) Reduced motion update**

Add to the existing `@media (prefers-reduced-motion: reduce)` block:
```css
.ambient-ember.magnified { scale: 1; filter: none; transition: none; }
```

This ensures magnification scaling doesn't happen for users who prefer reduced motion. The embers are already hidden (`opacity: 0`) by the existing rule, but this is belt-and-suspenders safety.

**H) Mobile overrides**

Existing mobile rules stay as-is:
```css
.hero .btn-primary { min-width: 0; margin-top: 6px; }
.btn-primary { width: 100%; text-align: center; }
.btn-header { padding: 6px 12px; }
.btn-header::after { content: "iOS"; padding: 2px 6px; font-size: 0.62rem; }
.blog-card-share { opacity: 0.7; }
```
These are layout-only and compatible with the transparent lens style.

### 2. JS changes in `script.js`

Add a new function `initLensEffect()` and call it alongside existing init functions.

**Add this function before the existing `if (document.readyState === 'loading')` block:**

```js
// Lens magnification — embers scale up when passing under buttons
function initLensEffect() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var embers = document.querySelectorAll('.ambient-ember');
  var lensSelectors = '.btn-primary, .btn-header, .card-share, .blog-card-share, .share-btn';
  var buttons = document.querySelectorAll(lensSelectors);

  if (!embers.length || !buttons.length) return;

  var lastCheck = 0;
  var THROTTLE_MS = 80; // ~12fps — smooth enough for visual effect, light on CPU

  function checkOverlap(timestamp) {
    if (timestamp - lastCheck >= THROTTLE_MS) {
      lastCheck = timestamp;

      // Get fresh button rects (positions change on scroll)
      var btnRects = [];
      for (var i = 0; i < buttons.length; i++) {
        btnRects.push(buttons[i].getBoundingClientRect());
      }

      // Check each ember against all buttons
      for (var j = 0; j < embers.length; j++) {
        var er = embers[j].getBoundingClientRect();
        var isUnder = false;
        for (var k = 0; k < btnRects.length; k++) {
          var br = btnRects[k];
          if (er.right > br.left && er.left < br.right &&
              er.bottom > br.top && er.top < br.bottom) {
            isUnder = true;
            break;
          }
        }
        if (isUnder && !embers[j].classList.contains('magnified')) {
          embers[j].classList.add('magnified');
        } else if (!isUnder && embers[j].classList.contains('magnified')) {
          embers[j].classList.remove('magnified');
        }
      }
    }

    requestAnimationFrame(checkOverlap);
  }

  // Re-query buttons when DOM might change (blog page loads cards dynamically)
  function refreshButtons() {
    buttons = document.querySelectorAll(lensSelectors);
  }

  // Refresh button list on scroll (handles lazy-loaded content)
  var scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(refreshButtons, 500);
  }, { passive: true });

  requestAnimationFrame(checkOverlap);
}
```

**Update the init block** to call `initLensEffect()`:

Change:
```js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCardShareButtons();
    initBenefitReveal();
  });
} else {
  initCardShareButtons();
  initBenefitReveal();
}
```

To:
```js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCardShareButtons();
    initBenefitReveal();
    initLensEffect();
  });
} else {
  initCardShareButtons();
  initBenefitReveal();
  initLensEffect();
}
```

**JS design rationale:**
- **`requestAnimationFrame` loop**: Auto-pauses when tab is hidden (battery-friendly). Runs only when browser is ready to paint
- **Throttled to ~12fps (80ms)**: Ember movement is slow (16-23s per full traversal), so 12fps detection is plenty smooth. Avoids wasted CPU cycles
- **`getBoundingClientRect()`**: Returns the visual position of elements accounting for scroll, transforms, and fixed positioning. Works correctly for both `position: fixed` embers and normally-positioned buttons
- **Class toggle with check**: `classList.contains()` check before add/remove avoids unnecessary DOM mutations (style recalcs)
- **`refreshButtons()` on scroll**: Blog page loads cards via JS from `posts.json`, so button list may change. The debounced refresh (500ms after scroll stops) handles this without continuous overhead
- **`prefers-reduced-motion` check**: Exits immediately if user prefers reduced motion. Embers are already hidden by CSS in this case
- **No ES6+ syntax**: Uses `var`, `for` loops, `function` declarations — compatible with older browsers, matching existing `script.js` style
- **Performance**: 8 embers × ~5-10 visible buttons = 40-80 rect comparisons per frame at 12fps. Each `getBoundingClientRect()` is O(1). Total overhead: negligible

### 3. Files to modify

| File | Changes |
|------|---------|
| `styles.css` | All 5 button types → transparent lens style. Add `.magnified` class for embers. Update reduced-motion |
| `script.js` | Add `initLensEffect()` function + call it in init block |

### 4. HTML changes

**None.** No HTML modifications needed.

## Do NOT touch
- HTML files
- Hero section CSS (`.hero`, `.embers`, `.ember` classes)
- Ambient embers animation keyframes (`@keyframes ambientFloat`) — the float animation must not be modified
- Ambient ember `nth-child` rules (positions, sizes, delays, colors)
- Form input styles (`.email-input`)
- Layout/sizing of any button (padding, width, border-radius preserved)
- The `.carousel-card:has(.card-share:hover)` rule
- Wick progress bar code in `script.js`
- Card share button handler in `script.js`
- Benefit reveal handler in `script.js`

## Behavior changes
- `.btn-primary` background: `rgba(255, 138, 61, 0.18)` → `transparent` (removes orange tint fill)
- `.btn-primary` removes `backdrop-filter: blur(16px)` → replaces with `backdrop-filter: brightness(1.4)` (lens, not frost)
- `.btn-header` background: `rgba(255, 138, 61, 0.1)` → `transparent`
- `.btn-header` removes `backdrop-filter: blur(12px)` → replaces with `backdrop-filter: brightness(1.3)`
- `.card-share` background: `rgba(0, 0, 0, 0.35)` → `transparent`
- `.card-share` removes `backdrop-filter: blur(12px)` → replaces with `backdrop-filter: brightness(1.5)`
- `.blog-card-share` same changes as `.card-share`
- `.share-btn` background: `rgba(255,255,255,0.06)` → `transparent`
- `.share-btn` removes `backdrop-filter: blur(12px)` → replaces with `backdrop-filter: brightness(1.3)`
- Ambient embers now physically enlarge (scale: 2) when overlapping any button — new interactive behavior
- `script.js` gains new `initLensEffect()` function with `requestAnimationFrame` loop

## Acceptance Criteria
- [ ] All 5 button types have `background: transparent` (no fill whatsoever)
- [ ] All 5 button types have `backdrop-filter: brightness()` (NOT blur)
- [ ] All 5 button types have thin luminous borders (1px solid rgba)
- [ ] All hover states produce warm accent glow (border + box-shadow, NO background fill)
- [ ] `.btn-primary` text is white and readable via `text-shadow`
- [ ] `.btn-header` "iOS only" badge still visible and styled
- [ ] When an ambient ember floats behind ANY button, the ember visibly enlarges (scale: 2)
- [ ] Magnified embers also glow brighter (filter: brightness(1.4))
- [ ] Magnification transition is smooth (0.4s with overshoot easing)
- [ ] When ember moves out of button area, it smoothly shrinks back to normal
- [ ] No layout shifts — all button dimensions/spacing preserved
- [ ] Ember float/pulse/drift animation continues normally during magnification
- [ ] Mobile (375px): buttons render correctly, lens effect works
- [ ] `-webkit-backdrop-filter` prefix present for Safari
- [ ] `prefers-reduced-motion`: magnification disabled, embers hidden
- [ ] JS uses `requestAnimationFrame` with throttle, not `setInterval`
- [ ] No visible performance impact on mobile (12fps detection loop is lightweight)
- [ ] Hero embers (`.ember` class) are NOT affected — only `.ambient-ember` elements
- [ ] No `backdrop-filter: blur()` on any button (this is a lens, not frosted glass)

## Verification
1. Open index.html — hero "Take a look" button should be fully transparent with thin warm border and white text
2. Scroll past hero — buttons in other sections should be transparent lenses
3. Watch for 20-30 seconds — when an ambient ember floats behind a button, it should visibly grow ~2x in size and glow brighter
4. When the ember exits the button area, it should smoothly shrink back to normal size
5. Hover over buttons — border brightens, subtle glow appears, NO background fill appears
6. Click text/links through the transparent button area — buttons don't block interaction with content behind (existing pointer-events behavior)
7. Open DevTools → Performance tab → record 10 seconds → verify no jank (consistent ~60fps)
8. Open blog.html — same lens effect works on blog card share buttons
9. Resize to 375px — all lens buttons render correctly
10. DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce" → embers disappear, magnification loop doesn't run
11. Compare: area INSIDE a button should look subtly brighter than area OUTSIDE (backdrop-filter: brightness effect)
12. Safari/iOS: `-webkit-backdrop-filter` ensures brightness filter works

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
