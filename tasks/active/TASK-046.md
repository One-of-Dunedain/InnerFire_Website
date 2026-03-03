# TASK-046: Form audit — verify all signup forms match Kit pattern

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-043 (DONE), TASK-044 (DONE), TASK-045 (DONE)

## Context

After TASK-039/041/042/043/044/045 touched multiple pages (adding forms, CTAs, privacy page), we need to verify that all signup forms are consistent and functional.

**Current state (as of pre-audit):** All 7 forms use identical Kit config (form ID 9132207, data-uid b081b4720d, fields: email_address + fields[first_name]). This task confirms nothing broke during the privacy/consent work and fixes any drift.

**This task modifies 0–3 files (only if inconsistencies found).**

## Audit Checklist

For each page with a form, verify:

### Field consistency

| Check | Expected |
|-------|----------|
| `action` URL | `https://app.kit.com/forms/9132207/subscriptions` |
| `method` | `post` |
| `data-sv-form` | `9132207` |
| `data-uid` | `b081b4720d` |
| Field 1 | `<input type="text" name="fields[first_name]" placeholder="First Name" class="email-input" required />` |
| Field 2 | `<input type="email" name="email_address" placeholder="Email Address" class="email-input" required />` |
| Submit button | `<button class="btn-primary" type="submit">Get Early Access</button>` |
| Preconnect | `<link rel="preconnect" href="https://app.kit.com" crossorigin />` in `<head>` |

### Pages to audit

1. `index.html` — hero signup section (`#signup`)
2. `blog.html` — blog newsletter section (`.blog-newsletter`)
3. `blog/best-breathwork-apps.html` — article CTA + InnerFire card signup
4. `blog/vagus-nerve-breathing.html` — article CTA section
5. `blog/build-breathing-habit.html` — article CTA section
6. `privacy.html` — should NOT have a form (verify)

### Template consistency

7. `blog/_template.html` — article CTA matches pattern
8. `blog/_listicle-template.html` — article CTA matches pattern

### Functional test

For each form:
- Submit with valid email + first name → Kit receives submission
- Submit with empty email → browser validation blocks
- Submit with empty first name → browser validation blocks
- Check Network tab: form POST goes to app.kit.com

## What to fix (if found)

- Missing `fields[first_name]` → add it before email field
- Wrong `data-sv-form` or `data-uid` → correct to canonical values
- Missing `preconnect` → add to `<head>`
- Field order inconsistency → standardize to first_name, email, button
- Missing `required` attribute → add

## Do NOT

- Add new forms to pages that don't have them
- Change Kit form ID or data-uid (these are correct)
- Add honeypot fields (that's TASK-047)
- Modify form styling

## Acceptance Criteria

- [ ] All forms across all pages have identical Kit configuration
- [ ] All forms have both first_name and email_address fields
- [ ] All forms have `required` on both inputs
- [ ] Preconnect header present on all pages with forms
- [ ] Templates match the same pattern
- [ ] privacy.html has no signup form
- [ ] Manual submission test: at least 1 form submits successfully to Kit

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
