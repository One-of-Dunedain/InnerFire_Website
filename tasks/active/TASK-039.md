# TASK-039: Article UX/UI polish — forms, spacing, consistency fixes

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: TASK-038 (DONE)

## Problem
Several UX/UI issues remain after TASK-038:
1. **Both signup forms** in the article collect only email — but `index.html` collects first name + email. Missing name field on both article forms.
2. **InnerFire card signup box** (`.app-card-signup`) looks ugly — it's a generic dashed-border box that feels out of place inside the review card. The form is crammed with no breathing room.
3. **Bottom CTA** (`article-cta-card`) also missing name field.
4. **Mobile cards still feel cluttered** — padding/spacing can be tightened further. The content "floats" with unused space inside the container rather than using the full width.
5. **Several UX inconsistencies** across the article detailed below.

## Changes

### 1. Add first name field to BOTH article forms

Both forms must match `index.html` pattern. Kit.com field name: `fields[first_name]`.

**InnerFire card form (line ~1100):**
Change from:
```html
<input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
<button class="btn-primary" type="submit">Request Beta Access</button>
```
To:
```html
<input type="text" name="fields[first_name]" placeholder="First Name" class="email-input" required />
<input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
<button class="btn-primary" type="submit">Request Beta Access</button>
```

**Bottom CTA form (line ~1616):**
Change from:
```html
<input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
<button class="btn-primary" type="submit">Get Early Access</button>
```
To:
```html
<input type="text" name="fields[first_name]" placeholder="First Name" class="email-input" required />
<input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
<button class="btn-primary" type="submit">Get Early Access</button>
```

### 2. Redesign InnerFire card signup box

The current `.app-card-signup` is positioned BETWEEN the description and pros/cons, which breaks the reading flow of the review. Move it and restyle it.

**Move the signup block to AFTER the verdict** (bottom of the card, after `.app-card-verdict`). This way the reader finishes the review first, then sees the CTA — natural flow.

**Restyle the signup box** to feel like a natural extension of the card, not a foreign embed:

```css
.app-card-signup {
  margin: 20px 0 0 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 138, 61, 0.04);
  border: 1px solid rgba(255, 138, 61, 0.12);
}
.app-card-signup-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  text-transform: none;
  letter-spacing: normal;
}
.app-card-signup-text {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 14px;
}
.app-card-signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.app-card-signup-form .email-input {
  max-width: none;
  width: 100%;
  padding: 12px 14px;
  font-size: 0.92rem;
}
.app-card-signup-form .btn-primary {
  width: 100%;
  text-align: center;
  padding: 12px 20px;
}
```

On desktop (>768px), the form can be 2-column for the inputs:
```css
@media (min-width: 769px) {
  .app-card-signup-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .app-card-signup-form .btn-primary {
    grid-column: 1 / -1;
    max-width: 280px;
    justify-self: center;
  }
}
```

### 3. Redesign bottom CTA card

The current bottom CTA has a vertical flex layout with centered text. With 2 input fields it needs restructuring:

```css
.article-cta-card {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
  padding: 40px 32px;
  text-align: center;
}
.article-cta-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.article-cta-form .email-input {
  max-width: none;
  width: 100%;
}
.article-cta-form .btn-primary {
  width: 100%;
}
```

On desktop, inputs side by side:
```css
@media (min-width: 769px) {
  .article-cta-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    max-width: 520px;
  }
  .article-cta-form .btn-primary {
    grid-column: 1 / -1;
    max-width: 280px;
    justify-self: center;
  }
}
```

### 4. Mobile spacing improvements

The cards feel "cluttered" because content has padding but doesn't use the full container width. Fix:

