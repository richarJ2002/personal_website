(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = stored ? stored === 'dark' : prefersDark;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();

document.addEventListener('click', function(e) {
  const btn = e.target.closest('#theme-toggle');
  if (!btn) return;
  const html = document.documentElement;
  const dark = html.dataset.theme === 'dark';
  html.dataset.theme = dark ? 'light' : 'dark';
  localStorage.setItem('theme', dark ? 'light' : 'dark');
  btn.setAttribute('aria-pressed', String(!dark));
  btn.setAttribute('aria-label', dark ? 'Switch to dark mode' : 'Switch to light mode');
});