/**
 * InnerFire - Cookie Consent + Analytics
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

  // Configuration
  var GA4_ID = 'G-XXXXXXXXXX'; // Replace with real GA4 Measurement ID
  var CLARITY_ID = 'XXXXXXXXXX'; // Replace with real Clarity Project ID
  var CONSENT_KEY = 'innerfire_consent';
  var CONSENT_VERSION = '1'; // Bump to re-prompt after policy changes
  var analyticsLoaded = false;

  // Google Consent Mode v2 defaults
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  // Check stored consent
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
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  // Wire up Cookie Settings link
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireCookieSettings);
  } else {
    wireCookieSettings();
  }

  function wireCookieSettings() {
    var links = document.querySelectorAll('#cookie-settings-link');
    links.forEach(function (link) {
      link.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') {
            e.stopImmediatePropagation();
          }
          try {
            localStorage.removeItem(CONSENT_KEY);
          } catch (err) {
            // ignore
          }
          var existing = document.querySelector('.consent-banner');
          if (existing) {
            existing.remove();
          }
          showBanner();
        },
        true
      );
    });
  }

  // Consent Banner
  function showBanner() {
    if (document.querySelector('.consent-banner')) {
      return;
    }

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

    if (window.location.pathname.indexOf('/blog/') !== -1) {
      var privacyLink = banner.querySelector('.consent-link');
      if (privacyLink) {
        privacyLink.href = '../privacy.html';
      }
    }

    document.body.appendChild(banner);

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
    setTimeout(function () {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 300);
  }

  function saveConsent(choice) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          choice: choice,
          version: CONSENT_VERSION,
          timestamp: new Date().toISOString()
        })
      );
    } catch (e) {
      // localStorage unavailable - consent still works for this session
    }
  }

  // Load Analytics
  function loadAnalytics() {
    if (analyticsLoaded) {
      return;
    }
    analyticsLoaded = true;

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

    // Load Microsoft Clarity only when a real project ID is configured.
    if (CLARITY_ID && CLARITY_ID !== 'XXXXXXXXXX') {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CLARITY_ID);
    }

    setTimeout(setupEventTracking, 500);
  }

  // Event Tracking
  function setupEventTracking() {
    trackFormSubmits();
    trackScrollDepth();
    trackShareClicks();
    trackCtaClicks();
  }

  // form_submit and form_error
  function trackFormSubmits() {
    var forms = document.querySelectorAll('form[data-sv-form]');
    forms.forEach(function (form) {
      var location = 'unknown';
      if (form.closest('.signup')) {
        location = 'hero';
      } else if (form.closest('.blog-newsletter')) {
        location = 'blog_newsletter';
      } else if (form.closest('.article-cta')) {
        location = 'article_cta';
      } else if (form.closest('.app-card-signup')) {
        location = 'innerfire_card';
      }

      form.addEventListener('submit', function () {
        gtag('event', 'form_submit', {
          form_location: location,
          page_path: window.location.pathname
        });
        if (window.clarity) {
          window.clarity('set', 'form_submit', location);
        }
      });

      form.addEventListener(
        'invalid',
        function () {
          gtag('event', 'form_error', {
            form_location: location,
            page_path: window.location.pathname
          });
        },
        true
      );
    });
  }

  // scroll_depth at 25/50/75/100
  function trackScrollDepth() {
    var thresholds = [25, 50, 75, 100];
    var fired = {};

    function checkScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        return;
      }
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
    window.addEventListener(
      'scroll',
      function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScroll, 150);
      },
      { passive: true }
    );
  }

  // share_click
  function trackShareClicks() {
    document.addEventListener(
      'click',
      function (e) {
        var btn = e.target.closest('.share-btn, .blog-card-share, .card-share');
        if (!btn) {
          return;
        }

        var title = btn.dataset.title || btn.dataset.env || document.title;
        var type = 'article';
        if (btn.classList.contains('card-share')) {
          type = 'environment';
        } else if (btn.classList.contains('blog-card-share')) {
          type = 'blog_card';
        }

        gtag('event', 'share_click', {
          content_type: type,
          content_title: title,
          page_path: window.location.pathname
        });
      },
      true
    );
  }

  // cta_click
  function trackCtaClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('.btn-primary, .btn-header');
      if (!el) {
        return;
      }
      if (el.closest('form')) {
        return;
      }

      gtag('event', 'cta_click', {
        cta_text: (el.textContent || '').trim().substring(0, 50),
        page_path: window.location.pathname
      });
    });
  }
})();
