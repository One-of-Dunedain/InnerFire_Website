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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardShareButtons);
} else {
  initCardShareButtons();
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
