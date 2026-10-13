/* ============================================================
   XELISTIC — home.js
   Animations-Toggle, Parallax, VHS-Glitch
   ============================================================ */

(function () {
  'use strict';

  var reduce   = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var advanced = localStorage.getItem('xelistic-animations') === 'on';

  /* ── TOGGLE BUTTON ─────────────────────────────────────── */

  var toggleBtn = document.getElementById('animToggle');
  var tip       = document.getElementById('stratTip');
  var tipText   = document.getElementById('stratTipText');

  function updateToggleUI() {
    if (!toggleBtn) return;
    if (advanced) {
      toggleBtn.textContent = 'Fortgeschrittene Animationen (an)';
      toggleBtn.classList.add('active');
      if (tipText) tipText.textContent =
        'Alle Effekte aktiv: Parallax, Glitch, Chroma. Deaktivieren auf schwächeren Geräten.';
    } else {
      toggleBtn.textContent = 'Fortgeschrittene Animationen (aus)';
      toggleBtn.classList.remove('active');
      if (tipText) tipText.textContent =
        'Erweiterte Animationen aktivieren. Empfohlen für leistungsstarke PCs.';
    }
  }

  updateToggleUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      advanced = !advanced;
      localStorage.setItem('xelistic-animations', advanced ? 'on' : 'off');
      location.reload();
    });

    /* Tooltip folgt dem Cursor */
    toggleBtn.addEventListener('mouseenter', function () {
      if (tip) tip.style.display = 'block';
    });
    toggleBtn.addEventListener('mouseleave', function () {
      if (tip) tip.style.display = 'none';
    });
  }

  document.addEventListener('mousemove', function (e) {
    if (!tip || tip.style.display === 'none') return;
    var x = e.clientX + 18;
    var y = e.clientY + 12;
    if (x + 240 > window.innerWidth)  x = e.clientX - 248;
    if (y + 110 > window.innerHeight) y = e.clientY - 95;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }, { passive: true });

  /* ── SCHWERE ANIMATIONEN NUR WENN EINGESCHALTET ─────────── */

  if (reduce || !advanced) return;

  var stage  = document.querySelector('.misty-stage');
  var word   = document.querySelector('.bg-text');
  var img    = document.querySelector('[data-misty]');
  var slices = Array.from(document.querySelectorAll('[data-slice]'));

  /* ── PARALLAX ──────────────────────────────────────────── */

  var tx = 0, ty = 0, cx = 0, cy = 0, lastMove = 0;

  window.addEventListener('mousemove', function (e) {
    tx       = (e.clientX / window.innerWidth  - 0.5) * 2;
    ty       = (e.clientY / window.innerHeight - 0.5) * 2;
    lastMove = performance.now();
  }, { passive: true });

  function tick(now) {
    /* Idle-Drift wenn Maus still steht */
    if (now - lastMove > 2600) {
      tx = Math.sin(now / 4200) * 0.5;
      ty = Math.cos(now / 5600) * 0.4;
    }
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;

    if (stage) {
      stage.style.setProperty('--spx', (cx * -14) + 'px');
      stage.style.setProperty('--spy', (cy * -10) + 'px');
    }
    if (word) {
      word.style.setProperty('--wpx', (cx * 10) + 'px');
      word.style.setProperty('--wpy', (cy *  7) + 'px');
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ── VHS GLITCH ────────────────────────────────────────── */

  function doGlitch() {
    slices.forEach(function (s) {
      var top = Math.random() * 78;
      var h   = 3 + Math.random() * 14;
      s.style.clipPath  = 'inset(' + top + '% 0 ' + Math.max(0, 100 - top - h) + '% 0)';
      s.style.transform = 'translateX(' + ((Math.random() * 2 - 1) * 12) + 'px)';
      s.style.opacity   = '1';
    });
    if (img) img.style.transform = 'translateX(' + ((Math.random() * 2 - 1) * 5) + 'px)';

    setTimeout(function () {
      slices.forEach(function (s) { s.style.opacity = '0'; });
      if (img) img.style.transform = '';
      if (Math.random() < 0.25) setTimeout(doGlitch, 70); /* gelegentlicher Doppel-Blitz */
    }, 80 + Math.random() * 80);
  }

  function scheduleGlitch() {
    setTimeout(function () {
      doGlitch();
      scheduleGlitch();
    }, 600 + Math.random() * 1500);
  }

  setTimeout(scheduleGlitch, 2600);

})();