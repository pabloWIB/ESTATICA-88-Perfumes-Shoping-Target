/**
 * Entry point for the cover.
 *
 * The masthead prints the edition year. The markup ships with the year
 * already in place, so this only keeps it in sync — if the script never
 * runs, the label still reads correctly instead of going blank.
 */
(function () {
  "use strict";

  const yearField = document.getElementById("year");

  if (!yearField) {
    return;
  }

  yearField.textContent = String(new Date().getFullYear());
})();
