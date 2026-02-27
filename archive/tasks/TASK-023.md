# TASK-023: Ambient embers for entire site (except hero)

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-020

## Goal
Add glowing, pulsating ember particles to the background of the ENTIRE site except the hero section. Embers must feel like real floating embers: warm, slowly rising, softly pulsing with light, and fading out at the top. They must NOT scroll with the page and must NOT appear on top of text.

## Context
The hero already has its own ember system (16 embers, `.embers` + `.ember` classes). This task creates a SEPARATE ambient system that covers all other sections and pages. Hero embers must not be touched.

## Architecture — `isolation: isolate` stacking trick

The key technical challenge: embers need to be `position: fixed` (viewport-locked, don't scroll with page) but behind all text content.

**Solution:**
1. Add `isolation: isolate` to `body` — creates a new stacking context
2. Ember container: `position: fixed; z-index: -1;` — sits ABOVE body's own background but BELOW all child elements
3. Sections with transparent backgrounds: embers show through naturally
4. Sections with solid backgrounds (`.hero`, `.signup`): cover the embers, hiding them
5. For `.signup` and `.blog-newsletter`: remove the solid `var(--bg)` from their background property so the body background shows through AND embers are visible

This means: NO z-index changes needed on any section. The `isolation: isolate` + `z-index: -1` combo handles everything.

## Requirements

### 1. CSS changes in `styles.css`

**Add `isolation: isolate` to body:**
```css
body {
  background: var(--bg);
  color: var(--text);
  font-family: "Avenir Next", "Segoe UI", sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  isolation: isolate;
}
```

**Remove solid background from `.signup`** (keep only the gradient, body provides the dark bg):
Change:
```css
.signup {
  ...
  background:
    radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,138,61,0.06) 0%, transparent 70%),
    var(--bg);
}
```
To:
```css
.signup {
  ...
  background:
    radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,138,61,0.06) 0%, transparent 70%);
}
```

**Remove solid background from `.blog-newsletter`** (same treatment):
Change:
```css
.blog-newsletter {
  ...
  background:
    radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,138,61,0.06) 0%, transparent 70%),
    var(--bg);
  ...
}
```
To:
```css
.blog-newsletter {
  ...
  background:
    radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,138,61,0.06) 0%, transparent 70%);
  ...
}
```

**Add ambient ember styles:**
```css
/* ═══════════════════════════════════════════════════
   AMBIENT EMBERS — site-wide background particles
   (except hero, which has its own ember system)
   ═══════════════════════════════════════════════════ */
.ambient-embers {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

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

/* 8 embers — varied size, speed, position, delay */
.ambient-ember:nth-child(1) {
  left: 6%;  width: 5px; height: 5px;
  --af-dur: 16s; animation-delay: 0s;
}
.ambient-ember:nth-child(2) {
  left: 18%; width: 4px; height: 4px;
  --af-dur: 20s; animation-delay: 3s;
  background: radial-gradient(circle, rgba(255,200,80,0.9) 0%, rgba(255,180,60,0.4) 40%, transparent 70%);
}
.ambient-ember:nth-child(3) {
  left: 35%; width: 6px; height: 6px;
  --af-dur: 18s; animation-delay: 7s;
}
.ambient-ember:nth-child(4) {
  left: 50%; width: 4px; height: 4px;
  --af-dur: 22s; animation-delay: 1s;
  background: radial-gradient(circle, rgba(255,200,80,0.9) 0%, rgba(255,180,60,0.4) 40%, transparent 70%);
}
.ambient-ember:nth-child(5) {
  left: 65%; width: 5px; height: 5px;
  --af-dur: 17s; animation-delay: 5s;
}
.ambient-ember:nth-child(6) {
  left: 78%; width: 4px; height: 4px;
  --af-dur: 21s; animation-delay: 9s;
  background: radial-gradient(circle, rgba(255,200,80,0.9) 0%, rgba(255,180,60,0.4) 40%, transparent 70%);
}
.ambient-ember:nth-child(7) {
  left: 88%; width: 5px; height: 5px;
  --af-dur: 19s; animation-delay: 2s;
}
.ambient-ember:nth-child(8) {
  left: 42%; width: 3px; height: 3px;
  --af-dur: 23s; animation-delay: 11s;
}

/* Float upward + pulsate (scale oscillation) + horizontal drift + fade */
@keyframes ambientFloat {
  0%   { bottom: -2%;  transform: translateX(0)    scale(1);   opacity: 0; }
  4%   { opacity: 0.5; transform: translateX(3px)  scale(1.3); }
  10%  { opacity: 0.7; transform: translateX(-2px) scale(1);   }
  18%  { opacity: 0.5; transform: translateX(6px)  scale(1.4); }
  28%  { opacity: 0.7; transform: translateX(-4px) scale(1);   }
  38%  { opacity: 0.5; transform: translateX(8px)  scale(1.3); }
  50%  { opacity: 0.6; transform: translateX(-3px) scale(1);   }
  62%  { opacity: 0.5; transform: translateX(5px)  scale(1.3); }
  74%  { opacity: 0.4; transform: translateX(-5px) scale(1);   }
  86%  { opacity: 0.2; transform: translateX(3px)  scale(1.2); }
  100% { bottom: 102%; transform: translateX(-2px) scale(0.8); opacity: 0; }
}
```

**Design rationale for the animation:**
- **Float** (`bottom: -2%` → `bottom: 102%`): rises from below viewport to above, ensuring the ember traverses the full screen
- **Pulse** (scale oscillates 1.0 → 1.3 → 1.0 repeatedly): the radial gradient glow expands and contracts, creating a pulsating light-emission effect — like a hot coal breathing
- **Drift** (translateX oscillates ±3-8px): natural horizontal sway, not straight-line rise
- **Fade** (opacity peaks at 0.7, fades to 0 at top): soft entry, gradual disappearance
- **Radial gradient** background: bright center + soft edge = natural ember glow without expensive `box-shadow` animation

**Add to reduced-motion media query:**
```css
@media (prefers-reduced-motion: reduce) {
  .ambient-ember { animation: none; opacity: 0; }
}
```

### 2. HTML — add ember container to all pages

**In `index.html`**, add immediately after the opening `<body>` tag (BEFORE the header):
```html
<!-- Ambient embers (site-wide, behind content) -->
<div class="ambient-embers" aria-hidden="true">
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
  <span class="ambient-ember"></span>
</div>
```

**In `blog.html`**, add the same container after `<body>`.

**In `blog/_template.html`**, add the same container after `<body>`.

### 3. Verify hero isolation

The hero section has `background: var(--bg)` (solid dark background). This solid background naturally covers the ambient embers behind it. The hero's OWN embers (`.embers` container inside `.hero`) are part of the hero's stacking context and render normally within the hero.

**Do NOT change** anything in the hero CSS or HTML. The architecture works without modifications.

## Do NOT touch
- Hero section HTML or CSS (`.hero`, `.embers`, `.ember` classes)
- `script.js`
- Content or text in any section
- Header CSS (`.site-header`)

## Acceptance Criteria
- [ ] `isolation: isolate` added to `body`
- [ ] Ambient ember container present in `index.html`, `blog.html`, `blog/_template.html`
- [ ] 8 ember particles float upward across the viewport
- [ ] Embers pulsate (scale oscillation creating glow breathing effect)
- [ ] Embers drift horizontally (not straight-line rise)
- [ ] Embers fade in at bottom, fade out at top
- [ ] Mix of orange and golden embers
- [ ] Embers are BEHIND all text and interactive elements (z-index: -1)
- [ ] Embers do NOT move with page scroll (position: fixed)
- [ ] Embers are NOT visible in the hero section (hero's solid background covers them)
- [ ] Embers ARE visible in carousel, why-it-works, about, signup, and footer sections
- [ ] Embers ARE visible on blog index and article pages
- [ ] Hero's own embers still work correctly
- [ ] `.signup` and `.blog-newsletter` sections still have their subtle radial gradient glow
- [ ] `pointer-events: none` — embers don't block clicks
- [ ] Reduced motion: embers hidden
- [ ] No performance issues (smooth 60fps on mobile)

## Verification
- Open index.html — scroll past the hero. Embers should be visible floating upward in the dark background of carousel, why-it-works, about, signup, and footer sections
- Scroll back to hero — embers are NOT visible (hidden behind hero's solid background)
- Watch for ~20 seconds — embers pulse (scale up/down rhythmically), drift left-right, and fade out at top
- Scroll the page — embers stay fixed in the viewport, they don't scroll with the page
- Click on text, buttons, links — embers don't interfere (pointer-events: none)
- Open blog.html — same ambient embers present
- Open blog/_template.html — same ambient embers present
- Resize to 375px — embers visible, no overflow, smooth performance
- Enable "prefers-reduced-motion: reduce" in DevTools — embers disappear

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
