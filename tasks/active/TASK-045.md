# TASK-045: Cookie consent + GA4 + Clarity + event tracking

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: TASK-044 (DONE)
Supersedes: TASK-024

## Context

InnerFire needs analytics (GA4 + Microsoft Clarity) but cannot load them without user consent (GDPR/EU/UK requirement). This task implements:

1. A cookie consent banner that gates analytics loading
2. Google Consent Mode v2 integration
3. GA4 + Clarity conditional activation
4. Custom event tracking for key UX actions

**TASK-024 is superseded** — it was written before consent requirements were identified. This task replaces it entirely.

**Budget exception:** This task creates 1 new file and modifies multiple HTML files (adding script tag to all pages) + styles.css. Cross-cutting concern justifies the budget override.

## File Operations

| Action | File |
|--------|------|
| CREATE | `consent.js` (root directory, same level as `script.js`) |
| MODIFY | `styles.css` — add consent banner CSS |
| MODIFY | All HTML pages — add `<script src="./consent.js">` in `<head>`, remove commented GA4/Clarity blocks |

### Pages to modify

1. `index.html` — `<script src="./consent.js"></script>`
2. `blog.html` — `<script src="./consent.js"></script>`
3. `privacy.html` — `<script src="./consent.js"></script>`
4. `blog/best-breathwork-apps.html` — `<script src="../consent.js"></script>`
5. `blog/vagus-nerve-breathing.html` — `<script src="../consent.js"></script>`
6. `blog/build-breathing-habit.html` — `<script src="../consent.js"></script>`
7. `blog/breathing-under-noise.html` — `<script src="../consent.js"></script>`

Place the `<script>` tag **in `<head>`, before any other scripts and before `</head>`**. It must run early to set consent defaults before any analytics library attempts to load.

Also **remove the commented-out GA4 and Clarity `<script>` blocks** from all pages that have them (they are now handled by consent.js).

## consent.js — Full Implementation

