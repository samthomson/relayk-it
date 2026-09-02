/**
 * Hero title typewriter — waits for the Ethnocentric font to load (measuring via
 * Font Loading API, with a timeout fallback), then types the wordmark character
 * by character. Reduced-motion users get the full title immediately.
 *
 * Usage: <span data-typewriter data-text="RELAYKIT"></span>
 */

const TYPE_INTERVAL_MS = 110;
const FONT_WAIT_TIMEOUT_MS = 1500;

function typeTitle(target: HTMLElement): void {
  const text = target.dataset['text'] ?? '';
  let index = 0;
  const step = () => {
    index += 1;
    target.textContent = text.slice(0, index);
    if (index < text.length) {
      window.setTimeout(step, TYPE_INTERVAL_MS);
    }
  };
  step();
}

function reveal(target: HTMLElement): void {
  target.closest('[data-typewriter-container]')?.removeAttribute('data-hidden');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    target.textContent = target.dataset['text'] ?? '';
    return;
  }
  typeTitle(target);
}

function init(): void {
  const target = document.querySelector<HTMLElement>('[data-typewriter]');
  if (!target) return;

  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fonts) {
    reveal(target);
    return;
  }

  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    reveal(target);
  };

  fonts.load('16px Ethnocentric').then(settle, settle);
  window.setTimeout(settle, FONT_WAIT_TIMEOUT_MS);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export {};
