# Task Queue

---

## [TASK-001] Add OG meta tags and page SEO
Status: DONE
Priority: High
Owner: Executor AI

---

## [TASK-002] Add favicon
Status: DONE
Priority: Medium
Owner: Executor AI

### Goal
Add a minimal flame emoji favicon so the browser tab shows an icon instead of a blank page icon.

### Context
Small detail, but adds credibility when someone opens the link. Zero-dependency solution: use an SVG data URI or emoji favicon — no image file needed.

### Requirements
- Add to `<head>` in `index.html`:
  ```html
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
  ```
- Add the same tag to `blog.html`
- Do NOT create any image files

### Do NOT touch
- `styles.css`
- `script.js`
- Any section HTML inside `<body>`

### Acceptance Criteria
- [ ] Browser tab shows 🔥 icon on `index.html`
- [ ] Browser tab shows 🔥 icon on `blog.html`
- [ ] No image files added to repo

### Verification
- Open `index.html` in browser — check tab icon
- Open `blog.html` in browser — check tab icon

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-003] Replace placeholder social links in footer
Status: SUPERSEDED
Note: Requirements changed — see TASK-010. Instagram and YouTube are removed. New platforms: TikTok, X, Discord.

---

## [TASK-004] Connect ConvertKit email form
Status: DONE
Priority: High
Owner: Executor AI

### Goal
Replace the disabled placeholder form with a working ConvertKit inline form.

### Context
This is the core conversion mechanism. Requires the owner to first create a ConvertKit account and provide the embed code. Do NOT start this task until the embed code is provided.

### Requirements
- Once embed code is provided:
  - In `index.html`: delete the entire `<div class="form-placeholder">...</div>` block
  - Paste the ConvertKit embed code in its place (inside `.signup .container`, after `.signup-note`)
  - Do NOT modify ConvertKit's HTML — paste as-is
  - Remove the ConvertKit instructions comment block

### Do NOT touch
- `styles.css`
- `script.js`
- Any other section outside `.signup`

### Acceptance Criteria
- [ ] Placeholder `<div class="form-placeholder">` is gone
- [ ] ConvertKit embed code is present
- [ ] Submitting a test email shows success message
- [ ] Test email appears in ConvertKit dashboard

### Verification
- Open `index.html` — form is visible and enabled
- Submit a test email — confirm it arrives in ConvertKit

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-005] Create CLAUDE.md for AI auto-loading rules
Status: DONE
Priority: Low
Owner: Executor AI

### Goal
Create `CLAUDE.md` in the project root so Claude Code automatically loads the project rules.

### Requirements
- Copy `content/user-rules.md` to `CLAUDE.md` in the project root
- No content changes — copy verbatim
- Do NOT delete `content/user-rules.md`

### Do NOT touch
- `content/user-rules.md` (read-only source)
- Any other project files

### Acceptance Criteria
- [ ] `CLAUDE.md` exists in project root
- [ ] Content is identical to `content/user-rules.md`
- [ ] `content/user-rules.md` still exists

### Verification
- Run: `diff CLAUDE.md content/user-rules.md` — no differences

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-006] Add sticky header navigation
Status: DONE
Priority: High
Owner: Executor AI

### Goal
Add a fixed/sticky header bar at the top of all pages with the InnerFire brand name and navigation links. The header must work on both `index.html` and `blog.html`.

### Context
Currently there is no way to navigate between pages except a small "Blog" link in the footer. Users from social media need to see a professional header. The header should be minimal and not distract from the content. It must be semi-transparent with a blur backdrop so it blends with the dark fire aesthetic.

### Requirements

**HTML — add to BOTH `index.html` and `blog.html`, as the first element inside `<body>`:**
```html
<header class="site-header">
  <div class="container header-inner">
    <a href="./index.html" class="header-logo">InnerFire</a>
    <nav class="header-nav">
      <a href="./blog.html">Blog</a>
      <a href="./index.html#signup" class="btn-header">Get Early Access</a>
    </nav>
  </div>
</header>
```

