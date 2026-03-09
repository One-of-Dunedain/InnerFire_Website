// Smooth scroll for anchor links (e.g. "Get Early Access" → #signup)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
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

// ── Video modal system ──
// On tap: opens a fullscreen dark overlay with a NEW video element.
// Preview videos stay untouched (muted, looping, inline).
// If the R2 media host is unavailable, fall back to the local full file.

var videoModal = null;
var VIDEO_REMOTE_FALLBACK_TIMEOUT_MS = 1200;

function playModalVideo(video) {
  var p = video.play();
  if (p && p.then) {
    p.then(function() {
      if (video.webkitEnterFullscreen) {
        try { video.webkitEnterFullscreen(); } catch (e) {}
      }
    }).catch(function() {});
  } else if (video.webkitEnterFullscreen) {
    try { video.webkitEnterFullscreen(); } catch (e) {}
  }
}

function getVideoModalSources(videoEl) {
  if (!videoEl) return { primary: '', fallback: '' };

  var fallbackSrc = videoEl.getAttribute('data-fullsrc') || '';
  var remoteSrc = videoEl.getAttribute('data-r2src') || '';

  return {
    primary: remoteSrc || fallbackSrc,
    fallback: remoteSrc ? fallbackSrc : ''
  };
}

function openVideoModal(primarySrc, fallbackSrc) {
  if ((!primarySrc && !fallbackSrc) || videoModal) return;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'video-modal';

  // Close button
  var closeBtn = document.createElement('button');
  closeBtn.className = 'video-modal-close';
  closeBtn.setAttribute('aria-label', 'Close video');
  closeBtn.innerHTML = '&times;';
  overlay.appendChild(closeBtn);

  // New video element
  var video = document.createElement('video');
  video.className = 'video-modal-player';
  video.src = fullSrc;
  video.controls = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = 'auto';
  overlay.appendChild(video);

  var remoteAttempted = Boolean(primarySrc && fallbackSrc && primarySrc !== fallbackSrc);
  var fallbackArmed = remoteAttempted;
  var fallbackTimer = null;

  function clearFallbackTimer() {
    if (!fallbackTimer) return;
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }

  function switchToFallback() {
    if (!fallbackArmed || !fallbackSrc) return;
    fallbackArmed = false;
    clearFallbackTimer();
    video.pause();
    video.src = fallbackSrc;
    video.load();
    playModalVideo(video);
  }

  video.addEventListener('loadedmetadata', clearFallbackTimer);
  video.addEventListener('playing', function() {
    fallbackArmed = false;
    clearFallbackTimer();
  });
  video.addEventListener('error', function() {
    switchToFallback();
  });

  document.body.appendChild(overlay);
  videoModal = overlay;

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  overlay.offsetHeight;
  overlay.classList.add('video-modal-visible');

  video.src = primarySrc || fallbackSrc;
  video.load();

  if (remoteAttempted) {
    fallbackTimer = setTimeout(function() {
      switchToFallback();
    }, VIDEO_REMOTE_FALLBACK_TIMEOUT_MS);
  }

  playModalVideo(video);

  function closeModal() {
    if (!videoModal) return;
    clearFallbackTimer();
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.body.style.overflow = '';
    overlay.classList.remove('video-modal-visible');
    setTimeout(function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 200);
    videoModal = null;
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });

  // iOS: when user exits native fullscreen, close modal
  video.addEventListener('webkitendfullscreen', closeModal);

  // Back button / Escape key
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handler);
    }
  });
}

// ── Carousel video cards ──
function initCardBackgroundVideos() {
  var videos = document.querySelectorAll('.card-bg-video');
  if (!videos.length) return;

  // IntersectionObserver: play/pause preview loops when visible
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var p = entry.target.play();
          if (p && p.catch) p.catch(function() {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(function(v) { observer.observe(v); });
  }

  // Tap handler: open modal with full-quality video
  videos.forEach(function(video) {
    var card = video.closest('.carousel-card.has-video');
    if (!card) return;
    var sources = getVideoModalSources(video);
    if (!sources.primary && !sources.fallback) return;

    card.addEventListener('click', function() {
      openVideoModal(sources.primary, sources.fallback);
    });

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoModal(sources.primary, sources.fallback);
      }
    });
  });
}

