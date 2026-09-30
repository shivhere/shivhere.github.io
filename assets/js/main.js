/* Navigation toggle + dark mode toggle + lightbox gallery */
(function () {
  "use strict";

  // Dark mode toggle (initial theme is set in <head> by theme-init.js)
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  function setTheme(theme, save) {
    root.setAttribute("data-theme", theme);
    themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
    if (save) {
      try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked */ }
    }
  }

  setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });

  // Follow system changes until the visitor picks a theme themselves
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) { /* storage blocked */ }
    if (!saved) setTheme(e.matches ? "dark" : "light", false);
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navSocial = document.querySelector(".nav-social");

  if (toggle) {
    toggle.addEventListener("click", () => {
      navLinks?.classList.toggle("open");
      navSocial?.classList.toggle("open");
    });
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lbImg = lightbox.querySelector("img");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  let currentIndex = 0;
  const sources = Array.from(galleryItems).map((img) => img.src);

  function show(index) {
    if (!sources.length) return;
    currentIndex = (index + sources.length) % sources.length;
    lbImg.src = sources[currentIndex];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hide() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((img, i) => {
    img.closest(".gallery-item")?.addEventListener("click", () => show(i));
  });

  btnClose?.addEventListener("click", hide);
  btnPrev?.addEventListener("click", () => show(currentIndex - 1));
  btnNext?.addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) hide();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") hide();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
})();
