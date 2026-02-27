// Smooth scroll for anchor links (e.g. "Get Early Access" → #signup)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Share button - copy page link with environment name
function initCardShareButtons() {
  document.querySelectorAll('.card-share').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const env = btn.dataset.env;
      const url = window.location.href.split('#')[0];
      const text = `Check out the "${env}" breathing environment on InnerFire`;

      if (navigator.share) {
        try {
          await navigator.share({ title: 'InnerFire', text, url });
        } catch (err) {
          // User cancelled share dialog
        }
        return;
      }

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(`${text} - ${url}`);
        } else {
          const fallback = document.createElement('textarea');
          fallback.value = `${text} - ${url}`;
          fallback.setAttribute('readonly', '');
          fallback.style.position = 'fixed';
          fallback.style.opacity = '0';
          document.body.appendChild(fallback);
          fallback.select();
          document.execCommand('copy');
          document.body.removeChild(fallback);
        }

        btn.style.background = 'rgba(68,170,85,0.4)';
        setTimeout(() => btn.style.background = '', 1500);
      } catch (err) {
        // Clipboard unavailable in current context
      }
    });
  });
}

// Blur reveal on benefit cards
function initBenefitReveal() {
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
}

// Lens magnification - embers scale up when passing under buttons
function initLensEffect() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var embers = document.querySelectorAll('.ambient-ember');
  var lensSelectors = '.btn-primary, .btn-header, .card-share, .blog-card-share, .share-btn';
  var heroLensSelector = '.hero .btn-primary';
  var buttons = document.querySelectorAll(lensSelectors);
  var heroButtons = document.querySelectorAll(heroLensSelector);

  if (!embers.length || !buttons.length) return;

  var lastCheck = 0;
  var THROTTLE_MS = 80; // ~12fps - smooth enough for visual effect, light on CPU

  function checkOverlap(timestamp) {
    if (timestamp - lastCheck >= THROTTLE_MS) {
      lastCheck = timestamp;

      // Get fresh button rects (positions change on scroll)
      var btnRects = [];
      for (var i = 0; i < buttons.length; i++) {
        btnRects.push(buttons[i].getBoundingClientRect());
      }
      var heroRects = [];
      for (var h = 0; h < heroButtons.length; h++) {
        heroRects.push(heroButtons[h].getBoundingClientRect());
      }

      // Check each ember against all buttons
      for (var j = 0; j < embers.length; j++) {
        var er = embers[j].getBoundingClientRect();
        var isUnder = false;
        var isUnderHero = false;
        for (var m = 0; m < heroRects.length; m++) {
          var hr = heroRects[m];
          if (er.right > hr.left && er.left < hr.right &&
              er.bottom > hr.top && er.top < hr.bottom) {
            isUnder = true;
            isUnderHero = true;
            break;
          }
        }
        if (isUnderHero) {
          embers[j].classList.add('magnified');
          embers[j].classList.add('magnified-hero');
          continue;
        }
        for (var k = 0; k < btnRects.length; k++) {
          var br = btnRects[k];
          if (er.right > br.left && er.left < br.right &&
              er.bottom > br.top && er.top < br.bottom) {
            isUnder = true;
            break;
          }
        }
        if (isUnder && !embers[j].classList.contains('magnified')) {
          embers[j].classList.add('magnified');
        } else if (!isUnder && embers[j].classList.contains('magnified')) {
          embers[j].classList.remove('magnified');
        }
        if (!isUnderHero && embers[j].classList.contains('magnified-hero')) {
          embers[j].classList.remove('magnified-hero');
        }
      }
    }

    requestAnimationFrame(checkOverlap);
  }

  // Re-query buttons when DOM might change (blog page loads cards dynamically)
  function refreshButtons() {
    buttons = document.querySelectorAll(lensSelectors);
    heroButtons = document.querySelectorAll(heroLensSelector);
  }

  // Refresh button list on scroll (handles lazy-loaded content)
  var scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(refreshButtons, 500);
  }, { passive: true });

  requestAnimationFrame(checkOverlap);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCardShareButtons();
    initBenefitReveal();
    initLensEffect();
  });
} else {
  initCardShareButtons();
  initBenefitReveal();
  initLensEffect();
}

// Set wick progress - update these values manually or via API later
(function() {
  const current = 0; // UPDATE THIS NUMBER as signups come in
  const goal = 300;
  const pct = Math.min((current / goal) * 100, 100);
  const el = document.getElementById('wick-current');
  const fill = document.querySelector('.wick-fill');
  const flame = document.querySelector('.wick-flame');
  if (el) el.textContent = current;
  if (fill) fill.style.setProperty('--progress', pct + '%');
  if (flame) flame.style.left = pct + '%';
})();
