/* ============================================================
   XELISTIC — home.js  (v8 — 5 feste Spalten, vw-basiert)
   ============================================================ */

(function () {
  'use strict';

  var advanced = localStorage.getItem('xelistic-animations') === 'on';
  var reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── TOGGLE ────────────────────────────────────────────── */

  var toggleBtn       = document.getElementById('animToggle');
  var mobileToggleBtn = document.getElementById('animToggleMobile');
  var tip             = document.getElementById('stratTip');
  var tipText         = document.getElementById('stratTipText');

  function updateToggleUI() {
    /* Desktop-Toggle */
    if (toggleBtn) {
      if (advanced) {
        toggleBtn.textContent = 'Fortgeschrittene Animationen ✔';
        toggleBtn.classList.add('active');
        if (tipText) tipText.textContent =
          'Glitch-Effekte aktiv. Auf schwächeren Geräten deaktivieren.';
      } else {
        toggleBtn.textContent = 'Fortgeschrittene Animationen ✘';
        toggleBtn.classList.remove('active');
        if (tipText) tipText.textContent =
          'Glitch-Effekte aktivieren. Empfohlen für leistungsstarke PCs.';
      }
    }
    /* Mobiler Button */
    if (mobileToggleBtn) {
      mobileToggleBtn.textContent = advanced ? 'Animationen ✔' : 'Animationen ✘';
      mobileToggleBtn.classList.toggle('active', advanced);
    }
  }

  updateToggleUI();

  function onToggle() {
    advanced = !advanced;
    localStorage.setItem('xelistic-animations', advanced ? 'on' : 'off');
    location.reload();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', onToggle);
    toggleBtn.addEventListener('mouseenter', function () { if (tip) tip.style.display = 'block'; });
    toggleBtn.addEventListener('mouseleave', function () { if (tip) tip.style.display = 'none'; });
  }
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', onToggle);
  }

  document.addEventListener('mousemove', function (e) {
    if (!tip || tip.style.display === 'none') return;
    var x = e.clientX + 18, y = e.clientY + 12;
    if (x + 240 > window.innerWidth)  x = e.clientX - 248;
    if (y + 110 > window.innerHeight) y = e.clientY - 95;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }, { passive: true });

  /* ── WORDMARK EINFRIEREN ────────────────────────────────── */

  var wordmark = document.getElementById('heroWordmark');
  if (wordmark) {
    setTimeout(function () { wordmark.classList.add('ready'); }, 1500);
  }

  /* ── TERMINAL: 5 FESTE SPALTEN ──────────────────────────── */

  document.fonts.ready.then(buildTerminal);

  function buildTerminal() {
    /* Kein Terminal auf Mobile – spart JS + Performance */
    if (window.innerWidth < 768) return;

    var tmpl     = document.getElementById('asciiArt');
    var terminal = document.getElementById('heroTerminal');
    if (!tmpl || !terminal) return;

    var artSrc = tmpl.content.querySelector('.terminal-art');
    if (!artSrc) return;

    /* ── Schriftgröße kalibrieren: art soll genau 20vw breit sein ── */
    /* Probe bei bekannter Schriftgröße messen */
    var probe = artSrc.cloneNode(true);
    probe.style.cssText += ';position:absolute;visibility:hidden;top:0;left:0;font-size:4px;';
    terminal.appendChild(probe);
    var artWAt4px = probe.offsetWidth || 310;  /* Breite bei 4px font */
    terminal.removeChild(probe);

    /* Zielbreite: 20% des Viewports (= eine von 5 Spalten) */
    var targetW    = window.innerWidth * 0.2;
    var vwFontSize = (4 * targetW / artWAt4px / window.innerWidth * 100);
    /* Als CSS Variable setzen → .terminal-art font-size: var(--art-font-size) */
    terminal.style.setProperty('--art-font-size', vwFontSize.toFixed(3) + 'vw');

    /* ── Höhe mit korrekter Schriftgröße messen ── */
    var probe2 = artSrc.cloneNode(true);
    probe2.style.cssText += ';position:absolute;visibility:hidden;top:0;left:0;'
                          + 'font-size:' + vwFontSize.toFixed(3) + 'vw;';
    terminal.appendChild(probe2);
    var artH = probe2.offsetHeight || 400;
    terminal.removeChild(probe2);

    var viewH     = window.innerHeight;
    var isMobile  = window.innerWidth < 768;
    var NUM_COLS  = isMobile ? 3 : 5; /* Mobile: 3, Desktop: 5 */
    var numCopies = Math.max(3, Math.ceil((viewH + artH) / artH) + 1);

    var columns = [];

    for (var i = 0; i < NUM_COLS; i++) {
      var col = document.createElement('div');
      col.className = 'terminal-col';
      /* Flex-Basis dynamisch: 1/NUM_COLS der Breite */
      col.style.flex = '0 0 ' + (100 / NUM_COLS).toFixed(4) + '%';

      /* Leichte Opacity-Variation */
      col.style.setProperty('--col-opacity', (0.22 + (i % 3) * 0.06).toFixed(2)); /* 0.22 / 0.28 / 0.34 */

      var scroll = document.createElement('div');
      scroll.className = 'terminal-scroll';

      for (var k = 0; k < numCopies; k++) {
        scroll.appendChild(artSrc.cloneNode(true));
      }

      col.appendChild(scroll);
      terminal.appendChild(col);

      /* Gestaffelte Startpositionen */
      var offset = (i / NUM_COLS) * artH;
      var dir    = i % 2 === 0 ? -1 : 1;
      var pos    = dir < 0 ? -offset : -(artH - offset);

      columns.push({ scroll: scroll, col: col, pos: pos, dir: dir, artH: artH });
    }

    /* ── rAF-Loop: zoom-unabhängige Geschwindigkeit ────────── */
    /* artH skaliert mit vw → auch Speed muss live skalieren.
       PERIOD_FRAMES = Frames pro voller Periode (~15s @ 60fps).
       currentArtH wird per Frame neu berechnet: wenn der User
       rein/raus zoomt, passt sich der Wrap-Punkt sofort an.  */

    var innerWidthAtLoad = window.innerWidth;
    var PERIOD_FRAMES    = 900; /* ~15s bei 60fps (vorher ~30s) */

    if (!reduce) {
      (function tick() {
        var scale       = window.innerWidth / innerWidthAtLoad;
        var currentArtH = artH * scale;          /* live-skaliert */
        var speed       = currentArtH / PERIOD_FRAMES;

        for (var j = 0; j < columns.length; j++) {
          var c = columns[j];
          c.pos += c.dir * speed;

          /* Zoom-sicherer Wrap via Modulo:
             Normalisiert pos immer in (-currentArtH, 0] —
             korrekt auch wenn currentArtH sich durch Zoom ändert.
             JS %: -800 % 200 = 0, -201 % 200 = -1  ✓           */
          c.pos = c.pos % currentArtH;
          if (c.pos > 0) c.pos -= currentArtH; /* pos bleibt ≤ 0 */

          c.scroll.style.transform = 'translateY(' + c.pos.toFixed(1) + 'px)';
        }
        requestAnimationFrame(tick);
      })();
    }

    if (!reduce && advanced) startGlitch(columns);
  }

  /* ── GLITCH (nur wenn Toggle AN) ───────────────────────── */

  function startGlitch(columns) {
    function glitchOne(entry) {
      entry.col.style.transform =
        'translateX(' + ((Math.random() * 2 - 1) * 14).toFixed(1) + 'px)';
      entry.col.style.filter =
        'hue-rotate(' + Math.round(Math.random() * 70 - 35) + 'deg)'
        + ' brightness(' + (1.3 + Math.random() * 0.5).toFixed(2) + ')';
      setTimeout(function () {
        entry.col.style.transform = '';
        entry.col.style.filter    = '';
      }, 50 + Math.random() * 95);
    }

    function doGlitch() {
      var n = 1 + Math.floor(Math.random() * 2);
      for (var j = 0; j < n; j++) {
        glitchOne(columns[Math.floor(Math.random() * columns.length)]);
      }
      if (Math.random() < 0.28) setTimeout(doGlitch, 55);
    }

    function schedule() {
      setTimeout(function () { doGlitch(); schedule(); }, 700 + Math.random() * 2000);
    }
    setTimeout(schedule, 2200);

    /* Wordmark RGB-Split */
    function doWordmarkGlitch() {
      if (!wordmark || !wordmark.classList.contains('ready')) return;
      wordmark.classList.add('glitch');
      setTimeout(function () { wordmark.classList.remove('glitch'); }, 145);
    }

    function scheduleWordmark() {
      setTimeout(function () {
        doWordmarkGlitch();
        if (Math.random() < 0.35) setTimeout(doWordmarkGlitch, 195);
        scheduleWordmark();
      }, 3000 + Math.random() * 4000);
    }
    setTimeout(scheduleWordmark, 4000);
  }

})();