/* ponytail: native details handle disclosure; JS only adds closing and mobile collapse. */
(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var menu = document.getElementById('page-nav');
  var button = document.getElementById('nav-toggle');
  if (!header || !menu || !button || !window.matchMedia) return;
  var compact = window.matchMedia('(max-width: 56rem)');
  var groups = menu.querySelectorAll('details');

  function closeGroups() {
    groups.forEach(function (group) { group.open = false; });
  }

  function setExpanded(expanded) {
    menu.hidden = compact.matches && !expanded;
    button.setAttribute('aria-expanded', String(!menu.hidden));
  }

  function resize() {
    closeGroups();
    button.hidden = !compact.matches;
    setExpanded(false);
    if (menu.hidden && menu.contains(document.activeElement)) button.focus();
  }

  button.addEventListener('click', function () {
    var expanded = menu.hidden;
    setExpanded(expanded);
    if (!expanded) closeGroups();
  });
  groups.forEach(function (group) {
    group.addEventListener('toggle', function () {
      if (group.open) {
        groups.forEach(function (other) { if (other !== group) other.open = false; });
      }
    });
  });
  menu.addEventListener('click', function (event) {
    var summary = event.target.closest('summary');
    if (summary && !summary.parentElement.open) {
      groups.forEach(function (group) {
        if (group !== summary.parentElement) group.open = false;
      });
    }
    if (event.target.closest('a') && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      closeGroups();
      setExpanded(false);
    }
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) closeGroups();
  });
  header.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var open = menu.querySelector('details[open]');
    if (open) {
      open.open = false;
      open.querySelector('summary').focus();
    } else if (compact.matches && !menu.hidden) {
      setExpanded(false);
      button.focus();
    } else return;
    event.preventDefault();
  });
  // Leave the no-JS navigation intact when media-change observation is unavailable.
  if (compact.addEventListener) compact.addEventListener('change', resize);
  else if (compact.addListener) compact.addListener(resize);
  else return;
  resize();
})();
