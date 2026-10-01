/* ponytail: native dialog provides modal focus containment; file links are the fallback. */
(function () {
  'use strict';
  var dialog = document.getElementById('evidence-viewer');
  if (!dialog || typeof dialog.showModal !== 'function' || typeof dialog.close !== 'function') return;
  var media = dialog.querySelector('[data-viewer-media]');
  var caption = document.getElementById('evidence-caption');
  var status = dialog.querySelector('[role="status"]');
  var original = dialog.querySelector('[data-viewer-original]');
  var close = dialog.querySelector('[data-viewer-close]');
  var opener = null;
  if (!media || !caption || !status || !original || !close) return;

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-evidence]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.target) return;
    var thumbnail = link.querySelector('img');
    var description = document.getElementById(link.dataset.evidence);
    if (!thumbnail || !description) return;
    try {
      if (!dialog.open) dialog.showModal();
    } catch (error) {
      return; // Ordinary navigation still works if the platform cannot open a modal.
    }
    event.preventDefault();
    opener = link;
    caption.textContent = description.textContent;
    original.href = link.href;
    status.textContent = 'Loading image…';
    media.setAttribute('aria-busy', 'true');
    var image = new Image();
    image.alt = thumbnail.alt;
    image.width = Number(thumbnail.getAttribute('width'));
    image.height = Number(thumbnail.getAttribute('height'));
    image.hidden = true;
    image.onload = function () {
      if (!dialog.open || media.firstElementChild !== image) return;
      image.hidden = false;
      status.textContent = '';
      media.setAttribute('aria-busy', 'false');
    };
    image.onerror = function () {
      if (!dialog.open || media.firstElementChild !== image) return;
      status.textContent = 'Image could not be loaded. Use “Open original” to view the file directly.';
      media.setAttribute('aria-busy', 'false');
    };
    // Replacing the element makes late callbacks from an earlier image harmless.
    media.replaceChildren(image);
    image.src = link.href;
    close.focus();
  });
  close.addEventListener('click', function () { dialog.close(); });
  var backdropStart = false;
  function outside(event) {
    var bounds = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom);
  }
  dialog.addEventListener('pointerdown', function (event) { backdropStart = outside(event); });
  dialog.addEventListener('click', function (event) {
    if (backdropStart && outside(event)) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', function () {
    // A queued close from an earlier viewing must not clear a newly opened image.
    if (dialog.open) return;
    var image = media.firstElementChild;
    if (image) { image.onload = null; image.onerror = null; image.removeAttribute('src'); }
    media.replaceChildren();
    media.setAttribute('aria-busy', 'false');
    caption.textContent = '';
    status.textContent = '';
    original.removeAttribute('href');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
  window.addEventListener('beforeprint', function () { if (dialog.open) dialog.close(); });
})();
