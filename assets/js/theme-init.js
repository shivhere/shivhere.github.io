/* Apply the colour theme before first paint (loaded in <head>) so there is no flash of the wrong theme.
   Uses the visitor's saved choice, otherwise their system preference. The toggle lives in main.js. */
(function () {
  "use strict";

  var theme = null;
  try { theme = localStorage.getItem("theme"); } catch (e) { /* storage blocked */ }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