**CSS — add to `styles.css`:**
- `.site-header`: fixed at top, full width, z-index 100, background `rgba(10,13,18,0.85)` with `backdrop-filter: blur(12px)`, border-bottom `1px solid rgba(255,255,255,0.06)`, padding `14px 0`
- `.header-inner`: flex, justify-content space-between, align-items center
- `.header-logo`: color `var(--accent)`, font-weight 800, font-size 1.1rem, no text-decoration, letter-spacing 0.05em
- `.header-nav`: flex, gap 24px, align-items center
- `.header-nav a`: color `var(--muted)`, no text-decoration, font-size 0.9rem, font-weight 600, transition color 0.2s
- `.header-nav a:hover`: color `var(--text)`
- `.btn-header`: color `var(--accent)` (not muted), border `1px solid var(--accent)`, padding `6px 16px`, border-radius `var(--radius)`
- `.btn-header:hover`: background `var(--accent)`, color `#000`
- Add `padding-top: 60px` to `.hero` and `.page-header` to account for fixed header

**In `index.html` footer:** remove the existing `<div class="footer-nav">` block (link to Blog) — it's now in the header.

### Do NOT touch
- `script.js`
- Any existing section content/copy

### Acceptance Criteria
- [ ] Header is visible at top of `index.html` — shows "InnerFire" logo + "Blog" + "Get Early Access"
- [ ] Header is visible at top of `blog.html` — same header
- [ ] Header stays fixed when scrolling
- [ ] Header has glass/blur effect on scroll
- [ ] "Get Early Access" in header scrolls to `#signup` on index page
- [ ] "Blog" navigates to `blog.html`
- [ ] Old footer nav block for Blog is removed from `index.html`
- [ ] Hero content is not hidden behind the header

### Verification
- Open `index.html` — scroll down, header stays at top
- Click "Blog" in header — navigates to `blog.html`
- Click "Get Early Access" — scrolls to signup section
- Open on mobile width (375px) — header still fits

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-007] Reduce hero whitespace and tighten layout
Status: DONE
Priority: High
Owner: Executor AI

### Goal
Reduce the excessive empty space on the first screen. The hero currently takes 100svh which leaves too much dead space above and below the content on most screens.

### Context
Visitors from TikTok/Reels have very short attention. The hero should fit content tightly and the next section (carousel) should be partially visible on first load to invite scrolling. The hero glow and embers should still work.

### Requirements
- In `styles.css`, change `.hero`:
  - `min-height: 100svh` → `min-height: 85svh`
  - `padding: 80px 0 120px` → `padding: 80px 0 60px` (account for header padding-top added in TASK-006)
- No changes to HTML structure or content

### Do NOT touch
- `index.html`
- `blog.html`
- `script.js`
- Any CSS unrelated to `.hero` sizing

### Acceptance Criteria
- [ ] Hero section is shorter — next section is partially visible on a 1080px-tall viewport
- [ ] Hero content (eyebrow, h1, subtitle, button) is still vertically centered
- [ ] Fire glow and embers still animate correctly
- [ ] No content is cut off

### Verification
- Open `index.html` at 1920x1080 — carousel section should be slightly visible below the fold
- Open on mobile (375x812) — hero content still centered, not cramped

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-008] Rewrite page copy and restructure content sections
Status: TODO
Priority: High
Owner: Executor AI

### Goal
Rewrite all text content on the landing page and restructure sections to tell a cohesive story that builds curiosity → understanding → trust → action.

### Context
The current copy is generic ("Built for people who feel too much, too fast"). The owner provided specific messaging pillars:
- Feeling your breath through vibration, environment reaction, light, and sound is a fast way to ground during anxiety, stress, doomscrolling recovery, and improve sleep
- Breathing environments = blend of video, audio, light, vibration — intensity correlates with breath
- No paywalls every 5 minutes
- InnerFire is an experience of solitude and calming
- Planned habit tracking system

The page narrative must flow: HOOK → SHOW → EXPLAIN → TRUST → CONVERT

### Requirements

**Section 1 — Hero (keep structure, update subtitle only):**
- Keep headline: `Your exhale.<br>On fire.`
- Change subtitle to:
  ```
  Blow into your phone. Watch fire, sound, and vibration respond to your breath. A full-body reset in under 5 minutes.
  ```
- Keep CTA button as-is

**Section 2 — Carousel (update intro text only):**
- Change `<h2>` from "See it in action" to: `Breathing Environments`
- Change `<p>` from "Real exhales. Real fire. Different places." to:
  ```
  Each environment blends video, sound, light, and haptics into one immersive experience — all driven by how you breathe.
  ```
- Keep carousel cards unchanged

