# Task Queue

---

## [TASK-001] Add OG meta tags and page SEO
Status: TODO
Priority: High
Owner: Executor AI

### Goal
Add Open Graph meta tags so the landing page looks good when the link is shared on TikTok, Instagram, and other social platforms.

### Context
The primary traffic source is short-form video content. Viewers will click a link in bio or story. If the OG preview looks blank or broken, conversion drops. This must be done before any traffic is driven to the site.

### Requirements
- Add to `<head>` in `index.html`:
  - `<meta name="description">` — 1 sentence, matches hero subtitle
  - `og:title` — "InnerFire — Breathe. Feel It."
  - `og:description` — same as meta description
  - `og:type` — "website"
  - `og:image` — placeholder path `./og-image.png` (image will be added later)
  - `og:url` — placeholder `https://innerfire.app` (update when domain is known)
  - `twitter:card` — "summary_large_image"
  - `twitter:title`, `twitter:description` — same as OG
- Add same `<meta name="description">` and basic OG to `blog.html`
- Do NOT change any visible page content or styles

### Do NOT touch
- `styles.css`
- `script.js`
- Any section HTML inside `<body>`

### Acceptance Criteria
- [ ] `index.html` has at least 6 OG/meta tags in `<head>`
- [ ] `blog.html` has at least 3 OG/meta tags in `<head>`
- [ ] No visible change to the page layout or content

### Verification
- Open `index.html` in browser — page looks identical to before
- View page source — confirm meta tags are present in `<head>`

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-002] Add favicon
Status: TODO
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
Status: TODO
Priority: Medium
Owner: Executor AI

### Goal
This task is a CONTENT task — the Executor must ask the owner for the real social profile URLs before making changes.

### Context
Footer currently has `href="#"` for TikTok, Instagram, YouTube. Until real URLs are provided, this task cannot be completed. Executor must surface this as a blocker.

### Requirements
- Ask the project owner for:
  - TikTok profile URL
  - Instagram profile URL
  - YouTube channel URL
- Once provided: update the 3 `<a href="#">` links in `index.html` footer
- Add `target="_blank" rel="noopener"` to each link

### Do NOT touch
- `styles.css`
- `script.js`

### Acceptance Criteria
- [ ] All 3 social links have real URLs (not `#`)
- [ ] Each link opens in a new tab
- [ ] No style changes

### Verification
- Click each social link in footer — confirm it opens the correct profile

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---

## [TASK-004] Connect ConvertKit email form
Status: TODO
Priority: High
Owner: Executor AI

### Goal
Replace the disabled placeholder form with a working ConvertKit inline form so visitors can actually submit their email.

### Context
This is the core conversion mechanism. Without it, the goal of 300 emails cannot be achieved. Requires the owner to first create a ConvertKit account and generate a form embed code.

### Requirements
- Ask the project owner to:
  1. Sign up at convertkit.com (free)
  2. Create a new Inline form
  3. Copy the HTML embed code
  4. Provide the embed code
- Once code is provided:
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
- [ ] ConvertKit embed code is present in its place
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
Status: TODO
Priority: Low
Owner: Executor AI

### Goal
Create `CLAUDE.md` in the project root so Claude Code automatically loads the project rules at the start of every session, without needing `@content/user-rules.md` in each message.

### Context
Claude Code reads `CLAUDE.md` automatically on session start. Currently the user must manually reference `content/user-rules.md`. This task eliminates that friction.

### Requirements
- Copy `content/user-rules.md` to `CLAUDE.md` in the project root
- No content changes — copy verbatim
- Do NOT delete `content/user-rules.md` (keep as source of truth)

### Do NOT touch
- `content/user-rules.md` (read-only source)
- Any other project files

### Acceptance Criteria
- [ ] `CLAUDE.md` exists in project root
- [ ] Content of `CLAUDE.md` is identical to `content/user-rules.md`
- [ ] `content/user-rules.md` still exists and is unchanged

### Verification
- Run: `diff CLAUDE.md content/user-rules.md` — no differences

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
