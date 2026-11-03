/**
 * SATTVA NATUROPATHY & YOGA THERAPY CENTER
 * THEME (LIGHT/DARK) & DIRECTION (LTR/RTL) CONTROLLER
 * Ensures instantaneous persistence across all pages and flawless state sync.
 */

(function () {
  const THEME_KEY = 'sattva_theme';
  const DIR_KEY = 'sattva_dir';

  // Retrieve stored or fallback preferences
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  }

  function getInitialDir() {
    const saved = localStorage.getItem(DIR_KEY);
    if (saved === 'rtl' || saved === 'ltr') return saved;
    return 'ltr';
  }

  // Apply to DOM
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButtons(theme);
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem(DIR_KEY, dir);
    updateDirButtons(dir);
  }

  function updateThemeButtons(theme) {
    const buttons = document.querySelectorAll('[data-action="toggle-theme"]');
    buttons.forEach(btn => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const iconSpan = btn.querySelector('.theme-icon') || btn;
      if (typeof SVGIcons !== 'undefined') {
        iconSpan.innerHTML = isDark ? SVGIcons.sun : SVGIcons.moon;
      }
    });
  }

  function updateDirButtons(dir) {
    const buttons = document.querySelectorAll('[data-action="toggle-dir"]');
    buttons.forEach(btn => {
      const isRtl = dir === 'rtl';
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      btn.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = isRtl ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
    });
  }

  // Public Toggle Methods
  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  window.toggleDir = function () {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    applyDir(next);
  };

  // Immediate init before render
  const initialTheme = getInitialTheme();
  const initialDir = getInitialDir();
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.setAttribute('dir', initialDir);
  document.documentElement.setAttribute('lang', initialDir === 'rtl' ? 'ar' : 'en');

  // DOMContentLoaded bindings
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeButtons(initialTheme);
    updateDirButtons(initialDir);

    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });

    document.querySelectorAll('[data-action="toggle-dir"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleDir();
      });
    });
  });

  // Sattva Page Loader Controller
  function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      loader.classList.add('loaded');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }

    if (document.readyState === 'complete') {
      setTimeout(dismiss, 350);
    } else {
      window.addEventListener('load', () => {
        setTimeout(dismiss, 350);
      });
      // Graceful fallback so user is never blocked
      setTimeout(dismiss, 2200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageLoader);
  } else {
    initPageLoader();
  }
})();