**Section 3 — "Why it works" (rewrite the `.for-who` section entirely):**
Replace the current `.for-who` section HTML with:
```html
<section class="why-it-works">
  <div class="container">
    <h2>Why it actually works</h2>
    <ul class="benefits">
      <li>
        <strong>Break the loop.</strong>
        Doomscrolling, overthinking, anxiety spirals — your brain is stuck in a pattern. InnerFire gives it something physical and immediate to do instead.
      </li>
      <li>
        <strong>Multisensory grounding.</strong>
        Your breath controls fire, vibration, sound, and light at once. This sensory load activates your vagus nerve and pulls your nervous system back to calm.
      </li>
      <li>
        <strong>No friction when you need it most.</strong>
        No paywall after 5 minutes. No sign-up gate. No guided meditation voice. Just you, your breath, and the environment. Open the app — breathe — done.
      </li>
    </ul>
  </div>
</section>
```
- In `styles.css`: rename `.for-who` to `.why-it-works` (search and replace all occurrences)

**Section 4 — Signup (update heading text only):**
- Keep `<h2>` as "Be one of 300 early testers."
- Keep sub/note text unchanged
- Keep form placeholder as-is (will be replaced in TASK-004)

**Update `<meta name="description">` and `og:description` in `<head>` to match new subtitle:**
```
Blow into your phone. Watch fire, sound, and vibration respond to your breath. A full-body reset in under 5 minutes.
```

### Do NOT touch
- `script.js`
- `blog.html`
- Carousel card HTML (only the intro text above it)
- Signup form HTML
- Footer HTML
- Any CSS except renaming `.for-who` → `.why-it-works`

### Acceptance Criteria
- [ ] Hero subtitle updated to new text
- [ ] Carousel section heading is "Breathing Environments"
- [ ] `.for-who` section replaced with `.why-it-works` containing 3 new benefit cards
- [ ] Each benefit card has a `<strong>` title + explanation text
- [ ] Meta description updated to match new subtitle
- [ ] OG description updated to match new subtitle
- [ ] No CSS layout changes (only class rename)

### Verification
- Open `index.html` — read through all sections top to bottom
- Confirm text matches the copy specified above (no improvisation)
- Check `.for-who` no longer exists in HTML or CSS (replaced by `.why-it-works`)

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-009] Add About the Author section
Status: TODO
Priority: High
Owner: Executor AI

### Goal
Add an "About the Author" section between the "Why it works" section and the Signup section. This section builds trust by showing InnerFire was created by a real person with a real story.

### Context
The author lives in Ukraine. When the full-scale Russian invasion started, he needed something fast and physical to cope with stress during bombardments. Meditation apps felt too slow. Breathing timers felt abstract. So he built InnerFire — first for himself, then for others. This origin story is authentic and emotionally powerful. It must be written respectfully — honest, not exploitative.

### Requirements

**HTML — add BEFORE the `<!-- EMAIL SIGNUP -->` section in `index.html`:**
```html
<!-- ABOUT -->
<section class="about">
  <div class="container">
    <div class="about-card">
      <div class="about-photo">
        <!-- Replace with real photo: <img src="./author.jpg" alt="Maryan Kushnir" /> -->
        <div class="photo-placeholder"></div>
      </div>
      <div class="about-text">
        <h2>Built from the front line</h2>
        <p>Hi, I'm Maryan. I live in Ukraine.</p>
        <p>When the full-scale invasion started, I needed something fast and physical to cope with the stress of air raids. Meditation apps felt too slow. Breathing timers felt abstract. So I built InnerFire — first for myself, then for everyone who needs to feel their breath working, right now.</p>
        <p>This is not a corporate product. It's something I made because I needed it to survive.</p>
        <a href="https://www.linkedin.com/in/kushnir-maryan/" target="_blank" rel="noopener" class="author-link">Connect on LinkedIn →</a>
      </div>
    </div>
  </div>
</section>
```

**CSS — add to `styles.css`:**
```css
/* About the Author */
.about {
  padding: 80px 0;
}
.about-card {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
.about-photo {
  flex: 0 0 120px;
}
.photo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid rgba(255,255,255,0.08);
}
.about-photo img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.08);
}
.about-text h2 {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  font-weight: 700;
  margin-bottom: 16px;
}
.about-text p {
  color: var(--muted);
  margin-bottom: 12px;
  font-size: 0.95rem;
  line-height: 1.7;
}
.author-link {
  display: inline-block;
  margin-top: 8px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.author-link:hover { color: var(--accent2); }

/* Mobile: stack vertically */
@media (max-width: 480px) {
  .about-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
```

