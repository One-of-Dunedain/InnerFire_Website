# TASK-020: Hero section visual overhaul

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-019

## Goal
Transform the hero section into a more dramatic, immersive experience: more embers, stronger breathing glow, dynamic ember speed tied to the breathing cycle, and restyle the tagline to look premium. Change the CTA button to "Take a look" linking to the carousel.

## Context
The owner feedback: "the ember effect is too weak and there are too few embers on the main screen. The breathing effect should be more noticeable. When the breathing effect gets stronger, embers should fly faster." The tagline "it's just an App - it was always inside you" needs to be styled prominently and beautifully. The CTA should guide users to the carousel, not the signup.

## Requirements

### 1. More embers — increase from 8 to 16

**In `index.html`**, replace the current `.embers` div (8 `<span>` elements) with 16 embers:
```html
<div class="embers" aria-hidden="true">
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
  <span class="ember"></span>
</div>
```

### 2. Enhanced ember CSS — bigger, brighter, varied

**In `styles.css`**, update ember styles:
- Increase base size from 3-5px to 4-8px
- Increase opacity peak from 0.9 to 1
- Add color variation: some embers use `var(--accent2)` (golden) instead of all `var(--accent)` (orange)
- Add CSS custom property `--ember-speed` that the breathing cycle modulates
- Position the 16 embers across the full hero width (not clustered in the center)

Replace existing `.ember:nth-child()` rules with 16 rules covering wider spread (left: 15% to 85%).

Update `@keyframes emberFloat`:
```css
@keyframes emberFloat {
  0%   { opacity: 0; transform: translateY(0) translateX(0) scale(1); }
  10%  { opacity: 1; }
  40%  { opacity: 0.8; transform: translateY(-150px) translateX(20px) scale(0.8); }
  70%  { opacity: 0.4; }
  100% { opacity: 0; transform: translateY(-350px) translateX(-15px) scale(0.2); }
}
```

### 3. Enhanced breathing glow — more dramatic

**In `styles.css`**, update `.hero-glow`:
- Increase base opacity in `@keyframes glowPulse` from 0.6-1.0 to 0.7-1.0
- Increase radial gradient intensity: bump rgba alpha values by ~50%
- Make the scale change more pronounced: `scale(0.95)` to `scale(1.08)`

```css
.hero-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,120,40,0.28) 0%, transparent 70%),
    radial-gradient(ellipse 80% 40% at 50% 70%, rgba(255,80,20,0.16) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at 55% 60%, rgba(255,200,80,0.12) 0%, transparent 50%);
  animation: glowPulse 4s ease-in-out infinite alternate;
}
@keyframes glowPulse {
  0%   { opacity: 0.7; transform: scale(1); }
  50%  { opacity: 1;   transform: scale(1.08); }
  100% { opacity: 0.75; transform: scale(0.95); }
}
```

### 4. Dynamic ember speed synced with breathing

**In `styles.css`**, add a CSS technique: use `animation-duration` that varies with the breathing cycle. Since pure CSS can sync animations, use a shared timing approach:

Give `.embers` container the same breathing animation timing:
```css
.embers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: embersBreathing 4s ease-in-out infinite alternate;
}
@keyframes embersBreathing {
  0%   { --ember-speed-mult: 1; }
  50%  { --ember-speed-mult: 0.6; }
  100% { --ember-speed-mult: 1; }
}
```

Since CSS custom properties can't animate natively in all browsers, use a simpler approach: make the ember container scale slightly and translate during the breathing peak, which creates the visual illusion of embers moving faster:

```css
.embers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: embersBreathing 4s ease-in-out infinite alternate;
}
@keyframes embersBreathing {
  0%   { transform: scale(1) translateY(0); }
  50%  { transform: scale(1.05) translateY(-8px); }
  100% { transform: scale(0.98) translateY(2px); }
}
```

This syncs with the 4s `glowPulse` timing, so when the glow intensifies, the ember container subtly shifts, creating a "breathing accelerates the embers" effect.

### 5. Restyle the hero h1 tagline

The tagline "it's just an App - it was always inside you" needs premium styling. Creative approach — make "it was always inside you" glow with accent color:

**In `index.html`**, wrap the second line:
```html
<h1>it's just an App -<br><span class="hero-emphasis">it was always inside you</span></h1>
```

**In `styles.css`**, add:
```css
.hero-emphasis {
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 6. Restyle the subtitle

**In `index.html`**, structure the subtitle with visual breaks:
```html
<p class="subtitle">Blow into your phone - Watch visual, sound, and vibration respond to your breath.</p>
<p class="subtitle subtitle-secondary">Switch your mind - get anxiety relief.</p>
```

**In `styles.css`**, add:
```css
.subtitle-secondary {
  font-size: 0.95rem;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.02em;
}
```

### 7. CTA button change

**In `index.html`**, change:
```html
<a href="#signup" class="btn-primary">Get Early Access</a>
```
To:
```html
<a href="#demo" class="btn-primary">Take a look</a>
```

**In `index.html`**, add `id="demo"` to the carousel section:
```html
<section class="demo" id="demo">
```

## Do NOT touch
- `blog.html`, `blog/_template.html` (hero is only on index.html)
- Carousel section content
- Signup section
- Footer

## Acceptance Criteria
- [ ] 16 embers visible in the hero (up from 8)
- [ ] Embers are bigger (4-8px) and brighter
- [ ] Some embers are golden (`--accent2`) for color variety
- [ ] Embers spread across full hero width (15%-85%)
- [ ] Breathing glow is noticeably stronger
- [ ] Embers have a breathing sync effect (container animation)
- [ ] "it was always inside you" has gradient text effect
- [ ] "Switch your mind - get anxiety relief." is styled as accent-colored secondary line
- [ ] "Take a look" button links to `#demo`
- [ ] Demo section has `id="demo"` for smooth scroll target
- [ ] Reduced-motion preference still respected
- [ ] Works on mobile (375px), tablet (768px), desktop (1024px+)

## Verification
- Open index.html — hero has dramatically more ember particles floating upward
- Observe breathing glow — noticeably pulsing
- Watch embers — they subtly accelerate during glow peak
- "it was always inside you" shows orange-to-gold gradient text
- "Switch your mind" line is accent-colored
- Click "Take a look" — smooth scrolls to carousel section
- Resize to mobile — embers still visible, no overflow

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
