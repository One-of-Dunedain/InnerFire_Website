# TASK-019: Site-wide text cleanup (em-dashes, grammar, voice)

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Goal
Remove all em-dash characters ("—") from user-visible text across the entire site. Fix grammar errors. Change voice from "we" to "I" in signup-related copy.

## Context
The owner explicitly requested: never use "—" anywhere on the site. Several texts also have grammar issues ("a App" instead of "an App") and use "we" when the product is built by a single indie developer ("I").

## Requirements

### 1. Remove all "—" from user-visible text

**`index.html`:**
- Title tag: `InnerFire — Breathe. Feel It.` → `InnerFire - Breathe. Feel It.`
- OG title: same change
- Twitter title: same change
- Meta description: remove any "—" if present
- Demo section subtitle (line ~88): `— all driven by how you breathe.` → `- all driven by how you breathe.`
- "Why it works" benefit 1 (line ~159): `Doomscrolling, overthinking, anxiety spirals — your brain` → `Doomscrolling, overthinking, anxiety spirals - your brain`
- "Why it works" benefit 3 (line ~167): `Open the app — breathe — done.` → `Open the app - breathe - done.`

**`blog.html`:**
- Check all text for "—" and replace with " - "

**`blog/_template.html`:**
- Title tag: `Article Title — InnerFire Blog` → `Article Title - InnerFire Blog`
- OG title: same
- Twitter title: same
- Comment blocks with "—" can stay (not user-visible), but if in template placeholder text that the owner will see, change those too

**All other HTML files:** Scan and fix any remaining "—"

### 2. Fix grammar errors

**`index.html` hero h1 (line 77):**
- `it's just a App -` → `it's just an App -`

### 3. Change "we" → "I" voice

**`index.html` signup section:**
- Line 200: `Leave your email → get free TestFlight access when we launch.` → `Leave your email → get free TestFlight access when I launch.`
- Line 201: `No spam. Just a beta invite when we're ready.` → `No spam. Just a beta invite when I'm ready.`

**`blog.html` newsletter section:**
- Line 70: `We're inviting 300 early testers.` → `I'm inviting 300 early testers.`
- Line 82: `No spam. Just a beta invite when we're ready.` → `No spam. Just a beta invite when I'm ready.`

**`blog/_template.html` article CTA:**
- Check for any "we" references and change to "I"

### 4. Header nav button
**All pages** with `.btn-header`: `Get Early Access` text stays as-is (only the hero button changes in TASK-020).

## Do NOT touch
- `styles.css`
- `script.js`
- HTML structure or layout
- Comment-only content that doesn't appear in UI

## Acceptance Criteria
- [ ] Zero "—" characters in any user-visible text across all HTML files
- [ ] "a App" → "an App" in hero h1
- [ ] All "we"/"we're" in signup/newsletter contexts changed to "I"/"I'm"
- [ ] Title tags, OG tags, Twitter tags all updated
- [ ] No broken HTML after replacements

## Verification
- Search all HTML files for "—" (em-dash, Unicode U+2014) — zero matches in text content
- Open index.html — verify hero says "an App", signup says "when I launch" and "when I'm ready"
- Open blog.html — verify newsletter says "I'm inviting"
- View page source — verify title and meta tags have no em-dashes

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
