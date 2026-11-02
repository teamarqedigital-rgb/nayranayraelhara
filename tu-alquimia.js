(() => {
  "use strict";

  const dimensionButtons = document.querySelectorAll(".dimension-toggle");

  dimensionButtons.forEach((button) => {
    const detail = document.getElementById(button.getAttribute("aria-controls"));

    if (!detail) {
      console.error("No se encontró el contenido de una dimensión de alquimia.");
      return;
    }

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      detail.hidden = isExpanded;
      button.firstChild.textContent = isExpanded
        ? "Explorar dimensión "
        : "Cerrar dimensión ";
    });
  });

  const ritualForm = document.querySelector("#alchemy-ritual-form");
  const ritualResult = document.querySelector("#ritual-result");
  const ritualFeeling = document.querySelector("#ritual-feeling");
  const ritualTitle = document.querySelector("#ritual-result-title");
  const ritualAffirmation = document.querySelector("#ritual-result-affirmation");
  const ritualAction = document.querySelector("#ritual-result-action");

  if (!ritualForm || !ritualResult || !ritualFeeling || !ritualTitle || !ritualAffirmation || !ritualAction) {
    console.error("No se pudo iniciar el ritual de transmutación: faltan elementos del formulario.");
    return;
  }

  const practices = {
    tristeza: {
      title: "Dale un lugar a lo que sientes.",
      affirmation: "Puedo acompañarme con ternura, sin exigirme estar bien ahora.",
      action: "Escribe qué necesitas en este momento y elige una forma sencilla de cuidarte hoy."
    },
    inseguridad: {
      title: "Recuerda lo que ya has construido.",
      affirmation: "Mi valor no depende de tener todas las respuestas.",
      action: "Anota una decisión que hayas tomado por ti y qué te ayudó a dar ese paso."
    },
    miedo: {
      title: "Puedes avanzar con cuidado.",
      affirmation: "No necesito dejar de sentir miedo para elegir mi siguiente paso.",
      action: "Nombra qué sabes y qué no sabes de la situación; decide si hay una persona de confianza con quien conversarlo."
    },
    bloqueo: {
      title: "Haz espacio para un comienzo pequeño.",
      affirmation: "Puedo empezar sin tener todo resuelto.",
      action: "Divide lo que tienes pendiente en una acción de diez minutos y elige cuándo probarla."
    },
    dependencia: {
      title: "Tu voz también merece espacio.",
      affirmation: "Puedo cuidar mis vínculos sin dejar de escucharme.",
      action: "Escribe qué necesitas para sentirte respetada y considera hablarlo con alguien de confianza."
    },
    confianza: {
      title: "Tu confianza puede crecer con la práctica.",
      affirmation: "Merezco ocupar mi lugar y seguir aprendiendo.",
      action: "Elige una actividad que te importe y practica una parte concreta, sin medir tu avance con el de otras personas."
    }
  };

  ritualForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const practice = practices[ritualFeeling.value];

    if (!practice) {
      ritualFeeling.setCustomValidity("Elige una opción para ver una práctica.");
      ritualFeeling.reportValidity();
      return;
    }

    ritualFeeling.setCustomValidity("");
    ritualTitle.textContent = practice.title;
    ritualAffirmation.textContent = practice.affirmation;
    ritualAction.textContent = practice.action;
    ritualResult.hidden = false;
    ritualResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  ritualFeeling.addEventListener("change", () => {
    ritualFeeling.setCustomValidity("");
  });
})();
