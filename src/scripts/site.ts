/**
 * Site chrome: mobile drawer, theme toggle, TOC scroll-spy.
 * All progressive enhancement — the site is fully usable without JS.
 */

/* ---------------- Mobile drawer ---------------- */

function setupDrawer(): void {
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const backdrop = document.querySelector<HTMLElement>('[data-drawer-backdrop]');
  const openButtons = document.querySelectorAll<HTMLButtonElement>('[data-drawer-open]');
  const closeButtons = document.querySelectorAll<HTMLButtonElement>('[data-drawer-close]');
  if (!drawer || !backdrop || openButtons.length === 0) return;

  const setOpen = (open: boolean) => {
    drawer.dataset['open'] = String(open);
    backdrop.dataset['open'] = String(open);
    drawer.setAttribute('aria-hidden', String(!open));
    for (const btn of openButtons) {
      btn.setAttribute('aria-expanded', String(open));
    }
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  for (const btn of openButtons) {
    btn.addEventListener('click', () => setOpen(true));
  }
  for (const btn of closeButtons) {
    btn.addEventListener('click', () => setOpen(false));
  }
  backdrop.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.dataset['open'] === 'true') {
      setOpen(false);
      openButtons[0]?.focus();
    }
  });
  drawer.addEventListener('click', (e) => {
    // Close after tapping any nav link.
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
}


/* ---------------- Theme toggle ---------------- */

function setupThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('rk-theme', isDark ? 'dark' : 'light');
      } catch {
        // Storage unavailable (private mode) — theme still applies for this page view.
      }
    });
  }
}

/* ---------------- TOC scroll-spy ---------------- */

function setupToc(): void {
  const toc = document.querySelector<HTMLElement>('[data-toc]');
  if (!toc) return;
  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  if (links.length === 0) return;

  const headings = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((h): h is HTMLElement => h !== null);

  let activeId = '';
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId = entry.target.id;
      }
      // Prefer the topmost intersecting heading; fall back to the last one above the viewport.
      if (activeId === '' ) {
        const above = headings.filter((h) => h.getBoundingClientRect().top < window.innerHeight / 3);
        activeId = above[above.length - 1]?.id ?? '';
      }
      for (const link of links) {
        link.dataset['active'] = String(link.hash === `#${activeId}`);
      }
    },
    { rootMargin: '0% 0% -70% 0%', threshold: [0, 1] },
  );

  for (const heading of headings) {
    observer.observe(heading);
  }
}

function init(): void {
  setupDrawer();
  setupThemeToggle();
  setupToc();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export {};