### Do NOT touch
- `script.js`
- `blog.html`
- Any existing sections (hero, carousel, why-it-works, signup, footer)
- Only ADD new HTML and CSS

### Acceptance Criteria
- [ ] About section appears between "Why it works" and "Signup"
- [ ] Shows round photo placeholder (120px circle)
- [ ] Shows heading "Built from the front line"
- [ ] Shows 3 paragraphs of author story
- [ ] LinkedIn link opens in new tab and points to correct URL
- [ ] On mobile (≤480px): photo and text stack vertically and center
- [ ] Visual style matches existing dark theme

### Verification
- Open `index.html` — scroll to About section
- Check LinkedIn link works (opens correct profile)
- Resize to 375px width — confirm vertical stack layout

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-010] Replace social links — remove Instagram/YouTube, add TikTok/X/Discord
Status: DONE
Priority: Medium
Owner: Executor AI

### Goal
Update footer social links to match the owner's actual platforms. Remove Instagram and YouTube (not used). Add TikTok, X (Twitter), and Discord with real URLs.

### Context
Owner provided:
- Discord: https://discord.gg/PRuveBJH
- X (Twitter): https://x.com/kushnir_marian_
- TikTok: URL not yet provided — use `#` as placeholder with a comment

### Requirements
In `index.html`, replace the current social links block:
```html
<div class="social-links">
  <a href="#" class="social-link">TikTok</a>
  <a href="#" class="social-link">Instagram</a>
  <a href="#" class="social-link">YouTube</a>
</div>
```
With:
```html
<div class="social-links">
  <!-- TikTok URL: replace # when provided -->
  <a href="#" class="social-link" target="_blank" rel="noopener">TikTok</a>
  <a href="https://x.com/kushnir_marian_" class="social-link" target="_blank" rel="noopener">X</a>
  <a href="https://discord.gg/PRuveBJH" class="social-link" target="_blank" rel="noopener">Discord</a>
</div>
```

### Do NOT touch
- `styles.css`
- `script.js`
- `blog.html`
- Any HTML outside the `.social-links` div

### Acceptance Criteria
- [ ] Footer shows exactly 3 links: TikTok, X, Discord
- [ ] Instagram and YouTube links are gone
- [ ] X link points to `https://x.com/kushnir_marian_`
- [ ] Discord link points to `https://discord.gg/PRuveBJH`
- [ ] TikTok has `href="#"` with a comment indicating placeholder
- [ ] All links have `target="_blank" rel="noopener"`

### Verification
- Open `index.html` — check footer links
- Click X link — opens correct profile
- Click Discord link — opens correct invite

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-011] Add share button to carousel cards
Status: TODO
Priority: Medium
Owner: Executor AI

### Goal
Add a share button to each carousel card so users can easily share individual breathing environment videos/content with one click.

### Context
The carousel shows different breathing environments. When real videos are added, users should be able to share them directly from the card. For now (placeholders), the share button should copy the page URL to clipboard with a confirmation tooltip. Later, when videos are linked, share can include the specific video context.

### Requirements

**HTML — add inside each `.card-overlay` in `index.html`, after the `.card-desc` element:**
```html
<button class="card-share" aria-label="Share" data-env="Mountain Peaks">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
</button>
```
Update `data-env` for each card to match its label ("Mountain Peaks", "Meditation Room", etc.)

**CSS — add to `styles.css`:**
```css
.card-share {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  z-index: 2;
}
.card-share:hover { background: rgba(255,138,61,0.3); transform: scale(1.1); }
.card-share:active { transform: scale(0.95); }
```

