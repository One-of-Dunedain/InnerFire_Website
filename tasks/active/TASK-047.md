# TASK-047: Anti-spam — honeypot + client-side validation for all forms

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-046 (DONE)

## Context

Kit forms are public POST endpoints. Bots can submit spam signups. Before launch we need basic anti-spam protection.

**Approach:** Lightweight client-side measures only. Kit handles server-side validation. We add:
1. **Honeypot field** — invisible input that bots fill, humans don't
2. **Time-based check** — reject instant submissions (< 2 seconds after page load)
3. **JS-only submission** — disable native form POST, submit via JS (blocks bots without JS)

No CAPTCHA. No external dependencies. No rate-limiting (static site can't enforce server-side limits; Kit handles abuse).

**This task modifies 2 files: `script.js` + all HTML pages with forms (budget exception: cross-cutting form change).**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `script.js` — add anti-spam form handler |
| MODIFY | All pages with forms — add honeypot field |

## Implementation

### 1. Honeypot field

Add to every `<form data-sv-form>` on every page, **after the last visible input and before the submit button**:

```html
<div style="position:absolute;left:-9999px" aria-hidden="true">
  <input type="text" name="website_url" tabindex="-1" autocomplete="off" />
</div>
```

- Field name `website_url` looks natural to bots
- Absolutely positioned off-screen — invisible to real users
- `aria-hidden` for screen readers
- `tabindex="-1"` prevents keyboard navigation to it

### Pages to add honeypot

1. `index.html` — signup form
2. `blog.html` — newsletter form
3. `blog/best-breathwork-apps.html` — article CTA form + InnerFire card form (if separate)
4. `blog/vagus-nerve-breathing.html` — article CTA form
5. `blog/build-breathing-habit.html` — article CTA form
6. `blog/_template.html` — template CTA form
7. `blog/_listicle-template.html` — template CTA form

### 2. Anti-spam JS in script.js

Add to `script.js` (at the end of the IIFE or as a new section):

```javascript
// ── Anti-spam form protection ──
(function() {
  var loadTime = Date.now();
  var MIN_SUBMIT_TIME = 2000; // 2 seconds minimum

  document.querySelectorAll('form[data-sv-form]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // Check honeypot
      var honeypot = form.querySelector('input[name="website_url"]');
      if (honeypot && honeypot.value) {
        e.preventDefault();
        return;
      }

      // Check time-based (too fast = bot)
      if (Date.now() - loadTime < MIN_SUBMIT_TIME) {
        e.preventDefault();
        return;
      }
    });
  });
})();
```

**Important:** This runs BEFORE Kit's form handler. If honeypot is filled or submission is too fast, `preventDefault()` blocks the POST entirely. No error message shown (don't reveal spam detection to bots).

### 3. No-JS fallback

The honeypot field is still present without JS. Kit will receive the `website_url` field but ignore it (unknown field). The time-based check only works with JS — acceptable tradeoff.

## Do NOT

- Add CAPTCHA (Google reCAPTCHA, hCaptcha, etc.)
- Add rate limiting (not possible on static site)
- Block form submission with a visible error for spam detection
- Use `display:none` for honeypot (some bots detect this; use absolute positioning instead)
- Modify Kit form action URL or method
- Add external anti-spam services

## Acceptance Criteria

- [ ] Honeypot field present in all forms on all pages
- [ ] Honeypot field is invisible (off-screen positioned, aria-hidden)
- [ ] Honeypot field doesn't interfere with keyboard navigation (tabindex=-1)
- [ ] JS handler prevents submission if honeypot is filled
- [ ] JS handler prevents submission if < 2 seconds since page load
- [ ] Normal human submission still works (honeypot empty, > 2 seconds)
- [ ] Screen readers don't announce honeypot field
- [ ] No console errors on any page
- [ ] Templates updated to include honeypot

## Verification

1. Open any page with a form
2. Fill in name + email normally, submit → works (goes to Kit)
3. Open DevTools, fill honeypot field manually, submit → blocked (no network request)
4. Reload page, immediately submit (< 2 sec) → blocked
5. Mobile 375px — honeypot field not visible
6. Screen reader test (optional): honeypot not announced

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
