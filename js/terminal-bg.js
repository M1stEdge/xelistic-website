/* ============================================================
   XELISTIC — terminal-bg.js
   Artworks, Impressum, Datenschutz
   Toggle AUS: Spalten scrollen (Basis)
   Toggle AN:  Spalten scrollen + Glitch-Effekte
   Speicherung via sessionStorage (kein Cookie, kein Tracking)
   ============================================================ */

(function () {
  'use strict';

  var advanced = sessionStorage.getItem('xelistic-animations') === 'on';
  var reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── TOGGLE BUTTON ─────────────────────────────────────── */

  var toggleBtn = document.getElementById('animToggle');
  var tip       = document.getElementById('stratTip');
  var tipText   = document.getElementById('stratTipText');

  function updateToggleUI() {
    if (!toggleBtn) return;
    toggleBtn.textContent = advanced
      ? 'Fortgeschrittene Animationen ✔'
      : 'Fortgeschrittene Animationen ✘';
    toggleBtn.classList.toggle('active', advanced);
    if (tipText) tipText.textContent = advanced
      ? 'Glitch-Effekte aktiv. Auf schwächeren Geräten deaktivieren.'
      : 'Glitch-Effekte aktivieren. Empfohlen für leistungsstarke PCs.';
  }

  updateToggleUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      advanced = !advanced;
      sessionStorage.setItem('xelistic-animations', advanced ? 'on' : 'off');
      location.reload();
    });

    toggleBtn.addEventListener('mouseenter', function (e) {
      if (!tip) return;
      tip.style.display = 'block';
      /* Position sofort setzen — nicht erst auf mousemove warten */
      var x = e.clientX + 18, y = e.clientY + 12;
      if (x + 240 > window.innerWidth)  x = e.clientX - 248;
      if (y + 110 > window.innerHeight) y = e.clientY - 95;
      tip.style.left = x + 'px';
      tip.style.top  = y + 'px';
    });
    toggleBtn.addEventListener('mouseleave', function () {
      if (tip) tip.style.display = 'none';
    });
  }

  document.addEventListener('mousemove', function (e) {
    if (!tip || tip.style.display === 'none') return;
    var x = e.clientX + 18, y = e.clientY + 12;
    if (x + 240 > window.innerWidth)  x = e.clientX - 248;
    if (y + 110 > window.innerHeight) y = e.clientY - 95;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }, { passive: true });

  /* ── ASCII ART ─────────────────────────────────────────── */

  var ART = [
    '                                           #@@@@@                                                                                        ',
    '                                       :@@@-------@@                                                                                     ',
    '                                     @@*--@@@@@@@@:-@@                                        @@@@@#**##@@@@                             ',
    '                                   -@@--@@@       @@:-@@                                   @@@---+@@@@@@@:--@@                           ',
    '                                  @@--@@@           @@-@@                               -@@--:@@         *@:--@#                         ',
    '                                 @@--@@   @@@@@@@    @@-@@ @@@@@@@@@@:     @@@@@@@@@@@@@@--@@              @@-:@                         ',
    '                                 @--@@   @@@@@@@@@@   @@@@@@@@@@=@@@@@@@@@@@@@:--@:-@@@@@@@     @@@@@@@*    @:-@@                        ',
    '                                @@-@@   @@@@@@@@@@@@@@@@@@@-@@-@@--@-@-:@-@---@---@---@@@@@  @@@@@@@@@@@@   @@-@@                        ',
    '                                @@-@@  =@@@@@@@@@@@@@@@@:@@--@@--@@-@@-@*-*@--@----@:--*@*@@@@@@@@@@@@@@@   @@-@@                        ',
    '                                @:-@   %@@@@@@@@@@@@@=:@@--@@---@--@@--@:-:@---@----@---:@-%@@@@@@@@@@@@@:  @#-@@                        ',
    '                                @--@@  @@@@@@@@@@@@--@---@@---@@--@@---@---@---%@---@#---:@--@@@@@@@@@@@@   @--@@                        ',
    '                                @:-@@  @@@@@@@@@--=@---@@---:@---@@---@----@----@---:@-----@---@@@@@@@@@@  @@--@.                        ',
    '                                @@-%@   @@@@:@+--@---@@----@@---%@----@----@:---@:---@-----@---:@@@@@@@@  @@--@@                         ',
    '                                @@--@@ @@@-@@--@@--:@-----@----:@-----@----@:---@@---@-----:@---:@@@@@@   @:-+@                          ',
    '                                 @@--@@@=:@:--@---@@----@@-----@-----@#----@:---:@---@=-----@-----@@@@  .@---@.                          ',
    '                                  @@@@@-@@--@@---@:----@@-----@------@-----@:---:@---#@-----@+----:@@@@@@--=@                            ',
    '                                   @@@-@@--@=---@-----@*-----@@-----:@-----@-----@----@-----:@-----@@@@@--@@                             ',
    '                                  @@---@--@----@-----@+------@------@------@-----@----@------@------@-@@@@@                              ',
    '                                 @@---@--@----@:----@@------@@------@------@----:@----@------@@-----=@-@@@                               ',
    '                                @@@--@--@@---@@----:@-------@-------@------@-----@----@@------@------@--@@@                              ',
    '                               @@@--@:--@----@-----@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+@----=@------@------@@--@@@                             ',
    '                              @@@--%@---@@@@@@@@@@@@@@@@@@+-::@------@-:-=@@@@@@@@@@@@@@@@@@:--@-----:@---@@@                            ',
    '                             -@@#@@@@@@@@@@#@-----@-----@-----@-----:@-----@@----:@-----@@@@@@@@@@=---@----@@                            ',
    '                           *@@@@@@@---@----:@-----@-----@:----@@----:@-----@@----@@-----@:----@@@@@@@@@@---@@@                           ',
    '                        @@@@@@---@----@@----@-----@*----@@----@@----:@-----@:----@@----@@-----@@----@@@@@@@%@@@                          ',
    '                       @@@--:@---@@---@@----@@----@@----@@----@@----%@-----@-----@:----@*----:@-----@@---:@@@@@                          ',
    '                        @@@--@@---@----@:---%@--:-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#:---@@----=@-----@--@@@@@                       ',
    '                         @@---@@--:@:--@@@@@@@@@@@@@@@%%%%%%@               @%%%%%%@@@@@@@@@@@@@@:-@@----@@----@@@                       ',
    '                         @@@---@:--@@@@@@@@@%%@%%%@@%%%%%%%@@               @%%%%%%%@ @%%%%%@@@@@@@@@@@--@:----@@                        ',
    '                          @@@--@@@@@@@@@%%%%%@@%%%@@@%%%%%%%@               @%%%%%%@ @@%%%#@@@@%%%%%%@@@@@@@--:@@                        ',
    '                           @@@@@@%@@%%@%%%%%@@@%%%@@ @%%%%%%@              @@%%%%%@@@@%%%@@  @%%%%%%%%@@%%@@@@@@@                        ',
    '                            @@@%%%%@%@%%%%%%@@@@%%%@@@@@%%%%@@             @%%%%%@@@@%%@@@@@@@%%%%%#@@@%%%%%@@@@@                        ',
    '                           %@@@@%%%@%@%%%%%@@@@@@%%@@  @@%%%%@@           @%%%%%@@@@@@    @@%%%%##@@  @%%%%%@@%@@@             @@@       ',
    '                         @@@@%%@#%%@@@%%%%@     @@%%@@   @%%%%@@         @%%%%%@%       @@%%%@@@@@@@@ @%%%%%%@%%%%%@@@@@@@@#@@@@@        ',
    '                    @@@@%%@@%%%@@%%%@@%%@@        @@%@@   @@%%%@@       @%%%%@@       @@@@@@.        @@%%%%%%@%%%%%%%%%%%%%%%%@@@        ',
    '           @@@@@@%%%%%%%@@%%%%%#@%%%@@%@            @@@@..   @@@@@     @%@@@     @@@@@@@@           -@%%%%%@@@@@%%%%%%%%%%@@@@@#         ',
    '            @@%%%%%%%%%@%%%%%%%%@@%%%%@@   @@@@@@@@@@@@@@@      @@@   @@         @@@@@@@@@@@@@@    @@%%%@@@%%%%%%%@@@@@@%%#%@@           ',
    '              +@@@@@@@@%%%%%%%%@@@@@%%%%@@@@@@@  *@@@                              @@@      @@@@@@@%@@@=@@@@%%%%%%%%@@@@#@@@             ',
    '                  @@@%%%%%%%%@@@%%@@  *@@@@       @@@                              @@@         @@@@@@   @@@@@@%%%%%%#@@@@%%#@@@@         ',
    '               @@@%%%%%%%@@@@@%%%%@@              @@@                              @@@                  @@@@@ @@%%%%%%%@@@@%%%@@@@@      ',
    '               @@@@@@@@@@@ +@@%%%@@               @@@                              @@@                  @@@@@ @@@@@%%%%%%@@@             ',
    '                 @@@%%%%@@@ @%%%@@@               @@@.                             @@@                  @@@@ :@%@@@@@@@@@#%@@@           ',
    '               @@@@@@@@@%#@@%%%@@@@                @@@                             @@@                  @@@  @%%@#%%@@                   ',
    '                  @@@@@@@@@%%#@@@@@@               @@@                             @@@                  +  @@@%%@@%%%#@@                 ',
    '                        .@%%@@@@                   -@@                             @@@                   @@  @%%%@@@%%%#@@               ',
    '                       @@%@@    @@@                 @@@                            @@@                 @@    @@@%@@ .@@@@@@              ',
    '                     =@@@@        @@@                                                                 @@         @@@                     ',
    '                     @@             @                            @@                                  @@                                  ',
    '                                    @@                                                              @@                                   ',
    '                                     @.                                                             @@                                   ',
    '                                     @@                                                            @@                                    ',
    '                                      @@                                                          @@#                                    ',
    '                                       @                                                          @@                                     ',
    '                                       @@                                                        @@                                      ',
    '                                        @@                      @@@    =                        @@                                       ',
    '                                         %@                                                    @@                                        ',
    '                                           @@                                                %@@                                         ',
    '                                            @@@                                           @@@@                                           ',
    '                                              @@@@@                                  @@@@@                                               ',
    '                                                   @@@@@                       @@@@@@                                                    ',
    '                                                         @@@@@@@@@@@@@@@@@@@@@@                                                          '
  ].join('\n');

  /* ── TERMINAL AUFBAUEN ─────────────────────────────────── */

  document.fonts.ready.then(build);

  function build() {
    if (window.innerWidth < 768) return;

    var terminal = document.getElementById('pageTerminal');
    if (!terminal) return;

    var NUM_COLS = 5;

    var probe = document.createElement('pre');
    probe.className = 'terminal-art';
    probe.textContent = ART;
    probe.style.cssText = 'position:absolute;visibility:hidden;top:0;left:0;font-size:4px;font-family:DM Mono,monospace;white-space:pre;letter-spacing:0;';
    terminal.appendChild(probe);
    var artWAt4px = probe.offsetWidth || 310;
    terminal.removeChild(probe);

    var targetW    = window.innerWidth / NUM_COLS;
    var vwFontSize = (4 * targetW / artWAt4px / window.innerWidth * 100);
    terminal.style.setProperty('--art-font-size', vwFontSize.toFixed(3) + 'vw');

    var probe2 = document.createElement('pre');
    probe2.className = 'terminal-art';
    probe2.textContent = ART;
    probe2.style.cssText = 'position:absolute;visibility:hidden;top:0;left:0;font-size:' + vwFontSize.toFixed(3) + 'vw;font-family:DM Mono,monospace;white-space:pre;letter-spacing:0;';
    terminal.appendChild(probe2);
    var artH = probe2.offsetHeight || 400;
    terminal.removeChild(probe2);

    var viewH     = window.innerHeight;
    var numCopies = Math.max(3, Math.ceil((viewH + artH) / artH) + 1);
    var innerWidthAtLoad = window.innerWidth;
    var PERIOD_FRAMES    = 1200;
    var columns = [];

    for (var i = 0; i < NUM_COLS; i++) {
      var col = document.createElement('div');
      col.className = 'terminal-col';
      col.style.flex = '0 0 ' + (100 / NUM_COLS).toFixed(4) + '%';
      col.style.setProperty('--col-opacity', (0.18 + (i % 3) * 0.05).toFixed(2)); /* 0.18 / 0.23 / 0.28 */

      var scroll = document.createElement('div');
      scroll.className = 'terminal-scroll';

      for (var k = 0; k < numCopies; k++) {
        var pre = document.createElement('pre');
        pre.className = 'terminal-art';
        pre.textContent = ART;
        scroll.appendChild(pre);
      }

      col.appendChild(scroll);
      terminal.appendChild(col);

      var offset = (i / NUM_COLS) * artH;
      var dir    = i % 2 === 0 ? -1 : 1;
      var pos    = dir < 0 ? -offset : -(artH - offset);
      columns.push({ col: col, scroll: scroll, pos: pos, dir: dir });
    }

    if (reduce) return;

    /* ── SCROLL: immer aktiv (Basis-Animation) ─────────── */
    (function tick() {
      var scale       = window.innerWidth / innerWidthAtLoad;
      var currentArtH = artH * scale;
      var speed       = currentArtH / PERIOD_FRAMES;

      for (var j = 0; j < columns.length; j++) {
        var c = columns[j];
        c.pos += c.dir * speed;
        c.pos = c.pos % currentArtH;
        if (c.pos > 0) c.pos -= currentArtH;
        c.scroll.style.transform = 'translateY(' + c.pos.toFixed(1) + 'px)';
      }
      requestAnimationFrame(tick);
    })();

    /* ── GLITCH: nur wenn Toggle AN ────────────────────── */
    if (advanced) startGlitch(columns);
  }

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
  }

})();