**JS — add to `script.js`:**
```js
// Share button — copy page link with environment name
document.querySelectorAll('.card-share').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const env = btn.dataset.env;
    const url = window.location.href.split('#')[0];
    const text = `Check out the "${env}" breathing environment on InnerFire`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'InnerFire', text, url });
      } catch (err) { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text} — ${url}`);
      btn.style.background = 'rgba(68,170,85,0.4)';
      setTimeout(() => btn.style.background = '', 1500);
    }
  });
});
```

### Do NOT touch
- `blog.html`
- Any existing card structure (only ADD the button inside each `.card-overlay`)
- Any CSS outside the new `.card-share` rules

### Acceptance Criteria
- [ ] Each of the 5 carousel cards has a share icon button (top-right corner)
- [ ] On mobile: tapping the share button opens the native share sheet (via `navigator.share`)
- [ ] On desktop: clicking copies a link + environment name to clipboard
- [ ] Button shows green feedback briefly after successful copy
- [ ] Clicking share does NOT trigger card hover/scale animation
- [ ] Button is visually subtle (translucent circle) and doesn't dominate the card

### Verification
- Open `index.html` — each carousel card shows a share icon in top-right
- Click share on desktop — check clipboard contains the correct text
- Test on mobile emulation — should trigger native share if supported

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-012] Add signup progress indicator (burning wick)
Status: TODO
Priority: Medium
Owner: Executor AI

### Goal
Add a visual progress indicator near the "Get Early Access" signup section that shows how many people have already signed up (out of the 300 goal). The design should be a burning fuse/wick that correlates with the fire theme.

### Context
This is a social proof + urgency mechanism. Visitors see that others have already joined, which increases their motivation to sign up. The count will be updated manually for now (hardcoded). Later it can be connected to ConvertKit's API.

### Requirements

**HTML — add BEFORE the form placeholder `<div>` inside `.signup .container` in `index.html`:**
```html
<div class="progress-wick">
  <div class="wick-labels">
    <span class="wick-count"><span id="wick-current">0</span> / 300</span>
    <span class="wick-goal">early testers</span>
  </div>
  <div class="wick-track">
    <div class="wick-fill" style="--progress: 0%;"></div>
    <div class="wick-flame"></div>
  </div>
</div>
```

**CSS — add to `styles.css`:**
```css
/* Burning wick progress */
.progress-wick {
  max-width: 360px;
  margin: 0 auto 40px;
}
.wick-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.85rem;
}
.wick-count {
  color: var(--accent);
  font-weight: 700;
}
.wick-goal {
  color: var(--muted);
}
.wick-track {
  position: relative;
  height: 6px;
  background: var(--surface);
  border-radius: 3px;
  overflow: visible;
}
.wick-fill {
  height: 100%;
  width: var(--progress);
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  border-radius: 3px;
  transition: width 1s ease-out;
}
.wick-flame {
  position: absolute;
  top: -8px;
  left: var(--progress);
  width: 10px;
  height: 18px;
  background: radial-gradient(ellipse at bottom, var(--accent2), var(--accent), transparent);
  border-radius: 50% 50% 20% 20%;
  transform: translateX(-50%);
  animation: flicker 0.4s ease-in-out infinite alternate;
  opacity: 0.9;
}
@keyframes flicker {
  0%   { transform: translateX(-50%) scaleY(1) scaleX(1); }
  100% { transform: translateX(-50%) scaleY(1.3) scaleX(0.8); }
}
```

**JS — add to `script.js`:**
```js
// Set wick progress — update these values manually or via API later
(function() {
  const current = 0; // ← UPDATE THIS NUMBER as signups come in
  const goal = 300;
  const pct = Math.min((current / goal) * 100, 100);
  const el = document.getElementById('wick-current');
  const fill = document.querySelector('.wick-fill');
  const flame = document.querySelector('.wick-flame');
  if (el) el.textContent = current;
  if (fill) fill.style.setProperty('--progress', pct + '%');
  if (flame) flame.style.left = pct + '%';
})();
```

### Do NOT touch
- `blog.html`
- Any section outside `.signup`
- The ConvertKit placeholder form (leave as-is)

### Acceptance Criteria
- [ ] Progress wick is visible above the email form in the signup section
- [ ] Shows "0 / 300" and "early testers" labels
- [ ] Track bar is empty (0%) with a tiny flame at the start
- [ ] Flame animates (flicker effect)
- [ ] Changing `const current = 0` to `const current = 150` in `script.js` updates both the number display and the bar fill to 50%
- [ ] Wick is centered and no wider than 360px
- [ ] Works on mobile (375px width)

### Verification
- Open `index.html` — scroll to signup, wick is visible
- Edit `script.js`: change `current = 0` to `current = 150` — refresh, bar shows ~50%, number shows "150"
- Check mobile width — wick doesn't overflow

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