```css
@media (max-width: 480px) {
  /* Article container — reduce side padding on small screens */
  .article-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  /* App card — snug to container edges */
  .app-card {
    padding: 14px;
    margin-bottom: 12px;
    border-radius: 12px;
  }

  /* Card header — tighter */
  .app-card-header {
    gap: 0 10px;
  }

  /* Card name — slightly smaller */
  .app-card-name {
    font-size: 1rem;
  }

  /* Meta text — smaller */
  .app-card-meta {
    font-size: 0.78rem;
  }

  /* Badge — more compact */
  .app-card-badge {
    font-size: 0.68rem;
    padding: 1px 6px;
  }

  /* Expanded body — tighter */
  .app-card-body {
    padding-top: 2px;
  }
  .app-card-description {
    font-size: 0.88rem;
    line-height: 1.6;
    margin-bottom: 14px;
  }
  .app-card-pricing {
    padding: 10px;
    margin: 10px 0;
  }
  .app-card-pricing ul {
    font-size: 0.82rem;
  }
  .app-card-grid {
    gap: 12px;
    margin-bottom: 14px;
  }
  .app-card-pros li,
  .app-card-cons li {
    font-size: 0.84rem;
  }
  .ugc-quote {
    padding: 8px 10px;
    font-size: 0.82rem;
  }
  .app-card-verdict {
    font-size: 0.85rem;
    padding-top: 10px;
  }

  /* Quick picks table — full bleed */
  .quick-picks-table {
    font-size: 0.8rem;
  }

  /* Filter chips — tighter */
  .filter-chip {
    padding: 5px 12px;
    font-size: 0.78rem;
  }

  /* Section headings — more compact */
  .article-body h2 {
    font-size: 1.2rem;
    margin-top: 32px;
  }

  /* Bottom CTA */
  .article-cta-card {
    padding: 28px 16px;
  }
  .article-cta-card h3 {
    font-size: 1.1rem;
  }
}
```

### 5. Fix other UX inconsistencies

**a) InnerFire card — remove signup from between description and pros/cons**
As described in change #2, move `.app-card-signup` div to AFTER `.app-card-verdict` in the HTML. Current position breaks the natural reading order: description → signup form → pros/cons is wrong. Should be: description → pros/cons → verdict → signup.

**b) Section separator consistency**
Check that all category sections (anxiety-apps, sleep-apps, etc.) have consistent top padding and border-top. Current CSS targets them by ID — make sure all 7+ sections are included, including any new sections added for Wave 2 apps.

**c) Reading progress bar**
The `.reading-progress` bar at the top has no visual styling in the current context. Ensure it's styled:
```css
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  z-index: 1000;
  transition: width 0.1s linear;
}
```
If this style already exists in `styles.css`, no change needed. If missing, add it.

**d) Comparison table — check all 16 apps present**
Verify the comparison table has rows for all 16 apps. If any Wave 2 apps are missing, add them.

**e) Quick Picks table — hide last 2 columns on very small screens**
On <380px, the table with 4 columns gets too cramped. Hide "Free tier" column:
```css
@media (max-width: 380px) {
  .quick-picks-table th:nth-child(4),
  .quick-picks-table td:nth-child(4) { display: none; }
}
```

## Files to modify

| File | Changes |
|------|---------|
| `blog/best-breathwork-apps.html` | Add first_name fields to both forms, move `.app-card-signup` after verdict, verify comparison table completeness |
| `styles.css` | Restyle `.app-card-signup`, update `.article-cta-form`, add 480px mobile tightening, reading progress bar, quick-picks responsive |

## Do NOT
- Change any app card text content (descriptions, verdicts, UGC, etc.)
- Modify Schema.org JSON-LD
- Change the inline `<script>` block functionality
- Modify `script.js`
- Remove any existing TASK-037/038 features (card collapse, filter chips, next-app links)
- Change desktop layout above 768px (except the form grid improvements noted)

## Acceptance Criteria
- [ ] InnerFire card form: has first_name + email fields
- [ ] Bottom CTA form: has first_name + email fields
- [ ] Both forms use `name="fields[first_name]"` matching Kit.com / index.html pattern
- [ ] InnerFire `.app-card-signup` is positioned AFTER the verdict (not between description and pros/cons)
- [ ] `.app-card-signup` has warm accent border, not generic grey
- [ ] Both forms work: fields required, submit posts to Kit.com
- [ ] Mobile 375px: cards are tighter (14px padding, 12px gap)
- [ ] Mobile 375px: article container has 12px side padding (less wasted space)
- [ ] Mobile 375px: text sizes reduced proportionally (names, meta, pricing)
- [ ] Desktop: forms show inputs side-by-side in grid, submit centered below
- [ ] Reading progress bar visible at top of page
- [ ] Quick Picks table hides "Free tier" column on <380px screens
- [ ] All 16 apps present in comparison table
- [ ] All section separators consistent
- [ ] No broken layouts at 375px, 480px, 768px, 1024px, 1920px

## Verification
1. Open 375px mobile — cards should feel less cluttered, more edge-to-edge
2. Scroll to InnerFire card, expand — signup form is at bottom after verdict
3. Fill first name + email in InnerFire form — submit works
4. Scroll to bottom CTA — first name + email both present
5. Submit bottom CTA — works
6. Check desktop 1920px — forms have side-by-side inputs
7. Open Quick Picks on 375px — readable, "Free tier" column hidden on tiny screens
8. Reading progress bar visible as orange line at very top during scroll
9. All filter chips, collapse/expand, next-app links still working

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
