(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const storageKey = 'luna-portfolio-theme';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try {
      const choice = localStorage.getItem(storageKey);
      return choice === 'light' || choice === 'dark' ? choice : null;
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.querySelector('.toggle-label').textContent = isDark ? 'Light mode' : 'Dark mode';
    themeColor.setAttribute('content', isDark ? '#111b19' : '#f6f7f4');
  }

  applyTheme(savedTheme() || (systemPrefersDark.matches ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Theme still works for this page view when browser storage is unavailable.
    }
  });

  // Keep the theme in sync with the OS only until a visitor makes an explicit choice.
  systemPrefersDark.addEventListener('change', (event) => {
    if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
