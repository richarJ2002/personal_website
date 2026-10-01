/* Theme toggle + footer year + optional print button.
 * Plain vanilla JS. No dependencies. Works with script in HEAD (no defer):
 * theme is applied immediately; DOM wiring waits for DOMContentLoaded.
 * Storage access is guarded so blocked storage never breaks the page.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'theme';

  /* In-memory explicit choice. Storage may be denied while the toggle still
   * works for the visit, so the toggle must win over later system changes. */
  var chosenTheme = null;

  function getStoredTheme() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      if (value === 'light' || value === 'dark') {
        return value;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  function getSystemTheme() {
    try {
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (err) {
      /* fall through to default */
    }
    return 'light';
  }

  function getEffectiveTheme() {
    return chosenTheme || getStoredTheme() || getSystemTheme();
  }

  function syncToggle(button, effective) {
    var isDark = effective === 'dark';
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* Immediate theme setup (runs in HEAD before body exists).
   * Only set an explicit theme when the visitor has a valid stored choice,
   * so first visits fall back to the CSS prefers-color-scheme rules. */
  try {
    var storedNow = getStoredTheme();
    if (storedNow) {
      document.documentElement.setAttribute('data-theme', storedNow);
    }
  } catch (err) {
    /* Never break rendering because of theming. */
  }

  function onReady() {
    var effective = getEffectiveTheme();
    var toggle = document.getElementById('theme-toggle');

    if (toggle) {
      /* Reveal the toggle only when JS can wire it up. */
      toggle.hidden = false;
      syncToggle(toggle, effective);
      toggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        chosenTheme = next;
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch (err) {
          /* Storage may be blocked; theme still applies for this visit. */
        }
        syncToggle(toggle, next);
      });
    }

    /* Follow system changes until the visitor makes an explicit choice. */
    try {
      if (window.matchMedia) {
        var query = window.matchMedia('(prefers-color-scheme: dark)');
        var onSystemChange = function (event) {
          if (chosenTheme || getStoredTheme()) {
            return;
          }
          var nextEffective = event.matches ? 'dark' : 'light';
          /* Remove any explicit attribute so CSS fallback governs visuals. */
          document.documentElement.removeAttribute('data-theme');
          if (toggle) {
            syncToggle(toggle, nextEffective);
          }
        };
        if (typeof query.addEventListener === 'function') {
          query.addEventListener('change', onSystemChange);
        } else if (typeof query.addListener === 'function') {
          query.addListener(onSystemChange);
        }
      }
    } catch (err) {
      /* System listener is optional. */
    }

    /* Optional print buttons (used on the CV page). Hidden until wired. */
    try {
      var printButtons = document.querySelectorAll('[data-print]');
      for (var i = 0; i < printButtons.length; i++) {
        (function (btn) {
          btn.hidden = false;
          btn.addEventListener('click', function () {
            window.print();
          });
        })(printButtons[i]);
      }
    } catch (err) {
      /* Printing remains available via the browser menu. */
    }

    /* Footer year spans: <span data-year>2026</span> fallback works without JS. */
    try {
      var yearSpans = document.querySelectorAll('[data-year]');
      var year = String(new Date().getFullYear());
      for (var j = 0; j < yearSpans.length; j++) {
        yearSpans[j].textContent = year;
      }
    } catch (err) {
      /* Keep the static fallback year. */
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
