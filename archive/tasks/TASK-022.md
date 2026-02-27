# TASK-022: "Why it actually works" blur reveal interaction

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-019

## Goal
Add a stylish blur-to-reveal interaction to the "Why it actually works" benefit cards. The description text (everything after the bold title) starts blurred and becomes readable when the user clicks/taps on the card. The fact that it's clickable must be visually obvious.

## Context
The owner wants the benefit descriptions to be hidden behind a stylish blur effect. Example: **Break the loop.** is visible, but *"Doomscrolling, overthinking, anxiety spirals..."* is blurred until clicked. This creates curiosity and engagement — the user actively discovers why InnerFire works.

## Requirements

### 1. HTML structure update in `index.html`

Wrap each benefit description in a `<span>` with a class for targeting:

```html
<ul class="benefits">
  <li class="benefit-item" tabindex="0" role="button" aria-expanded="false">
    <strong>Break the loop.</strong>
    <span class="benefit-detail">Doomscrolling, overthinking, anxiety spirals - your brain is stuck in a pattern. InnerFire gives it something physical and immediate to do instead.</span>
  </li>
  <li class="benefit-item" tabindex="0" role="button" aria-expanded="false">
    <strong>Multisensory grounding.</strong>
    <span class="benefit-detail">Your breath controls fire, vibration, sound, and light at once. This sensory load activates your vagus nerve and pulls your nervous system back to calm.</span>
  </li>
  <li class="benefit-item" tabindex="0" role="button" aria-expanded="false">
    <strong>No friction when you need it most.</strong>
    <span class="benefit-detail">No paywall after 5 minutes. No sign-up gate. No guided meditation voice. Just you, your breath, and the environment. Open the app - breathe - done.</span>
  </li>
</ul>
```

### 2. CSS for blur effect

**In `styles.css`**, update benefit styles:

```css
.benefit-item {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.benefit-detail {
  display: inline;
  filter: blur(5px);
  transition: filter 0.5s ease;
}

/* Revealed state */
.benefit-item.revealed .benefit-detail {
  filter: blur(0);
}

/* Hint that it's clickable — subtle pulsing underline */
.benefit-item::after {
  content: 'tap to reveal';
  display: block;
  margin-top: 10px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  opacity: 0.6;
  transition: opacity 0.3s;
}

.benefit-item.revealed::after {
  content: '';
  display: none;
}

/* Hover hint on desktop */
.benefit-item:hover .benefit-detail:not(.revealed .benefit-detail) {
  filter: blur(3px);
}
```

### 3. JavaScript for click toggle

**In `script.js`**, add at the end:

```js
// Blur reveal on benefit cards
document.querySelectorAll('.benefit-item').forEach(function(item) {
  item.addEventListener('click', function() {
    this.classList.toggle('revealed');
    this.setAttribute('aria-expanded', this.classList.contains('revealed'));
  });
  item.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});
```

### 4. Accessibility

- `tabindex="0"` makes cards keyboard-focusable
- `role="button"` + `aria-expanded` communicates state to screen readers
- Keyboard Enter/Space triggers the reveal
- Reduced motion: in the `@media (prefers-reduced-motion: reduce)` block, disable blur animation:

```css
@media (prefers-reduced-motion: reduce) {
  .benefit-detail {
    filter: none;
    transition: none;
  }
  .benefit-item::after {
    display: none;
  }
}
```

## Do NOT touch
- Hero section
- Carousel section
- About section
- `blog.html`, `blog/_template.html`

## Acceptance Criteria
- [ ] Benefit descriptions start blurred (unreadable)
- [ ] Bold titles (strong) are always visible and sharp
- [ ] Each card shows a "tap to reveal" hint text
- [ ] Click/tap on a card reveals the description with smooth unblur transition (0.5s)
- [ ] Clicking again re-blurs (toggle behavior)
- [ ] "tap to reveal" disappears when revealed
- [ ] Keyboard navigation works (Tab + Enter/Space)
- [ ] `aria-expanded` updates correctly
- [ ] Reduced motion: blur is disabled, text always visible
- [ ] Desktop hover: blur slightly reduces (3px) as hint
- [ ] Works on mobile (375px), tablet (768px), desktop

## Verification
- Open index.html — scroll to "Why it actually works"
- Descriptions should be blurred, titles clear
- "tap to reveal" text visible under each card
- Click a card — text unblurs smoothly, hint disappears
- Click again — text re-blurs, hint returns
- Tab to a card + press Enter — same toggle behavior
- Enable "prefers-reduced-motion" in DevTools — text should be fully visible, no animation

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
