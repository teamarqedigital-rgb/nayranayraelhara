"use strict";

const heroParticles = document.querySelector("#hero-particles");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroParticles && !reducedMotion.matches) {
  if (typeof window.particlesJS !== "function") {
    console.error("No se pudo iniciar el fondo de partículas: particles.js no está disponible.");
  } else {
    window.particlesJS("hero-particles", {
      particles: {
        number: { value: 30, density: { enable: false } },
        color: { value: "#B18A61" },
        shape: { type: "circle" },
        opacity: { value: 0.32, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "repulse" },
          onclick: { enable: false, mode: "push" },
          resize: true
        }
      },
      retina_detect: true
    });
  }
}