```javascript
/**
 * InnerFire — Cookie Consent + Analytics
 *
 * Handles:
 * 1. Cookie consent banner (GDPR/UK PECR compliant)
 * 2. Google Consent Mode v2
 * 3. GA4 + Microsoft Clarity conditional loading
 * 4. Custom event tracking
 *
 * Config: Replace GA4_ID and CLARITY_ID with real values before launch.
 */
(function () {
  'use strict';

  // ─── Configuration ───────────────────────────────────────────
  var GA4_ID = 'G-XXXXXXXXXX';       // Replace with real GA4 Measurement ID
  var CLARITY_ID = 'XXXXXXXXXX';     // Replace with real Clarity Project ID
  var CONSENT_KEY = 'innerfire_consent';
  var CONSENT_VERSION = '1';         // Bump to re-prompt after policy changes

  // ─── Google Consent Mode v2 defaults ─────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  // ─── Check stored consent ────────────────────────────────────
  var stored = null;
  try {
    var raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      stored = JSON.parse(raw);
      if (stored.version !== CONSENT_VERSION) {
        stored = null;
        localStorage.removeItem(CONSENT_KEY);
      }
    }
  } catch (e) {
    stored = null;
  }

  if (stored && stored.choice === 'accepted') {
    loadAnalytics();
  } else if (!stored) {
    // No choice yet — show banner after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
  // If stored.choice === 'declined', do nothing (no analytics, no banner)

  // ─── Wire up "Cookie Settings" link ──────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireCookieSettings);
  } else {
    wireCookieSettings();
  }

  function wireCookieSettings() {
    var link = document.getElementById('cookie-settings-link');
    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove stored choice and show banner again
        localStorage.removeItem(CONSENT_KEY);
        // Remove existing banner if any
        var existing = document.querySelector('.consent-banner');
        if (existing) existing.remove();
        showBanner();
      });
    }
  }

  // ─── Consent Banner ──────────────────────────────────────────
  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text">' +
          'We use cookies for analytics to improve your experience. ' +
          '<a href="./privacy.html" class="consent-link">Privacy Policy</a>' +
        '</p>' +
        '<div class="consent-actions">' +
          '<button class="consent-btn consent-decline" type="button">Decline</button>' +
          '<button class="consent-btn consent-accept" type="button">Accept</button>' +
        '</div>' +
      '</div>';

    // Fix privacy link for blog article pages (../privacy.html)
    if (window.location.pathname.indexOf('/blog/') !== -1) {
      var link = banner.querySelector('.consent-link');
      if (link) link.href = '../privacy.html';
    }

    document.body.appendChild(banner);

    // Animate in
    requestAnimationFrame(function () {
      banner.classList.add('consent-visible');
    });

    banner.querySelector('.consent-accept').addEventListener('click', function () {
      saveConsent('accepted');
      hideBanner(banner);
      loadAnalytics();
    });

    banner.querySelector('.consent-decline').addEventListener('click', function () {
      saveConsent('declined');
      hideBanner(banner);
    });
  }

  function hideBanner(banner) {
    banner.classList.remove('consent-visible');
    setTimeout(function () { banner.remove(); }, 300);
  }

  function saveConsent(choice) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        choice: choice,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString()
      }));
    } catch (e) { /* localStorage unavailable — consent still works for this session */ }
  }

  // ─── Load Analytics ──────────────────────────────────────────
  function loadAnalytics() {
    // Update Google Consent Mode
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });

    // Load GA4
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(ga);
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      send_page_view: true
    });

    // Load Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);

    // Set up event tracking after a short delay to let analytics initialize
    setTimeout(setupEventTracking, 500);
  }

  // ─── Event Tracking ──────────────────────────────────────────
  function setupEventTracking() {
    trackFormSubmits();
    trackScrollDepth();
    trackShareClicks();
    trackCtaClicks();
  }

  /**
   * Track form submissions
   * Fires: form_submit (success) or form_error (validation failure)
   */
  function trackFormSubmits() {
    var forms = document.querySelectorAll('form[data-sv-form]');
    forms.forEach(function (form) {
      // Determine form location
      var location = 'unknown';
      if (form.closest('.signup')) location = 'hero';
      else if (form.closest('.blog-newsletter')) location = 'blog_newsletter';
      else if (form.closest('.article-cta')) location = 'article_cta';
      else if (form.closest('.app-card-signup')) location = 'innerfire_card';

      form.addEventListener('submit', function () {
        gtag('event', 'form_submit', {
          form_location: location,
          page_path: window.location.pathname
        });
        // Clarity custom tag
        if (window.clarity) {
          window.clarity('set', 'form_submit', location);
        }
      });

      // Track invalid submissions
      form.addEventListener('invalid', function () {
        gtag('event', 'form_error', {
          form_location: location,
          page_path: window.location.pathname
        });
      }, true); // useCapture to catch bubbled invalid events
    });
  }

  /**
   * Track scroll depth at 25/50/75/100% thresholds
   * Each threshold fires only once per page load
   */
  function trackScrollDepth() {
    var thresholds = [25, 50, 75, 100];
    var fired = {};

    function checkScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      var percent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach(function (t) {
        if (percent >= t && !fired[t]) {
          fired[t] = true;
          gtag('event', 'scroll_depth', {
            depth_threshold: t,
            page_path: window.location.pathname
          });
        }
      });
    }

    var scrollTimer;
    window.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkScroll, 150);
    }, { passive: true });
  }

  /**
   * Track share button clicks
   * Works with both article share buttons and blog card share buttons
   */
  function trackShareClicks() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.share-btn, .blog-card-share, .card-share');
      if (!btn) return;

      var title = btn.dataset.title || btn.dataset.env || document.title;
      var type = 'article';
      if (btn.classList.contains('card-share')) type = 'environment';
      else if (btn.classList.contains('blog-card-share')) type = 'blog_card';

      gtag('event', 'share_click', {
        content_type: type,
        content_title: title,
        page_path: window.location.pathname
      });
    });
  }

  /**
   * Track CTA button/link clicks (non-form CTAs)
   */
  function trackCtaClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('.btn-primary, .btn-header');
      if (!el) return;
      // Skip if inside a form (form_submit handles that)
      if (el.closest('form')) return;

      gtag('event', 'cta_click', {
        cta_text: (el.textContent || '').trim().substring(0, 50),
        page_path: window.location.pathname
      });
    });
  }
})();
```

## Consent Banner CSS

Add to `styles.css`:

```css
/* ── Cookie Consent Banner ── */
.consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(10, 13, 18, 0.97);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.consent-banner.consent-visible {
  transform: translateY(0);
}
.consent-inner {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.consent-text {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
}
.consent-link {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.consent-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.consent-btn {
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s, color 0.2s;
}
.consent-decline {
  background: transparent;
  color: var(--muted);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.consent-decline:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
}
.consent-accept {
  background: var(--accent);
  color: #0a0d12;
}
.consent-accept:hover {
  background: #ff9d5c;
}

@media (max-width: 480px) {
  .consent-inner {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  .consent-text {
    font-size: 0.8rem;
  }
  .consent-actions {
    width: 100%;
  }
  .consent-btn {
    flex: 1;
    padding: 10px 12px;
  }
}
```

