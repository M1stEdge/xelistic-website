/* ============================================================
   XELISTIC — artworks.js
   Galerie-Filter, Lightbox und Canvas-Watermark
   ============================================================ */

(function () {
  'use strict';

  /* ── WATERMARK STÄRKE (0.0 – 1.0) ──────────────────────── */
  var WM_OPACITY = 0.16;

  /* ── FILTER ─────────────────────────────────────────────── */

  var items   = Array.from(document.querySelectorAll('.artwork-item'));
  var btns    = Array.from(document.querySelectorAll('.filter-btn'));
  var empty   = document.getElementById('gallery-empty');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter  = btn.dataset.filter;
      var visible = 0;

      items.forEach(function (item) {
        var match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  /* ── LIGHTBOX ────────────────────────────────────────────── */

  var lb        = document.getElementById('lightbox');
  var lbCanvas  = document.getElementById('lb-canvas');
  var lbCtx     = lbCanvas ? lbCanvas.getContext('2d') : null;
  var lbTitle   = document.getElementById('lb-title');
  var lbTag     = document.getElementById('lb-tag');
  var lbClose   = document.getElementById('lb-close');
  var lbPrev    = document.getElementById('lb-prev');
  var lbNext    = document.getElementById('lb-next');
  var lbIndex   = 0;

  function visibleItems() {
    return items.filter(function (i) { return !i.classList.contains('hidden'); });
  }

  /* Bild auf Canvas zeichnen + Wasserzeichen-Raster darüber */
  function drawToCanvas(src) {
    if (!lbCanvas || !lbCtx) return;
    var img = new Image();
    img.onload = function () {
      lbCanvas.width  = img.naturalWidth;
      lbCanvas.height = img.naturalHeight;

      /* Bild zeichnen */
      lbCtx.drawImage(img, 0, 0);

      /* Wasserzeichen-Raster diagonal */
      var fontSize = Math.max(18, img.naturalWidth / 24);
      lbCtx.save();
      lbCtx.globalAlpha = WM_OPACITY;
      lbCtx.fillStyle   = '#f0f5f0';
      lbCtx.font        = '500 ' + fontSize + 'px DM Mono, monospace';
      lbCtx.textAlign   = 'center';
      lbCtx.translate(img.naturalWidth / 2, img.naturalHeight / 2);
      lbCtx.rotate(-35 * Math.PI / 180);

      var stepY = img.naturalHeight / 4.5;
      var stepX = img.naturalWidth  / 2.5;

      for (var y = -img.naturalHeight * 1.5; y < img.naturalHeight * 1.5; y += stepY) {
        for (var x = -img.naturalWidth * 1.5; x < img.naturalWidth * 1.5; x += stepX) {
          lbCtx.fillText('© XELISTIC', x, y);
        }
      }
      lbCtx.restore();
    };
    img.src = src;
  }

  function openLightbox(index) {
    var visible = visibleItems();
    if (!visible.length) return;
    lbIndex = Math.max(0, Math.min(index, visible.length - 1));
    var item = visible[lbIndex];
    var src  = item.querySelector('.artwork-img').src;

    drawToCanvas(src);
    if (lbTitle) lbTitle.textContent = item.dataset.title || '';
    if (lbTag)   lbTag.textContent   = item.dataset.tag   || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    if (lbCtx) lbCtx.clearRect(0, 0, lbCanvas.width, lbCanvas.height);
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    var visible = visibleItems();
    lbIndex = (lbIndex + dir + visible.length) % visible.length;
    openLightbox(lbIndex);
  }

  /* Overlays öffnen die Lightbox */
  items.forEach(function (item) {
    var overlay = item.querySelector('.artwork-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', function () {
      var visible = visibleItems();
      var idx = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click',  function () { navigate(-1); });
  if (lbNext)  lbNext.addEventListener('click',  function () { navigate(1); });

  /* Klick neben Bild schließt Lightbox */
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLightbox();
  });

  /* Tastatur: Escape + Pfeiltasten */
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* Rechtsklick auf Canvas blockieren */
  if (lbCanvas) {
    lbCanvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

})();