/* ============================================================
   XELISTIC — terminal-bg.js
   Subtiler ASCII-Art-Hintergrund für Artworks, Impressum,
   Datenschutz. Opacity: 0.12–0.20 (dunkler als Startseite).
   Art ist direkt eingebettet → kein Template im HTML nötig.
   ============================================================ */

(function () {
  'use strict';

  /* ASCII Art (einmal definiert, JS klont es in alle Spalten) */
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

  document.fonts.ready.then(build);

  function build() {
    var terminal = document.getElementById('pageTerminal');
    if (!terminal) return;

    /* Schriftgröße kalibrieren: 5 Spalten Desktop, 3 Mobile */
    var isMobile  = window.innerWidth < 768;
    if (isMobile) return; /* auf Mobile kein Terminal */

    var NUM_COLS  = 5;

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

    /* Höhe mit korrekter Schriftgröße messen */
    var probe2 = document.createElement('pre');
    probe2.className = 'terminal-art';
    probe2.textContent = ART;
    probe2.style.cssText = 'position:absolute;visibility:hidden;top:0;left:0;'
                         + 'font-size:' + vwFontSize.toFixed(3) + 'vw;'
                         + 'font-family:DM Mono,monospace;white-space:pre;letter-spacing:0;';
    terminal.appendChild(probe2);
    var artH = probe2.offsetHeight || 400;
    terminal.removeChild(probe2);

    var viewH     = window.innerHeight;
    var numCopies = Math.max(3, Math.ceil((viewH + artH) / artH) + 1);
    var innerWidthAtLoad = window.innerWidth;
    var PERIOD_FRAMES    = 1200; /* etwas langsamer als Startseite */

    var columns = [];

    for (var i = 0; i < NUM_COLS; i++) {
      var col = document.createElement('div');
      col.className = 'terminal-col';
      col.style.flex = '0 0 ' + (100 / NUM_COLS).toFixed(4) + '%';
      /* Opacity: 0.12 / 0.16 / 0.20 — subtiler als Startseite */
      col.style.setProperty('--col-opacity', (0.12 + (i % 3) * 0.04).toFixed(2));

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

      columns.push({ scroll: scroll, pos: pos, dir: dir });
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

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
  }

})();