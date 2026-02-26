# TASK-023: Ambient embers across all dark sections

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-020

## Goal
Add subtle, elegant floating ember particles to all dark sections of the website — not just the hero. These should be present when scrolling through the main page and on blog pages, creating a cohesive "living fire" atmosphere across the entire site.

## Context
The owner wants: "light, very elegant and style-consistent embers should be present in all absolutely dark sections of the site (i.e., when scrolling the main page, and also in blog)." The embers should be much more subtle than the hero embers — think ambient particles, not a fire effect. They should feel like faint sparks drifting through the background.

## Requirements

### 1. Create a global ambient ember system

**In `index.html`**, add a fixed-position ember container right after the opening `<body>` tag:

```html
<div class="ambient-embers" aria-hidden="true">
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

### 2. CSS for ambient embers

**In `styles.css`**, add:

```css
/* ═══════════════════════════════════════════════════
   AMBIENT EMBERS — site-wide background particles
   ═══════════════════════════════════════════════════ */
.ambient-embers {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ambient-ember {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: ambientFloat linear infinite;
}

/* Very subtle — low opacity, slow, spread across viewport */
.ambient-ember:nth-child(1) { left: 8%;  bottom: -5%; animation-duration: 18s; animation-delay: 0s;   width: 2px; height: 2px; opacity: 0; }
.ambient-ember:nth-child(2) { left: 25%; bottom: -5%; animation-duration: 22s; animation-delay: 4s;   width: 3px; height: 3px; background: var(--accent2); }
.ambient-ember:nth-child(3) { left: 45%; bottom: -5%; animation-duration: 20s; animation-delay: 8s;   width: 2px; height: 2px; }
.ambient-ember:nth-child(4) { left: 65%; bottom: -5%; animation-duration: 24s; animation-delay: 2s;   width: 2px; height: 2px; background: var(--accent2); }
.ambient-ember:nth-child(5) { left: 80%; bottom: -5%; animation-duration: 19s; animation-delay: 10s;  width: 3px; height: 3px; }
.ambient-ember:nth-child(6) { left: 92%; bottom: -5%; animation-duration: 21s; animation-delay: 6s;   width: 2px; height: 2px; }

@keyframes ambientFloat {
  0%   { opacity: 0; transform: translateY(0) translateX(0); }
  5%   { opacity: 0.3; }
  30%  { opacity: 0.2; transform: translateY(-30vh) translateX(10px); }
  60%  { opacity: 0.15; transform: translateY(-60vh) translateX(-8px); }
  90%  { opacity: 0.05; }
  100% { opacity: 0; transform: translateY(-105vh) translateX(5px); }
}
```

Key design decisions:
- **`position: fixed`** — embers float relative to the viewport, always visible regardless of scroll
- **`z-index: 0`** — behind all content but above the background
- **Very low opacity** (max 0.3) — ambient, not distracting
- **Slow animation** (18-24s) — gentle drift, not frantic
- **Small particles** (2-3px) — subtle sparks
- **6 particles** — enough for ambiance, not overwhelming

### 3. Do NOT duplicate with hero embers

The hero section already has its own `.embers` container with `position: absolute` inside `.hero`. The ambient embers are separate — they float across the entire viewport. On the hero section, both are visible, which is intentional (ambient adds background depth behind the hero's foreground embers).

### 4. Reduced motion

Add to existing `@media (prefers-reduced-motion: reduce)` block:
```css
.ambient-ember { animation: none; }
```

## Do NOT touch
- Hero ember system (`.embers`, `.ember` classes)
- `script.js`
- Content or text in any section
- Existing CSS rules

## Acceptance Criteria
- [ ] Ambient ember container is present in `index.html`, `blog.html`, `blog/_template.html`
- [ ] 6 subtle particles float upward across the viewport
- [ ] Particles are very faint (max opacity ~0.3)
- [ ] Particles move slowly (18-24s per cycle)
- [ ] Mix of orange and golden particles
- [ ] Embers are visible when scrolling through dark sections
- [ ] Embers don't interfere with clicking/selecting content (pointer-events: none)
- [ ] z-index doesn't cause layering issues with header or modals
- [ ] Reduced motion: no animation
- [ ] No performance issues on mobile

## Verification
- Open index.html — scroll slowly through the full page. Faint embers should be visible floating upward in the background
- Open blog.html — same ambient embers present
- Open blog/_template.html — same ambient embers present
- Resize to 375px — embers still visible, no overflow issues
- Check DevTools performance — smooth 60fps, no layout thrashing

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