function initArticleVideoCards() {
  var cards = document.querySelectorAll('.video-card');
  if (!cards.length) return;

  cards.forEach(function(card) {
    var video = card.querySelector('.video-card-player');
    if (!video) return;
    var sources = getVideoModalSources(video);
    if (!sources.primary && !sources.fallback) return;

    card.addEventListener('click', function() {
      openVideoModal(sources.primary, sources.fallback);
    });

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoModal(sources.primary, sources.fallback);
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

// Anti-spam form protection (honeypot + minimum time gate)
function initAntiSpamForms() {
  var pageLoadTime = (window.performance && performance.timeOrigin) ? performance.timeOrigin : Date.now();
  var MIN_SUBMIT_TIME_MS = 2000;

  document.querySelectorAll('form[data-sv-form]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var honeypot = form.querySelector('input[name="website_url"]');
      if (honeypot && honeypot.value.trim() !== '') {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      if (Date.now() - pageLoadTime < MIN_SUBMIT_TIME_MS) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });
}

function initBlogIndex() {
  var grid = document.getElementById('blog-grid');
  var empty = document.getElementById('blog-empty');
  if (!grid || !empty) return;

  function escapeAttr(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  async function shareArticle(btn) {
    var title = btn.dataset.title;
    var url = new URL(btn.dataset.url, window.location.href).href;
    if (navigator.share) {
      try { await navigator.share({ title: title, url: url }); } catch (e) {}
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        var t = document.createElement('textarea');
        t.value = url;
        t.setAttribute('readonly', '');
        t.style.position = 'fixed';
        t.style.opacity = '0';
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
      }
      btn.style.background = 'rgba(68,170,85,0.4)';
      setTimeout(function() { btn.style.background = ''; }, 1500);
    } catch (e) {}
  }

  document.addEventListener('click', function(e) {
    var shareBtn = e.target.closest('.blog-card-share');
    if (!shareBtn) return;
    e.preventDefault();
    e.stopPropagation();
    shareArticle(shareBtn);
  });

  /* Manifest entry format:
  {
    "slug": "my-first-post",
    "title": "Article Title Here",
    "excerpt": "A short 1-2 sentence summary of the article.",
    "date": "2026-03-01",
    "readTime": "5 min",
    "category": "Breathing",
    "thumbnail": "./blog/images/my-first-post.jpg"
  }
  */
  (async function loadBlogPosts() {
    try {
      var res = await fetch('./blog/posts.json', { cache: 'no-store' });
      var posts = await res.json();
      if (!posts.length) {
        empty.style.display = '';
        grid.style.display = 'none';
        return;
      }

      posts.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
      grid.innerHTML = posts.map(function(p) { return ''
        + '<a href="./blog/' + p.slug + '.html" class="blog-card">'
        +   '<div class="blog-card-thumb" style="background-image:url(\'' + (p.thumbnail || '') + '\')">'
        +     '<button class="blog-card-share" type="button" aria-label="Share" data-title="' + escapeAttr(p.title) + '" data-url="./blog/' + p.slug + '.html">'
        +       '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>'
        +     '</button>'
        +     (!p.thumbnail ? '<div class="blog-card-thumb-placeholder"></div>' : '')
        +   '</div>'
        +   '<div class="blog-card-body">'
        +     '<span class="blog-card-category">' + (p.category || '') + '</span>'
        +     '<h3 class="blog-card-title">' + p.title + '</h3>'
        +     '<p class="blog-card-excerpt">' + p.excerpt + '</p>'
        +     '<div class="blog-card-meta">'
        +       '<time>' + new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '</time>'
        +       '<span>' + (p.readTime || '') + '</span>'
        +     '</div>'
        +   '</div>'
        + '</a>';
      }).join('');
    } catch (e) {
      empty.style.display = '';
      grid.style.display = 'none';
    }
  })();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCardShareButtons();
    initCardBackgroundVideos();
    initArticleVideoCards();
    initBenefitReveal();
    initLensEffect();
    initAntiSpamForms();
    initBlogIndex();
  });
} else {
  initCardShareButtons();
  initCardBackgroundVideos();
  initArticleVideoCards();
  initBenefitReveal();
  initLensEffect();
  initAntiSpamForms();
  initBlogIndex();
}

// Waitlist counter
(function() {
  var el = document.getElementById('waitlist-count');
  var fill = document.querySelector('.wick-fill');
  var flame = document.querySelector('.wick-flame');
  if (!el) return;

  var FALLBACK_LIMIT = 300;
  // TODO: Replace with real Cloudflare Worker URL after TASK-049
  // var API_URL = 'https://innerfire-waitlist.YOUR_SUBDOMAIN.workers.dev/api/waitlist-count';
  return; // Skip counter fetch until Worker is deployed

  function applyCount(count, limit) {
    var safeLimit = typeof limit === 'number' && limit > 0 ? limit : FALLBACK_LIMIT;
    var safeCount = typeof count === 'number' && count >= 0 ? count : 0;
    if (safeCount > safeLimit) safeCount = safeLimit;

    var pct = Math.min((safeCount / safeLimit) * 100, 100);
    el.textContent = String(safeCount);
    el.classList.add('counter-loaded');

    if (fill) fill.style.setProperty('--progress', pct + '%');
    if (flame) flame.style.left = pct + '%';
  }

  fetch(API_URL)
    .then(function(res) {
      if (!res.ok) throw new Error('waitlist fetch failed');
      return res.json();
    })
    .then(function(data) {
      if (!data) return;
      applyCount(data.count, data.limit);
    })
    .catch(function() {
      // Keep dash placeholder if API is unreachable.
    });
})();