## Removing Commented Analytics Blocks

On each HTML page, **delete** the commented-out GA4 and Clarity blocks. They look like this:

```html
<!-- Google Analytics 4 - Remove comment delimiters and replace G-XXXXXXXXXX with your GA4 Measurement ID to activate -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->

<!-- Microsoft Clarity - Remove comment delimiters and replace XXXXXXXXXX with your Clarity Project ID to activate -->
<!--
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){...})(...);
</script>
-->
```

Remove these entirely. `consent.js` now handles all analytics loading.

Pages that have these blocks: `index.html`, `blog.html`, and possibly the new article pages from TASK-041/042.

## How It All Fits Together

```
Page loads → consent.js runs immediately
  ├─ Sets Google Consent Mode defaults (all denied)
  ├─ Checks localStorage for previous choice
  │   ├─ "accepted" → loads GA4 + Clarity + events
  │   ├─ "declined" → does nothing (no banner, no analytics)
  │   └─ no choice → shows banner after DOM ready
  │       ├─ User clicks Accept → saves choice, loads analytics
  │       └─ User clicks Decline → saves choice, hides banner
  └─ Wires up "Cookie Settings" footer link
      └─ On click → clears choice, shows banner again
```

## Events Reference

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `form_submit` | Kit form submitted | `form_location`, `page_path` |
| `form_error` | Form validation fails | `form_location`, `page_path` |
| `scroll_depth` | User scrolls past 25/50/75/100% | `depth_threshold`, `page_path` |
| `share_click` | Any share button clicked | `content_type`, `content_title`, `page_path` |
| `cta_click` | Non-form CTA button clicked | `cta_text`, `page_path` |

Form locations: `hero`, `blog_newsletter`, `article_cta`, `innerfire_card`

## Do NOT

- Hardcode real GA4/Clarity IDs — keep the `XXXXXXXXXX` placeholders (user will replace them)
- Use a cookie-consent library or framework — this is a lightweight custom solution
- Add consent for essential cookies (there are none)
- Block page rendering waiting for consent
- Auto-accept consent or use dark patterns
- Load ANY analytics before consent is given
- Modify `script.js` (event tracking is handled by consent.js)
- Add consent logic to individual page inline scripts

## Acceptance Criteria

- [ ] `consent.js` exists in project root
- [ ] Script tag added to `<head>` of ALL 7 pages (correct relative paths)
- [ ] Commented GA4/Clarity blocks removed from all pages
- [ ] Banner appears on first visit (no stored consent)
- [ ] Banner slides up with animation (transform transition)
- [ ] "Accept" → banner hides, analytics load, choice saved to localStorage
- [ ] "Decline" → banner hides, NO analytics loaded, choice saved
- [ ] On return visit with prior "accepted": no banner shown, analytics load immediately
- [ ] On return visit with prior "declined": no banner shown, no analytics
- [ ] "Cookie Settings" footer link → clears choice, shows banner again
- [ ] Google Consent Mode v2: defaults set before any gtag call
- [ ] Privacy Policy link in banner works (correct relative path on all pages)
- [ ] Mobile 375px: banner stacks vertically, buttons full width
- [ ] Banner CSS added to styles.css
- [ ] `form_submit` event fires when Kit form is submitted
- [ ] `scroll_depth` events fire at 25/50/75/100% thresholds (once each)
- [ ] `share_click` event fires when share button is clicked
- [ ] `cta_click` event fires when non-form CTA is clicked
- [ ] No console errors on any page
- [ ] No analytics network requests when consent is declined

## Verification

1. Open any page in incognito mode — consent banner appears at bottom
2. Click "Decline" — banner hides, open Network tab → no GA4/Clarity requests
3. Clear localStorage, reload — banner appears again
4. Click "Accept" — banner hides, Network tab shows GA4 + Clarity loading
5. Reload — no banner, analytics load automatically
6. Click "Cookie Settings" in footer — banner reappears
7. Submit a form with DevTools open — check `form_submit` event in GA4 DebugView
8. Scroll page — check `scroll_depth` events at thresholds
9. Click share button — check `share_click` event
10. Mobile 375px — banner is readable, buttons are tappable

## GA4 DebugView Testing

To verify events without real GA4 ID:
1. Install "Google Analytics Debugger" Chrome extension
2. Open DevTools Console
3. Look for `gtag` calls in dataLayer array: `console.log(window.dataLayer)`
4. Events should appear with correct names and parameters

## Reporting
- Update TASKS.md status to DONE
- Mark TASK-024 as SUPERSEDED in TASKS.md
- Append report to REPORT.md
