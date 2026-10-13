/* ============================================================
   XELISTIC — copy-protection.js
   Auf allen Seiten einbinden die Bilder enthalten
   ============================================================ */

(function () {
  'use strict';

  /* Rechtsklick-Menü blockieren */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  /* Drag & Drop deaktivieren */
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  /* Tastenkombinationen blockieren */
  document.addEventListener('keydown', function (e) {
    var blocked =
      (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||   // Speichern
      (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||   // Quelltext
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) || // DevTools
      (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) || // Console
      e.key === 'F12' ||
      e.key === 'PrintScreen';

    if (blocked) e.preventDefault();
  });

})();