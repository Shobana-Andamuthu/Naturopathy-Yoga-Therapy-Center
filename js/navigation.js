/**
 * SATTVA NATUROPATHY & YOGA THERAPY CENTER
 * NAVIGATION CONTROLLER (DESKTOP & MOBILE/TABLET/IPAD)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile & iPad Drawer Toggle
  const openBtn = document.querySelector('[data-action="open-mobile-nav"]');
  const closeBtn = document.querySelector('[data-action="close-mobile-nav"]');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

  function openDrawer() {
    if (!drawerOverlay) return;
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!drawerOverlay) return;
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';

    // Requirement: "Closing the menu must also close the Home dropdown."
    document.querySelectorAll('.nav-dropdown').forEach(d => {
      d.classList.remove('open');
      const toggle = d.querySelector('.nav-link, .dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.mobile-dropdown-content').forEach(c => {
      c.style.display = 'none';
    });
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        closeDrawer();
      }
    });
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOverlay && drawerOverlay.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking any link inside it
  document.querySelectorAll('.mobile-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Mobile dropdown toggle handling
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const content = toggle.nextElementSibling;
      if (content && content.classList.contains('mobile-dropdown-content')) {
        const isShown = content.style.display === 'block';
        content.style.display = isShown ? 'none' : 'block';
        toggle.setAttribute('aria-expanded', isShown ? 'false' : 'true');
      }
    });
  });

  // Desktop dropdown toggle click & outside click support
  document.querySelectorAll('.nav-dropdown .dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.nav-dropdown');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== parent) {
          d.classList.remove('open');
          const t = d.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      if (isExpanded) {
        parent.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 2. Active Link Highlighter
  // Requirement: "If Home 1 and Home 2 are available in a dropdown, highlight the main Home menu item."
  // Requirement: "Mobile menu must highlight the current Home option."
  const rawPath = window.location.pathname.toLowerCase().split('/').pop() || 'index.html';
  const currentPath = (rawPath === '' || rawPath === '/') ? 'index.html' : rawPath;

  const navLinks = document.querySelectorAll(
    '.nav-link, .dropdown-item, .mobile-drawer-link, .mobile-sublink, .dash-nav-link, .dash-mobile-nav-link'
  );

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.toLowerCase().split('?')[0].split('#')[0].split('/').pop();

    if (linkPath === currentPath) {
      link.classList.add('active');

      // If active link is inside dropdown or sublinks, also mark parent
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const parentToggle = parentDropdown.querySelector('.nav-link, .dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      }
    } else {
      // Avoid accidental active state on non-matching links
      if (linkPath && currentPath !== linkPath) {
        link.classList.remove('active');
      }
    }
  });

  // Explicitly ensure the main Home menu item is highlighted on Home 1 and Home 2
  if (currentPath === 'index.html' || currentPath === 'home-2.html' || currentPath === '') {
    document.querySelectorAll('.nav-dropdown .dropdown-toggle, .nav-dropdown > .nav-link').forEach(btn => {
      btn.classList.add('active');
    });
    document.querySelectorAll('.mobile-dropdown-toggle, [data-home-parent]').forEach(el => {
      el.classList.add('active');
    });
  }

  // 3. Back to Top Arrow Button
  // Requirement: "Add a Back-to-Top arrow button on every page."
  const siteHeader = document.querySelector('.site-header, .dash-navbar');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
