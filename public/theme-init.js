/* Applied synchronously before first paint to avoid a theme flash.
 * Reads the legacy app config key first so returning visitors keep their choice.
 * Also restores the font-preview mode (mono default). */
(function () {
  var theme = null;
  try {
    theme = JSON.parse(localStorage.getItem('nostr:app-config') || '{}').theme;
  } catch (e) {
    /* malformed legacy value — fall through */
  }
  if (theme !== 'light' && theme !== 'dark') {
    try {
      theme = localStorage.getItem('rk-theme');
    } catch (e) {
      /* storage unavailable */
    }
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.toggle('dark', theme === 'dark');

})();
