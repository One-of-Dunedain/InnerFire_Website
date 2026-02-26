# TASK-024: GA4 + Clarity with custom event tracking

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none

## Goal
Upgrade the existing GA4 and Clarity placeholder code to include custom conversion event tracking for key user actions. The scripts remain commented out (no real IDs yet), but when the owner activates them, event tracking will work immediately.

## Context
TASK-018 added basic GA4 and Clarity snippets (commented out) to all pages. The owner now wants full "implementation" — meaning the tracking code should be production-ready with conversion events, not just basic page views. The owner will provide real IDs later.

## Requirements

### 1. Upgrade GA4 snippet on all pages

Replace the existing GA4 comment block in `index.html`, `blog.html`, and `blog/_template.html` with an enhanced version:

```html
<!-- Google Analytics 4 - Replace G-XXXXXXXXXX with your GA4 Measurement ID, then remove outer comment delimiters to activate -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->
```

This part stays the same. The custom events go in a separate, always-active script.

### 2. Add event tracking script to `script.js`

Add at the end of `script.js`:

```js
// Analytics event helpers - works when GA4 is active, no-ops otherwise
function trackEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

// Track signup form submissions
document.querySelectorAll('form[data-sv-form]').forEach(function(form) {
  form.addEventListener('submit', function() {
    trackEvent('generate_lead', {
      event_category: 'signup',
      event_label: form.closest('.signup') ? 'main_cta' : form.closest('.blog-newsletter') ? 'blog_newsletter' : 'article_cta'
    });
  });
});

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(function(btn) {
  if (btn.type !== 'submit') {
    btn.addEventListener('click', function() {
      trackEvent('cta_click', {
        event_category: 'engagement',
        event_label: btn.textContent.trim()
      });
    });
  }
});

// Track share button clicks
document.querySelectorAll('.card-share, .share-btn, .blog-card-share').forEach(function(btn) {
  btn.addEventListener('click', function() {
    trackEvent('share', {
      event_category: 'engagement',
      event_label: btn.dataset.env || btn.dataset.title || 'article'
    });
  });
});
```

### 3. Clarity stays as-is

The Clarity snippet doesn't need custom events — it automatically records sessions, heatmaps, and user behavior. Keep the existing commented-out placeholder.

### 4. Cache-bust script tag

**In `index.html`**, update the script tag:
```html
<script src="./script.js?v=task024"></script>
```

## Do NOT touch
- `styles.css`
- HTML content/layout
- Existing form behavior
- Clarity snippet (leave as-is)

## Acceptance Criteria
- [ ] GA4 placeholder snippet present and commented out on all 3 pages
- [ ] Clarity placeholder snippet present and commented out on all 3 pages
- [ ] `trackEvent` helper function added to `script.js`
- [ ] Form submission tracking for all Kit forms (main, blog newsletter, article CTA)
- [ ] CTA button click tracking (non-submit buttons)
- [ ] Share button click tracking (carousel, blog card, article share)
- [ ] `trackEvent` no-ops gracefully when GA4 is not active (no console errors)
- [ ] script.js cache-busted with `?v=task024`
- [ ] No console errors on any page

## Verification
- Open index.html — no console errors
- Open DevTools console, type `trackEvent('test', {})` — no error (returns undefined since gtag not defined)
- Click share button — no error
- Submit form (can cancel before actual submit) — no error
- Open blog.html and blog/_template.html — same behavior

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
