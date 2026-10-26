
/* ==========================================
   INDIA VISUALS
   Website interactions and image handling
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeImageFallbacks();
  initializeSmoothNavigation();
  initializeExternalLinks();
  initializeCopyrightYear();
});

/*
  1. IMAGE FALLBACKS
  If an image fails to load, hide the broken image
  and show a clean background instead.
*/

function initializeImageFallbacks() {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-load-failed");

      const container = image.parentElement;

      if (container) {
        container.classList.add("image-container-fallback");
      }

      image.style.visibility = "hidden";
    }, { once: true });

    // Handle images that failed before this script ran.
    if (image.complete && image.naturalWidth === 0 && image.src) {
      image.dispatchEvent(new Event("error"));
    }
  });
}

/*
  2. SMOOTH NAVIGATION
  Smoothly scroll to sections on the current page.
  Links to separate pages continue to work normally.
*/

function initializeSmoothNavigation() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      // Keep the URL section reference in sync.
      if (window.location.hash !== href) {
        history.replaceState(null, "", href);
      }
    });
  });
}

/*
  3. EXTERNAL LINKS
  External links opened in a new tab should not
  receive access to the original page.
*/

function initializeExternalLinks() {
  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );

  externalLinks.forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });
}

/*
  4. COPYRIGHT YEAR
  Update the year automatically when the element exists.
*/

function initializeCopyrightYear() {
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
