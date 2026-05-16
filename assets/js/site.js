/* Bridgeland Key Club — shared site JS
   - Theme/type/density persistence
   - Tweaks panel host hooks
   - Animated counters
*/
(function () {
  const root = document.documentElement;
  const KEYS = {
    theme: 'bkc-theme',
    type: 'bkc-type',
    density: 'bkc-density',
  };

  function applyStored() {
    const t = localStorage.getItem(KEYS.theme);
    const ty = localStorage.getItem(KEYS.type);
    const d = localStorage.getItem(KEYS.density);
    if (t) root.setAttribute('data-theme', t);
    if (ty) root.setAttribute('data-type', ty);
    if (d) root.setAttribute('data-density', d);
  }
  applyStored();

  window.BKC = window.BKC || {};
  window.BKC.setTheme = function (v) {
    root.setAttribute('data-theme', v);
    localStorage.setItem(KEYS.theme, v);
  };
  window.BKC.setType = function (v) {
    root.setAttribute('data-type', v);
    localStorage.setItem(KEYS.type, v);
  };
  window.BKC.setDensity = function (v) {
    root.setAttribute('data-density', v);
    localStorage.setItem(KEYS.density, v);
  };
  window.BKC.getState = function () {
    return {
      theme: root.getAttribute('data-theme') || 'bridgeland',
      type: root.getAttribute('data-type') || 'editorial',
      density: root.getAttribute('data-density') || 'comfortable',
    };
  };

  // ---- Mark current nav link
  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path) a.setAttribute('aria-current', 'page');
    });

    // Animated counters
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach((c) => io.observe(c));
    }
  });

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = parseInt(el.getAttribute('data-duration') || '1400', 10);
    const start = performance.now();
    const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt.format(target * eased);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = fmt.format(target);
    }
    requestAnimationFrame(step);
  }
})();
